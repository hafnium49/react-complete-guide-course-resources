// =============================================================================
// CUSTOM HOOK: useFetch - A Complete, Reusable Data Fetching Hook
// =============================================================================
//
// This file contains our first COMPLETE custom hook!
//
// WHAT THIS HOOK DOES:
// --------------------
//   1. Manages loading state (isFetching)
//   2. Manages error state (error)
//   3. Manages data state (fetchedData)
//   4. Handles the async fetching logic
//   5. Returns all state to the component that uses it
//
// HOW IT'S USED:
// --------------
//   const { isFetching, error, fetchedData } = useFetch(fetchUserPlaces, []);
//
// =============================================================================

import { useState, useEffect } from 'react';

// =============================================================================
// THE useFetch CUSTOM HOOK
// =============================================================================
//
// PARAMETERS:
// -----------
//   fetchFn      - The async function that fetches data (e.g., fetchUserPlaces)
//   initialValue - The initial value for the data state (e.g., [] for arrays)
//
// RETURNS:
// --------
//   An object containing:
//     - isFetching: boolean indicating if a request is in progress
//     - error: error object if something went wrong, undefined otherwise
//     - fetchedData: the data returned by fetchFn, or initialValue
//
// =============================================================================
export function useFetch(fetchFn, initialValue) { // Start with "use" to avoid ESLint warnings
  // ===========================================================================
  // STATE MANAGEMENT - The Three States for Async Operations
  // ===========================================================================
  //
  // Every component that uses this hook will get its OWN copy of these states.
  // The hook manages the state, but the state BELONGS to the component.
  //
  // KEY INSIGHT: Custom hooks don't share state between components!
  // ---------------------------------------------------------------
  // If ComponentA and ComponentB both use useFetch, they each get their
  // own separate isFetching, error, and fetchedData states.
  //
  // This is different from Context, which DOES share state.
  //
  // ===========================================================================

  // ---------------------------------------------------------------------------
  // isFetching - Loading State
  // ---------------------------------------------------------------------------
  // Tracks whether we're currently waiting for data.
  // - true: Show loading spinner/text
  // - false: Show data or error
  //
  // Starts as false because we haven't started fetching yet.
  // ---------------------------------------------------------------------------
  const [isFetching, setIsFetching] = useState(false);

  // ---------------------------------------------------------------------------
  // error - Error State
  // ---------------------------------------------------------------------------
  // Stores any error that occurred during fetching.
  // - undefined: No error (success or not yet fetched)
  // - { message: "..." }: An error occurred
  //
  // Starts as undefined because no error has occurred yet.
  // ---------------------------------------------------------------------------
  const [error, setError] = useState();

  // ---------------------------------------------------------------------------
  // fetchedData - Data State
  // ---------------------------------------------------------------------------
  // Stores the data returned by the fetch function.
  //
  // WHY NOT NAME IT "userPlaces"?
  // -----------------------------
  // Because this hook is GENERIC! It should work with ANY kind of data:
  //   - User places
  //   - Available places
  //   - Blog posts
  //   - User profiles
  //   - Anything!
  //
  // Using a generic name like "fetchedData" makes the hook reusable.
  //
  // WHY ACCEPT initialValue AS A PARAMETER?
  // ----------------------------------------
  // Different use cases need different initial values:
  //   - Arrays: [] (to avoid "undefined.length" errors)
  //   - Objects: {} or null
  //   - Single items: null
  //
  // By accepting initialValue as a parameter, we make the hook flexible.
  //
  // Previously, we had: useState([]) - hardcoded empty array
  // Now, we have: useState(initialValue) - configurable!
  //
  // This prevents errors like:
  //   "Cannot read property 'length' of undefined"
  //
  // Because if we don't pass an initial value, fetchedData would be undefined,
  // and trying to access fetchedData.length would crash.
  // ---------------------------------------------------------------------------
  const [fetchedData, setFetchedData] = useState(initialValue);

  // ===========================================================================
  // THE FETCH EFFECT
  // ===========================================================================
  //
  // This useEffect runs the actual data fetching.
  // It's the same pattern we had in App.jsx and AvailablePlaces.jsx,
  // but now it's extracted into this reusable hook.
  //
  // ===========================================================================
  useEffect(() => {
    // -------------------------------------------------------------------------
    // THE ASYNC FETCH FUNCTION
    // -------------------------------------------------------------------------
    // We define an async function inside useEffect because:
    //   - useEffect's callback can't be async directly
    //   - We need async/await to handle the Promise from fetchFn
    //
    // WHY NAME IT "fetchData" INSTEAD OF "fetchPlaces"?
    // --------------------------------------------------
    // Again, for genericity! This hook fetches ANY data, not just places.
    // -------------------------------------------------------------------------
    async function fetchData() {
      // -----------------------------------------------------------------------
      // START LOADING
      // -----------------------------------------------------------------------
      setIsFetching(true);

      try {
        // ---------------------------------------------------------------------
        // CALL THE FETCH FUNCTION (passed as parameter)
        // ---------------------------------------------------------------------
        // fetchFn is the function passed to useFetch.
        // It could be:
        //   - fetchUserPlaces (from http.js)
        //   - fetchAvailablePlaces (from http.js)
        //   - Any other async function!
        //
        // This is what makes the hook REUSABLE:
        //   useFetch(fetchUserPlaces, [])      - fetches user places
        //   useFetch(fetchAvailablePlaces, []) - fetches available places
        //   useFetch(fetchBlogPosts, [])       - fetches blog posts
        //
        // The hook doesn't care WHAT it's fetching - it just handles
        // the loading/error/data pattern!
        // ---------------------------------------------------------------------
        const data = await fetchFn();

        // ---------------------------------------------------------------------
        // SUCCESS - Store the fetched data
        // ---------------------------------------------------------------------
        setFetchedData(data);
      } catch (error) {
        // ---------------------------------------------------------------------
        // ERROR - Store a generic error message
        // ---------------------------------------------------------------------
        // We use a GENERIC error message because this hook is reusable.
        // The specific error message from the fetch function is still
        // available in error.message.
        //
        // Alternative: Accept an errorMessage parameter to customize this.
        // ---------------------------------------------------------------------
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      // -----------------------------------------------------------------------
      // STOP LOADING (after try-catch)
      // -----------------------------------------------------------------------
      // This runs whether the fetch succeeded or failed.
      // -----------------------------------------------------------------------
      setIsFetching(false);
    }

    // -------------------------------------------------------------------------
    // EXECUTE THE FETCH FUNCTION
    // -------------------------------------------------------------------------
    fetchData();
  }, [fetchFn]);
  // ===========================================================================
  // DEPENDENCY ARRAY: [fetchFn]
  // ===========================================================================
  //
  // WHY IS fetchFn A DEPENDENCY?
  // ----------------------------
  // fetchFn is "external data" - it's not defined inside useEffect.
  // If fetchFn changes, we should re-run the effect to fetch new data.
  //
  // React's linter (ESLint) will warn you with yellow squiggly lines
  // if you forget to add dependencies!
  //
  // IMPORTANT: We pass fetchFn as a VALUE, not a CALL
  // --------------------------------------------------
  //   [fetchFn]    ← Correct! Just the function reference
  //   [fetchFn()]  ← Wrong! This would execute the function
  //
  // The dependency array checks if the VALUE has changed,
  // not if we should call it.
  //
  // ===========================================================================

  // ===========================================================================
  // RETURN THE STATE VALUES
  // ===========================================================================
  //
  // WHAT CAN CUSTOM HOOKS RETURN?
  // -----------------------------
  // Anything! Just like regular functions:
  //   - A single value: return data;
  //   - An array: return [data, setData];  (like useState)
  //   - An object: return { data, error, loading };  (what we're doing)
  //
  // WHY RETURN AN OBJECT?
  // ---------------------
  // We have 3 values to return. We could use:
  //
  //   Array:  return [isFetching, error, fetchedData];
  //           Usage: const [isFetching, error, data] = useFetch(...);
  //           Pros: Easier to rename, familiar from useState
  //           Cons: Order matters, easy to mix up
  //
  //   Object: return { isFetching, error, fetchedData };
  //           Usage: const { isFetching, error, fetchedData } = useFetch(...);
  //           Pros: Clear property names, order doesn't matter
  //           Cons: Must use exact names (or alias with :)
  //
  // We chose an object for clarity. Property names are self-documenting!
  //
  // COMPARE TO useState:
  // --------------------
  // useState returns an array: [stateValue, setStateFunction]
  // We're doing something similar, but with an object and 3 values.
  //
  // ===========================================================================
  return {
    isFetching,
    error,
    fetchedData,
  };
}

// =============================================================================
// HOW STATE WORKS WITH CUSTOM HOOKS
// =============================================================================
//
// KEY CONCEPT: State managed by a custom hook BELONGS to the component!
//
// When you use useFetch in a component:
//
//   function App() {
//     const { isFetching, error, fetchedData } = useFetch(fetchUserPlaces, []);
//     ...
//   }
//
// What happens:
//   1. useFetch creates useState hooks (isFetching, error, fetchedData)
//   2. Those states BELONG to the App component
//   3. When useFetch calls setIsFetching(true), App RE-RENDERS!
//   4. The component behaves as if the state was defined directly in it
//
// It's like the state is "lifted up" to the component automatically.
//
// This is why custom hooks are powerful:
//   - The hook manages the LOGIC (when to update state)
//   - The component owns the STATE (and re-renders when it changes)
//   - It works exactly like having the code directly in the component
//
// =============================================================================

// =============================================================================
// CUSTOM HOOKS DO NOT SHARE STATE
// =============================================================================
//
// IMPORTANT: Each component that uses useFetch gets its OWN state!
//
//   function ComponentA() {
//     const { fetchedData } = useFetch(fetchUserPlaces, []);
//     // ComponentA has its own fetchedData state
//   }
//
//   function ComponentB() {
//     const { fetchedData } = useFetch(fetchAvailablePlaces, []);
//     // ComponentB has its own SEPARATE fetchedData state
//   }
//
// Changing state in ComponentA does NOT affect ComponentB!
//
// This is DIFFERENT from Context API:
//   - Custom hooks: Each component gets its own state copy
//   - Context: All components share the same state
//
// Choose the right tool:
//   - Need SHARED state? Use Context
//   - Need REUSABLE LOGIC? Use Custom Hooks
//
// =============================================================================

// =============================================================================
// THE POWER OF CUSTOM HOOKS
// =============================================================================
//
// What we achieved:
//
// BEFORE (in App.jsx - ~25 lines):
// --------------------------------
//   const [userPlaces, setUserPlaces] = useState([]);
//   const [isFetching, setIsFetching] = useState(false);
//   const [error, setError] = useState();
//
//   useEffect(() => {
//     async function fetchPlaces() {
//       setIsFetching(true);
//       try {
//         const places = await fetchUserPlaces();
//         setUserPlaces(places);
//       } catch (error) {
//         setError({ message: error.message || '...' });
//       }
//       setIsFetching(false);
//     }
//     fetchPlaces();
//   }, []);
//
// AFTER (in App.jsx - 1 line!):
// -----------------------------
//   const { isFetching, error, fetchedData: userPlaces } = useFetch(fetchUserPlaces, []);
//
// Benefits:
//   - Component is LEANER (less code)
//   - Logic is REUSABLE (use in any component)
//   - Behavior is CONSISTENT (same pattern everywhere)
//   - Bugs fixed ONCE (fix the hook, fix everywhere)
//   - Code is TESTABLE (test the hook independently)
//
// =============================================================================
