// import { useState } from "react";

const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard( { onSelectSquare, turns } ) {
    let gameBoard = initialBoard;
    for (const turn of turns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    } // deriving state from props
    

    // const [gameBoard, setGameBoard] = useState(initialBoard);

    // function handleSelectSquare(rowIndex, colIndex) {
    //     setGameBoard((prevBoard) => {
    //         const undatedBoard = [...prevBoard.map(innerArray => [...innerArray])];
    //         undatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return undatedBoard;
    //         // prevGameBoard[rowIndex][colIndex] = "X";
    //         // return prevGameBoard;
    //     });
    //     onSelectSquare();
    // }


    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) =>
                    <li key={rowIndex}>
                    <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button> {/* disable if already selected */}
                        </li>
                    ))}
                    </ol>
                    </li>
            )}
        </ol>
    )
}
