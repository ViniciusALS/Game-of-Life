import React from 'react';
import "./stylesheets/GameBoard.css";

class GameBoard extends React.Component {
 
    renderBoard(){

        let boardTable = this.props.board.map(rows => {
            rows = rows.map(cells => {
                if (cells)
                    return(<td className="game-cell is-alive"/>);
                else
                    return(<td className="game-cell"/>);
            });

            return(
                <tr>
                    {rows}
                </tr>
            );
        });

        return(
            <table className="game-board">
                {boardTable}
            </table>
        )
    }

    render() {
        return(
            this.renderBoard()
        );
    }
}

export default GameBoard;