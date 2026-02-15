/**
 * ============================================================================
 * src/components/Greeting.js — LESSONS 573 & 575
 * ============================================================================
 *
 * LESSON 573:
 * Originally a static component with no props or state — ideal for a first
 * unit test because the output was fully predictable.
 *
 * LESSON 575:
 * Now upgraded with useState to introduce dynamic behavior worth testing.
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
 * ============================================================================
 */

import { useState } from 'react';

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
      {/* Conditional rendering: only ONE of these paragraphs is visible at
          any given time. When changedText is false (button not yet clicked),
          the first paragraph renders. After the button click flips the state
          to true, the second paragraph replaces it. */}
      {!changedText && <p>It's good to see you.</p>}
      {changedText && <p>Changed!</p>}
      <button onClick={changeTextHandler}>Change Text</button>
    </div>
  );
}
