import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import { useState } from "react";
import Log from "./components/Log.jsx"
import GameOver from "./components/GameOver.jsx"
import { WINNING_COMBINATIONS } from "../../winning-combinations.js";

// const WINNING_COMBINATIONS = [
//   [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }],
//   [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }],
//   [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }],
//   [{ row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }],
//   [{ row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 }],
//   [{ row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 }],
//   [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }],
//   [{ row: 0, col: 2 }, { row: 1, col: 1 }, { row: 2, col: 0 }],
// ];

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const Initial_Game_Board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];
    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = players[firstSquare];
  }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
    const gameBoard = [...Initial_Game_Board.map(innerArray => [...innerArray])]; // deep copy


  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  } // deriving state from props
  return gameBoard;
}


function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  // const [activePlayer, setActivePlayer] = useState("X"); // manage as little state as possible
  // derived state
  // let currentPlayer = "X";
  // if (gameTurns.length > 0 && gameTurns[0].player === "X") {
  //   currentPlayer = "O";
  // }
  const activePlayer = deriveActivePlayer(gameTurns);

  // let gameBoard = initialBoard; // reference copy
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;
  
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns(preTurns => {
      // let currentPlayer = "X";
      // if (preTurns.length > 0 && preTurns[0].player === "X") {
      //   currentPlayer = "O";
      // }
      const currentPlayer = deriveActivePlayer(preTurns);

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...preTurns];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }


  // return (
  //   // <header>
  //   //   <img src="https://reactjs.org/logo-og.png" alt="React Logo" />
  //   //   <h1>React Tic-Tac-Toe</h1>
  //   // </header>
  //   <p>Commming soon...</p>
  // )
  return (
    <main>  
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* <li>
            <span className="player">
              <span className="player-name">Player 2</span>
              <span className="player-symbol">O</span>
            </span>
            <button>Edit</button>
          </li> */}
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onNameChange={handlePlayerNameChange} />
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onNameChange={handlePlayerNameChange} />
          {/* <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} /> Same component different instance */}
          {/* <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} /> {/* Same component different instance */}
        </ol>
        {(hasDraw || winner) && <GameOver winner={winner} onRestart={handleRestart} />}
        {/* <ol id="game-board">
        </ol> */}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          // activePlayerSymbol={activePlayer}
          turns={gameTurns}
          board={gameBoard}
          />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
