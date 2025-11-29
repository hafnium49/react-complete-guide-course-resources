
// import componentImg from './assets/components.png';
import { use, useState } from 'react';

import { CORE_CONCEPTS } from './data.js';
import Header from './components/Header/Header.jsx';
import CoreConcept from './components/CoreConcept.jsx';
import TabButton from './components/TabButton.jsx';



function App() {
  const [selectedTopic, setSelectedTopic] = useState("Please select a tab"); // React Hook, second value is a function to update the state

  // let tabContent = "Please select a tab";
  function handSelect(selectedButton) {
    // selectedButton -> 'Class Counter', 'Hooks Counter', ...
    // tabContent = selectedButton;
    setSelectedTopic(selectedButton);
    // console.log(selectedButton);
    // console.log(tabContent);
    console.log('Selected Topic:', selectedTopic); // Note: This will log the old state due to the asynchronous nature of state updates
  }
  console.log('App Rendered');
  

  return (
    <div>
      <header>
        <h1>React Essentials</h1>
        <p>
          React concepts you will need for almost any app you are going to build!
        </p>
      </header>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            <CoreConcept {...CORE_CONCEPTS[0]} />
            <CoreConcept {...CORE_CONCEPTS[1]} />
            <CoreConcept {...CORE_CONCEPTS[2]} />
            <CoreConcept {...CORE_CONCEPTS[3]} />
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>  
            <TabButton onSelect={() => handSelect('Class Counter')}>Class Counter</TabButton>
            <TabButton onSelect={() => handSelect('Hooks Counter')}>Hooks Counter</TabButton>
            <TabButton onSelect={() => handSelect('Props Demo')}>Props Demo</TabButton>
            <TabButton onSelect={() => handSelect('State Demo')}>State Demo</TabButton>
            {/* <TabButton label="Class Counter"/>
            <TabButton label="Hooks Counter"/>
            <TabButton label="Props Demo"/>
            <TabButton label="State Demo"/> */}
          </menu>
          {/* Dynamic Content */}
          {/* {tabContent} */}
          {selectedTopic}
        </section>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
