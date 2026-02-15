/**
 * ============================================================================
 * src/components/Output.js — LESSON 576
 * ============================================================================
 *
 * A thin wrapper component that renders its children inside a <p> tag.
 * Similar in spirit to the "Card" wrapper pattern seen in earlier course
 * sections — a reusable component whose primary purpose is to apply
 * consistent styling or structure around arbitrary content.
 *
 * On its own, this component is deliberately redundant (it just wraps
 * children in a paragraph). In a real project, it would carry additional
 * styles, classes, or layout logic that justify the abstraction.
 *
 * TESTING IMPLICATIONS:
 *
 * When Greeting renders <Output> instead of raw <p> tags, the Greeting
 * tests do NOT need any changes. React Testing Library's render()
 * renders the ENTIRE component tree — including child components like
 * Output — not just the top-level component. The tests query the final
 * DOM output, which still contains the same text in <p> elements.
 *
 * This means the existing Greeting tests are technically INTEGRATION
 * tests now (they exercise Greeting + Output together), even though
 * nothing in the test code changed. For simple wrapper components
 * without their own logic, this level of integration is perfectly fine
 * and does not warrant separate unit tests for the wrapper.
 *
 * If Output grew to include its own state or complex behavior, it would
 * make sense to add a dedicated Output.test.js to test that logic in
 * isolation.
 *
 * ============================================================================
 */

export default function Output(props) {
  return <p>{props.children}</p>;
}
