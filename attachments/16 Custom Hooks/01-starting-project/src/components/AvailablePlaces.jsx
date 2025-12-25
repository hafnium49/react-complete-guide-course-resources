// =============================================================================
// AVAILABLE PLACES COMPONENT - Complete with Sorting!
// =============================================================================
//
// This component demonstrates how to handle POST-PROCESSING of fetched data
// when using a custom hook.
//
// THE CHALLENGE:
// --------------
// useFetch handles fetching internally, but we need to:
//   1. Fetch places from the server
//   2. Get user's location (async callback-based API)
//   3. Sort places by distance
//   4. THEN update the state
//
// THE SOLUTION:
// -------------
// Create a wrapper function (fetchSortedPlaces) that:
//   1. Calls fetchAvailablePlaces
//   2. Gets user location
//   3. Sorts by distance
//   4. Returns a Promise with the sorted result
//
// This way, useFetch doesn't need to change - it just calls our wrapper!
//
// =============================================================================

// Note: We don't need useState or useEffect - they're inside useFetch!
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';

// =============================================================================
// WRAPPER FUNCTION: fetchSortedPlaces
// =============================================================================
//
// This function wraps fetchAvailablePlaces and adds sorting by distance.
//
// WHY DO WE NEED THIS?
// --------------------
// useFetch expects a fetch function that returns a Promise.
// But our sorting logic needs TWO async operations:
//   1. Fetch places from server (Promise-based)
//   2. Get user's location (CALLBACK-based, not Promise!)
//
// The geolocation API uses callbacks, not Promises:
//   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
//
// We need to convert this callback-based API into a Promise so that
// useFetch can await our entire operation.
//
// =============================================================================
//
// PROMISIFYING A CALLBACK-BASED API
// ==================================
//
// "Promisifying" means converting a callback-based API into a Promise.
//
// This is a standard JavaScript pattern, not React-specific!
//
// BEFORE (callback-based):
// ------------------------
//   navigator.geolocation.getCurrentPosition(
//     (position) => { /* success */ },
//     (error) => { /* failure */ }
//   );
//
// AFTER (promisified):
// --------------------
//   new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => resolve(position),  // Success: resolve the promise
//       (error) => reject(error)          // Failure: reject the promise
//     );
//   });
//
// Now we can use async/await:
//   const position = await getPositionPromise();
//
// =============================================================================
async function fetchSortedPlaces() {
  // ---------------------------------------------------------------------------
  // STEP 1: Fetch the places from the server
  // ---------------------------------------------------------------------------
  // This is the same function we were using before.
  // It returns a Promise that resolves to an array of places.
  // If it fails, it throws an error (which useFetch will catch).
  // ---------------------------------------------------------------------------
  const places = await fetchAvailablePlaces();

  // ---------------------------------------------------------------------------
  // STEP 2: Get user's location and sort (promisified)
  // ---------------------------------------------------------------------------
  //
  // THE PROMISE CONSTRUCTOR
  // -----------------------
  // new Promise((resolve, reject) => { ... })
  //
  // Parameters:
  //   resolve - Call this when the operation SUCCEEDS, passing the result
  //   reject  - Call this when the operation FAILS, passing the error
  //
  // The Promise will:
  //   - RESOLVE when resolve(value) is called
  //   - REJECT when reject(error) is called
  //
  // This lets us wrap callback-based APIs in Promises!
  //
  // ---------------------------------------------------------------------------
  return new Promise((resolve) => {
    // -------------------------------------------------------------------------
    // Get the user's current position
    // -------------------------------------------------------------------------
    // navigator.geolocation.getCurrentPosition takes a callback that receives
    // the position when available. This is an ASYNC operation - the browser
    // needs to access GPS, WiFi location, etc.
    //
    // We're NOT using reject here because:
    //   1. If location fails, we could just show unsorted places
    //   2. For simplicity, we're only handling the success case
    //
    // In production, you might want to handle errors:
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => { /* success */ },
    //     (error) => reject(error)  // Handle location errors
    //   );
    // -------------------------------------------------------------------------
    navigator.geolocation.getCurrentPosition((position) => {
      // -----------------------------------------------------------------------
      // STEP 3: Sort places by distance from user
      // -----------------------------------------------------------------------
      // sortPlacesByDistance takes:
      //   - places: array of places to sort
      //   - latitude: user's latitude
      //   - longitude: user's longitude
      //
      // It returns a NEW array, sorted from closest to farthest.
      // -----------------------------------------------------------------------
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      // -----------------------------------------------------------------------
      // STEP 4: Resolve the Promise with sorted places
      // -----------------------------------------------------------------------
      // Calling resolve() tells the Promise "we're done, here's the value!"
      //
      // When useFetch does: const data = await fetchFn();
      // This sortedPlaces array becomes the value of 'data'.
      //
      // The Promise returned by fetchSortedPlaces will now resolve,
      // and useFetch will set this as the fetchedData.
      // -----------------------------------------------------------------------
      resolve(sortedPlaces);
    });
  });
}

// =============================================================================
// HOW THIS WORKS WITH useFetch
// =============================================================================
//
// useFetch calls:
//   const data = await fetchFn();
//
// With fetchSortedPlaces as fetchFn:
//   1. fetchSortedPlaces() is called
//   2. It awaits fetchAvailablePlaces() → gets places from server
//   3. It returns a new Promise
//   4. Inside the Promise, geolocation is requested
//   5. When position is available, places are sorted
//   6. resolve(sortedPlaces) is called
//   7. The Promise resolves with sortedPlaces
//   8. useFetch receives sortedPlaces as 'data'
//   9. useFetch calls setFetchedData(sortedPlaces)
//   10. Component re-renders with sorted places!
//
// Error handling:
//   - If fetchAvailablePlaces throws, useFetch catches it
//   - If geolocation fails, the Promise never resolves (could add reject)
//
// =============================================================================

export default function AvailablePlaces({ onSelectPlace }) {
  // ===========================================================================
  // USING useFetch WITH OUR WRAPPER FUNCTION
  // ===========================================================================
  //
  // We pass fetchSortedPlaces instead of fetchAvailablePlaces.
  // This gives useFetch a function that:
  //   1. Fetches places from server
  //   2. Gets user location
  //   3. Sorts by distance
  //   4. Returns the sorted result
  //
  // useFetch doesn't need to know about the sorting!
  // It just calls the function and handles the result.
  //
  // NOTE: We removed setFetchedData because we don't need to manually
  // update the data - fetchSortedPlaces handles everything.
  //
  // ===========================================================================
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
    // setFetchedData removed - not needed since sorting happens in fetchSortedPlaces
  } = useFetch(fetchSortedPlaces, []);
  //           ^^^^^^^^^^^^^^^^
  //           Using our wrapper function, not the original!

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

// =============================================================================
// THE ELEGANCE OF THIS SOLUTION
// =============================================================================
//
// 1. useFetch DOESN'T CHANGE
//    The hook remains simple and generic - it just calls a fetch function.
//
// 2. LOGIC STAYS IN THE COMPONENT
//    The sorting logic is defined where it's needed (this file).
//
// 3. COMPOSITION OVER MODIFICATION
//    Instead of modifying useFetch to handle sorting, we composed a new
//    function that wraps the original fetch function.
//
// 4. REUSABLE PATTERN
//    This pattern works for any post-processing:
//      - Sorting
//      - Filtering
//      - Transforming data
//      - Combining multiple API calls
//
// EXAMPLE: If you needed to fetch and transform user data:
//
//   async function fetchTransformedUsers() {
//     const users = await fetchUsers();
//     return users.map(user => ({
//       ...user,
//       fullName: `${user.firstName} ${user.lastName}`
//     }));
//   }
//
//   const { fetchedData: users } = useFetch(fetchTransformedUsers, []);
//
// =============================================================================

// =============================================================================
// JAVASCRIPT PROMISES - A QUICK REVIEW
// =============================================================================
//
// Promises represent eventual completion (or failure) of an async operation.
//
// CREATING A PROMISE:
// -------------------
//   new Promise((resolve, reject) => {
//     // Do async work...
//     if (success) {
//       resolve(result);  // Promise fulfilled with 'result'
//     } else {
//       reject(error);    // Promise rejected with 'error'
//     }
//   });
//
// USING A PROMISE:
// ----------------
//   // With .then()/.catch():
//   fetchData()
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
//
//   // With async/await:
//   try {
//     const data = await fetchData();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
//
// PROMISIFYING CALLBACKS:
// -----------------------
// Many older browser APIs use callbacks instead of Promises.
// You can wrap them in Promises to use async/await:
//
//   function readFilePromise(path) {
//     return new Promise((resolve, reject) => {
//       fs.readFile(path, (err, data) => {
//         if (err) reject(err);
//         else resolve(data);
//       });
//     });
//   }
//
// This is exactly what we did with navigator.geolocation!
//
// =============================================================================

// =============================================================================
// SUMMARY: THE COMPLETE DATA FLOW
// =============================================================================
//
// 1. Component renders
// 2. useFetch is called with fetchSortedPlaces
// 3. useFetch's useEffect runs
// 4. setIsFetching(true) → shows "Fetching place data..."
// 5. await fetchSortedPlaces():
//    a. await fetchAvailablePlaces() → HTTP request to server
//    b. Server returns places
//    c. new Promise created for geolocation
//    d. Browser gets user's position (GPS, WiFi, etc.)
//    e. sortPlacesByDistance() sorts the places
//    f. resolve(sortedPlaces) → Promise resolves
// 6. useFetch receives sortedPlaces
// 7. setFetchedData(sortedPlaces) → updates state
// 8. setIsFetching(false)
// 9. Component re-renders with sorted places!
//
// The user sees:
//   1. "Fetching place data..." (loading state)
//   2. Places sorted by distance (closest first)
//
// =============================================================================
