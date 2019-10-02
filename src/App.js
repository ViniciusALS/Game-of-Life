import React from 'react';
import "./App.css";
import GameBoard from "./GameBoard";
import GameSlider from "./GameSlider";
import GameBtn from "./GameBtn"

class App extends React.Component {

    constructor(props){
        super(props);
        
        this.handleLenghChange = this.handleLenghChange.bind(this);
        this.handleRandomChange = this.handleRandomChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);

        this.state = {
            isPlaying: false,
            boardLengh: 10,
            boardRandomness: 50,
            boardSpeed: 30,
            boardPieces: []
        };
    }

    handleLenghChange(e) {
        const value = e.target.value
        
        this.setState({
            isPlaying: false,
            boardLengh: value
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

    handleBtnClick(){}
    
    render(){

        return(

            <div className="container">
                <h1>The Game of Life</h1>

                <GameBoard 
                    lengh="4"/>

                <GameSlider 
                    label="Lengh"
                    value={this.state.boardLengh}
                    onChange={this.handleLenghChange} />

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
