
// import componentImg from './assets/components.png';
import { use, useState } from 'react';

import { CORE_CONCEPTS, EXAMPLES } from './data.js';
import Header from './components/Header/Header.jsx';
import CoreConcept from './components/CoreConcept.jsx';
import TabButton from './components/TabButton.jsx';



function App() {
  const [selectedTopic, setSelectedTopic] = useState(); // React Hook, second value is a function to update the state

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
  
  let tabContent;
  if (!selectedTopic) {
    tabContent = <p>Please select a tab</p>;
  } else {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }

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
        {/* <CoreConcept {...CORE_CONCEPTS[0]} />
        <CoreConcept {...CORE_CONCEPTS[1]} />
        <CoreConcept {...CORE_CONCEPTS[2]} />
        <CoreConcept {...CORE_CONCEPTS[3]} /> */}
        {/* array of jsx element */}
        {CORE_CONCEPTS.map((concept) => (
          <CoreConcept  key={concept.title} // to remove key warning
            // key={concept.title}
            // image={concept.image}
            // title={concept.title}
            // description={concept.description}
            {...concept}/>
            // works even if we add more properties in the future
        ))}
        </ul>
      </section>
      <section id="examples">
        <h2>Examples</h2>
        <menu>  
        <TabButton isSelected={selectedTopic === 'components'} onSelect={() => handSelect('components')}>Components</TabButton>
        <TabButton isSelected={selectedTopic === 'jsx'} onSelect={() => handSelect('jsx')}>JSX</TabButton>
        <TabButton isSelected={selectedTopic === 'props'} onSelect={() => handSelect('props')}>Props</TabButton>
        <TabButton isSelected={selectedTopic === 'state'} onSelect={() => handSelect('state')}>State</TabButton>
        </menu>
          {/* {!selectedTopic ? <p>Please select a tab</p> : null}
          {selectedTopic ? (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic]?.title}</h3>
              <p>{EXAMPLES[selectedTopic]?.description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic]?.code}</code>
              </pre>
            </div>
          ) : null} */}
          {/* {selectedTopic ? (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>
          ) : (
            <p>Please select a tab</p>
          )} */}
          {/* {!selectedTopic && <p>Please select a tab</p>}
          {selectedTopic && (
            <div id="tab-content">
              <h3>{EXAMPLES[selectedTopic].title}</h3>
              <p>{EXAMPLES[selectedTopic].description}</p>
              <pre>
                <code>{EXAMPLES[selectedTopic].code}</code>
              </pre>
            </div>
          )} */}
          {tabContent}
      </section>
      <h2>Time to get started!</h2>
      </main>
    </div>
    );
}

export default App;
