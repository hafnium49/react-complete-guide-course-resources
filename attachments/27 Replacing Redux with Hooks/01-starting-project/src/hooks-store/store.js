/**
 * ============================================================================
 * src/hooks-store/store.js - LESSON 558
 * ============================================================================
 *
 * APPROACH 2: A CUSTOM HOOK-BASED GLOBAL STATE MANAGEMENT STORE
 *
 * This file builds a global state management solution using nothing but
 * plain JavaScript variables and React hooks — no Redux, no Context API.
 * It addresses the Context API's limitation with high-frequency updates
 * (lesson 557) while still avoiding external dependencies.
 *
 * THE KEY INSIGHT — SHARED DATA VIA MODULE-LEVEL VARIABLES:
 *
 * Normally, custom hooks share LOGIC but not DATA. Each component that
 * calls a custom hook gets its own isolated copy of any state declared
 * inside the hook. But variables declared OUTSIDE the hook (at module
 * level) are created once when the file is first imported, and every
 * subsequent import of the same file receives the SAME references.
 *
 * This means globalState, listeners, and actions below are singletons —
 * shared across every component that imports from this file. This is the
 * foundation of the approach: store data outside the hook so it's shared,
 * but use useState inside the hook so React knows when to re-render.
 *
 * THREE MODULE-LEVEL VARIABLES:
 *
 *   1. globalState: An object holding the current application state.
 *      Analogous to the Redux store's state tree. Shared by all
 *      components — when one component updates it, every other
 *      component sees the same updated object.
 *
 *   2. listeners: An array of setState functions, one per mounted
 *      component that uses the useStore hook. When the global state
 *      changes, calling each of these functions forces the corresponding
 *      component to re-render. This is the notification mechanism.
 *
 *   3. actions: An object that will hold named action functions (similar
 *      to Redux action creators + reducer logic combined). Empty for now;
 *      it will be populated in later lessons.
 *
 * These variables are NOT exported — they are private to this module.
 * The only public interface is the useStore custom hook.
 *
 * THE useStore CUSTOM HOOK:
 *
 * Components call useStore() to participate in the global state system.
 * The hook does two things:
 *
 *   1. Calls useState(globalState) to get a setState function. We only
 *      care about the updater (second element), not the state snapshot
 *      (first element). Why? Because the actual state lives in the
 *      module-level globalState variable. The useState call exists solely
 *      to give us a function that, when called, forces the component to
 *      re-render. The state value from useState would be stale after
 *      another component updates globalState, so we always read from
 *      the module variable directly.
 *
 *   2. Registers and unregisters the setState function in the listeners
 *      array via useEffect. On mount, the component's setState is pushed
 *      into listeners. On unmount, the cleanup function filters it out.
 *      This way, only currently-mounted components receive re-render
 *      signals when state changes.
 *
 * WHY useEffect WITH AN EMPTY DEPENDENCY ARRAY:
 *
 * The effect runs once on mount (registering the listener) and its
 * cleanup runs once on unmount (removing the listener). The setState
 * function from useState is technically a dependency, but React
 * guarantees that setState from useState never changes identity for a
 * given component instance. So the dependency array [setState] is
 * functionally equivalent to [] — the effect never re-runs. We include
 * setState in the array to satisfy the exhaustive-deps lint rule.
 *
 * CLOSURE-BASED IDENTITY FOR CLEANUP:
 *
 * The cleanup function uses a closure over setState. Because setState
 * is the same function reference at mount and unmount (React guarantees
 * this), the filter comparison (li !== setState) correctly identifies
 * and removes exactly the listener that was registered for this
 * component. Each component gets its own setState from its own useState
 * call, so there are no collisions between different components.
 *
 * THIS IS JUST THE SKELETON:
 *
 * At this stage, the hook registers/unregisters listeners and holds
 * shared state, but there is no mechanism yet to update the state or
 * dispatch actions. Those pieces will be added in subsequent lessons.
 *
 * ============================================================================
 */

import { useState, useEffect } from 'react';

// LESSON 558: Module-level state object — shared across ALL components that
// import this file. Unlike state inside a hook (which is per-component),
// this single object acts as the global store, similar to a Redux store.
let globalState = {};

// LESSON 558: Array of setState functions collected from every mounted
// component that calls useStore(). When the global state changes, iterating
// over this array and calling each function triggers a re-render in the
// corresponding component. This is the "subscription" mechanism.
let listeners = [];

// LESSON 558: Will hold named action functions (e.g., toggleFav) that know
// how to produce a new state from the current one. Empty for now — actions
// will be registered in a later lesson.
let actions = {};

// LESSON 558: The custom hook that components call to participate in the
// global state system. Each component that calls useStore() gets its own
// setState from useState, which is then tracked in the shared listeners array.
const useStore = () => {
  // LESSON 558: We destructure only the second element (the updater function)
  // because the first element (state snapshot) would quickly become stale —
  // other components may update globalState at any time. Instead of relying
  // on useState's snapshot, consumers will read from globalState directly
  // (wired up in a later lesson). The updater function's sole purpose here
  // is to force this component to re-render when called.
  const [, setState] = useState(globalState);

  // LESSON 558: Register this component's setState in the shared listeners
  // array when it mounts, and remove it when it unmounts. The empty-ish
  // dependency array means this runs once on mount and cleans up on unmount.
  useEffect(() => {
    // LESSON 558: Push this component's re-render trigger into the shared
    // list. Every mounted component that uses useStore will have exactly
    // one entry in listeners.
    listeners.push(setState);

    // LESSON 558: Cleanup — when this component unmounts, filter out its
    // setState from the listeners array. The closure captures the same
    // setState reference that was pushed above, so the identity comparison
    // (li !== setState) correctly finds and removes only this component's
    // listener. This prevents memory leaks and avoids calling setState on
    // unmounted components.
    return () => {
      listeners = listeners.filter(li => li !== setState);
    };
  }, [setState]);
  // LESSON 558: setState is listed as a dependency to satisfy the
  // exhaustive-deps lint rule. In practice, React guarantees that the
  // setState function from useState never changes identity for a given
  // component, so this effect truly runs only once per mount/unmount cycle.
};

export default useStore;
