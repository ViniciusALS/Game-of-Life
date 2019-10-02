import React from 'react';
import GameBoard from "./GameBoard";
class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            boardLengh: 10,
            boardRandomness: 50,
            boardPieces: []
        };
    }
    
    render(){

        return(

            <React.Fragment>
                <h1>The Game of Life</h1>
                <GameBoard lengh="4"/>
            </React.Fragment>

        );
    }    
}

export default App;
