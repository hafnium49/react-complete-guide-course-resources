// =============================================================================
// APP COMPONENT - Complete CRUD with Data Fetching on Load
// =============================================================================
//
// This is the FINISHED application! It now handles:
//
//   ✓ READ:   Fetch user places when app loads (useEffect)
//   ✓ CREATE: Add new places (optimistic update)
//   ✓ DELETE: Remove places (optimistic update)
//   ✓ ERRORS: Handle and display errors with rollback
//
// The complete data flow:
//   1. App loads → fetch user's saved places from backend
//   2. User adds a place → update UI + sync to backend
//   3. User removes a place → update UI + sync to backend
//   4. Page reload → fetch places again (data persists!)
//
// =============================================================================

import { useRef, useState, useEffect, useCallback } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import ErrorPage from './components/Error.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
// =============================================================================
// IMPORTING HTTP UTILITIES
// =============================================================================
// We now import TWO functions:
//   - fetchUserPlaces: GET user's saved places on load
//   - updateUserPlaces: PUT updated places when adding/removing
// =============================================================================
import { fetchUserPlaces, updateUserPlaces } from './http.js';

function App() {
  const selectedPlace = useRef();

  // ===========================================================================
  // STATE MANAGEMENT - THE THREE STATES FOR ASYNC OPERATIONS
  // ===========================================================================
  // Just like in AvailablePlaces, we need three states for fetching data:
  //
  //   1. DATA STATE (userPlaces) - The fetched places array
  //   2. LOADING STATE (isFetching) - Are we currently fetching?
  //   3. ERROR STATE (error) - Did something go wrong?
  //
  // This is the SAME pattern we used in AvailablePlaces!
  // The pattern is universal for any async data fetching in React.
  // ===========================================================================
  const [userPlaces, setUserPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  // This error state is specifically for UPDATE errors (add/remove)
  // It's separate from the fetch error state
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  // ===========================================================================
  // FETCHING USER PLACES ON COMPONENT MOUNT
  // ===========================================================================
  // We use useEffect to fetch data when the component first renders.
  //
  // WHY useEffect?
  // --------------
  // 1. We want to fetch data when the component mounts (first render)
  // 2. We need to update state after fetching (triggers re-render)
  // 3. Without useEffect, state updates would cause infinite loop!
  //
  // THE PATTERN:
  // ------------
  //   useEffect(() => {
  //     async function fetchData() {
  //       setLoading(true);
  //       try {
  //         const data = await fetchFromServer();
  //         setData(data);
  //       } catch (error) {
  //         setError(error);
  //       }
  //       setLoading(false);
  //     }
  //     fetchData();
  //   }, []);  // Empty array = run once on mount
  //
  // ===========================================================================
  useEffect(() => {
    // -------------------------------------------------------------------------
    // ASYNC FUNCTION INSIDE useEffect
    // -------------------------------------------------------------------------
    // We define an async function inside and call it immediately.
    // This is because useEffect's callback can't be async directly.
    //
    // Why? useEffect expects either:
    //   - No return value
    //   - A cleanup function
    //
    // But async functions always return a Promise, which would confuse React.
    // So we create an inner async function and call it immediately.
    // -------------------------------------------------------------------------
    async function fetchPlaces() {
      // -----------------------------------------------------------------------
      // START LOADING
      // -----------------------------------------------------------------------
      setIsFetching(true);

      // -----------------------------------------------------------------------
      // FETCH WITH ERROR HANDLING
      // -----------------------------------------------------------------------
      try {
        // Call our HTTP utility function
        const places = await fetchUserPlaces();

        // Success! Update the data state
        setUserPlaces(places);
      } catch (error) {
        // Something went wrong - store the error
        setError({ message: error.message || 'Failed to fetch user places.' });
      }

      // -----------------------------------------------------------------------
      // STOP LOADING (after try-catch)
      // -----------------------------------------------------------------------
      // We put this AFTER the try-catch block (not inside) so it runs
      // whether the fetch succeeded or failed.
      //
      // Unlike in AvailablePlaces (which had getCurrentPosition callback),
      // here we don't have nested async operations, so one setIsFetching(false)
      // after try-catch is sufficient.
      // -----------------------------------------------------------------------
      setIsFetching(false);
    }

    // Execute the async function
    fetchPlaces();
  }, []); // Empty dependency array = run once when component mounts

  // ===========================================================================
  // WHY EMPTY DEPENDENCY ARRAY?
  // ===========================================================================
  // The dependency array [] means this effect runs ONCE when the component
  // mounts, and never again (unless the component unmounts and remounts).
  //
  // This is exactly what we want for initial data fetching:
  //   - Fetch when the app loads
  //   - Don't re-fetch on every render
  //   - Don't re-fetch when state changes
  //
  // If we wanted to re-fetch based on some condition (like a refresh button),
  // we could add a state variable to the dependencies:
  //
  //   const [refreshKey, setRefreshKey] = useState(0);
  //   useEffect(() => { fetchPlaces(); }, [refreshKey]);
  //
  //   // To trigger refresh:
  //   <button onClick={() => setRefreshKey(prev => prev + 1)}>Refresh</button>
  //
  // ===========================================================================

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  // ===========================================================================
  // HANDLING PLACE SELECTION - ADD PLACE (Optimistic Update)
  // ===========================================================================
  async function handleSelectPlace(selectedPlace) {
    // Optimistic update - add place to UI immediately
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
        message: error.message || 'Failed to update places.'
      });
    }
  }

  // ===========================================================================
  // CLEARING THE UPDATE ERROR
  // ===========================================================================
  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  // ===========================================================================
  // HANDLING PLACE REMOVAL - DELETE PLACE (Optimistic Update)
  // ===========================================================================
  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      // Optimistic update - remove from UI immediately
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      setModalIsOpen(false);

      // Sync with backend
      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        // Rollback on error
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: error.message || 'Failed to delete place.'
        });
      }
    },
    [userPlaces]
  );

  return (
    <>
      {/* Error Modal for Update Failures */}
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <ErrorPage
            title="An error occurred!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
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
        {/* ===================================================================
            CONDITIONAL RENDERING: ERROR vs PLACES
            ===================================================================
            If there's an error fetching places, show the error component.
            Otherwise, show the Places component.

            This is the standard pattern:
              {error && <ErrorComponent />}
              {!error && <DataComponent />}

            Or using ternary:
              {error ? <ErrorComponent /> : <DataComponent />}
            =================================================================== */}
        {error && (
          <ErrorPage title="An error occurred!" message={error.message} />
        )}

        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
            // ===============================================================
            // LOADING STATE PROPS
            // ===============================================================
            // We pass loading state to the Places component just like we did
            // in AvailablePlaces. This shows "Fetching your places..." while
            // the data is being loaded from the backend.
            //
            // The Places component handles this internally:
            //   - If isLoading is true → show loadingText
            //   - If isLoading is false and places is empty → show fallbackText
            //   - If isLoading is false and places exist → show the places
            // ===============================================================
            isLoading={isFetching}
            loadingText="Fetching your places..."
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;

// =============================================================================
// THE COMPLETE APPLICATION - SUMMARY
// =============================================================================
//
// DATA FLOW:
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │                         APP STARTUP                                     │
//   │                                                                         │
//   │   Component mounts                                                      │
//   │         │                                                               │
//   │         ▼                                                               │
//   │   useEffect runs                                                        │
//   │         │                                                               │
//   │         ▼                                                               │
//   │   setIsFetching(true) ──► UI shows "Fetching your places..."            │
//   │         │                                                               │
//   │         ▼                                                               │
//   │   fetchUserPlaces() ──► Backend: GET /user-places                       │
//   │         │                                                               │
//   │    ┌────┴────┐                                                          │
//   │    ▼         ▼                                                          │
//   │ Success   Error                                                         │
//   │    │         │                                                          │
//   │    ▼         ▼                                                          │
//   │ setUserPlaces(data)   setError(err)                                     │
//   │    │         │                                                          │
//   │    ▼         ▼                                                          │
//   │ UI shows places   UI shows error                                        │
//   │    │         │                                                          │
//   │    └────┬────┘                                                          │
//   │         ▼                                                               │
//   │   setIsFetching(false)                                                  │
//   └─────────────────────────────────────────────────────────────────────────┘
//
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │                      USER ADDS A PLACE                                  │
//   │                                                                         │
//   │   User clicks available place                                           │
//   │         │                                                               │
//   │         ▼                                                               │
//   │   setUserPlaces([new, ...old]) ──► UI updates instantly                 │
//   │         │                                                               │
//   │         ▼                                                               │
//   │   updateUserPlaces() ──► Backend: PUT /user-places                      │
//   │         │                                                               │
//   │    ┌────┴────┐                                                          │
//   │    ▼         ▼                                                          │
//   │ Success   Error                                                         │
//   │    │         │                                                          │
//   │    ▼         ▼                                                          │
//   │ (done)    setUserPlaces(old) ← Rollback!                                │
//   │              │                                                          │
//   │              ▼                                                          │
//   │         Show error modal                                                │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// =============================================================================

// =============================================================================
// TWO TYPES OF ERROR STATES
// =============================================================================
//
// We have TWO separate error states in this component:
//
//   1. error (for FETCH errors)
//      - Set when initial data fetch fails
//      - Shows error in place of the Places component
//      - Blocking: user can't use the app until fixed
//
//   2. errorUpdatingPlaces (for UPDATE errors)
//      - Set when add/remove operations fail
//      - Shows error in a modal (can be dismissed)
//      - Non-blocking: user can dismiss and keep using the app
//
// Why separate?
//   - Different severity (blocking vs non-blocking)
//   - Different UI treatment (inline vs modal)
//   - Different recovery patterns (reload vs retry)
//
// =============================================================================

// =============================================================================
// THE COMPLETE HTTP.JS API
// =============================================================================
//
// Our http.js file now has three functions:
//
//   fetchAvailablePlaces()
//     - GET /places
//     - Returns all available places
//     - Used by AvailablePlaces component
//
//   fetchUserPlaces()
//     - GET /user-places
//     - Returns user's saved places
//     - Used by App component on mount
//
//   updateUserPlaces(places)
//     - PUT /user-places
//     - Saves user's places to backend
//     - Used by App for add/remove operations
//
// This gives us complete CRUD operations:
//   - Create/Update: updateUserPlaces (PUT)
//   - Read: fetchUserPlaces, fetchAvailablePlaces (GET)
//   - Delete: updateUserPlaces with filtered array (PUT)
//
// =============================================================================
