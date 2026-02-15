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
 * LESSON 574: TEST SUITES WITH describe()
 * ============================================================================
 *
 * As an application grows, so does the number of tests — dozens, hundreds,
 * or even thousands. Without organization, the terminal output becomes a
 * flat list of pass/fail lines that is difficult to scan. Test SUITES solve
 * this by grouping related tests under a labeled category.
 *
 * CREATING A SUITE:
 *
 * The globally available describe() function (no import needed, like test()
 * and expect()) creates a test suite. It takes two arguments:
 *
 *   1. A description string — the label for this group (e.g., "Greeting
 *      component"). This appears as a heading in the terminal output, with
 *      individual tests indented beneath it.
 *
 *   2. A callback function — inside this function you place your test()
 *      calls. The callback does NOT contain testing logic directly; it
 *      contains one or more test() definitions.
 *
 * TERMINAL OUTPUT WITH SUITES:
 *
 * Without describe(), all tests appear in a flat list:
 *
 *   PASS  src/components/Greeting.test.js
 *     ✓ renders Hello World as a text (xx ms)
 *
 * With describe(), tests are grouped under their suite name:
 *
 *   PASS  src/components/Greeting.test.js
 *     Greeting component
 *       ✓ renders Hello World as a text (xx ms)
 *
 * The indentation and grouping make it clear which component each test
 * belongs to — essential when scanning output from many test files.
 *
 * IMPLICIT vs EXPLICIT SUITES:
 *
 * If you write test() calls without wrapping them in describe(), Jest
 * still runs them — it creates an implicit, unnamed suite automatically.
 * Using describe() simply makes the grouping explicit and labeled,
 * which is a best practice as soon as a project has more than a handful
 * of tests.
 *
 * MULTIPLE SUITES AND NESTING:
 *
 * A single test file can contain multiple describe() blocks (for example,
 * one per sub-feature of a component), and describe() blocks can be nested
 * inside each other for finer-grained categorization. Each suite can hold
 * any number of test() calls. This flexibility lets you mirror your
 * component's behavior structure in your test organization.
 *
 * ============================================================================
 */

import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

// describe() groups related tests into a named suite. The description
// string ("Greeting component") appears as a heading in the test output,
// with each test() inside indented beneath it. This makes it easy to
// identify which component a test belongs to when reviewing results.
describe('Greeting component', () => {
  test('renders Hello World as a text', () => {
    // ── ARRANGE ──
    render(<Greeting />);

    // ── ACT ──
    // Nothing — testing initial render only.

    // ── ASSERT ──
    const helloWorldElement = screen.getByText('Hello World!');
    expect(helloWorldElement).toBeInTheDocument();
  });
});
