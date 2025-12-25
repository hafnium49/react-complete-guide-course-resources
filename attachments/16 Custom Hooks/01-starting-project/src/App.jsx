// =============================================================================
// SECTION 16: CUSTOM HOOKS - Introduction
// =============================================================================
//
// Welcome to the Custom Hooks section! This is one of the most powerful
// concepts in React - the ability to create your own hooks.
//
// STARTING POINT:
// ----------------
// This project is the FINISHED application from Section 15 (HTTP Requests).
// It includes:
//   - Data fetching with useEffect
//   - Loading, error, and data states
//   - Optimistic updates with rollback
//   - Backend synchronization
//
// If you haven't completed Section 15, you should do so first, or at least
// understand how data fetching in React works.
//
// =============================================================================
// WHAT ARE CUSTOM HOOKS?
// =============================================================================
//
// Custom hooks are JavaScript functions that:
//   1. Start with the word "use" (e.g., useFetch, useCounter, useForm)
//   2. Can call other hooks (useState, useEffect, useContext, etc.)
//   3. Let you extract and share STATEFUL logic between components
//
// They are NOT:
//   - A way to share state between components (use Context for that)
//   - A replacement for components
//   - Required for every piece of logic
//
// =============================================================================
// WHY BUILD CUSTOM HOOKS?
// =============================================================================
//
// Looking at this file, you might notice some patterns that repeat:
//
// PATTERN 1: Fetching data with loading/error states
// ---------------------------------------------------
//   const [data, setData] = useState([]);
//   const [isFetching, setIsFetching] = useState(false);
//   const [error, setError] = useState();
//
//   useEffect(() => {
//     async function fetchData() {
//       setIsFetching(true);
//       try {
//         const result = await someFetchFunction();
//         setData(result);
//       } catch (error) {
//         setError({ message: error.message });
//       }
//       setIsFetching(false);
//     }
//     fetchData();
//   }, []);
//
// This pattern appears in BOTH App.jsx and AvailablePlaces.jsx!
// We're duplicating the same loading/error/data state management.
//
// A custom hook could extract this:
//
//   const { data, isFetching, error } = useFetch(fetchUserPlaces);
//
// Much cleaner! And reusable across all components that fetch data.
//
// =============================================================================
// THE RULES OF HOOKS (Updated!)
// =============================================================================
//
// There are TWO important rules when working with hooks:
//
// =============================================================================
// RULE 1: Only call hooks from REACT FUNCTIONS (Updated Rule!)
// =============================================================================
//
// The original rule said: "Only use hooks inside React component functions."
//
// But this rule is actually MORE FLEXIBLE than that!
//
// ✓ Call hooks from React COMPONENT functions
// ✓ Call hooks from CUSTOM HOOKS (functions starting with "use")
// ✗ Don't call hooks from regular JavaScript functions
// ✗ Don't call hooks from class components
//
// This updated rule is what ENABLES custom hooks to work!
//
//   // ✓ CORRECT - function component
//   function MyComponent() {
//     const [count, setCount] = useState(0);  // Hooks work here
//   }
//
//   // ✓ CORRECT - custom hook (this is NEW!)
//   function useCounter() {
//     const [count, setCount] = useState(0);  // Hooks also work here!
//     return count;
//   }
//
//   // ✗ WRONG - regular function (no "use" prefix)
//   function fetchData() {
//     const [data, setData] = useState([]);   // NOT allowed!
//     useEffect(() => { ... }, []);           // NOT allowed!
//   }
//
// The "use" prefix is not just a naming convention - React ENFORCES it!
// React's linter will warn you if you try to use hooks in invalid places.
//
// =============================================================================
// RULE 2: Only call hooks at the TOP LEVEL
// =============================================================================
//
// ✓ Call hooks at the top of your function component
// ✓ Call hooks at the top of your custom hook
// ✗ Don't call hooks inside loops, conditions, or nested functions
//
//   // ✓ CORRECT
//   function MyComponent() {
//     const [count, setCount] = useState(0);  // Top level ✓
//     useEffect(() => { ... }, []);           // Top level ✓
//   }
//
//   // ✗ WRONG
//   function MyComponent() {
//     if (someCondition) {
//       const [count, setCount] = useState(0);  // Inside condition! ✗
//     }
//     for (let i = 0; i < 5; i++) {
//       useEffect(() => { ... }, []);           // Inside loop! ✗
//     }
//   }
//
// WHY? React relies on the ORDER of hook calls to track state.
// If hooks are called conditionally, the order might change between renders,
// and React would get confused about which state belongs to which hook.
//
// =============================================================================
// WHAT WE'LL BUILD IN THIS SECTION
// =============================================================================
//
// We'll create custom hooks to:
//   1. Extract the fetching logic (useFetch)
//   2. Share it between App.jsx and AvailablePlaces.jsx
//   3. Make our components cleaner and more focused
//
// The goal: Components should focus on WHAT to display, not HOW to fetch data.
//
// =============================================================================
// FILE STRUCTURE FOR CUSTOM HOOKS
// =============================================================================
//
// We've created a new folder to organize our custom hooks:
//
//   src/
//   ├── components/           ← UI components
//   ├── hooks/                ← Custom hooks (NEW!)
//   │   └── useFetch.js       ← Our first custom hook
//   ├── http.js               ← HTTP utility functions
//   ├── loc.js                ← Location utilities
//   └── App.jsx               ← This file
//
// Creating a "hooks" folder is OPTIONAL but recommended:
//   - Keeps custom hooks organized in one place
//   - Makes them easy to find and import
//   - Follows common React project conventions
//
// You could also name the folder "customHooks" or put hooks in src/ directly.
//
// =============================================================================
// WHY REGULAR FUNCTIONS WON'T WORK
// =============================================================================
//
// You might think: "Can't I just put this code in a regular function?"
//
// Let's try it:
//
//   // ❌ THIS APPROACH WILL FAIL!
//   function fetchData(fetchFn) {
//     const [data, setData] = useState([]);
//     const [isFetching, setIsFetching] = useState(false);
//     const [error, setError] = useState();
//
//     useEffect(() => {
//       async function fetch() {
//         setIsFetching(true);
//         try {
//           const result = await fetchFn();
//           setData(result);
//         } catch (error) {
//           setError({ message: error.message });
//         }
//         setIsFetching(false);
//       }
//       fetch();
//     }, [fetchFn]);
//
//     return { data, isFetching, error };
//   }
//
// This LOOKS like it would work, but it DOESN'T because:
//
//   1. useState and useEffect are HOOKS
//   2. Hooks can ONLY be called from:
//      - React component functions
//      - Custom hooks (functions starting with "use")
//   3. "fetchData" is a regular function, not a hook
//   4. React will throw an error!
//
// The solution: Rename it to start with "use":
//
//   // ✓ THIS WORKS!
//   function useFetch(fetchFn) {
//     const [data, setData] = useState([]);
//     // ... same code ...
//     return { data, isFetching, error };
//   }
//
// The "use" prefix tells React:
//   - "This function can use hooks"
//   - "This function should only be called from valid places"
//   - React will enforce these rules!
//
// =============================================================================
// THE KEY INSIGHT
// =============================================================================
//
// Custom hooks are a way to GUARANTEE that hook-using code is only used
// in valid places (components or other hooks).
//
// When you name a function with "use":
//   1. React knows it can contain hooks
//   2. React's linter checks that it's called correctly
//   3. The hook rules are enforced automatically
//
// This is why custom hooks exist - they're the safe way to share
// stateful logic between components!
//
// =============================================================================

// Note: useCallback temporarily not used (handleRemovePlace is commented out)
import { useRef, useState } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
// Note: updateUserPlaces temporarily not used (optimistic update functions commented out)
import { fetchUserPlaces } from './http.js';
import Error from './components/Error.jsx';
// =============================================================================
// IMPORTING OUR CUSTOM HOOK
// =============================================================================
// We import useFetch from our hooks folder.
// This hook will handle all the fetching logic for us!
// =============================================================================
import { useFetch } from './hooks/useFetch.js';

function App() {
  const selectedPlace = useRef();

  // ===========================================================================
  // USING THE CUSTOM HOOK - BEFORE vs AFTER
  // ===========================================================================
  //
  // BEFORE (what we had - ~25 lines of code):
  // -----------------------------------------
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
  // AFTER (what we have now - 1 line!):
  // -----------------------------------
  //   const { isFetching, error, fetchedData: userPlaces } = useFetch(fetchUserPlaces, []);
  //
  // All that logic is now inside the useFetch hook!
  //
  // ===========================================================================

  // ===========================================================================
  // CALLING useFetch - Our Custom Hook in Action
  // ===========================================================================
  //
  // useFetch takes two parameters:
  //   1. fetchFn: The function to call for fetching (fetchUserPlaces)
  //   2. initialValue: The initial value for the data ([] for arrays)
  //
  // useFetch returns an object with three properties:
  //   - isFetching: boolean - are we currently loading?
  //   - error: object | undefined - any error that occurred
  //   - fetchedData: the data returned by fetchFn
  //
  // OBJECT DESTRUCTURING WITH ALIAS:
  // ---------------------------------
  // We can rename properties when destructuring using the : syntax:
  //
  //   const { fetchedData: userPlaces } = useFetch(...);
  //         ↑              ↑
  //         │              └── New name we use in this component
  //         └── Original property name from the hook
  //
  // This lets us use a name that makes sense in THIS component (userPlaces)
  // while the hook uses a generic name (fetchedData).
  //
  // WHY PASS [] AS initialValue?
  // ----------------------------
  // Without an initial value, fetchedData would be undefined until the
  // fetch completes. If we try to access userPlaces.length when it's
  // undefined, we get an error: "Cannot read property 'length' of undefined"
  //
  // By passing [] as the initial value, userPlaces starts as an empty array,
  // which safely handles .length, .map(), .filter(), etc.
  //
  // ===========================================================================
  const {
    isFetching,
    error,
    fetchedData: userPlaces,  // Alias: rename fetchedData to userPlaces
  } = useFetch(fetchUserPlaces, []);
  // ===========================================================================
  // HOW STATE WORKS WITH CUSTOM HOOKS
  // ===========================================================================
  //
  // Even though the state (isFetching, error, fetchedData) is created INSIDE
  // the useFetch hook, it BELONGS to this App component!
  //
  // When useFetch calls setIsFetching(true):
  //   1. The state inside the hook updates
  //   2. This App component RE-RENDERS
  //   3. useFetch runs again, returning the new state
  //   4. We see the updated isFetching value
  //
  // It works exactly as if we had written useState directly in App!
  // The hook is just an "extra layer" that manages the logic for us.
  //
  // ===========================================================================

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  // ===========================================================================
  // TEMPORARILY COMMENTED OUT - We'll fix these in the next lesson!
  // ===========================================================================
  //
  // PROBLEM: These functions use setUserPlaces, but we no longer have it!
  //
  // When we used useState directly:
  //   const [userPlaces, setUserPlaces] = useState([]);
  //   ↑ We had setUserPlaces to update the state
  //
  // Now with useFetch:
  //   const { fetchedData: userPlaces } = useFetch(...);
  //   ↑ We only get the DATA, not a setter function!
  //
  // The useFetch hook manages its state internally, but doesn't expose
  // a way to update that state from outside the hook.
  //
  // SOLUTION (coming in next lesson):
  // We need to modify useFetch to also return a setFetchedData function,
  // so we can update the data from the component when needed.
  //
  // For now, we'll comment these out so the app doesn't crash.
  //
  // ===========================================================================

  // async function handleSelectPlace(selectedPlace) {
  //   // Optimistic update - add to UI immediately
  //   setUserPlaces((prevPickedPlaces) => {
  //     if (!prevPickedPlaces) {
  //       prevPickedPlaces = [];
  //     }
  //     if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
  //       return prevPickedPlaces;
  //     }
  //     return [selectedPlace, ...prevPickedPlaces];
  //   });
  //
  //   // Sync with backend
  //   try {
  //     await updateUserPlaces([selectedPlace, ...userPlaces]);
  //   } catch (error) {
  //     // Rollback on error
  //     setUserPlaces(userPlaces);
  //     setErrorUpdatingPlaces({
  //       message: error.message || 'Failed to update places.',
  //     });
  //   }
  // }

  // const handleRemovePlace = useCallback(
  //   async function handleRemovePlace() {
  //     // Optimistic update - remove from UI immediately
  //     setUserPlaces((prevPickedPlaces) =>
  //       prevPickedPlaces.filter(
  //         (place) => place.id !== selectedPlace.current.id
  //       )
  //     );
  //
  //     // Sync with backend
  //     try {
  //       await updateUserPlaces(
  //         userPlaces.filter((place) => place.id !== selectedPlace.current.id)
  //       );
  //     } catch (error) {
  //       // Rollback on error
  //       setUserPlaces(userPlaces);
  //       setErrorUpdatingPlaces({
  //         message: error.message || 'Failed to delete place.',
  //       });
  //     }
  //
  //     setModalIsOpen(false);
  //   },
  //   [userPlaces]
  // );

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <Error
            title="An error occurred!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

      {/* =====================================================================
          TEMPORARILY DISABLED - handleRemovePlace is commented out
          =====================================================================
          We'll re-enable this once we fix the useFetch hook to expose
          a setFetchedData function for updating the data.
          ===================================================================== */}
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={() => setModalIsOpen(false)} // Temporary: just close modal
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <Error title="An error occurred!" message={error.message} />}
        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isLoading={isFetching}
            loadingText="Fetching your places..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        {/* TEMPORARILY DISABLED - handleSelectPlace is commented out */}
        <AvailablePlaces onSelectPlace={() => {}} />
      </main>
    </>
  );
}

export default App;

// =============================================================================
// PREVIEW: WHAT THE CODE WILL LOOK LIKE AFTER CUSTOM HOOKS
// =============================================================================
//
// Before (current - lots of boilerplate):
//
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
//         setError({ message: error.message });
//       }
//       setIsFetching(false);
//     }
//     fetchPlaces();
//   }, []);
//
// After (clean and reusable):
//
//   const {
//     data: userPlaces,
//     isFetching,
//     error,
//     setData: setUserPlaces
//   } = useFetch(fetchUserPlaces, []);
//
// The custom hook encapsulates:
//   - State management (data, loading, error)
//   - The useEffect for fetching
//   - Error handling
//   - The async/await pattern
//
// Components become SIMPLER and focus on their main job: rendering UI.
//
// =============================================================================

// =============================================================================
// CUSTOM HOOKS VS REGULAR FUNCTIONS
// =============================================================================
//
// You might wonder: "Why not just use a regular function?"
//
// Regular functions CAN'T use hooks:
//
//   // ✗ This WON'T work
//   function fetchData(url) {
//     const [data, setData] = useState(null);  // Error! Can't use hooks here
//     useEffect(() => { ... }, []);            // Error! Can't use hooks here
//     return data;
//   }
//
// Custom hooks CAN use hooks:
//
//   // ✓ This WILL work
//   function useFetch(url) {
//     const [data, setData] = useState(null);  // Works! It's a custom hook
//     useEffect(() => { ... }, []);            // Works!
//     return data;
//   }
//
// The "use" prefix tells React: "This function can use hooks."
// It's not just a naming convention - React enforces it!
//
// =============================================================================

// =============================================================================
// HOOKS WE'VE USED SO FAR
// =============================================================================
//
// Built-in hooks in this application:
//
//   useState     - Manage component state
//   useEffect    - Run side effects (data fetching, subscriptions)
//   useRef       - Store mutable values that don't trigger re-renders
//   useCallback  - Memoize functions to prevent unnecessary re-creation
//   useContext   - Access context values (used in other sections)
//   useReducer   - Manage complex state (used in other sections)
//   useMemo      - Memoize expensive calculations (used in other sections)
//
// Now we'll learn to BUILD our own hooks that combine these!
//
// =============================================================================
