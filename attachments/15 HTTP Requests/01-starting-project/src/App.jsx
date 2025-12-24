// =============================================================================
// APP COMPONENT - Sending Data to the Backend
// =============================================================================
//
// This lesson introduces SENDING data to a backend, not just fetching it.
//
// Key concepts:
//   1. PUT requests to update data on the server
//   2. Making event handlers async
//   3. State updates are NOT immediately available
//   4. Constructing the updated data manually
//
// =============================================================================

import { useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
// =============================================================================
// IMPORTING THE HTTP UTILITY
// =============================================================================
// We import updateUserPlaces to send the user's selection to the backend.
// This keeps our component clean - the HTTP logic is in http.js.
// =============================================================================
import { updateUserPlaces } from './http.js';

function App() {
  const selectedPlace = useRef();

  // ===========================================================================
  // USER PLACES STATE
  // ===========================================================================
  // This stores the places the user has selected.
  // Currently starts empty, but we'll later fetch saved places from the backend.
  // ===========================================================================
  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  // ===========================================================================
  // HANDLING PLACE SELECTION - WITH BACKEND SYNC
  // ===========================================================================
  // This function is called when the user clicks on an available place.
  // We now:
  //   1. Update the local state (for immediate UI feedback)
  //   2. Send the updated data to the backend (for persistence)
  //
  // =============================================================================
  // MAKING EVENT HANDLERS ASYNC
  // =============================================================================
  // We can make event handler functions async!
  //
  //   function handleClick() { ... }        // Regular function
  //   async function handleClick() { ... }  // Async function - also works!
  //
  // This allows us to use await inside the handler.
  // React doesn't care if your event handler is async or not.
  // It will still work as an event listener.
  //
  // =============================================================================
  async function handleSelectPlace(selectedPlace) {
    // =========================================================================
    // STEP 1: UPDATE LOCAL STATE (Optimistic Update)
    // =========================================================================
    // We update the UI immediately, before the server responds.
    // This is called an "optimistic update" - we optimistically assume
    // the server request will succeed.
    //
    // Benefits:
    //   - Instant feedback for the user
    //   - App feels fast and responsive
    //
    // We'll handle the case where the server fails later in the course.
    // =========================================================================
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    // =========================================================================
    // STEP 2: SEND UPDATED DATA TO BACKEND
    // =========================================================================
    // After updating the state, we send the data to the backend.
    //
    // =========================================================================
    // CRITICAL: STATE UPDATES ARE NOT IMMEDIATELY AVAILABLE!
    // =========================================================================
    // You might think we could do this:
    //
    //   setUserPlaces([selectedPlace, ...userPlaces]);
    //   await updateUserPlaces(userPlaces);  // ❌ WRONG!
    //
    // But this WON'T WORK! Why?
    //
    // State updates in React are SCHEDULED, not instant:
    //
    //   1. setUserPlaces() schedules an update
    //   2. The next line runs BEFORE the state actually updates
    //   3. userPlaces still has the OLD value!
    //
    // Timeline:
    //   ┌─────────────────────────────────────────────────────────────────┐
    //   │ Time →                                                         │
    //   │                                                                 │
    //   │ setUserPlaces() ──► updateUserPlaces(userPlaces) ──► ...       │
    //   │       │                      │                                  │
    //   │       ▼                      ▼                                  │
    //   │  Schedules update       Uses OLD state!                        │
    //   │  (not applied yet)      (new state not available)              │
    //   │                                                                 │
    //   │                    ──► Component re-renders ──►                │
    //   │                              │                                  │
    //   │                              ▼                                  │
    //   │                       New state available                      │
    //   │                       (but too late!)                          │
    //   └─────────────────────────────────────────────────────────────────┘
    //
    // SOLUTION: Manually construct the updated array!
    // We create the same array we're setting in state:
    //   [selectedPlace, ...userPlaces]
    //
    // This ensures we send the CORRECT data to the backend.
    // =========================================================================
    await updateUserPlaces([selectedPlace, ...userPlaces]);

    // =========================================================================
    // WHY THIS WORKS
    // =========================================================================
    // We're not relying on the state update to be complete.
    // Instead, we manually create the updated array:
    //
    //   [selectedPlace, ...userPlaces]
    //
    // This is the SAME logic as in setUserPlaces above:
    //   return [selectedPlace, ...prevPickedPlaces];
    //
    // We're duplicating the logic, but that's okay because it ensures
    // we send the correct data to the backend.
    //
    // Note: The duplicate check (some()) is simplified here because
    // the state update already handles preventing duplicates in the UI.
    // The backend will store whatever we send.
    // =========================================================================
  }

  // ===========================================================================
  // HANDLING PLACE REMOVAL
  // ===========================================================================
  // This is already async (for future backend integration).
  // We'll update this to also sync with the backend later.
  // ===========================================================================
  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    setModalIsOpen(false);
  }, []);

  return (
    <>
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
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;

// =============================================================================
// OPTIMISTIC UPDATES EXPLAINED
// =============================================================================
//
// An "optimistic update" is when you update the UI immediately,
// assuming the server request will succeed.
//
// PATTERN:
//   1. Update state (UI changes immediately)
//   2. Send request to server
//   3. If server fails, revert the state change
//
// BENEFITS:
//   - Instant feedback (app feels fast)
//   - No loading spinners for simple operations
//   - Better user experience
//
// RISKS:
//   - If server fails, UI is temporarily wrong
//   - Need to handle rollback
//
// In this lesson, we're doing step 1 and 2.
// Later, we'll add step 3 (error handling with rollback).
//
// =============================================================================

// =============================================================================
// ASYNC EVENT HANDLERS IN REACT
// =============================================================================
//
// React fully supports async event handlers:
//
//   // These all work:
//   <button onClick={() => handleClick()}>Click</button>
//   <button onClick={handleClick}>Click</button>
//   <button onClick={async () => await handleClick()}>Click</button>
//
//   async function handleClick() {
//     await someAsyncOperation();
//   }
//
// React doesn't await your handler - it just calls it.
// The function runs, and if it's async, it returns a Promise.
// React ignores that Promise (doesn't await it).
//
// This means:
//   - The component doesn't "wait" for the handler to complete
//   - State updates inside the handler still trigger re-renders
//   - Errors in async handlers need to be caught with try-catch
//
// =============================================================================

// =============================================================================
// WHY STATE ISN'T IMMEDIATELY AVAILABLE
// =============================================================================
//
// React batches state updates for performance:
//
//   function handleClick() {
//     setCount(1);
//     console.log(count);  // Still 0! Not 1!
//     setCount(2);
//     console.log(count);  // Still 0! Not 2!
//   }
//
// Both setCount calls are BATCHED into one re-render.
// The new state is only available after the component re-renders.
//
// This is why we have the functional update pattern:
//
//   // ❌ Uses stale state
//   setCount(count + 1);
//   setCount(count + 1);  // Both read same 'count'!
//
//   // ✓ Uses latest state
//   setCount(prev => prev + 1);
//   setCount(prev => prev + 1);  // Each reads updated value
//
// And it's why we manually construct the array for the API call:
//
//   setUserPlaces([selectedPlace, ...userPlaces]);
//   await updateUserPlaces([selectedPlace, ...userPlaces]);  // Same logic!
//
// =============================================================================

// =============================================================================
// BACKEND DATA STORAGE
// =============================================================================
//
// When we call updateUserPlaces(), the backend:
//   1. Receives the PUT request
//   2. Reads the places array from the request body
//   3. Writes the data to data/user-places.json
//   4. Returns a success message
//
// This means:
//   - Data persists even when we reload the page
//   - But we need to FETCH this data on page load (next lesson!)
//   - Currently, on reload, userPlaces starts empty again
//
// We'll fix this by fetching user places when the app loads.
//
// =============================================================================
