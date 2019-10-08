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

    setRandomBoard() {

        let collumns = [];
        let board = [];

        for(let i = 0; i < this.state.boardLength; i++){
            collumns.push(0);
        }

        for(let i = 0; i < this.state.boardLength; i++){
            board.push(collumns);
        }

        board = board.map(row => {
            row = row.map(() => {

                const randomNumber = Math.floor(Math.random() * 99);

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

    emptyBoard(length) {

        return (new Array(length).fill(null)
            .map(()=> new Array(length).fill(0)));
    }

    returnCellValue(row, col){

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

        return this.state.boardPieces[row][col];
    }

    countsCellNeighbours(row, col){

        let totalNeighbours = 0;

        totalNeighbours += (this.returnCellValue(row - 1, col - 1)) ? 1 : 0;
        totalNeighbours += (this.returnCellValue(row - 1, col)) ? 1 : 0;
        totalNeighbours += (this.returnCellValue(row - 1, col + 1)) ? 1 : 0;
        totalNeighbours += (this.returnCellValue(row, col - 1)) ? 1 : 0;
        totalNeighbours += (this.returnCellValue(row, col + 1)) ? 1 : 0;
        totalNeighbours += (this.returnCellValue(row + 1, col - 1)) ? 1 : 0;
        totalNeighbours += (this.returnCellValue(row + 1, col)) ? 1 : 0;
        totalNeighbours += (this.returnCellValue(row + 1, col + 1)) ? 1 : 0;

        return (totalNeighbours);
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

        let board = this.state.boardPieces.slice();
        let length = this.state.boardPieces.length;
        let nextBoard = this.emptyBoard(length);

        for (let i = 0; i < length; i++){
            for (let j = 0; j < length; j++){

                const neighbours = this.countsCellNeighbours(i, j);
                nextBoard[i][j] = this.determinesNextCellState(board[i][j], neighbours);
            }
        }

        this.setState({
            boardPieces: nextBoard
        });
    }

    handlelengthChange(e) {
        const newLegth = e.target.value

        this.setState({
            isPlaying: false,
            boardLength: newLegth
        });

        this.setRandomBoard();
    }

    handleRandomChange(e) {
        const value = e.target.value;

        this.setState({
            isPlaying: false,
            boardRandomness: value
        });

        this.setRandomBoard();
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

        if (!shouldPlay)
            this.setRandomBoard();

        this.setState({
            isPlaying: !this.state.isPlaying
        });
    }

    playGameOfLife(isPlaying){

        let timer = this.state.timer;

        if (isPlaying){

            timer = setInterval(()=>{
                this.updateBoardArray();
            }, this.state.boardSpeed * 10);

            this.setState({
                timer: timer
            })
        }
        else {
            clearInterval(timer);
        }
    }

    componentDidMount(){
        this.setRandomBoard();
    }

    render(){

        return(

            <div className="page">
                <h1>The Game of Life</h1>

                <div className="container">

                    <GameBoard
                        isPlaying={this.state.isPlaying}
                        board={this.state.boardPieces}/>

                    <div className="sliders">
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

                </div>
            </div>

        );
    }
}

export default App;