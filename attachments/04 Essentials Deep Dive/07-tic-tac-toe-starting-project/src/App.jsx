import Player from "./components/Player.jsx"
function App() {
  

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
        <ol id="players">
          {/* <li>
            <span className="player">
              <span className="player-name">Player 2</span>
              <span className="player-symbol">O</span>
            </span>
            <button>Edit</button>
          </li> */}
          <Player name="Player 1" symbol="X" /> {/* Same component different instance */}
          <Player name="Player 2" symbol="O" /> {/* Same component different instance */}
        </ol>
        <ol id="game-board">
        </ol>
      </div>
    </main>
  )
}

export default App
