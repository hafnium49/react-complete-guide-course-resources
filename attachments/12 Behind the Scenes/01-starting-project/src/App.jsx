import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from './components/Counter/ConfigureCounter.jsx';


function App() {
  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);
    // console.log(chosenCount); // updated state in the previous line is not available here yet. It is scheduled to be updated on the next render cycle.
    // setChosenCount(chosenCount+1); // this will schedule another state update, based on the current chosenCount value
    setChosenCount((prevCount) => prevCount + 1); // this will schedule another state update, based on the previous state value
    console.log(chosenCount); // still the old value, state batching
  }

  log('<App /> rendered');


  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSetCount={handleSetCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
          {/* Using key forces React to unmount and remount the Counter component
              whenever chosenCount changes, resetting its state */}
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;
