import React from 'react';
import "./GameSlider.css";

class GameSlider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    }

    render() {

        const value = this.state.value;
        const label = this.props.label;
        const min = 5;
        const max = (label === "Lengh") ? 1000 : 100;

        return(
            <div className="slider-container">
                <p>{label}</p>

                <input className="num-selector" type="number" value={value}/>
                <input className="slider" type="range" min={min} max={max}/>
            </div>
        );
    }
}

export default GameSlider;