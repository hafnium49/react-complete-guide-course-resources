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
 * LESSON 575: TESTING USER INTERACTION AND STATE CHANGES
 * ============================================================================
 *
 * TESTING ALL POSSIBLE SCENARIOS:
 *
 * A component with conditional rendering creates multiple scenarios that
 * each deserve their own test. Testing only one scenario (e.g., the initial
 * render) leaves blind spots — a bug in another scenario (e.g., after a
 * button click) would go undetected. Thorough testing means covering every
 * meaningful state the component can be in:
 *
 *   - What the user sees BEFORE any interaction
 *   - What the user sees AFTER an interaction
 *   - What should DISAPPEAR after an interaction
 *
 * DESCRIPTIVE TEST NAMES:
 *
 * When combined with the describe() suite label, each test description
 * should read like a sentence:
 *
 *   "Greeting component renders Hello World as a text"
 *   "Greeting component renders 'good to see you' if the button was not clicked"
 *   "Greeting component renders 'Changed!' if the button was clicked"
 *   "Greeting component does not render 'good to see you' if the button was clicked"
 *
 * This sentence-like structure makes test output immediately understandable
 * without needing to read the test code itself.
 *
 * SIMULATING USER EVENTS WITH userEvent:
 *
 * The @testing-library/user-event package (pre-installed by CRA) provides
 * a userEvent object for triggering realistic user interactions in tests.
 * Unlike the lower-level fireEvent API, userEvent simulates full event
 * sequences as a real user would produce them (e.g., focus → keydown →
 * keypress → keyup for typing).
 *
 * Common methods on userEvent:
 *   userEvent.click(element)       — Simulate a mouse click
 *   userEvent.dblClick(element)    — Simulate a double-click
 *   userEvent.hover(element)       — Simulate mouse hover
 *   userEvent.type(element, text)  — Simulate typing into an input
 *
 * Each method requires the target DOM element as its first argument. Use
 * screen queries (getByRole, getByText, etc.) to obtain that element.
 *
 * SELECTING ELEMENTS BY ROLE:
 *
 * screen.getByRole('button') selects an element by its ARIA role. HTML
 * elements have implicit roles — <button> has role "button", <a> has role
 * "link", <input type="checkbox"> has role "checkbox", etc. Querying by
 * role mirrors how assistive technologies identify elements, making tests
 * more accessible-aware. When multiple elements share a role, pass a
 * { name: '...' } option to disambiguate by accessible name.
 *
 * ASSERTING ABSENCE WITH queryByText + toBeNull():
 *
 * To verify an element does NOT exist, you cannot use getByText — it
 * throws before the assertion runs if nothing is found. Instead, use
 * queryByText, which returns null when no match exists. Then assert with
 * toBeNull() to confirm the element is truly absent. This is the standard
 * pattern for testing that something has been removed from the DOM after
 * a state change.
 *
 * WHY TEST FOR ABSENCE?
 *
 * It is surprisingly easy to forget a conditional check and accidentally
 * render both paragraphs simultaneously. A test that only checks for the
 * presence of the NEW text would pass even if the OLD text is still
 * visible. Only an explicit absence test catches that class of bug.
 *
 * ============================================================================
 * LESSON 576: TESTING CONNECTED COMPONENTS (INTEGRATION TESTING)
 * ============================================================================
 *
 * Greeting now renders an Output wrapper component instead of raw <p> tags.
 * Despite this structural change, NONE of the tests below needed updating.
 * React Testing Library's render() traverses the entire component tree,
 * rendering child components (like Output) along with the parent. The
 * final DOM still contains the same text in <p> elements, so all queries
 * and assertions work identically.
 *
 * UNIT TEST vs INTEGRATION TEST — A BLURRY LINE:
 *
 * Strictly speaking, these tests are now INTEGRATION tests because they
 * exercise two components (Greeting + Output) working together. But in
 * React testing, this distinction is often academic — rendering a parent
 * inherently renders its children. The pragmatic guideline:
 *
 *   - If a child component is a simple wrapper (no independent state or
 *     logic), testing through the parent is sufficient. No separate test
 *     file needed for the wrapper.
 *
 *   - If a child component has its own state, side effects, or complex
 *     behavior, consider a dedicated test file (e.g., Output.test.js)
 *     to verify that logic in isolation.
 *
 * PROPS IN THE COMPONENT TREE:
 *
 * The Output component receives its content via props.children. This is
 * tested implicitly — the tests verify that the correct text appears in
 * the DOM, which can only happen if Greeting passes the right children
 * to Output and Output renders them. There is no need for a separate
 * "props are forwarded correctly" test unless the prop handling involves
 * transformation or conditional logic.
 *
 * ============================================================================
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Greeting from './Greeting';

describe('Greeting component', () => {
  // TEST 1 (from lesson 573): The heading renders regardless of state.
  test('renders Hello World as a text', () => {
    render(<Greeting />);
    const helloWorldElement = screen.getByText('Hello World!');
    expect(helloWorldElement).toBeInTheDocument();
  });

  // TEST 2: Verify the DEFAULT paragraph text is present on initial render
  // (before any user interaction). The { exact: false } option matches a
  // substring, ignoring casing — useful when you only care about part of
  // the element's text content.
  test('renders good to see you if the button was not clicked', () => {
    // ── ARRANGE ──
    render(<Greeting />);

    // ── ACT ──
    // Nothing — we are testing the initial (pre-click) state.

    // ── ASSERT ──
    const outputElement = screen.getByText('good to see you', { exact: false });
    expect(outputElement).toBeInTheDocument();
  });

  // TEST 3: Verify the paragraph text CHANGES after the button is clicked.
  // This is the first test that uses the ACT step meaningfully — we
  // simulate a click via userEvent before making our assertion.
  test('renders Changed! if the button was clicked', () => {
    // ── ARRANGE ──
    render(<Greeting />);

    // ── ACT ──
    // Select the button by its ARIA role. Since there is only one <button>
    // in the rendered output, getByRole('button') unambiguously returns it.
    const buttonElement = screen.getByRole('button');
    // Simulate a user click on the button, which triggers changeTextHandler
    // and flips changedText from false to true.
    userEvent.click(buttonElement);

    // ── ASSERT ──
    const outputElement = screen.getByText('Changed!');
    expect(outputElement).toBeInTheDocument();
  });

  // TEST 4: Verify the ORIGINAL paragraph text DISAPPEARS after the button
  // click. This catches the subtle bug where a developer forgets to make
  // the first paragraph conditional — both paragraphs would render
  // simultaneously, but only this test would detect it.
  test('does not render good to see you if the button was clicked', () => {
    // ── ARRANGE ──
    render(<Greeting />);

    // ── ACT ──
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // ── ASSERT ──
    // queryByText returns null (instead of throwing) when no element matches.
    // This is essential here — we EXPECT the element to be gone, so getByText
    // would throw an error and fail the test before the assertion ever runs.
    const outputElement = screen.queryByText('good to see you', {
      exact: false,
    });
    expect(outputElement).toBeNull();
  });
});
