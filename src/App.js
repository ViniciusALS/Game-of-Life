import React from 'react';
import GameTitle from "./GameTitle";
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
                <GameTitle
                    title="the game of life"/>

                <GameBoard lengh="4"/>
            </React.Fragment>

        );
    }    
}

export default App;
