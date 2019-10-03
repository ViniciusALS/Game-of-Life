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
            boardlength: 10,
            boardRandomness: 50,
            boardSpeed: 30,
            boardPieces: this.createBoardArray(10)
        };
    }

    createBoardArray(length = this.state.boardlength){

        let collumns = [];
        let board = [];

        for(let i = 0; i < length; i++){
            collumns.push(0);
        }

        for(let i = 0; i < length; i++){
            board.push(collumns);
        }

        return board;
    }

    handlelengthChange(e) {
        const value = e.target.value
        
        this.setState({
            isPlaying: false,
            boardlength: value,
            boardPieces: this.createBoardArray()
        });
    }

    handleRandomChange(e) {
        const value = e.target.value;

        this.setState({
            isPlaying: false,
            boardRandomness: value
        });
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
    
    render(){

        return(

            <div className="container">
                <h1>The Game of Life</h1>

                <GameBoard 
                    isPlaying={this.state.isPlaying}
                    lengh={this.state.boardLengh}
                    randomness={this.state.boardRandomness}
                    speed={this.state.boardSpeed}
                    board={this.state.boardPieces}/>

                <GameSlider 
                    label="length"
                    value={this.state.boardlength}
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
