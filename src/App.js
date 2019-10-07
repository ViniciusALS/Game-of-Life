import React from 'react';
import "./stylesheets/App.css";
import GameBoard from "./GameBoard";
import GameSlider from "./GameSlider";
import GameBtn from "./GameBtn"

class App extends React.Component {

    constructor(props){
        super(props);
        
        this.handlelengthChange = this.handlelengthChange.bind(this);
        this.handleRandomChange = this.handleRandomChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
        this.createBoardArray = this.createBoardArray.bind(this);
        this.randomlyPopulateArray = this.randomlyPopulateArray.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);

        this.state = {
            isPlaying: false,
            boardLength: 10,
            boardRandomness: 50,
            boardSpeed: 30,
            timer: null,
            boardPieces: []
        };
    }

    randomlyPopulateArray(board) {

        board = board.map(row => {
            row = row.map(() => {

                const randomNumber = Math.random() * 100;
                
                if (randomNumber < this.state.boardRandomness)
                    return true;
                else 
                    return false;
            });

            return row;
        });

        this.setState({
            boardPieces: board
        })
    }

    createBoard(){
        let collumns = [];
        let board = [];

        for(let i = 0; i < this.state.boardLength; i++){
            collumns.push(0);
        }

        for(let i = 0; i < this.state.boardLength; i++){
            board.push(collumns);
        }

        return board;
    }

    createBoardArray() {
        
        let board = this.createBoard();

        this.randomlyPopulateArray(board);
    }

    returnCellValue(board, row, col){

        let length = this.state.boardPieces.length;

        if (row < 0){
            row = length - 1;
            col = (length - 1) - col;
        }
        if (row > length - 1){
            row = 0;
            col = (length - 1) - col;
        }
        if (col < 0){
            row = (length - 1) - row;
            col = length - 1;
        }
        if (col > length - 1){
            row = (length - 1) - row;
            col = 0;
        }
        

        return board[row][col];
    }

    countsCellNeighbours(board, row, col){
        const upperLeftCell    = this.returnCellValue(board, row - 1, col - 1);
        const upperMiddleCell  = this.returnCellValue(board, row - 1, col);
        const upperRightCell   = this.returnCellValue(board, row - 1, col + 1);

        const centerLeftCell   = this.returnCellValue(board, row, col - 1);
        const centerRightCell  = this.returnCellValue(board, row, col + 1);

        const bottonLeftCell   = this.returnCellValue(board, row + 1, col - 1);
        const bottonMiddleCell = this.returnCellValue(board, row + 1, col);
        const bottonRightCell  = this.returnCellValue(board, row + 1, col + 1);

        return (
            upperLeftCell +
            upperMiddleCell + 
            upperRightCell +
            centerLeftCell +
            centerRightCell +
            bottonLeftCell +
            bottonMiddleCell +
            bottonRightCell
        );
    }

    determinesNextCellState(currentCell, numberOfNeighbours){

        if (currentCell){
            
            if (numberOfNeighbours < 2)
                return false;
        
            if (numberOfNeighbours === 2 || numberOfNeighbours === 3)
                return true;

            if (numberOfNeighbours > 3)
                return false;
        }
        else {
            if (numberOfNeighbours === 3)
                return true;
            else   
                return false;
        }
    }

    updateBoardArray(){

        console.log("test");

        let board = this.state.boardPieces.slice();

        let newBoard = this.createBoard();

        if (!board)
            return;
        
        for (let row = 0; row < board.length; row++){
            for (let col = 0; col < board.length; col++){

                const currentCell = this.returnCellValue(board, row, col);
                const totalCellNeighbourhood = this.countsCellNeighbours(board, row, col);

                newBoard[row][col] = this.determinesNextCellState(currentCell, totalCellNeighbourhood);
            }
        }

        this.setState({
            boardPieces: newBoard
        });
    }

    handlelengthChange(e) {
        const value = e.target.value
        
        this.setState({
            isPlaying: false,
            boardLength: value,
        });

        this.createBoardArray();
    }

    handleRandomChange(e) {
        const value = e.target.value;

        this.setState({
            isPlaying: false,
            boardRandomness: value
        });

        this.randomlyPopulateArray(this.state.boardPieces);
    }

    handleSpeedChange(e) {
        const value = e.target.value;

        this.setState({
            boardSpeed: value
        });
    }

    handleBtnClick() {

        let shouldPlay = !this.state.isPlaying;
        
        this.playGameOfLife(shouldPlay);

        if (shouldPlay){
            this.setState({
                isPlaying: shouldPlay
            });
        }
        else {

            this.randomlyPopulateArray(this.state.boardPieces);

            this.setState({
                isPlaying: shouldPlay
            });
        }
    }

    playGameOfLife(isPlaying){

        let timer = this.state.timer;
        
        if (isPlaying){
            
            timer = setInterval(()=>{
                this.updateBoardArray();
            }, 1000);

            this.setState({
                timer: timer
            })
        }
        else {
            clearInterval(timer);
        }
    }

    componentDidMount(){
        this.createBoardArray();
    }
    
    render(){

        return(

            <div className="container">
                <h1>The Game of Life</h1>

                <GameBoard 
                    isPlaying={this.state.isPlaying}
                    board={this.state.boardPieces}/>

                <GameSlider 
                    label="Length"
                    value={this.state.boardLength}
                    onChange={this.handlelengthChange} />

                <GameSlider 
                    label="Randomness"
                    value={this.state.boardRandomness}
                    onChange={this.handleRandomChange} />

                <GameSlider 
                    label="Speed"
                    value={this.state.boardSpeed}
                    onChange={this.handleSpeedChange} />

                <GameBtn 
                    isPlaying={this.state.isPlaying}
                    onClick={this.handleBtnClick}/>

            </div>

        );
    }    
}

export default App;
