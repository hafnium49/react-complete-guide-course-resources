/**
 * ============================================================================
 * src/components/Greeting.js — LESSON 573
 * ============================================================================
 *
 * A deliberately simple component created for testing practice. It renders
 * only static text — no props, no state, no event handlers. This makes it
 * the ideal first candidate for a unit test: the expected output is fully
 * predictable, so we can focus on learning the testing mechanics without
 * worrying about dynamic behavior.
 *
 * In later lessons, state and conditional rendering will be introduced,
 * making the tests progressively more interesting.
 *
 * ============================================================================
 */

export default function Greeting() {
  return (
    <div>
      <h2>Hello World!</h2>
      <p>It's good to see you.</p>
    </div>
  );
}
