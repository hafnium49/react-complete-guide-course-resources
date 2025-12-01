// import { useState, Fragment } from 'react';
// import { useState } from 'react';
// import { CORE_CONCEPTS } from './data.js';
import Header from './components/Header/Header.jsx';
// import CoreConcept from './components/CoreConcept.jsx';
import CoreConcepts from './components/CoreConcepts.jsx';
import Examples from './components/Examples.jsx';
// import TabButton from './components/TabButton.jsx';
// import { EXAMPLES } from './data.js';

function App() {

  console.log('APP COMPONENT EXECUTING');

  return (
    // <div> {/* jsx must have at least one parent element */}
    // <Fragment> {/* div alternative */}
    <> {/* shorthand Fragment */}
      <Header /> {/* Header component does not have to be wrapped in a div */}
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    {/* </div> */}
    {/*</Fragment> */}
    </>
  );
}

export default App;
