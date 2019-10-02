import React from 'react';
import GameTitle from "./GameTitle";
import GameBoard from "./GameBoard";
class App extends React.Component {
    
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
