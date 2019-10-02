import React from 'react';
import "./GameBoard.css";

class GameBoard extends React.Component {

    renderColumns(lengh){
        
        let collumns = [];

        for(let i = 0; i < lengh; i++){
            collumns.push(<tr></tr>);
        }

        return collumns;
    }

    renderRows(lengh) {

        let rows = [];

        for (let i = 0; i < lengh; i++){
            rows.push(<td>{this.renderColumns(lengh)}</td>);
        }

        return rows;
    }

    render() {

        const lengh = parseInt(this.props.lengh);

        return(
            <table>
                {this.renderRows(lengh)}
            </table>
        );
    }
}

export default GameBoard;