/**
 * ============================================================================
 * src/App.test.js - LESSONS 567 & 568
 * ============================================================================
 *
 * WHAT IS AUTOMATED TESTING?
 *
 * Throughout this course, we "tested" our work by running the app in the
 * browser, clicking buttons, and visually checking that things looked right.
 * That is MANUAL testing — a human verifies the application's behavior.
 *
 * Automated testing is different: we write CODE that tests our code. A test
 * file like this one contains instructions that render components, interact
 * with them programmatically, and assert that the expected output appears.
 * The tests run in the terminal (npm test) and report pass/fail results
 * without any browser or human involvement.
 *
 * WHY AUTOMATED TESTING?
 *
 * Manual testing is limited by time and memory. As an application grows,
 * it becomes impractical to manually re-verify every feature after every
 * code change. Automated tests catch regressions instantly — if a change
 * accidentally breaks an existing feature, the relevant test fails and
 * flags the problem before it reaches users.
 *
 * UNIT TESTS:
 *
 * The most common type of automated test is a UNIT TEST. A unit test
 * verifies a single, small "unit" of code in isolation — typically one
 * function, one hook, or one component. Unit tests are fast, focused,
 * and easy to debug because they isolate the piece being tested from the
 * rest of the application.
 *
 * This course section focuses on unit testing React components: rendering
 * them in a simulated DOM, finding elements, simulating user interactions,
 * and asserting that the component behaves as expected.
 *
 * THE TESTING STACK IN THIS PROJECT:
 *
 * Create React App comes pre-configured with a complete testing setup:
 *
 *   1. JEST — The test runner. Jest discovers test files (*.test.js),
 *      executes them, and reports results. It provides the test() function
 *      for defining tests, the expect() function for assertions, and
 *      features like mocking, code coverage, and watch mode.
 *
 *   2. REACT TESTING LIBRARY (@testing-library/react) — A utility for
 *      rendering React components in tests and querying the rendered output.
 *      It provides render() to mount a component and screen to query the
 *      resulting DOM. Its philosophy: test components the way users interact
 *      with them (by visible text, roles, labels) rather than by
 *      implementation details (component internals, state variables).
 *
 *   3. jest-dom (@testing-library/jest-dom) — Extends Jest's expect() with
 *      DOM-specific matchers like toBeInTheDocument(), toHaveTextContent(),
 *      toBeVisible(), etc. Imported globally in setupTests.js so every
 *      test file can use these matchers without importing them individually.
 *
 *   4. user-event (@testing-library/user-event) — Simulates real user
 *      interactions (clicks, typing, tabbing) more realistically than
 *      the lower-level fireEvent API. Used in later lessons.
 *
 * ANATOMY OF A TEST:
 *
 * The test below follows the standard structure (often called "AAA"):
 *
 *   ARRANGE — Set up the test by rendering the component under test.
 *   ACT     — (Optional) Perform an action like clicking a button.
 *   ASSERT  — Verify that the expected outcome occurred.
 *
 * In this simple example, there is no Act step — we only check that the
 * initial render contains a "Learn React" link.
 *
 * RUNNING TESTS:
 *
 * npm test     — Starts Jest in watch mode. It re-runs tests automatically
 *                when source or test files change. Press 'a' to run all
 *                tests, 'q' to quit.
 *
 * ============================================================================
 * LESSON 568: MANUAL TESTING vs AUTOMATED TESTING — DEEPER DIVE
 * ============================================================================
 *
 * MANUAL TESTING IS NOT GOING AWAY:
 *
 * Previewing your app in the browser and interacting with it as a user
 * would is invaluable. You see exactly what your users see — layout,
 * animations, responsiveness, overall feel. Manual testing will always be
 * a core part of development. Automated testing does NOT replace it.
 *
 * THE PROBLEM WITH MANUAL TESTING ALONE:
 *
 * In a complex React app with many pages and features, every code change
 * potentially affects other parts of the application. When you add a new
 * feature or modify an existing one, you will naturally test THAT change
 * in the browser. But you will not manually re-verify every other feature
 * every single time — it would take too long, and you would inevitably
 * miss edge cases.
 *
 * This means a change in one part of the app can silently break another
 * part. The bug slips through unnoticed, possibly reaching users before
 * anyone catches it. The later a bug is discovered, the more expensive
 * it is to fix — both in development time and user trust.
 *
 * HOW AUTOMATED TESTING SOLVES THIS:
 *
 * Automated tests cover the individual building blocks of your app.
 * Because they are code, running them costs almost no time — you can
 * run ALL of them after EVERY change. If a new feature accidentally
 * breaks an existing component, the test for that component fails
 * immediately, pinpointing the regression before it ships.
 *
 * The key insight: automated testing is not about testing one thing once.
 * It is about testing EVERYTHING, EVERY TIME. The cost of writing the
 * test is paid once; the benefit of running it is paid forever.
 *
 * THE COMPLEMENTARY RELATIONSHIP:
 *
 *   MANUAL TESTING → Verifies user experience, visual correctness, and
 *                     exploratory scenarios a developer thinks of on the
 *                     spot. Essential but limited to what you remember to
 *                     check.
 *
 *   AUTOMATED TESTING → Verifies that every building block still works
 *                        correctly after every code change. Systematic,
 *                        repeatable, and exhaustive within its coverage.
 *
 * Together, they form a safety net: manual testing catches what automated
 * tests don't cover (subjective UX, visual regressions), and automated
 * tests catch what manual testing misses (regressions in untouched code).
 *
 * ============================================================================
 */

import { render, screen } from '@testing-library/react';
import App from './App';

// test() defines a single test case. The first argument is a human-readable
// description of what the test verifies. The second argument is a function
// containing the test logic.
test('renders learn react link', () => {
  // ARRANGE: Render the App component into a simulated DOM (provided by
  // Jest's jsdom environment). No real browser is needed.
  render(<App />);
  // ASSERT: Query the rendered output for an element containing text that
  // matches the regular expression /learn react/i (case-insensitive).
  // getByText throws an error if no matching element is found, which
  // causes the test to fail automatically.
  const linkElement = screen.getByText(/learn react/i);
  // Verify that the found element is present in the document. The
  // toBeInTheDocument() matcher comes from @testing-library/jest-dom
  // (imported in setupTests.js).
  expect(linkElement).toBeInTheDocument();
});
