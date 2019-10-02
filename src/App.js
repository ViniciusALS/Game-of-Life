import React from 'react';
import GameBoard from "./GameBoard";
import GameSlider from "./GameSlider";
import GameBtn from "./GameBtn"

class App extends React.Component {

    constructor(props){
        super(props);
        
        this.handleLenghChange = this.handleLenghChange.bind(this);
        this.handleRandomChange = this.handleRandomChange.bind(this);

        this.state = {
            boardLengh: 10,
            boardRandomness: 50,
            boardPieces: []
        };
    }

    handleLenghChange(){}
    handleRandomChange(){}
    
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

                <GameBtn />

            </div>

        );
    }    
}

export default App;
