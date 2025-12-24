// =============================================================================
// APP COMPONENT - Optimistic Updating with Error Handling
// =============================================================================
//
// This lesson covers OPTIMISTIC UPDATING with proper error handling:
//
//   1. Update UI immediately (optimistic)
//   2. Send request to backend
//   3. If error occurs: ROLLBACK the UI change + show error message
//
// This provides the best of both worlds:
//   - Fast, responsive UI (no loading spinners)
//   - Proper error feedback if something goes wrong
//
// =============================================================================

import { useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
// =============================================================================
// IMPORTING THE ERROR COMPONENT
// =============================================================================
// We use ErrorPage (renamed on import) to show error messages in a modal.
// Remember: We rename it to avoid shadowing the global Error class.
// =============================================================================
import ErrorPage from './components/Error.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { updateUserPlaces } from './http.js';

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // ===========================================================================
  // ERROR STATE FOR UPDATE OPERATIONS
  // ===========================================================================
  // This state tracks errors that occur when UPDATING user places.
  // It's separate from the modal state because:
  //   - We have multiple modals (delete confirmation + error)
  //   - Each needs its own open/close logic
  //
  // When errorUpdatingPlaces has a value (is truthy), we show the error modal.
  // When it's null/undefined (falsy), the error modal is hidden.
  // ===========================================================================
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  // ===========================================================================
  // HANDLING PLACE SELECTION - OPTIMISTIC UPDATE WITH ROLLBACK
  // ===========================================================================
  async function handleSelectPlace(selectedPlace) {
    // =========================================================================
    // STEP 1: UPDATE LOCAL STATE IMMEDIATELY (Optimistic Update)
    // =========================================================================
    // We update the UI BEFORE sending the request.
    // The user sees instant feedback - the place appears in their list.
    //
    // Why is this better than showing a loading spinner?
    //   - Feels instant and responsive
    //   - No "waiting" experience for the user
    //   - Most of the time, the request will succeed anyway
    //
    // The risk: If the request fails, the UI will be temporarily wrong.
    // Solution: We ROLLBACK the change if an error occurs (see catch block).
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
    // STEP 2: SEND REQUEST WITH ERROR HANDLING
    // =========================================================================
    // We wrap the HTTP call in try-catch to handle potential errors.
    // =========================================================================
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      // =======================================================================
      // ROLLBACK: REVERT THE STATE CHANGE
      // =======================================================================
      // If the request fails, we need to UNDO the optimistic update.
      // We set the state back to what it was BEFORE we added the new place.
      //
      // IMPORTANT: We use `userPlaces` directly here, NOT the function form!
      //
      //   setUserPlaces(userPlaces);            // ✓ Uses the OLD state value
      //   setUserPlaces(prev => prev...);       // ✗ Would use the NEW state
      //
      // Why? Because we WANT the old value (before the optimistic update).
      // The function form would give us the current state, which includes
      // the place we just (optimistically) added.
      //
      // This is one of the rare cases where NOT using the function form
      // is intentional and correct!
      // =======================================================================
      setUserPlaces(userPlaces);

      // =======================================================================
      // SET ERROR STATE TO SHOW ERROR MODAL
      // =======================================================================
      // Besides rolling back, we also want to INFORM the user what happened.
      // Otherwise, the place would just mysteriously disappear from their list
      // with no explanation - very confusing!
      //
      // We store the error in state, which will trigger the error modal to open.
      // =======================================================================
      setErrorUpdatingPlaces({
        message: error.message || 'Failed to update places.'
      });
    }
  }

  // ===========================================================================
  // ALTERNATIVE APPROACH: NON-OPTIMISTIC UPDATE (Commented Out)
  // ===========================================================================
  // Instead of optimistic updating, you COULD wait for the request to complete
  // before updating the UI:
  //
  //   async function handleSelectPlace(selectedPlace) {
  //     try {
  //       await updateUserPlaces([selectedPlace, ...userPlaces]);  // Wait first
  //       setUserPlaces([selectedPlace, ...userPlaces]);           // Then update UI
  //     } catch (error) {
  //       setErrorUpdatingPlaces({ message: error.message });
  //     }
  //   }
  //
  // PROS: No need for rollback (state only changes on success)
  // CONS: User has to wait - should show loading spinner/text
  //
  // Which approach to use depends on:
  //   - How fast is the operation typically?
  //   - How bad is it if the UI is temporarily wrong?
  //   - What user experience do you want?
  //
  // For most update operations, optimistic updating feels better.
  // ===========================================================================

  // ===========================================================================
  // CLEARING THE ERROR
  // ===========================================================================
  // This function is called when the user dismisses the error modal.
  // We simply clear the error state, which hides the modal.
  // ===========================================================================
  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    setModalIsOpen(false);
  }, []);

  return (
    <>
      {/* ===================================================================
          ERROR MODAL FOR UPDATE FAILURES
          ===================================================================
          This modal shows when an error occurs while updating user places.

          open={errorUpdatingPlaces}
            - The modal opens when errorUpdatingPlaces is truthy (has a value)
            - It closes when errorUpdatingPlaces is falsy (null/undefined)

          onClose={handleError}
            - Called when user presses Escape or clicks backdrop
            - Clears the error, which closes the modal
          =================================================================== */}
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {/* =================================================================
            CONDITIONAL RENDERING OF ERROR COMPONENT
            =================================================================
            IMPORTANT: We render ErrorPage CONDITIONALLY with &&

            Why? Because the Modal component is ALWAYS in the DOM,
            even when it's not visible. The `open` prop just controls
            visibility (CSS), not whether it's rendered.

            If we always rendered <ErrorPage message={errorUpdatingPlaces.message} />:
              - When errorUpdatingPlaces is null, we'd try to access null.message
              - This would cause a runtime error!

            By using: {errorUpdatingPlaces && <ErrorPage ... />}
              - When errorUpdatingPlaces is null/undefined, nothing renders
              - When errorUpdatingPlaces has a value, ErrorPage renders

            This is a common pattern when rendering content conditionally
            inside always-present wrapper components.
            ================================================================= */}
        {errorUpdatingPlaces && (
          <ErrorPage
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
// OPTIMISTIC UPDATING - THE COMPLETE PATTERN
// =============================================================================
//
//   async function handleUpdate(newData) {
//     const previousData = currentData;  // Save current state for rollback
//
//     // STEP 1: Optimistic update (immediate UI change)
//     setState(newData);
//
//     try {
//       // STEP 2: Send request to server
//       await sendToServer(newData);
//       // Success! State is already correct.
//     } catch (error) {
//       // STEP 3: Rollback on failure
//       setState(previousData);
//
//       // STEP 4: Inform the user
//       setError({ message: error.message });
//     }
//   }
//
// This pattern is used by:
//   - Social media likes/unlikes
//   - Todo list checkboxes
//   - Shopping cart additions
//   - Any quick user action
//
// =============================================================================

// =============================================================================
// WHY NOT USE THE FUNCTION FORM FOR ROLLBACK?
// =============================================================================
//
// Normally, we use the function form for state updates:
//   setUserPlaces(prev => [...prev, newPlace]);
//
// But for ROLLBACK, we intentionally DON'T use it:
//   setUserPlaces(userPlaces);  // Use the OLD captured value
//
// Here's why:
//
//   1. Before optimistic update: userPlaces = [A, B]
//   2. Optimistic update: setUserPlaces(prev => [C, ...prev])
//      Now internal state is [C, A, B]
//   3. Request fails...
//   4. Rollback: setUserPlaces(userPlaces)
//      userPlaces still refers to [A, B] (closure captured it)
//      State is restored to [A, B] ✓
//
// If we used the function form:
//   setUserPlaces(prev => prev)
//   prev would be [C, A, B] (the current/new state)
//   We'd be setting it to itself - no rollback! ✗
//
// This is a rare but intentional use of stale closure values.
//
// =============================================================================

// =============================================================================
// WHEN TO USE OPTIMISTIC UPDATES VS LOADING STATES
// =============================================================================
//
// USE OPTIMISTIC UPDATES when:
//   ✓ The operation is usually fast and reliable
//   ✓ The UI change is easily reversible
//   ✓ It's okay to briefly show incorrect state
//   ✓ Examples: likes, favorites, toggles, quick edits
//
// USE LOADING STATES when:
//   ✓ The operation takes noticeable time
//   ✓ You're fetching data that doesn't exist yet
//   ✓ The user needs to know something is happening
//   ✓ Examples: initial data fetch, file uploads, complex operations
//
// YOU CAN COMBINE BOTH:
//   - Optimistic update for immediate feedback
//   - Show subtle loading indicator (spinner in button, etc.)
//   - Handle errors with rollback
//
// =============================================================================

// =============================================================================
// ERROR DISPLAY OPTIONS
// =============================================================================
//
// There are many ways to show errors to users:
//
// 1. MODAL (what we're using)
//    - Demands attention
//    - Good for important errors
//    - User must acknowledge
//
// 2. TOAST/NOTIFICATION
//    - Non-blocking
//    - Auto-dismisses
//    - Good for recoverable errors
//
// 3. INLINE ERROR
//    - Shows near the action that failed
//    - Contextual
//    - Good for form validation
//
// 4. BANNER/ALERT
//    - Persistent until dismissed
//    - Good for system-wide issues
//
// Choose based on error severity and user experience needs.
//
// =============================================================================
