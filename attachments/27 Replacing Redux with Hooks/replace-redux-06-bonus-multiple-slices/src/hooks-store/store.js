/**
 * ============================================================================
 * src/hooks-store/store.js - LESSON 564 (BONUS: MULTIPLE STATE SLICES)
 * ============================================================================
 *
 * THE GENERIC STORE ENGINE — SUPPORTING MULTIPLE CONCURRENT SLICES:
 *
 * This file is identical in structure to the single-slice version built in
 * lessons 558–563. The key point of this bonus lesson is that NOTHING in
 * this file needs to change to support multiple state slices. The engine
 * is already designed to be slice-agnostic.
 *
 * HOW MULTIPLE SLICES COEXIST:
 *
 * Each slice (products, counter, auth, cart, etc.) calls initStore() with
 * its own actions and initialState. Because initStore MERGES into the
 * existing globalState and actions objects (using the spread operator),
 * multiple calls accumulate rather than overwrite:
 *
 *   configureProductsStore() → globalState = { products: [...] }
 *                               actions    = { TOGGLE_FAV: fn }
 *
 *   configureCounterStore()  → globalState = { products: [...], counter: 0 }
 *                               actions    = { TOGGLE_FAV: fn, ADD: fn, SUB: fn }
 *
 * After all configureXxxStore() calls complete (before React renders),
 * globalState holds the combined initial state from every slice, and
 * actions holds every action function from every slice. Any component
 * calling useStore() gets access to the ENTIRE global state and can
 * dispatch ANY registered action — regardless of which slice defined it.
 *
 * THE ONLY REQUIREMENT: NO KEY COLLISIONS:
 *
 * Because all slices share the same globalState object and actions map,
 * state property names and action identifiers must be unique across slices.
 * For example, both products-store and counter-store must not use the same
 * key (e.g., both defining a "count" property would conflict). Similarly,
 * action identifiers like "ADD" must not be reused by another slice unless
 * they are intentionally the same action.
 *
 * This is the same constraint that Redux's combineReducers imposes — each
 * reducer manages its own unique key in the state tree.
 *
 * NAMED EXPORT vs DEFAULT EXPORT:
 *
 * In this bonus version, useStore is a NAMED export rather than a default
 * export. This is a minor stylistic choice — it means consuming components
 * import with: import { useStore } from '../hooks-store/store'; rather than
 * import useStore from '../hooks-store/store';. Both patterns work equally.
 *
 * ============================================================================
 */

import { useState, useEffect } from 'react';

// Module-level singletons shared by all components that import this file.
// These three variables form the global store. Multiple initStore() calls
// (one per slice) incrementally build up globalState and actions.
let globalState = {};
let listeners = [];
let actions = {};

// Named export: components import this hook to read state and dispatch actions.
// shouldListen (default: true) controls whether the component re-renders on
// state changes. Pass false for dispatch-only components (see ProductItem.js).
export const useStore = (shouldListen = true) => {
  // useState gives us a setState function to force re-renders. We discard the
  // state snapshot (index [1] extracts only the updater) because the actual
  // state lives in the module-level globalState variable.
  const setState = useState(globalState)[1];

  // dispatch looks up an action by its string identifier, executes it with the
  // current globalState and an optional payload, merges the result, and notifies
  // all registered listeners. Because actions from ALL slices live in the same
  // object, a component can dispatch any action regardless of which slice
  // defined it — e.g., Counter.js dispatches 'ADD' (counter slice) and
  // ProductItem.js dispatches 'TOGGLE_FAV' (products slice), both through
  // the same dispatch function.
  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  // Register/unregister this component's setState as a listener. Only done
  // when shouldListen is true — dispatch-only components skip this entirely.
  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter(li => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

// Named export: slice configuration files call this to register their actions
// and seed their portion of the global state. Multiple calls are additive —
// each call merges its state and actions INTO the existing objects, preserving
// what previous slices have already registered.
export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
