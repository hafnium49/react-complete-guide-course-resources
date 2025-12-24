// =============================================================================
// FETCHING DATA FROM A BACKEND - Complete Loading/Error/Data Pattern
// =============================================================================
// This component demonstrates the COMPLETE pattern for fetching data in React:
//   1. DATA STATE      - The fetched data (places array)
//   2. LOADING STATE   - Are we currently fetching? (boolean)
//   3. ERROR STATE     - Did something go wrong? (Error object or null)
//
// NEW IN THIS LESSON: Sorting places by distance to user's location!
//   - Using the browser's Geolocation API
//   - Callback pattern vs async/await
//   - Chaining async operations
//
// =============================================================================

// =============================================================================
// CALLBACK PATTERN VS ASYNC/AWAIT
// =============================================================================
//
// Not all async APIs use Promises! Some use the older "callback pattern":
//
// PROMISE-BASED (can use async/await):
//   const response = await fetch(url);        // Returns a Promise
//   const data = await response.json();       // Returns a Promise
//
// CALLBACK-BASED (cannot use async/await):
//   navigator.geolocation.getCurrentPosition(
//     (position) => { /* success callback */ },
//     (error) => { /* error callback */ }
//   );
//
// The Geolocation API is callback-based, NOT promise-based.
// This means we CANNOT use await with it:
//
//   ❌ const position = await navigator.geolocation.getCurrentPosition();
//   ✓  navigator.geolocation.getCurrentPosition((position) => { ... });
//
// This affects how we structure our code and where we put setIsFetching(false).
//
// =============================================================================

// =============================================================================
// THE NAVIGATOR OBJECT
// =============================================================================
//
// `navigator` is a GLOBAL object provided by the browser (not React!).
// It contains information about the browser and provides access to APIs:
//
//   navigator.geolocation    - User's location (GPS/IP-based)
//   navigator.userAgent      - Browser identification string
//   navigator.language       - User's preferred language
//   navigator.onLine         - Is the user connected to the internet?
//   navigator.clipboard      - Access to system clipboard
//   navigator.mediaDevices   - Access to camera/microphone
//
// navigator.geolocation.getCurrentPosition():
//   - Asks user for permission (browser shows popup)
//   - Gets latitude/longitude coordinates
//   - Works via GPS, WiFi, or IP address
//   - Takes callbacks, NOT promises
//
// =============================================================================

import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
// =============================================================================
// IMPORTING THE SORTING FUNCTION
// =============================================================================
// The sortPlacesByDistance function from loc.js calculates the distance
// between the user's location and each place using the Haversine formula.
//
// It takes:
//   - places: Array of place objects (each with lat/lon properties)
//   - lat: User's latitude
//   - lon: User's longitude
//
// It returns: A NEW array sorted by distance (closest first)
//
// This is a PURE function - it doesn't modify the original array.
// =============================================================================
import { sortPlacesByDistance } from '../loc.js';

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
  const [error, setError] = useState();

  // ===========================================================================
  // FETCHING DATA WITH GEOLOCATION SORTING
  // ===========================================================================
  useEffect(() => {
    async function fetchPlaces() {
      // -----------------------------------------------------------------------
      // STEP 1: SET LOADING TO TRUE (before any async operations)
      // -----------------------------------------------------------------------
      setIsFetching(true);

      // =====================================================================
      // TRY-CATCH BLOCK FOR ERROR HANDLING
      // =====================================================================
      try {
        // ---------------------------------------------------------------------
        // STEP 2: FETCH THE PLACES DATA FROM THE BACKEND
        // ---------------------------------------------------------------------
        const response = await fetch('http://localhost:3000/places');

        if (!response.ok) {
          throw new Error('Failed to fetch places.');
        }

        const resData = await response.json();

        // ===================================================================
        // STEP 3: GET USER'S LOCATION AND SORT PLACES
        // ===================================================================
        // Now we have the places, but before displaying them, we want to
        // sort them by distance to the user.
        //
        // This requires getting the user's location first!
        //
        // navigator.geolocation.getCurrentPosition():
        //   - First argument: SUCCESS callback (receives position object)
        //   - Second argument: ERROR callback (optional, receives error)
        //   - Third argument: OPTIONS object (optional)
        //
        // IMPORTANT: This is a CALLBACK-BASED API, not Promise-based!
        // We cannot use async/await with it.
        // ===================================================================
        navigator.geolocation.getCurrentPosition(
          // =================================================================
          // SUCCESS CALLBACK
          // =================================================================
          // This function is called by the browser ONCE the user's position
          // has been successfully determined. This happens:
          //   1. After user grants permission (first time)
          //   2. After location is calculated (GPS/WiFi/IP lookup)
          //
          // The `position` object contains:
          //   position.coords.latitude   - User's latitude (e.g., 37.7749)
          //   position.coords.longitude  - User's longitude (e.g., -122.4194)
          //   position.coords.accuracy   - Accuracy in meters
          //   position.coords.altitude   - Altitude (if available)
          //   position.timestamp         - When the position was determined
          // =================================================================
          (position) => {
            // ---------------------------------------------------------------
            // SORT PLACES BY DISTANCE TO USER
            // ---------------------------------------------------------------
            // sortPlacesByDistance takes:
            //   1. The array of places (from our fetch response)
            //   2. User's latitude (from position.coords)
            //   3. User's longitude (from position.coords)
            //
            // It returns a NEW array sorted by distance (closest first).
            //
            // We use position.coords.latitude and position.coords.longitude
            // to get the user's coordinates from the position object.
            // ---------------------------------------------------------------
            const sortedPlaces = sortPlacesByDistance(
              resData.places,
              position.coords.latitude,
              position.coords.longitude
            );

            // ---------------------------------------------------------------
            // SET THE SORTED PLACES AS OUR AVAILABLE PLACES
            // ---------------------------------------------------------------
            // Now we update state with the SORTED places, not the original.
            // This means places closer to the user appear first!
            // ---------------------------------------------------------------
            setAvailablePlaces(sortedPlaces);

            // ===============================================================
            // SET LOADING TO FALSE (inside the callback!)
            // ===============================================================
            // CRITICAL: setIsFetching(false) is NOW INSIDE THE CALLBACK!
            //
            // Why? Because getCurrentPosition is callback-based, not Promise-based.
            //
            // If we put setIsFetching(false) AFTER the getCurrentPosition call
            // (like we did before), it would execute IMMEDIATELY, before
            // the user's location is fetched!
            //
            // JavaScript execution flow with callbacks:
            //
            //   1. fetch() completes (we have places data)
            //   2. getCurrentPosition() is INITIATED (not completed!)
            //   3. JavaScript continues to next line (would be setIsFetching)
            //   4. ... time passes ...
            //   5. Browser gets location, calls our callback
            //   6. Callback runs: sort places, update state
            //
            // If setIsFetching(false) was after getCurrentPosition():
            //   - Loading would stop at step 3
            //   - User sees empty places list (data hasn't been set yet!)
            //   - Then suddenly places appear (when callback runs at step 6)
            //
            // By putting setIsFetching(false) IN the callback:
            //   - Loading continues until callback runs
            //   - User sees loading text until data is ready
            //   - Smooth transition: loading → places list
            //
            // ===============================================================
            setIsFetching(false);
          }
          // Note: We could add a second callback for geolocation errors:
          // (error) => {
          //   setError({ message: 'Could not get your location.' });
          //   setIsFetching(false);
          // }
        );

        // =====================================================================
        // WHAT HAPPENS AFTER getCurrentPosition() IS CALLED?
        // =====================================================================
        // NOTHING! There's no code after getCurrentPosition() in the try block.
        //
        // This is intentional. The callback function handles everything:
        //   - Sorting the places
        //   - Setting availablePlaces state
        //   - Setting isFetching to false
        //
        // Any code placed here would run IMMEDIATELY after initiating
        // the geolocation request, NOT after it completes.
        //
        // Compare to the previous version:
        //
        // BEFORE (Promise-based only):
        //   const response = await fetch(...);
        //   const resData = await response.json();
        //   setAvailablePlaces(resData.places);  // After fetch
        //   setIsFetching(false);                // After everything
        //
        // AFTER (with callback-based geolocation):
        //   const response = await fetch(...);
        //   const resData = await response.json();
        //   navigator.geolocation.getCurrentPosition((position) => {
        //     const sortedPlaces = sortPlacesByDistance(...);
        //     setAvailablePlaces(sortedPlaces);  // In callback
        //     setIsFetching(false);              // In callback
        //   });
        //   // Nothing here! Callback handles it.
        //
        // =====================================================================

      } catch (error) {
        // =====================================================================
        // CATCH BLOCK - HANDLING ERRORS
        // =====================================================================
        // This catches errors from:
        //   - Network failures (fetch failed)
        //   - HTTP errors (response.ok was false)
        //   - JSON parsing errors
        //
        // Note: Geolocation errors are NOT caught here because
        // getCurrentPosition uses callbacks, not Promises.
        // To handle geolocation errors, use the second callback parameter.
        // =====================================================================
        setError({
          message: error.message || 'Could not fetch places, please try again later.'
        });

        // =====================================================================
        // SET LOADING TO FALSE (in catch block too!)
        // =====================================================================
        // IMPORTANT: We also need setIsFetching(false) here!
        //
        // Why? Because if we have an error, we never reach the success callback
        // of getCurrentPosition (we never even call it on error).
        //
        // So we need to stop loading in two places:
        //   1. In the geolocation success callback (normal flow)
        //   2. In the catch block (error flow)
        //
        // This ensures loading stops regardless of success or failure.
        //
        // =====================================================================
        setIsFetching(false);
      }

      // =====================================================================
      // NO setIsFetching(false) HERE ANYMORE!
      // =====================================================================
      // Previously, we had setIsFetching(false) here, after the try-catch.
      // This worked when all operations were Promise-based (could await).
      //
      // But now, with the callback-based getCurrentPosition, this spot
      // executes BEFORE the geolocation completes.
      //
      // Execution order if we put it here:
      //   1. fetch() completes
      //   2. getCurrentPosition() initiated
      //   3. setIsFetching(false) runs ← TOO EARLY!
      //   4. ... later: geolocation callback runs
      //
      // So we moved setIsFetching(false) into:
      //   - The geolocation success callback (for success path)
      //   - The catch block (for error path)
      // =====================================================================
    }

    fetchPlaces();
  }, []);

  // ===========================================================================
  // CONDITIONAL RENDERING: ERROR STATE
  // ===========================================================================
  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />;
  }

  // ===========================================================================
  // RENDER: NORMAL STATE (Loading or Data)
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
// ASYNC OPERATION CHAINING: PROMISES VS CALLBACKS
// =============================================================================
//
// When you chain async operations, the pattern depends on the API type:
//
// CHAINING PROMISE-BASED OPERATIONS (can use async/await):
//
//   async function fetchData() {
//     const response = await fetch('/api/data');      // Wait for fetch
//     const data = await response.json();             // Wait for parse
//     const processed = await processData(data);      // Wait for process
//     setData(processed);                             // All done!
//     setLoading(false);                              // Stop loading
//   }
//
// CHAINING WHEN LAST OPERATION IS CALLBACK-BASED:
//
//   async function fetchData() {
//     const response = await fetch('/api/data');      // Wait for fetch
//     const data = await response.json();             // Wait for parse
//
//     callbackBasedOperation(data, (result) => {      // Callback pattern
//       setData(result);                              // In callback!
//       setLoading(false);                            // In callback!
//     });
//     // No code here - callback handles it
//   }
//
// KEY INSIGHT: The "end" of your async operations determines where you
// put your final state updates.
//
// =============================================================================

// =============================================================================
// BROWSER PERMISSION FLOW
// =============================================================================
//
// When getCurrentPosition() is called for the first time:
//
//   1. Browser shows permission popup:
//      "example.com wants to know your location"
//      [Allow] [Block]
//
//   2a. If user clicks "Allow":
//       - Permission is granted (remembered for this site)
//       - Browser starts getting location (GPS/WiFi/IP)
//       - Success callback is eventually called with position
//
//   2b. If user clicks "Block":
//       - Permission is denied (remembered for this site)
//       - Error callback is called (if provided)
//       - Success callback is NEVER called
//
//   3. On subsequent visits:
//       - Permission is remembered
//       - No popup shown
//       - Location fetched immediately (if allowed)
//       - Error thrown immediately (if blocked)
//
// IMPORTANT: While waiting for user to respond to permission popup,
// our loading state is still true! This is correct behavior.
// The user sees "Fetching place data..." until they respond.
//
// =============================================================================

// =============================================================================
// WHY SORT BY DISTANCE?
// =============================================================================
//
// Showing places sorted by distance provides a better user experience:
//
//   - Users see nearby places first (most relevant)
//   - No need to scroll through distant locations
//   - Personalized experience based on user's location
//
// This is a common pattern in location-based apps:
//   - Google Maps: Nearby restaurants
//   - Uber: Closest drivers
//   - Weather apps: Local forecast first
//   - Travel apps: Nearest attractions
//
// The Haversine formula (in loc.js) calculates "as the crow flies"
// distance between two points on Earth, accounting for Earth's curvature.
//
// =============================================================================

// =============================================================================
// HANDLING GEOLOCATION ERRORS
// =============================================================================
//
// getCurrentPosition accepts a second callback for errors:
//
//   navigator.geolocation.getCurrentPosition(
//     (position) => { /* success */ },
//     (error) => { /* failure */ }
//   );
//
// Common geolocation errors:
//   - PERMISSION_DENIED (1): User blocked location access
//   - POSITION_UNAVAILABLE (2): Location couldn't be determined
//   - TIMEOUT (3): Request took too long
//
// Enhanced error handling example:
//
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const sorted = sortPlacesByDistance(...);
//       setAvailablePlaces(sorted);
//       setIsFetching(false);
//     },
//     (geoError) => {
//       // Still show places, just unsorted
//       setAvailablePlaces(resData.places);
//       setIsFetching(false);
//       // Optionally warn user
//       console.warn('Could not get location:', geoError.message);
//     }
//   );
//
// This graceful degradation shows unsorted places if location fails.
//
// =============================================================================

// =============================================================================
// ALTERNATIVE: PROMISIFYING GEOLOCATION
// =============================================================================
//
// If you prefer async/await everywhere, you can wrap getCurrentPosition
// in a Promise:
//
//   function getPosition() {
//     return new Promise((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
//   }
//
//   // Now you can use async/await:
//   async function fetchPlaces() {
//     setIsFetching(true);
//     try {
//       const response = await fetch('/places');
//       const resData = await response.json();
//
//       const position = await getPosition();  // Now works with await!
//       const sorted = sortPlacesByDistance(
//         resData.places,
//         position.coords.latitude,
//         position.coords.longitude
//       );
//
//       setAvailablePlaces(sorted);
//     } catch (error) {
//       setError({ message: error.message });
//     }
//     setIsFetching(false);  // Can go here again!
//   }
//
// This is a common pattern called "promisification".
// Libraries like 'util.promisify' (Node.js) automate this.
//
// =============================================================================
