import Player from "./components/Player.jsx"
import GameBoard from "./components/GameBoard.jsx"
import { useState } from "react";
// import Log from "./components/Log.jsx"

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns(preTurns => {
      let currentPlayer = "X";
      if (preTurns.length > 0 && preTurns[0].player === "X") {
        currentPlayer = "O";
      }
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...preTurns];
      return updatedTurns;
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
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"}/> {/* Same component different instance */}
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} /> {/* Same component different instance */}
        </ol>
        {/* <ol id="game-board">
        </ol> */}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          // activePlayerSymbol={activePlayer}
          turns={gameTurns}
          />
      </div>
      {/* <Log /> */}
    </main>
  )
}

export default App
