import React from 'react';
import "./stylesheets/GameSlider.css";

class GameSlider extends React.Component {

    render() {

        const value = this.props.value;
        const label = this.props.label;
        const min = (label === "Speed") ? 0 : 5;
        const max = (label === "Lengh") ? 1000 : 100;

        return(
            <div className="slider-container">
                <p className="slider-label">{label}</p>

                <input 
                    className="num-selector" 
                    type="number"
                    min={min}
                    max={max} 
                    value={value} 
                    onChange={this.props.onChange}/>

                <input 
                    className="slider" 
                    type="range" 
                    min={min} 
                    max={max}
                    value={value}
                    onChange={this.props.onChange}/>
            </div>
        );
    }
}

export default GameSlider;