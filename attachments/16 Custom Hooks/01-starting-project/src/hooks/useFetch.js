// =============================================================================
// CUSTOM HOOK: useFetch - Building Our First Custom Hook
// =============================================================================
//
// This file contains our first custom hook! Custom hooks are the React way
// to extract and share stateful logic between components.
//
// =============================================================================
// FILE ORGANIZATION
// =============================================================================
//
// We created a new folder structure:
//
//   src/
//   ├── components/     ← UI components
//   ├── hooks/          ← Custom hooks (NEW!)
//   │   └── useFetch.js ← This file
//   ├── App.jsx
//   └── ...
//
// Creating a "hooks" folder is OPTIONAL but recommended because:
//   - Keeps custom hooks organized in one place
//   - Makes them easy to find
//   - Follows common React project conventions
//
// You could also:
//   - Put hooks in the root src/ folder
//   - Name the folder differently (e.g., "customHooks")
//   - Co-locate hooks with the components that use them
//
// =============================================================================
// FILE NAMING CONVENTIONS
// =============================================================================
//
// We named this file "useFetch.js" but you have options:
//
//   useFetch.js      ← camelCase (what we're using)
//   use-fetch.js     ← kebab-case (also common)
//   UseFetch.js      ← PascalCase (less common for hooks)
//   fetch.js         ← Without "use" (also valid)
//
// The file name doesn't HAVE to start with "use" - only the FUNCTION inside
// must start with "use" for React to recognize it as a hook.
//
// We're using "useFetch.js" because:
//   - It matches the function name inside
//   - It's immediately clear this file contains a hook
//   - Easy to find when searching for hooks
//
// =============================================================================

import { useEffect } from 'react';

// =============================================================================
// THE CUSTOM HOOK FUNCTION
// =============================================================================
//
// A custom hook is just a regular JavaScript function with ONE special rule:
//
//   THE NAME MUST START WITH "use"
//
// This is not just a naming convention - it's enforced by React's tooling!
//
// =============================================================================
// WHY THE "use" PREFIX IS REQUIRED
// =============================================================================
//
// React projects (like this one using Vite) are configured to:
//
//   1. DETECT functions starting with "use"
//   2. TREAT them as hooks
//   3. ENFORCE the Rules of Hooks on them
//
// This means:
//
//   function useFetch() {        ← React treats this as a hook
//     useState(...)              ← Allowed! It's inside a hook
//     useEffect(...)             ← Allowed!
//   }
//
//   function fetchData() {       ← React treats this as a regular function
//     useState(...)              ← ERROR! Can't use hooks here
//     useEffect(...)             ← ERROR!
//   }
//
// The "use" prefix is what enables your custom function to use other hooks!
//
// =============================================================================
// DEMONSTRATION: WHAT HAPPENS WITHOUT "use"
// =============================================================================
//
// If you renamed this function to just "fetch" (without "use"):
//
//   function fetch(fetchFn) {
//     useEffect(() => { ... });   // ← Red squiggly lines! Error!
//   }
//
// You would see an error:
//   "React Hook 'useEffect' is called in function 'fetch' that is
//    neither a React function component nor a custom React Hook function.
//    React component names must start with an uppercase letter.
//    React Hook names must start with the word 'use'."
//
// This error is ENFORCED by the project configuration (ESLint rules).
// It protects you from using hooks incorrectly!
//
// =============================================================================
// NAMING YOUR CUSTOM HOOK
// =============================================================================
//
// The name after "use" is up to you:
//
//   useFetch          ← What we're using (describes fetching data)
//   useData           ← Alternative name
//   useHttp           ← Another option
//   useAsync          ← More generic
//   useApi            ← Also works
//
// Just avoid clashing with built-in hooks:
//
//   useState          ← TAKEN (built-in)
//   useEffect         ← TAKEN (built-in)
//   useContext        ← TAKEN (built-in)
//   useRef            ← TAKEN (built-in)
//   useCallback       ← TAKEN (built-in)
//   useMemo           ← TAKEN (built-in)
//   useReducer        ← TAKEN (built-in)
//   ...
//
// "useFetch" is safe because there's no built-in hook with that name.
//
// =============================================================================

export function useFetch(fetchFn) {
  // ===========================================================================
  // WHAT WE'RE EXTRACTING
  // ===========================================================================
  //
  // We're moving this code from App.jsx into this custom hook:
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
  // This way:
  //   - App.jsx becomes LEANER (less code)
  //   - The fetching logic is REUSABLE (other components can use it)
  //   - The hook handles the COMPLEXITY (state, effects, async)
  //   - Components focus on DISPLAY (what they should do)
  //
  // ===========================================================================

  // ===========================================================================
  // THE useEffect - Extracted from App.jsx
  // ===========================================================================
  //
  // This is the exact same useEffect that was in App.jsx!
  // We just moved it here.
  //
  // Notice that useEffect works here because this function starts with "use".
  // If we named this function "fetchData" instead, we'd get an error.
  //
  // ===========================================================================
  useEffect(() => {
    async function fetchData() {
      // This code will run when the hook is used
      // But wait - we have some problems to solve:
      //
      // 1. Where is setIsFetching? We need state!
      // 2. Where is setUserPlaces? We need state!
      // 3. Where is setError? We need state!
      // 4. What is fetchUserPlaces? We receive it as fetchFn parameter!
      //
      // The hook is NOT COMPLETE YET - we need to:
      // - Add useState for isFetching, data, and error
      // - Use the fetchFn parameter to make it flexible
      // - Return the state values so components can use them
      //
      // We'll fix these in the next lessons!
    }

    fetchData();
  }, []);

  // ===========================================================================
  // WHAT'S STILL MISSING (To be added in next lessons)
  // ===========================================================================
  //
  // This hook needs more work to be functional:
  //
  //   1. STATE MANAGEMENT
  //      - useState for data (the fetched result)
  //      - useState for isFetching (loading indicator)
  //      - useState for error (error handling)
  //
  //   2. ASYNC LOGIC
  //      - Call the fetchFn parameter
  //      - Handle success and error cases
  //      - Update state accordingly
  //
  //   3. RETURN VALUES
  //      - Return the state so components can use it
  //      - Maybe return a refetch function
  //
  // Example of what the final hook might look like:
  //
  //   export function useFetch(fetchFn) {
  //     const [data, setData] = useState([]);
  //     const [isFetching, setIsFetching] = useState(false);
  //     const [error, setError] = useState();
  //
  //     useEffect(() => {
  //       async function fetchData() {
  //         setIsFetching(true);
  //         try {
  //           const result = await fetchFn();
  //           setData(result);
  //         } catch (error) {
  //           setError({ message: error.message });
  //         }
  //         setIsFetching(false);
  //       }
  //       fetchData();
  //     }, [fetchFn]);
  //
  //     return { data, isFetching, error };
  //   }
  //
  // ===========================================================================
}

// =============================================================================
// THE IDEA BEHIND CUSTOM HOOKS
// =============================================================================
//
// The general programming principle:
//
//   "Create functions once, use them in many places"
//
// Custom hooks extend this to STATEFUL logic:
//
//   Regular functions:
//   - Can be reused
//   - Can't use hooks (useState, useEffect, etc.)
//   - Can't manage React state
//
//   Custom hooks (functions starting with "use"):
//   - Can be reused
//   - CAN use hooks!
//   - CAN manage React state
//
// This is why custom hooks exist:
//   - They let you extract and reuse STATEFUL logic
//   - The "use" prefix enables hooks inside them
//   - React's rules ensure they're used correctly
//
// =============================================================================

// =============================================================================
// HOW THIS HOOK WILL BE USED (Preview)
// =============================================================================
//
// Once complete, components will use this hook like:
//
//   // In App.jsx:
//   function App() {
//     const { data: userPlaces, isFetching, error } = useFetch(fetchUserPlaces);
//
//     // No more manual useState for data, loading, error!
//     // No more useEffect for fetching!
//     // The hook handles all of that!
//
//     return (
//       <Places
//         places={userPlaces}
//         isLoading={isFetching}
//         ...
//       />
//     );
//   }
//
//   // In AvailablePlaces.jsx:
//   function AvailablePlaces() {
//     const { data, isFetching, error } = useFetch(fetchAvailablePlaces);
//
//     // Same clean pattern - reused the same hook!
//   }
//
// Benefits:
//   - Components become SIMPLER
//   - Fetching logic is CONSISTENT
//   - Bug fixes apply EVERYWHERE
//   - Code is DRY (Don't Repeat Yourself)
//
// =============================================================================

// =============================================================================
// RULES OF HOOKS REMINDER
// =============================================================================
//
// Since this is a custom hook, the Rules of Hooks apply:
//
//   RULE 1: Only call hooks at the TOP LEVEL
//   -----------------------------------------
//   ✓ useState at the top of useFetch
//   ✓ useEffect at the top of useFetch
//   ✗ useState inside if statements
//   ✗ useEffect inside loops
//
//   RULE 2: Only call hooks from React functions
//   ---------------------------------------------
//   ✓ From React component functions
//   ✓ From custom hooks (like this one!)
//   ✗ From regular JavaScript functions
//   ✗ From class components
//
// Because this function starts with "use", React's linter will:
//   - Verify we follow Rule 1 inside this function
//   - Verify this function is only called from valid places
//
// =============================================================================
