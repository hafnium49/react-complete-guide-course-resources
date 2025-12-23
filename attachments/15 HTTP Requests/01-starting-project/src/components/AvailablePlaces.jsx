// =============================================================================
// FETCHING DATA FROM A BACKEND - Complete Loading/Error/Data Pattern
// =============================================================================
// This component demonstrates the COMPLETE pattern for fetching data in React:
//   1. DATA STATE      - The fetched data (places array)
//   2. LOADING STATE   - Are we currently fetching? (boolean)
//   3. ERROR STATE     - Did something go wrong? (Error object or null)
//
// This is THE fundamental pattern for async operations in React!
// Libraries like React Query, SWR, and TanStack Query automate this,
// but understanding the manual approach is essential for learning.
//
// =============================================================================

// =============================================================================
// WHY DO WE NEED ERROR HANDLING?
// =============================================================================
//
// Things can go wrong when fetching data:
//   - Server is down or unreachable
//   - Network connection lost
//   - Server returns an error (404, 500, etc.)
//   - Response is malformed/invalid JSON
//   - Request times out
//
// WITHOUT error handling:
//   - App might crash completely
//   - User sees loading forever
//   - User sees confusing blank state
//   - No way for user to know what went wrong
//
// WITH error handling:
//   - App stays functional
//   - User gets clear error message
//   - User can potentially retry
//   - Better debugging for developers
//
// =============================================================================

// =============================================================================
// THE THREE STATES OF ASYNC OPERATIONS
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │                     ASYNC STATE MACHINE                                 │
//   │                                                                         │
//   │      ┌──────────┐                                                       │
//   │      │   IDLE   │ ──────> Start fetch                                   │
//   │      └──────────┘              │                                        │
//   │                                ▼                                        │
//   │                         ┌──────────┐                                    │
//   │                         │ LOADING  │                                    │
//   │                         └──────────┘                                    │
//   │                          /        \                                     │
//   │                    Success        Failure                               │
//   │                        /            \                                   │
//   │                       ▼              ▼                                  │
//   │               ┌──────────┐    ┌──────────┐                              │
//   │               │ SUCCESS  │    │  ERROR   │                              │
//   │               │(has data)│    │(has err) │                              │
//   │               └──────────┘    └──────────┘                              │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// Our state variables map to this:
//   - isLoading = true   → LOADING state
//   - isLoading = false, error = null, data exists → SUCCESS state
//   - isLoading = false, error exists → ERROR state
//
// =============================================================================

import { useState, useEffect } from 'react';

import Places from './Places.jsx';
// =============================================================================
// IMPORTANT: IMPORTING THE ERROR COMPONENT
// =============================================================================
// We import the Error component AS "ErrorPage" to avoid a naming conflict!
//
// Why? Because "Error" is a GLOBAL built-in JavaScript class:
//
//   const err = new Error('Something went wrong');  // Built-in Error class
//
// If we did: import Error from './Error.jsx';
// Then "Error" in this file would refer to our component, NOT the built-in!
// This would break: throw new Error('message') because Error is now a component.
//
// SAFE:
//   import ErrorPage from './Error.jsx';
//   throw new Error('message');  // Still works - uses built-in Error
//   <ErrorPage title="..." />    // Uses our component
//
// RISKY:
//   import Error from './Error.jsx';
//   throw new Error('message');  // BROKEN! Error is now our component!
//
// This is called "shadowing" - a local variable/import hides a global one.
// Always be careful with names that match JavaScript built-ins!
// =============================================================================
import ErrorPage from './Error.jsx';

// =============================================================================
// AVAILABLE PLACES COMPONENT
// =============================================================================
export default function AvailablePlaces({ onSelectPlace }) {
  // ===========================================================================
  // STATE #1: DATA STATE - The fetched places
  // ===========================================================================
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // ===========================================================================
  // STATE #2: LOADING STATE - Are we currently fetching?
  // ===========================================================================
  const [isFetching, setIsFetching] = useState(false);

  // ===========================================================================
  // STATE #3: ERROR STATE - Did something go wrong?
  // ===========================================================================
  // This state stores any error that occurs during fetching.
  //
  // Initial value: null (or undefined)
  //   - null means "no error has occurred"
  //   - When an error occurs, we store the Error object here
  //
  // The error object typically has:
  //   - error.message: Human-readable error description
  //   - error.name: Error type (e.g., "TypeError", "Error")
  //   - error.stack: Stack trace for debugging
  //
  // We'll use error.message to display to the user.
  // ===========================================================================
  const [error, setError] = useState();

  // ===========================================================================
  // FETCHING DATA WITH ERROR HANDLING
  // ===========================================================================
  useEffect(() => {
    async function fetchPlaces() {
      // -----------------------------------------------------------------------
      // STEP 1: SET LOADING TO TRUE (before fetch)
      // -----------------------------------------------------------------------
      setIsFetching(true);

      // =====================================================================
      // TRY-CATCH BLOCK FOR ERROR HANDLING
      // =====================================================================
      // The try-catch statement lets us handle errors gracefully:
      //
      //   try {
      //     // Code that might throw an error
      //   } catch (error) {
      //     // Handle the error
      //   }
      //
      // If ANY error occurs in the try block:
      //   1. Execution immediately jumps to the catch block
      //   2. The error object is passed to the catch block
      //   3. We can then handle it (log it, show to user, etc.)
      //
      // Without try-catch, an error would:
      //   - Crash the function
      //   - Potentially crash the whole app
      //   - Leave the user with no feedback
      // =====================================================================
      try {
        // ---------------------------------------------------------------------
        // STEP 2: FETCH THE DATA
        // ---------------------------------------------------------------------
        const response = await fetch('http://localhost:3000/places');

        // ===================================================================
        // CHECKING response.ok - CRITICAL FOR HTTP ERRORS!
        // ===================================================================
        // IMPORTANT: fetch() does NOT throw an error for HTTP error codes!
        //
        // This is a common gotcha with the fetch API:
        //
        //   fetch('http://example.com/not-found')  // Returns 404
        //     .then(response => {
        //       // This STILL runs! fetch() "succeeded" (got a response)
        //       // Even though it's a 404 error!
        //     })
        //     .catch(error => {
        //       // This ONLY runs for NETWORK errors
        //       // NOT for 404, 500, or other HTTP errors!
        //     });
        //
        // The fetch() Promise only rejects for:
        //   - Network failures (no internet, DNS error, etc.)
        //   - CORS errors
        //   - Request aborted
        //
        // HTTP errors (4xx, 5xx) are considered "successful" by fetch!
        // The server responded, so fetch() "worked". We must check manually.
        //
        // The response.ok property:
        //   - true for status codes 200-299 (success)
        //   - false for status codes 400-599 (client/server errors)
        //
        // So we check it manually and throw an error if it's false:
        // ===================================================================
        if (!response.ok) {
          // -----------------------------------------------------------------
          // THROWING AN ERROR
          // -----------------------------------------------------------------
          // throw new Error(...) does two things:
          //   1. Creates a new Error object with our message
          //   2. Immediately exits the try block and jumps to catch
          //
          // We create a user-friendly message that explains what happened.
          // This message will be shown to the user via the Error component.
          //
          // You could also include the status code for debugging:
          //   throw new Error(`Failed to fetch places (${response.status})`);
          // -----------------------------------------------------------------
          throw new Error('Failed to fetch places.');
        }

        // ---------------------------------------------------------------------
        // STEP 3: PARSE THE JSON RESPONSE
        // ---------------------------------------------------------------------
        // This can also throw an error if the response isn't valid JSON!
        // Our try-catch will handle that too.
        // ---------------------------------------------------------------------
        const resData = await response.json();

        // ---------------------------------------------------------------------
        // STEP 4: UPDATE DATA STATE (inside try block)
        // ---------------------------------------------------------------------
        // IMPORTANT: This line is INSIDE the try block!
        //
        // Why? Because we only want to update the data if everything succeeded.
        // If we put this outside the try block, it would run even after an error,
        // potentially trying to set invalid/undefined data.
        //
        // The flow on SUCCESS:
        //   1. fetch() succeeds
        //   2. response.ok is true
        //   3. JSON parsing succeeds
        //   4. setAvailablePlaces(resData.places) runs
        //   5. Skip the catch block entirely
        //   6. setIsFetching(false) runs (after try-catch)
        // ---------------------------------------------------------------------
        setAvailablePlaces(resData.places);

      } catch (error) {
        // =====================================================================
        // CATCH BLOCK - HANDLING ERRORS
        // =====================================================================
        // This block runs if ANY error occurs in the try block:
        //   - Network error (fetch failed)
        //   - We threw an error (response.ok was false)
        //   - JSON parsing failed
        //   - Any other unexpected error
        //
        // The 'error' parameter is the Error object that was thrown/caught.
        // It has properties like:
        //   - error.message: "Failed to fetch places." (our message, or system message)
        //   - error.name: "Error"
        //   - error.stack: Stack trace
        // =====================================================================

        // ---------------------------------------------------------------------
        // UPDATING ERROR STATE
        // ---------------------------------------------------------------------
        // We store the error in state so we can display it to the user.
        //
        // We use setError() with an object containing a message property.
        // This ensures we always have a user-friendly message, even if the
        // caught error doesn't have one.
        //
        // The || operator provides a fallback message:
        //   - If error.message exists and is truthy, use it
        //   - Otherwise, use our default message
        //
        // This handles cases like:
        //   - Network error: error.message = "Failed to fetch"
        //   - Our thrown error: error.message = "Failed to fetch places."
        //   - Unknown error: might not have a message, so use fallback
        // ---------------------------------------------------------------------
        setError({
          message: error.message || 'Could not fetch places, please try again later.'
        });

        // Note: We do NOT call setAvailablePlaces here.
        // The places state remains empty ([]) on error.

        // Note: setIsFetching(false) is called AFTER the try-catch block,
        // so it runs whether we succeeded or failed. See below!
      }

      // =====================================================================
      // STEP 5: SET LOADING TO FALSE (after try-catch)
      // =====================================================================
      // IMPORTANT: This line is OUTSIDE the try-catch block!
      //
      // Why? Because we want to set isFetching to false regardless of
      // whether the fetch succeeded or failed.
      //
      // If we put it inside the try block:
      //   - On success: isFetching becomes false ✓
      //   - On error: isFetching stays true forever! ✗
      //
      // If we put it inside the catch block:
      //   - On success: isFetching stays true forever! ✗
      //   - On error: isFetching becomes false ✓
      //
      // By putting it AFTER the try-catch:
      //   - On success: runs after try block → isFetching = false ✓
      //   - On error: runs after catch block → isFetching = false ✓
      //
      // This ensures the loading state is always cleared!
      //
      // Alternative: You could also use finally:
      //   try { ... } catch { ... } finally { setIsFetching(false); }
      //
      // But putting it after works just as well in this case.
      // =====================================================================
      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  // ===========================================================================
  // CONDITIONAL RENDERING: ERROR STATE
  // ===========================================================================
  // If an error occurred, we return EARLY with the ErrorPage component.
  // This prevents rendering the Places component with invalid/empty data.
  //
  // The order of checks matters:
  //   1. Check for error first → show error UI
  //   2. Then render normal UI (which handles loading internally)
  //
  // Why return early instead of conditional JSX?
  //   - Cleaner code: no nested ternaries or complex && chains
  //   - Clear separation of error state from normal state
  //   - ErrorPage replaces the entire component output
  //
  // We pass to ErrorPage:
  //   - title: A brief, user-friendly headline
  //   - message: The error details (from our error state)
  //
  // Note: ErrorPage has an optional onConfirm prop for a button.
  // We're not using it here, but you could add retry functionality:
  //   onConfirm={() => { setError(null); /* refetch */ }}
  // ===========================================================================
  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />;
  }

  // ===========================================================================
  // RENDER: NORMAL STATE (Loading or Data)
  // ===========================================================================
  // If we reach here, there's no error.
  // The Places component handles both loading and data states.
  // ===========================================================================
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      isLoading={isFetching}
      loadingText="Fetching place data..."
    />
  );
}

// =============================================================================
// THE COMPLETE LOADING/ERROR/DATA PATTERN
// =============================================================================
//
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     async function fetchData() {
//       setIsLoading(true);
//
//       try {
//         const response = await fetch(url);
//
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError({ message: error.message || 'Something went wrong' });
//       }
//
//       setIsLoading(false);  // Outside try-catch!
//     }
//     fetchData();
//   }, []);
//
//   // Render based on state
//   if (error) {
//     return <ErrorDisplay message={error.message} />;
//   }
//
//   if (isLoading) {
//     return <Loading />;
//   }
//
//   return <DataDisplay data={data} />;
//
// This pattern is FUNDAMENTAL to React development!
//
// =============================================================================

// =============================================================================
// RENDERING DECISION TREE
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │                                                                         │
//   │    error exists?                                                        │
//   │         │                                                               │
//   │    YES  │  NO                                                           │
//   │    ▼    │                                                               │
//   │ [ErrorPage]                                                             │
//   │         │                                                               │
//   │         ▼                                                               │
//   │    isLoading?                                                           │
//   │         │                                                               │
//   │    YES  │  NO                                                           │
//   │    ▼    │                                                               │
//   │ [Loading text]                                                          │
//   │         │                                                               │
//   │         ▼                                                               │
//   │    places.length > 0?                                                   │
//   │         │                                                               │
//   │    YES  │  NO                                                           │
//   │    ▼    ▼                                                               │
//   │ [Places list]  [Fallback text]                                          │
//   │                                                                         │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// =============================================================================

// =============================================================================
// TESTING ERROR HANDLING
// =============================================================================
//
// To test that error handling works:
//
// 1. STOP THE BACKEND SERVER
//    - Go to the terminal running the backend
//    - Press Ctrl+C to stop it
//    - Reload the page
//    - You should see "An error occurred!" with an error message
//
// 2. CHANGE THE URL TO AN INVALID ENDPOINT
//    - Change 'http://localhost:3000/places' to 'http://localhost:3000/invalid'
//    - The server returns 404
//    - Our response.ok check catches this
//    - You should see the error message
//
// 3. USE BROWSER DEVTOOLS
//    - Open DevTools (F12)
//    - Go to Network tab
//    - Find "places" request
//    - Right-click → Block request URL
//    - Reload the page
//
// Remember to restore the URL and restart the server when done testing!
//
// =============================================================================

// =============================================================================
// COMMON ERROR HANDLING PATTERNS
// =============================================================================
//
// 1. RETRY FUNCTIONALITY
//    Add a button to retry the failed request:
//
//    const [retryCount, setRetryCount] = useState(0);
//    useEffect(() => { fetchData(); }, [retryCount]);
//
//    <ErrorPage
//      onConfirm={() => { setError(null); setRetryCount(c => c + 1); }}
//    />
//
// 2. AUTOMATIC RETRY WITH BACKOFF
//    Retry automatically with increasing delays:
//
//    const delay = Math.min(1000 * Math.pow(2, retryCount), 30000);
//    setTimeout(() => refetch(), delay);
//
// 3. ERROR BOUNDARY (for render errors)
//    Wrap components in ErrorBoundary (see Section 14):
//
//    <ErrorBoundary fallback={<ErrorPage />}>
//      <AvailablePlaces />
//    </ErrorBoundary>
//
// 4. GLOBAL ERROR HANDLING
//    Use Context to manage errors app-wide:
//
//    const { setGlobalError } = useContext(ErrorContext);
//    catch (error) { setGlobalError(error); }
//
// =============================================================================
