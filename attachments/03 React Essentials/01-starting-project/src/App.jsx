
// import componentImg from './assets/components.png';
import { CORE_CONCEPTS } from './data.js';
import Header from './components/Header/Header.jsx';
import CoreConcept from './components/CoreConcept.jsx';
import TabButton from './components/TabButton.jsx';



function App() {
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
            {/* <TabButton>Class Counter</TabButton>
            <TabButton>Hooks Counter</TabButton>
            <TabButton>Props Demo</TabButton>
            <TabButton>State Demo</TabButton> */}
            <TabButton label="Class Counter"/>
            <TabButton label="Hooks Counter"/>
            <TabButton label="Props Demo"/>
            <TabButton label="State Demo"/>
          </menu>
        </section>
        <h2>Time to get started!</h2>
      </main>
    </div>
  );
}

export default App;
