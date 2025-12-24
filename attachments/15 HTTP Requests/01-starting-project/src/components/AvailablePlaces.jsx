// =============================================================================
// FETCHING DATA FROM A BACKEND - Using Extracted HTTP Utilities
// =============================================================================
//
// This component demonstrates CLEAN ARCHITECTURE for data fetching:
//
//   BEFORE: All fetch logic was inline in this component
//   AFTER:  Fetch logic is extracted to http.js utility file
//
// Benefits of extraction:
//   - This component is now LEANER and easier to read
//   - HTTP logic is REUSABLE across multiple components
//   - SEPARATION OF CONCERNS: component handles UI, http.js handles fetching
//   - EASIER TESTING: can test HTTP functions independently
//
// =============================================================================

// =============================================================================
// THE REFACTORING WE DID
// =============================================================================
//
// BEFORE (all in this file):
// ---------------------------
//   useEffect(() => {
//     async function fetchPlaces() {
//       setIsFetching(true);
//       try {
//         const response = await fetch('http://localhost:3000/places');  // ┐
//         if (!response.ok) {                                            // │ Moved
//           throw new Error('Failed to fetch places.');                  // │ to
//         }                                                              // │ http.js
//         const resData = await response.json();                         // ┘
//
//         navigator.geolocation.getCurrentPosition((position) => {
//           const sortedPlaces = sortPlacesByDistance(...);
//           setAvailablePlaces(sortedPlaces);
//           setIsFetching(false);
//         });
//       } catch (error) {
//         setError({ message: error.message });
//         setIsFetching(false);
//       }
//     }
//     fetchPlaces();
//   }, []);
//
// AFTER (fetch logic in http.js):
// --------------------------------
//   // In http.js:
//   export async function fetchAvailablePlaces() {
//     const response = await fetch('http://localhost:3000/places');
//     if (!response.ok) throw new Error('Failed to fetch places.');
//     const resData = await response.json();
//     return resData.places;
//   }
//
//   // In this file:
//   useEffect(() => {
//     async function fetchPlaces() {
//       setIsFetching(true);
//       try {
//         const places = await fetchAvailablePlaces();  // Clean!
//         navigator.geolocation.getCurrentPosition((position) => {
//           const sortedPlaces = sortPlacesByDistance(places, ...);
//           setAvailablePlaces(sortedPlaces);
//           setIsFetching(false);
//         });
//       } catch (error) {
//         setError({ message: error.message });
//         setIsFetching(false);
//       }
//     }
//     fetchPlaces();
//   }, []);
//
// =============================================================================

import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
// =============================================================================
// IMPORTING THE HTTP UTILITY FUNCTION
// =============================================================================
// We import our newly created utility function from http.js.
//
// This function:
//   - Sends the GET request to http://localhost:3000/places
//   - Checks response.ok and throws if not successful
//   - Parses the JSON response
//   - Returns the places array
//
// All that complexity is now hidden behind a simple function call!
// Our component just calls it and handles the result.
//
// If we need to fetch places in another component, we can reuse this
// same function without duplicating the fetch logic.
// =============================================================================
import { fetchAvailablePlaces } from '../http.js';

// =============================================================================
// AVAILABLE PLACES COMPONENT
// =============================================================================
export default function AvailablePlaces({ onSelectPlace }) {
  // ===========================================================================
  // STATE: Data, Loading, Error
  // ===========================================================================
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  // ===========================================================================
  // DATA FETCHING WITH EXTRACTED HTTP UTILITY
  // ===========================================================================
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        // =====================================================================
        // CALLING THE EXTRACTED HTTP UTILITY
        // =====================================================================
        // Instead of writing the fetch logic here, we simply call our
        // utility function. This makes the code much cleaner!
        //
        // fetchAvailablePlaces():
        //   - Is an async function (defined in http.js)
        //   - Returns a Promise that resolves to the places array
        //   - May throw an error (which we catch below)
        //
        // We still use await because it returns a Promise.
        // We still wrap it in try-catch because it may throw errors.
        //
        // The try-catch here catches errors from fetchAvailablePlaces:
        //   - Network errors (fetch failed)
        //   - HTTP errors (we throw when response.ok is false)
        //   - JSON parsing errors
        //
        // Even though the throw happens in http.js, it propagates here
        // because async functions return Promises, and thrown errors
        // reject those Promises.
        // =====================================================================
        const places = await fetchAvailablePlaces();

        // =====================================================================
        // USING THE RETURNED DATA
        // =====================================================================
        // Now 'places' contains our array of places directly!
        //
        // Before extraction:
        //   const resData = await response.json();
        //   ... use resData.places ...
        //
        // After extraction:
        //   const places = await fetchAvailablePlaces();
        //   ... use places directly ...
        //
        // The http.js function handles extracting .places from the response,
        // so we get exactly what we need here.
        // =====================================================================

        // Get user's location and sort places by distance
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,  // Using 'places' instead of 'resData.places'
            position.coords.latitude,
            position.coords.longitude
          );

          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });

      } catch (error) {
        // =====================================================================
        // ERROR HANDLING
        // =====================================================================
        // This catch block handles errors from fetchAvailablePlaces().
        //
        // The error object might contain:
        //   - error.message: "Failed to fetch places." (our custom message)
        //   - error.message: "Failed to fetch" (network error)
        //   - error.message: Some JSON parsing error message
        //
        // Whatever the error, we store it and display it to the user.
        // =====================================================================
        setError({
          message: error.message || 'Could not fetch places, please try again later.'
        });
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  // ===========================================================================
  // CONDITIONAL RENDERING
  // ===========================================================================
  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />;
  }

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
// COMPONENT RESPONSIBILITIES AFTER REFACTORING
// =============================================================================
//
// This component now focuses on:
//   1. Managing UI state (loading, error, data)
//   2. Orchestrating the data flow (fetch → sort → display)
//   3. Rendering the appropriate UI
//
// It delegates to:
//   - http.js: Handling HTTP request details
//   - loc.js: Handling distance calculations
//   - Places.jsx: Rendering the places list
//   - Error.jsx: Rendering error states
//
// This is called "Separation of Concerns" - each file has one job.
//
// =============================================================================

// =============================================================================
// THE POWER OF ABSTRACTION
// =============================================================================
//
// By extracting fetchAvailablePlaces to http.js, we created an ABSTRACTION.
//
// Abstraction hides complexity behind a simple interface:
//
//   COMPLEX (hidden in http.js):
//     - Constructing the fetch request
//     - Handling response.ok check
//     - Parsing JSON
//     - Extracting .places from response
//
//   SIMPLE (exposed to this component):
//     const places = await fetchAvailablePlaces();
//
// The component doesn't need to know HOW places are fetched.
// It just needs to know WHAT it gets back: an array of places.
//
// This is a fundamental programming principle!
//
// =============================================================================

// =============================================================================
// WHEN TO EXTRACT CODE
// =============================================================================
//
// Consider extracting code when:
//
//   1. CODE IS REUSED
//      - Same fetch logic needed in multiple components
//      - Same calculations done in multiple places
//
//   2. CODE IS COMPLEX
//      - Makes the component hard to read
//      - Has multiple steps or conditions
//
//   3. CODE HAS DIFFERENT CONCERNS
//      - HTTP logic vs UI logic vs business logic
//      - Each concern can be its own file
//
//   4. CODE NEEDS INDEPENDENT TESTING
//      - Unit test the utility without component overhead
//
// Don't over-extract! Simple, one-off code can stay in the component.
// Extract when there's a clear benefit.
//
// =============================================================================

// =============================================================================
// FILE STRUCTURE AFTER REFACTORING
// =============================================================================
//
//   src/
//   ├── components/
//   │   ├── AvailablePlaces.jsx  ← UI component (this file)
//   │   ├── Places.jsx           ← Presentational component
//   │   ├── Error.jsx            ← Error display component
//   │   └── ...
//   ├── http.js                  ← HTTP utility functions (NEW!)
//   ├── loc.js                   ← Location/distance utilities
//   └── App.jsx                  ← Main app component
//
// This structure separates:
//   - Components (UI) in components/
//   - Utilities (logic) in root src/
//
// As the app grows, you might further organize:
//   src/
//   ├── components/
//   ├── utils/
//   │   ├── http.js
//   │   └── loc.js
//   ├── hooks/         ← Custom hooks (coming later!)
//   └── ...
//
// =============================================================================
