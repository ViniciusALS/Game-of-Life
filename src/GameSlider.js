import React from 'react';

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
        const value = this.props.value;
        const min = 5;
        const max = (label === "Lengh") ? 1000 : 100;

        return(
            <input type="range" min={min} max={max} value={value}/>
        );
    }
}

export default GameSlider;