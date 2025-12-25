// =============================================================================
// AVAILABLE PLACES COMPONENT - Now Using the Custom Hook!
// =============================================================================
//
// This component demonstrates the POWER of custom hooks:
//
// BEFORE: ~50 lines of state management and fetching code
// AFTER:  ~10 lines - just one hook call!
//
// Both App.jsx and this component now use the SAME useFetch hook,
// proving that custom hooks can be shared across components!
//
// =============================================================================
// THE TRANSFORMATION
// =============================================================================
//
// BEFORE (what we had):
// ---------------------
//   const [isFetching, setIsFetching] = useState(false);
//   const [availablePlaces, setAvailablePlaces] = useState([]);
//   const [error, setError] = useState();
//
//   useEffect(() => {
//     async function fetchPlaces() {
//       setIsFetching(true);
//       try {
//         const places = await fetchAvailablePlaces();
//         // ... sorting logic ...
//         setAvailablePlaces(sortedPlaces);
//         setIsFetching(false);
//       } catch (error) {
//         setError({ message: error.message || '...' });
//         setIsFetching(false);
//       }
//     }
//     fetchPlaces();
//   }, []);
//
// AFTER (what we have now):
// -------------------------
//   const {
//     isFetching,
//     error,
//     fetchedData: availablePlaces,
//     setFetchedData: setAvailablePlaces,
//   } = useFetch(fetchAvailablePlaces, []);
//
// All the complexity is now hidden inside useFetch!
//
// =============================================================================

// Note: We no longer need useState or useEffect - they're inside useFetch!
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
// =============================================================================
// IMPORTING THE CUSTOM HOOK
// =============================================================================
// We import the SAME hook that App.jsx uses!
// This is the whole point of custom hooks - reusable logic.
// =============================================================================
import { useFetch } from '../hooks/useFetch.js';

export default function AvailablePlaces({ onSelectPlace }) {
  // ===========================================================================
  // USING THE CUSTOM HOOK - Same as App.jsx!
  // ===========================================================================
  //
  // useFetch takes:
  //   1. fetchFn: The function to call (fetchAvailablePlaces)
  //   2. initialValue: Starting value for the data ([])
  //
  // useFetch returns:
  //   - isFetching: boolean for loading state
  //   - error: any error that occurred
  //   - fetchedData: the fetched data (aliased to availablePlaces)
  //   - setFetchedData: setter function (aliased to setAvailablePlaces)
  //
  // ===========================================================================
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,      // Alias for component-specific naming
    setFetchedData: setAvailablePlaces, // We'll need this for sorting later
  } = useFetch(fetchAvailablePlaces, []);

  // ===========================================================================
  // INDEPENDENT STATE - Not Shared with App.jsx!
  // ===========================================================================
  //
  // IMPORTANT CONCEPT:
  // Even though both App.jsx and this component use useFetch:
  //   - App.jsx has its OWN copy of the state
  //   - This component has its OWN SEPARATE copy
  //
  // They are COMPLETELY INDEPENDENT:
  //   - Adding a place in App.jsx does NOT affect availablePlaces here
  //   - Fetching here does NOT affect userPlaces in App.jsx
  //
  // This is because:
  //   - Each call to useFetch creates NEW useState calls
  //   - Each component gets its own state instances
  //   - Custom hooks share LOGIC, not STATE
  //
  // CONTRAST WITH CONTEXT:
  //   - Context SHARES state across components
  //   - Custom hooks give each component its OWN state
  //
  // ===========================================================================

  // ===========================================================================
  // SORTING LOGIC - To Be Added Back Later
  // ===========================================================================
  //
  // PROBLEM: We had sorting logic that ran AFTER fetching:
  //
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const sortedPlaces = sortPlacesByDistance(
  //       places,
  //       position.coords.latitude,
  //       position.coords.longitude
  //     );
  //     setAvailablePlaces(sortedPlaces);
  //     setIsFetching(false);
  //   });
  //
  // But now useFetch handles all the fetching internally!
  // How do we sort the data AFTER it's fetched?
  //
  // OPTIONS (we'll explore in the next lesson):
  //   1. Use useEffect to sort when availablePlaces changes
  //   2. Modify useFetch to accept a "post-process" callback
  //   3. Sort in the render (not ideal for async operations)
  //
  // For now, the component works - just without sorting!
  // The places will appear in the order returned by the server.
  //
  // ===========================================================================

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
// WHAT WE ACHIEVED
// =============================================================================
//
// 1. MUCH LEANER COMPONENT
//    - Removed ~20 lines of state management
//    - Removed the entire useEffect block
//    - Just one hook call does it all!
//
// 2. CONSISTENT BEHAVIOR
//    - Both App.jsx and AvailablePlaces use the same fetching logic
//    - If we fix a bug in useFetch, BOTH components benefit
//    - Error handling is identical across the app
//
// 3. BETTER SEPARATION OF CONCERNS
//    - useFetch handles: state management, fetching, error handling
//    - This component handles: rendering, user interaction
//    - Each piece of code has ONE job
//
// 4. EASIER TO TEST
//    - useFetch can be unit tested independently
//    - This component can be tested with mocked hook data
//
// =============================================================================

// =============================================================================
// THE CUSTOM HOOK REUSE PATTERN
// =============================================================================
//
// Now we have TWO components using the SAME custom hook:
//
//   App.jsx:
//   --------
//   const { fetchedData: userPlaces, ... } = useFetch(fetchUserPlaces, []);
//
//   AvailablePlaces.jsx (this file):
//   ---------------------------------
//   const { fetchedData: availablePlaces, ... } = useFetch(fetchAvailablePlaces, []);
//
// The ONLY differences are:
//   - Which fetch function to use
//   - What to name the resulting data
//
// The hook handles ALL the common logic:
//   - Creating state (data, loading, error)
//   - Running the effect
//   - Handling success/error
//   - Exposing the setter
//
// This is the essence of custom hooks: REUSABLE STATEFUL LOGIC!
//
// =============================================================================

// =============================================================================
// REMAINING CHALLENGE: Sorting by Distance
// =============================================================================
//
// The original component sorted places by user's location.
// We temporarily removed this for simplicity.
//
// In the next lesson, we'll learn how to:
//   - Post-process data after it's fetched
//   - Handle async operations (geolocation) with custom hooks
//
// The sorting code we need to bring back:
//
//   navigator.geolocation.getCurrentPosition((position) => {
//     const sortedPlaces = sortPlacesByDistance(
//       availablePlaces,
//       position.coords.latitude,
//       position.coords.longitude
//     );
//     setAvailablePlaces(sortedPlaces);
//   });
//
// =============================================================================
