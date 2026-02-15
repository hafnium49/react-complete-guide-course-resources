/**
 * ============================================================================
 * src/components/Greeting.js — LESSONS 573, 575 & 576
 * ============================================================================
 *
 * LESSON 573:
 * Originally a static component with no props or state — ideal for a first
 * unit test because the output was fully predictable.
 *
 * LESSON 575:
 * Upgraded with useState to introduce dynamic behavior worth testing.
 * A button toggles a boolean state, which conditionally changes the
 * paragraph text. This creates multiple testable scenarios:
 *
 *   1. "Hello World!" heading always renders (unchanged from lesson 573).
 *   2. "It's good to see you." renders when the button has NOT been clicked.
 *   3. "Changed!" renders when the button HAS been clicked.
 *   4. "It's good to see you." should NOT render after the button is clicked.
 *
 * Scenario 4 is easy to overlook — a developer might accidentally forget
 * the conditional check and always render the first paragraph. Only a test
 * that explicitly asserts absence (using queryByText + toBeNull) would
 * catch that kind of bug.
 *
 * LESSON 576:
 * Raw <p> tags replaced with the Output wrapper component. This introduces
 * a multi-component tree: Greeting now renders Output, which in turn
 * renders the paragraph. The key insight is that ALL existing tests in
 * Greeting.test.js continue to pass without modification — render()
 * traverses the full component tree, so the final DOM output is identical.
 *
 * From a testing taxonomy perspective, those tests are now technically
 * INTEGRATION tests (they exercise Greeting + Output together). But for
 * a simple wrapper component with no independent logic, splitting the
 * tests into separate files would be unnecessary overhead. If Output
 * gained its own state or complex behavior, a dedicated Output.test.js
 * would become appropriate.
 *
 * ============================================================================
 */

import { useState } from 'react';
import Output from './Output';

export default function Greeting() {
  // Boolean state tracking whether the button has been clicked. Starts as
  // false (initial render shows the default paragraph text).
  const [changedText, setChangedText] = useState(false);

  const changeTextHandler = () => {
    setChangedText(true);
  };

  return (
    <div>
      <h2>Hello World!</h2>
      {/* Conditional rendering: only ONE of these Output elements is visible
          at any given time. Replacing raw <p> tags with <Output> delegates
          the paragraph rendering to a wrapper component — the rendered DOM
          is identical, so all existing tests pass without changes. */}
      {!changedText && <Output>It's good to see you.</Output>}
      {changedText && <Output>Changed!</Output>}
      <button onClick={changeTextHandler}>Change Text</button>
    </div>
  );
}
