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
// THE RULES OF HOOKS
// =============================================================================
//
// Before building custom hooks, let's review the rules:
//
// RULE 1: Only call hooks at the TOP LEVEL
// -----------------------------------------
// ✓ Call hooks at the top of your function component
// ✓ Call hooks at the top of your custom hook
// ✗ Don't call hooks inside loops, conditions, or nested functions
//
//   // ✓ CORRECT
//   function MyComponent() {
//     const [count, setCount] = useState(0);  // Top level
//     useEffect(() => { ... }, []);           // Top level
//   }
//
//   // ✗ WRONG
//   function MyComponent() {
//     if (someCondition) {
//       const [count, setCount] = useState(0);  // Inside condition!
//     }
//   }
//
// WHY? React relies on the ORDER of hook calls to track state.
// If hooks are called conditionally, the order might change between renders,
// and React would get confused about which state belongs to which hook.
//
// RULE 2: Only call hooks from React FUNCTIONS
// ---------------------------------------------
// ✓ Call hooks from function components
// ✓ Call hooks from custom hooks (functions starting with "use")
// ✗ Don't call hooks from regular JavaScript functions
// ✗ Don't call hooks from class components
//
//   // ✓ CORRECT - function component
//   function MyComponent() {
//     const [count, setCount] = useState(0);
//   }
//
//   // ✓ CORRECT - custom hook
//   function useCounter() {
//     const [count, setCount] = useState(0);
//     return count;
//   }
//
//   // ✗ WRONG - regular function
//   function calculateTotal() {
//     const [total, setTotal] = useState(0);  // Not allowed!
//   }
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

import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js';
import Error from './components/Error.jsx';

function App() {
  const selectedPlace = useRef();

  // ===========================================================================
  // OBSERVE: This is the pattern we'll extract into a custom hook!
  // ===========================================================================
  // These three states (data, loading, error) appear together whenever
  // we fetch data. This is a perfect candidate for a custom hook.
  //
  // Current approach:
  //   const [userPlaces, setUserPlaces] = useState([]);
  //   const [isFetching, setIsFetching] = useState(false);
  //   const [error, setError] = useState();
  //
  // After custom hook:
  //   const { data: userPlaces, isFetching, error } = useFetch(fetchUserPlaces);
  //
  // ===========================================================================
  const [userPlaces, setUserPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // ===========================================================================
  // OBSERVE: This useEffect is also part of the pattern to extract
  // ===========================================================================
  // The pattern:
  //   1. Set loading to true
  //   2. Try to fetch data
  //   3. On success: set data
  //   4. On error: set error
  //   5. Set loading to false
  //
  // This EXACT pattern is also in AvailablePlaces.jsx!
  // Perfect for a custom hook.
  // ===========================================================================
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch user places.' });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    // Optimistic update - add to UI immediately
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    // Sync with backend
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      // Rollback on error
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || 'Failed to update places.',
      });
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      // Optimistic update - remove from UI immediately
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      // Sync with backend
      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        // Rollback on error
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: error.message || 'Failed to delete place.',
        });
      }

      setModalIsOpen(false);
    },
    [userPlaces]
  );

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

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
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

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
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
