/**
 * ============================================================================
 * src/components/Greeting.test.js — LESSON 573
 * ============================================================================
 *
 * OUR FIRST CUSTOM TEST FILE
 *
 * This is the first test file we write from scratch (as opposed to the
 * CRA-generated App.test.js that shipped with the project). It follows
 * the naming convention established in lesson 572: the test file mirrors
 * the source file it covers — Greeting.js → Greeting.test.js — and lives
 * in the same directory as the component it tests.
 *
 * CO-LOCATION:
 *
 * The convention is to place test files as close as possible to the code
 * they verify. We could technically write this test in App.test.js and
 * render Greeting from there, but co-locating the test with the component
 * makes it immediately clear WHICH component the test covers, and keeps
 * the project organized as the number of components and tests grows.
 *
 * THE THREE A'S (AAA PATTERN):
 *
 * Every well-structured test follows three steps:
 *
 *   1. ARRANGE — Set up the test environment. Render the component under
 *      test, provide any props it needs, mock dependencies if required.
 *
 *   2. ACT — Perform the action being tested. Click a button, type into
 *      an input, trigger a form submission. For tests that only verify
 *      initial render output (like this one), there is nothing to do in
 *      the Act step — it can be omitted entirely.
 *
 *   3. ASSERT — Check the result. Query the rendered DOM for expected
 *      elements, verify text content, check that certain elements are
 *      present or absent. This is where expect() and matchers are used.
 *
 * SCREEN QUERY METHODS — THREE FAMILIES:
 *
 * The screen object provides three families of query methods, each with
 * different behavior when an element is NOT found:
 *
 *   getBy...   — Returns the element immediately. THROWS an error if no
 *                matching element exists. Use when you expect the element
 *                to be present right now. Most common in assertions.
 *
 *   queryBy... — Returns the element or NULL if not found. Does NOT throw.
 *                Use when you need to assert that an element does NOT exist
 *                (e.g., expect(screen.queryByText('Error')).not.toBeInTheDocument()).
 *                Using getByText for a "not in document" assertion would fail
 *                before the assertion even runs, because getBy throws first.
 *
 *   findBy...  — Returns a PROMISE that resolves when the element appears.
 *                Use for elements that appear asynchronously (e.g., after a
 *                fetch completes or a state update triggers a re-render).
 *                Must be awaited in an async test function.
 *
 * Each family has variants for different query strategies: ByText, ByRole,
 * ByLabelText, ByPlaceholderText, ByAltText, ByTitle, ByTestId, etc.
 *
 * EXACT MATCHING:
 *
 * By default, getByText performs an EXACT match — the text must match
 * the element's text content precisely (including punctuation and casing).
 * Passing { exact: false } as the second argument relaxes this: it
 * ignores casing and matches substrings. For this test, we use the exact
 * string "Hello World!" (including the exclamation mark) to match what
 * the component actually renders.
 *
 * NEGATED ASSERTIONS:
 *
 * Jest's expect() supports negation via .not:
 *   expect(element).not.toBeInTheDocument()
 * This asserts the opposite — that the element is absent. When checking
 * absence, pair .not with queryBy (not getBy), since getBy would throw
 * before the assertion executes if the element is missing.
 *
 * ============================================================================
 */

import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

// test() is globally provided by Jest — no import needed. The description
// string ("renders Hello World as a text") identifies this test in the
// terminal output, appearing next to the pass/fail indicator.
test('renders Hello World as a text', () => {
  // ── ARRANGE ──
  // Render the Greeting component into Jest's simulated DOM. This is the
  // setup step — mounting the component so its output can be inspected.
  render(<Greeting />);

  // ── ACT ──
  // Nothing to do here. This test only verifies the initial render output.
  // There are no user interactions to simulate (no clicks, no typing).
  // In later lessons, this step will contain actions like button clicks.

  // ── ASSERT ──
  // Query the rendered DOM for an element whose text content is exactly
  // "Hello World!" (with exclamation mark). getByText uses exact matching
  // by default, so the string must match precisely. If no element with
  // this text exists, getByText throws an error and the test fails — the
  // failure output includes the full rendered HTML for debugging.
  const helloWorldElement = screen.getByText('Hello World!');

  // Verify that the found element exists in the document. This uses the
  // toBeInTheDocument() matcher from @testing-library/jest-dom (loaded
  // globally via setupTests.js). expect() is globally available from Jest,
  // just like test() — no import required.
  expect(helloWorldElement).toBeInTheDocument();
});
