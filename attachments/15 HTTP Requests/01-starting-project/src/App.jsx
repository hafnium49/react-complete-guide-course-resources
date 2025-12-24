// =============================================================================
// APP COMPONENT - Complete CRUD Operations with Optimistic Updates
// =============================================================================
//
// This component now handles BOTH adding AND removing places:
//   - handleSelectPlace: Add a place (optimistic update + backend sync)
//   - handleRemovePlace: Remove a place (optimistic update + backend sync)
//
// Both use the same pattern:
//   1. Update UI immediately (optimistic)
//   2. Send request to backend
//   3. If error: rollback + show error message
//
// =============================================================================

import { useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import ErrorPage from './components/Error.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { updateUserPlaces } from './http.js';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

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
  // CLEARING THE ERROR
  // ===========================================================================
  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  // ===========================================================================
  // HANDLING PLACE REMOVAL - DELETE PLACE (Optimistic Update)
  // ===========================================================================
  // This function handles removing a place from the user's selection.
  // It follows the SAME optimistic update pattern as handleSelectPlace:
  //   1. Update UI immediately
  //   2. Send request to backend
  //   3. Rollback + show error if it fails
  //
  // =============================================================================
  // WHY useCallback?
  // =============================================================================
  // This function is passed to DeleteConfirmation as `onConfirm`.
  // useCallback prevents unnecessary re-creation of the function,
  // which could cause child components to re-render unnecessarily.
  //
  // =============================================================================
  // IMPORTANT: DEPENDENCY ARRAY
  // =============================================================================
  // We now use `userPlaces` inside this function (for the backend request).
  // Therefore, `userPlaces` MUST be in the dependency array!
  //
  //   const handleRemovePlace = useCallback(async function () {
  //     await updateUserPlaces(userPlaces.filter(...));  // Uses userPlaces!
  //   }, [userPlaces]);  // ← Must include userPlaces!
  //
  // Without this dependency:
  //   - The function would be created once with the initial userPlaces value
  //   - It would never see updated userPlaces values
  //   - We'd send stale/incorrect data to the backend!
  //
  // With this dependency:
  //   - The function is recreated whenever userPlaces changes
  //   - It always has access to the current userPlaces value
  //   - We send the correct data to the backend ✓
  //
  // This is the trade-off with useCallback:
  //   - Prevents unnecessary function recreation
  //   - BUT you must carefully track dependencies
  // =============================================================================
  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      // =========================================================================
      // STEP 1: OPTIMISTIC UPDATE - Remove from UI immediately
      // =========================================================================
      // We update the state BEFORE the backend request completes.
      // The user sees the place disappear instantly.
      // =========================================================================
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      // Close the confirmation modal
      setModalIsOpen(false);

      // =========================================================================
      // STEP 2: SYNC WITH BACKEND
      // =========================================================================
      // We send the updated places array to the backend.
      //
      // Notice we're using the SAME filter logic here as in setUserPlaces above.
      // We filter out the place with the matching ID.
      //
      // Why duplicate the logic?
      //   - setUserPlaces uses the function form (gets latest state)
      //   - updateUserPlaces needs the actual array to send
      //   - We can't use the state right after setting it (not immediate!)
      //
      // So we construct the filtered array the same way:
      //   userPlaces.filter(place => place.id !== selectedPlace.current.id)
      // =========================================================================
      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        // =======================================================================
        // STEP 3: ROLLBACK ON ERROR
        // =======================================================================
        // If the backend request fails, we need to:
        //   1. Restore the UI to its previous state (rollback)
        //   2. Inform the user about the error
        //
        // We use the captured `userPlaces` value (from before the optimistic
        // update) to restore the state.
        // =======================================================================
        setUserPlaces(userPlaces);
        setErrorUpdatingPlaces({
          message: error.message || 'Failed to delete place.'
        });
      }
    },
    [userPlaces] // ← CRITICAL: userPlaces is used inside, so it's a dependency!
  );

  return (
    <>
      {/* Error Modal */}
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
// COMPARING ADD VS REMOVE - SAME PATTERN!
// =============================================================================
//
// ADD PLACE (handleSelectPlace):
// ------------------------------
//   1. setUserPlaces([newPlace, ...prevPlaces])     // Optimistic: add to UI
//   2. await updateUserPlaces([newPlace, ...old])   // Sync with backend
//   3. catch → setUserPlaces(oldPlaces)             // Rollback on error
//
// REMOVE PLACE (handleRemovePlace):
// ---------------------------------
//   1. setUserPlaces(prev.filter(notThisPlace))     // Optimistic: remove from UI
//   2. await updateUserPlaces(old.filter(...))      // Sync with backend
//   3. catch → setUserPlaces(oldPlaces)             // Rollback on error
//
// The PATTERN is identical! Only the state transformation differs:
//   - Add: [newItem, ...existingItems]
//   - Remove: existingItems.filter(item => item.id !== targetId)
//
// =============================================================================

// =============================================================================
// useCallback DEPENDENCIES EXPLAINED
// =============================================================================
//
// When you use values inside a useCallback function, you must list them
// as dependencies. React needs to know when to recreate the function.
//
// RULE: If a value can change and is used inside the callback, it's a dependency.
//
//   const [count, setCount] = useState(0);
//   const [name, setName] = useState('');
//
//   // Uses count → count is a dependency
//   const handleClick = useCallback(() => {
//     console.log(count);
//   }, [count]);
//
//   // Uses name → name is a dependency
//   const handleSubmit = useCallback(() => {
//     console.log(name);
//   }, [name]);
//
//   // Uses both → both are dependencies
//   const handleBoth = useCallback(() => {
//     console.log(count, name);
//   }, [count, name]);
//
// WHAT ABOUT REFS?
//   - Refs (like selectedPlace) don't need to be dependencies
//   - The ref object itself never changes (same reference)
//   - Only ref.current changes, and that's always the latest value
//
// WHAT ABOUT SET FUNCTIONS?
//   - setState functions (like setUserPlaces) don't need to be dependencies
//   - React guarantees they're stable (same reference across renders)
//
// =============================================================================

// =============================================================================
// WHAT'S STILL MISSING?
// =============================================================================
//
// We can now:
//   ✓ Add places (with backend sync)
//   ✓ Remove places (with backend sync)
//   ✓ Handle errors with rollback
//
// But we're still missing:
//   ✗ FETCHING saved places when the app loads!
//
// Currently, userPlaces starts as an empty array:
//   const [userPlaces, setUserPlaces] = useState([]);
//
// Even if the backend has saved places, we don't fetch them.
// On page reload, the "I'd like to visit" section is always empty.
//
// Next lesson: We'll fetch user places on component mount!
//
// =============================================================================

// =============================================================================
// THE COMPLETE CRUD PATTERN
// =============================================================================
//
// CRUD = Create, Read, Update, Delete
//
// In this app:
//   - Create/Update: handleSelectPlace (adds a place)
//   - Delete: handleRemovePlace (removes a place)
//   - Read: Coming next lesson! (fetch on load)
//
// All mutations (Create, Update, Delete) follow the optimistic pattern:
//   1. Update UI optimistically
//   2. Sync with backend
//   3. Rollback on error
//
// Reads (fetching data) use the loading/error/data pattern:
//   1. Set loading state
//   2. Fetch data
//   3. Handle success or error
//   4. Clear loading state
//
// =============================================================================
