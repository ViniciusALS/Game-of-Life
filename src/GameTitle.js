import React from 'react';
import './GameTitle.css';

class GameTitle extends React.Component {

    render(){

        return(
            <h1>{this.props.title}</h1>
        )
    }
}

export default GameTitle;