/**
 * ============================================================================
 * src/hooks-store/counter-store.js - LESSON 564 (BONUS: MULTIPLE STATE SLICES)
 * ============================================================================
 *
 * THE COUNTER SLICE — A SECOND INDEPENDENT STATE SLICE:
 *
 * This file demonstrates that the custom hook store is not limited to a
 * single kind of state. By creating a second configureStore function and
 * calling initStore with different actions and initialState, we add an
 * entirely new state slice (a numeric counter) alongside the existing
 * products slice.
 *
 * STRUCTURE MIRRORS products-store.js:
 *
 * Every store slice follows the same pattern:
 *   1. Import initStore from the generic store engine (store.js).
 *   2. Define an actions object with named action functions.
 *   3. Call initStore(actions, initialState) to merge into the global store.
 *   4. Export the configuration function as the default export.
 *
 * The counter slice is intentionally simple to highlight the pattern rather
 * than the business logic. It manages a single number (counter) with two
 * actions: ADD and SUB.
 *
 * ACTION FUNCTIONS — ADD AND SUB:
 *
 * Each action receives the current globalState and a payload (amount).
 * They return a PARTIAL state object containing only the key they own
 * ({ counter: newValue }). The store engine merges this into globalState,
 * leaving the products key (from the other slice) untouched.
 *
 * This is analogous to how Redux reducers only return their own slice of
 * state, and combineReducers assembles the pieces. Here, the spread-merge
 * in store.js's dispatch function does the same job automatically.
 *
 * NO COLLISION WITH THE PRODUCTS SLICE:
 *
 * The counter slice uses the state key "counter" and action identifiers
 * "ADD" and "SUB". The products slice uses the state key "products" and
 * action identifier "TOGGLE_FAV". Because none of these names overlap,
 * both slices coexist peacefully in the same globalState and actions
 * objects managed by store.js.
 *
 * ============================================================================
 */

import { initStore } from './store';

const configureStore = () => {
    // Two actions for the counter slice. Each receives the full globalState
    // (which includes products, counter, and any other slice data) but only
    // reads and returns the "counter" property — it has no reason to touch
    // state belonging to other slices.
    //
    // The payload (amount) is a number passed by the dispatching component.
    // Counter.js dispatches e.g. dispatch('ADD', 5) to increment by 5.
    const actions = {
        ADD: (state, amount) => ({counter: state.counter + amount}),
        SUB: (state, amount) => ({counter: state.counter - amount}),
    };

    // Register this slice's actions and seed its initial state. After this
    // call, globalState gains a "counter" key (value 0) and the actions
    // object gains "ADD" and "SUB" entries — all merged alongside whatever
    // other slices have already registered.
    initStore(actions, { counter: 0 });
};

export default configureStore;
