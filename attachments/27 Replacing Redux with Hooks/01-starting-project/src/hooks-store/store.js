/**
 * ============================================================================
 * src/hooks-store/store.js - LESSONS 558, 559, 560, 562 & 563
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
 *   3. actions: An object whose keys are action identifiers (strings)
 *      and whose values are functions that receive the current state
 *      and return a partial new state — similar to individual Redux
 *      reducer cases, but without the switch statement.
 *
 * These variables are NOT exported — they are private to this module.
 * Components interact with them only through useStore and initStore.
 *
 * THE useStore CUSTOM HOOK:
 *
 * Components call useStore() to participate in the global state system.
 * The hook does three things:
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
 *   3. Provides a dispatch function that looks up an action by its
 *      identifier, executes it with the current globalState, merges the
 *      returned partial state into globalState, and notifies all
 *      listeners to trigger re-renders.
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
 * ============================================================================
 * LESSON 559: DISPATCH, RETURN VALUE, AND initStore
 * ============================================================================
 *
 * THE DISPATCH FUNCTION:
 *
 * dispatch(actionIdentifier) is the mechanism for updating global state.
 * It mirrors the Redux dispatch concept but with a simpler flow:
 *
 *   1. Look up the action function in the actions object by its
 *      identifier string (e.g., "TOGGLE_FAV").
 *   2. Call that function with the current globalState AND an optional
 *      payload. The action function acts like a Redux reducer case — it
 *      receives the current state (and any extra data) and returns a
 *      NEW partial state object describing what changed.
 *   3. Merge the returned newState into globalState using the spread
 *      operator. This is an immutable update: a new object is created
 *      containing all old properties overwritten by the new ones.
 *   4. Loop through every listener (setState function) and call it with
 *      the updated globalState. This forces every component using
 *      useStore to re-render with the fresh state.
 *
 * RETURN VALUE — [globalState, dispatch]:
 *
 * useStore returns a two-element array, intentionally matching the shape
 * of React's built-in useReducer hook: [state, dispatch]. The difference
 * is that useReducer manages state within a single component, while
 * useStore shares state across all components that call it.
 *
 * THE initStore FUNCTION:
 *
 * initStore(userActions, initialState) is the configuration entry point.
 * Concrete store slices (e.g., a products store) call this to register
 * their actions and seed their initial state. It performs two merges:
 *
 *   - If initialState is provided, merge it INTO the existing globalState.
 *     This is critical because multiple slices may call initStore, each
 *     adding their own portion of state. This is analogous to Redux's
 *     combineReducers — each slice contributes its own initial data to
 *     one shared state object.
 *
 *   - Merge userActions INTO the existing actions object. Again, multiple
 *     slices can register their own action functions without overwriting
 *     actions from other slices.
 *
 * initStore is a named export (alongside the default export useStore)
 * so that store configuration files can import and call it to set up
 * their specific state and actions.
 *
 * ============================================================================
 * LESSON 562: ARCHITECTURAL RECAP — HOW THIS REPLACES REDUX
 * ============================================================================
 *
 * This file is a complete, custom replacement for Redux built with
 * nothing but React hooks and plain JavaScript. Here is a summary of
 * how each piece maps to its Redux counterpart:
 *
 *   Redux createStore        → initStore (registers state + actions)
 *   Redux combineReducers    → multiple initStore calls, each merging
 *                               its slice into the shared globalState
 *   Redux reducer (switch)   → actions object (keys = identifiers,
 *                               values = (state, payload) => newState)
 *   Redux dispatch(action)   → dispatch(identifier, payload)
 *   Redux <Provider>         → not needed — module-level variables are
 *                               shared automatically via JS imports
 *   Redux useSelector        → useStore()[0] (the globalState)
 *   Redux useDispatch        → useStore()[1] (the dispatch function)
 *
 * WHY THIS WORKS WITHOUT A PROVIDER:
 *
 * Redux and Context both rely on React's component tree to propagate
 * state downward via a Provider. This custom store sidesteps the tree
 * entirely: globalState, listeners, and actions are module-scoped
 * variables. JavaScript's module system guarantees that a module is
 * evaluated once and all importers share the same bindings. So every
 * component that imports useStore (directly or indirectly) operates on
 * the exact same data — no tree wrapping needed.
 *
 * THE RE-RENDER MECHANISM:
 *
 * Each component that calls useStore() registers a setState function
 * in the listeners array (via useEffect on mount). When dispatch is
 * called, it updates globalState and then calls every registered
 * setState with the new state. This forces React to re-render each
 * subscribed component — the same effect as Redux's internal
 * subscription system, but implemented in ~30 lines of code.
 *
 * CONCURRENT SLICES:
 *
 * Multiple store slices (products, auth, cart, etc.) can coexist by
 * each calling initStore with their own actions and initialState. All
 * slices merge into the single globalState and actions objects, just
 * as Redux's combineReducers assembles individual reducers into one
 * root state. The only requirement is that action identifier strings
 * and state keys must not collide between slices.
 *
 * ============================================================================
 * LESSON 563: shouldListen OPTIMIZATION — DISPATCH-ONLY COMPONENTS
 * ============================================================================
 *
 * By default, every component calling useStore() registers a listener,
 * meaning it re-renders on EVERY global state change. But some components
 * only use the store to DISPATCH actions — they never read state from it.
 * For example, ProductItem receives its data via props (from Products.js)
 * and only calls dispatch('TOGGLE_FAV', id). It has no reason to
 * re-render when the store changes.
 *
 * The shouldListen parameter (default: true) lets a component opt out
 * of listener registration. Passing useStore(false) means:
 *   - No setState is pushed into the listeners array
 *   - No cleanup function is needed on unmount
 *   - The component will NOT re-render when globalState changes
 *   - The component still has full access to dispatch
 *
 * Combined with React.memo on the component, this means only components
 * whose PROPS actually changed will re-render. In a list of ProductItems,
 * toggling one item's favorite status causes only that single item to
 * re-render (because its isFav prop changed), while the other items
 * are skipped entirely.
 *
 * shouldListen becomes an additional dependency of useEffect. Since its
 * value is a constant (true or false) passed at the call site, it never
 * changes during a component's lifetime, so the effect still runs at
 * most once.
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

// LESSON 558: Holds named action functions keyed by identifier strings.
// Each action receives the current state and returns a partial new state.
// LESSON 559: Populated via initStore() when concrete store slices register
// their specific actions (e.g., TOGGLE_FAV for the products store).
let actions = {};

// LESSON 558: The custom hook that components call to participate in the
// global state system. Each component that calls useStore() gets its own
// setState from useState, which is then tracked in the shared listeners array.
// LESSON 563: shouldListen parameter allows dispatch-only components to opt
// out of re-renders. Default is true (register listener). Pass false when a
// component only needs dispatch and receives its display data via props.
const useStore = (shouldListen = true) => {
  // LESSON 558: We destructure only the second element (the updater function)
  // because the first element (state snapshot) would quickly become stale —
  // other components may update globalState at any time. Instead of relying
  // on useState's snapshot, consumers will read from globalState directly
  // (wired up in a later lesson). The updater function's sole purpose here
  // is to force this component to re-render when called.
  const [, setState] = useState(globalState);

  // LESSON 559: dispatch takes an action identifier string, finds the
  // matching action function, runs it to produce a new partial state,
  // merges that into globalState, and notifies all listening components.
  // LESSON 560: A second parameter (payload) is now accepted and forwarded
  // to the action function. The payload can be any value — a string id,
  // a number, an object — whatever extra data the action needs beyond
  // the current state. For example, TOGGLE_FAV receives a productId.
  const dispatch = (actionIdentifier, payload) => {
    // LESSON 559: Look up the action by its string key. The actions object
    // was populated earlier via initStore(). Each value is a function with
    // the signature: (currentState, payload) => partialNewState —
    // conceptually the same as a single case inside a Redux reducer.
    // LESSON 560: payload is forwarded as the second argument so actions
    // like TOGGLE_FAV can receive the productId they need to operate on.
    const newState = actions[actionIdentifier](globalState, payload);

    // LESSON 559: Immutable merge — create a new object combining the old
    // globalState with the returned newState. Properties in newState
    // overwrite matching keys in globalState, while unrelated keys are
    // preserved. This mirrors how Redux reducers spread old state and
    // overlay changed properties.
    globalState = { ...globalState, ...newState };

    // LESSON 559: Notify every mounted component. Each listener is a
    // setState function from a component's useState call. Passing the
    // updated globalState triggers React to re-render that component
    // with the new state value.
    for (const listener of listeners) {
      listener(globalState);
    }
  };

  // LESSON 558: Register this component's setState in the shared listeners
  // array when it mounts, and remove it when it unmounts. The empty-ish
  // dependency array means this runs once on mount and cleans up on unmount.
  // LESSON 563: The entire registration is now conditional on shouldListen.
  // When false, no listener is pushed and no cleanup is needed — the
  // component can dispatch actions without receiving re-render notifications.
  useEffect(() => {
    if (shouldListen) {
      // LESSON 558: Push this component's re-render trigger into the shared
      // list. Only done when shouldListen is true.
      listeners.push(setState);
    }

    // LESSON 558: Cleanup — when this component unmounts, filter out its
    // setState from the listeners array. The closure captures the same
    // setState reference that was pushed above, so the identity comparison
    // (li !== setState) correctly finds and removes only this component's
    // listener. This prevents memory leaks and avoids calling setState on
    // unmounted components.
    // LESSON 563: Only attempt cleanup if we registered a listener.
    return () => {
      if (shouldListen) {
        listeners = listeners.filter(li => li !== setState);
      }
    };
  }, [setState, shouldListen]);
  // LESSON 558: setState is listed as a dependency to satisfy the
  // exhaustive-deps lint rule. In practice, React guarantees that the
  // setState function from useState never changes identity for a given
  // component, so this effect truly runs only once per mount/unmount cycle.
  // LESSON 563: shouldListen is also a dependency. Since it's a constant
  // passed at the call site, it never changes during a component's lifetime.

  // LESSON 559: Return shape matches useReducer's [state, dispatch] pattern.
  // globalState is the shared module-level variable (always up to date),
  // and dispatch is the function components call to trigger state changes.
  return [globalState, dispatch];
};

// LESSON 559: Configuration function that concrete store slices call to
// register their actions and seed their initial state. Multiple slices can
// each call initStore independently — their states and actions merge into
// the single shared globalState and actions objects. This is analogous to
// Redux's combineReducers, where each reducer contributes its own slice
// of the overall state tree.
export const initStore = (userActions, initialState) => {
  // LESSON 559: Only merge initialState if provided. The caller may only
  // want to register actions without adding new state properties.
  if (initialState) {
    // LESSON 559: Spread the existing globalState first so that state from
    // other slices (registered by earlier initStore calls) is preserved.
    // Then overlay the new slice's initialState. This builds up the shared
    // state object incrementally, just like combineReducers assembles
    // individual reducer states into one root state.
    globalState = { ...globalState, ...initialState };
  }
  // LESSON 559: Merge the new action functions into the shared actions
  // object, preserving actions registered by other slices. Each key in
  // userActions is an action identifier string, and its value is a
  // function: (currentState) => partialNewState.
  actions = { ...actions, ...userActions };
};

export default useStore;
