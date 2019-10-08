import React from "react";
import "./stylesheets/GameBtn.css"

class GameBtn extends React.Component {

    render() {

        const buttonValue = this.props.isPlaying ? "Stop" : "Start";

        return(
            <input
                className="game-btn"
                type="button"
                value={buttonValue}
                onClick={this.props.onClick} />
        );
    }
}

export default GameBtn;