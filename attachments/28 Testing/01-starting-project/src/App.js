/**
 * ============================================================================
 * src/App.js — LESSON 573
 * ============================================================================
 *
 * The default CRA App component (logo, "Learn React" link) has been replaced
 * with our custom Greeting component. This is the component under test in
 * Greeting.test.js. Changing App's output is what invalidated the original
 * App.test.js test — it searched for "learn react" text that no longer exists
 * in the rendered tree, causing it to fail. That file was deleted since its
 * test no longer applies to the updated application.
 *
 * ============================================================================
 */

import Greeting from './components/Greeting';

function App() {
  return (
    <div>
      <Greeting />
    </div>
  );
}

export default App;
