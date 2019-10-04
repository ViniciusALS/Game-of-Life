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

    createBoardArray() {
        let collumns = [];
        let board = [];

        for(let i = 0; i < this.state.boardLength; i++){
            collumns.push(0);
        }

        for(let i = 0; i < this.state.boardLength; i++){
            board.push(collumns);
        }

        this.randomlyPopulateArray(board);
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
        
        this.setState({
            isPlaying: !this.state.isPlaying
        });
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
                    speed={this.state.boardSpeed}
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
