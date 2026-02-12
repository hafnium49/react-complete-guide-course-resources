/**
 * ============================================================================
 * src/containers/Counter.js - LESSON 564 (BONUS: MULTIPLE STATE SLICES)
 * ============================================================================
 *
 * COUNTER COMPONENT — CONSUMING THE COUNTER SLICE:
 *
 * This component is the consumer of the counter-store slice. It uses the
 * same useStore() hook as the product-related components, but interacts
 * with a completely different part of the global state.
 *
 * READING AND WRITING A DIFFERENT SLICE:
 *
 * useStore() returns [globalState, dispatch]. The globalState object
 * contains BOTH slices: { products: [...], counter: 0 }. This component
 * only reads state.counter — it has no interest in state.products. Similarly,
 * it only dispatches 'ADD' and 'SUB' actions (registered by counter-store.js)
 * and never dispatches 'TOGGLE_FAV'.
 *
 * This is the same pattern used in Redux, where a component connects to
 * the global store but only selects the slice it needs via useSelector.
 * Here, there is no selector function — the component simply accesses the
 * property it cares about (state.counter) and ignores the rest.
 *
 * DISPATCH WITH NUMERIC PAYLOAD:
 *
 * Each button dispatches an action with a numeric amount as the payload.
 * For example, dispatch('ADD', 5) increments the counter by 5. The payload
 * is forwarded by the store engine to the ADD action function in
 * counter-store.js, which computes state.counter + amount.
 *
 * ============================================================================
 */

import React from 'react';

// useStore is a named import — the same hook used by Products, Favorites,
// and ProductItem. Every component shares the same global store instance.
import { useStore } from '../hooks-store/store';
import './Counter.css';

const Counter = props => {
  // Destructure both state (to read the counter value) and dispatch (to
  // trigger ADD/SUB actions). The state object contains ALL slices, but
  // this component only reads state.counter.
  const [state, dispatch] = useStore();
  return (
    <div className="counter">
      <p>Only there to proof, that you can have multiple state slices.</p>
      <p>Counter: {state.counter}</p>
      {/* Each button dispatches an action identifier with a numeric payload.
          'ADD' and 'SUB' are action keys registered by counter-store.js. */}
      <button onClick={() => dispatch('ADD', 1)}>Add 1</button>
      <button onClick={() => dispatch('ADD', 5)}>Add 5</button>
      <button onClick={() => dispatch('SUB', 1)}>Subtract 1</button>
      <button onClick={() => dispatch('SUB', 5)}>Subtract 5</button>
    </div>
  );
};

export default Counter;
