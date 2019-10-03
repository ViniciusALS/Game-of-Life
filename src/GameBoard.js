import React from 'react';
import "./stylesheets/GameBoard.css";

class GameBoard extends React.Component {

    renderColumns(lengh, x, y){
        
        let collumns = [];
        let gameStatus = "game-col";

        for(let i = 0; i < lengh; i++){

            if (x && y === i)
                gameStatus += " is-alive";

            collumns.push(<td className={gameStatus}></td>);
            gameStatus = "game-col";
        }

        return collumns;
    }

    renderRows(lengh, x, y) {

        let rows = [];

        for (let i = 0; i < lengh; i++){
            
            if (x === i)
                x = true;
            else
                x = false;

            rows.push(<tr className="game-row">{this.renderColumns(lengh, x, y)}</tr>);
        }

        return rows;
    }

    render() {

        const board = this.props.board;
        const lengh = parseInt(this.props.lengh);

        return(
            <table className="game-board">
                {this.renderRows(lengh, 0, 0)}
            </table>
        );
    }
}

export default GameBoard;