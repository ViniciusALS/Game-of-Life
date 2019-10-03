import React from 'react';
import "./stylesheets/GameBoard.css";

class GameBoard extends React.Component {

    renderColumns(length, x, y){
        
        let collumns = [];
        let gameStatus = "game-col";

        for(let i = 0; i < length; i++){

            if (x && y === i)
                gameStatus += " is-alive";

            collumns.push(<td className={gameStatus}></td>);
            gameStatus = "game-col";
        }

        return collumns;
    }

    renderRows(length, x, y) {

        let rows = [];

        for (let i = 0; i < length; i++){
            
            if (x === i)
                x = true;
            else
                x = false;

            rows.push(<tr className="game-row">{this.renderColumns(length, x, y)}</tr>);
        }

        return rows;
    }

    render() {

        const board = this.props.board;
        const length = board.length;

        return(
            <table className="game-board">
                {this.renderRows(length, 0, 0)}
            </table>
        );
    }
}

export default GameBoard;