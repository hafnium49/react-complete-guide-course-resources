// =============================================================================
// AVAILABLE PLACES COMPONENT - Demonstrating Code Duplication
// =============================================================================
//
// IMPORTANT: Compare this file with App.jsx!
//
// Notice how SIMILAR the code structure is:
//   - Both have the same three states (data, loading, error)
//   - Both use useEffect to fetch data on mount
//   - Both have the same try-catch pattern
//   - Both manage loading state the same way
//
// This is the kind of code duplication that custom hooks solve!
//
// =============================================================================
// THE DUPLICATED PATTERN (appears in both files)
// =============================================================================
//
// App.jsx:                              AvailablePlaces.jsx (this file):
// ---------                             ---------------------------------
// const [userPlaces, setUserPlaces]     const [availablePlaces, setAvailablePlaces]
//   = useState([]);                       = useState([]);
// const [isFetching, setIsFetching]     const [isFetching, setIsFetching]
//   = useState(false);                    = useState(false);
// const [error, setError]               const [error, setError]
//   = useState();                         = useState();
//
// useEffect(() => {                     useEffect(() => {
//   async function fetchPlaces() {        async function fetchPlaces() {
//     setIsFetching(true);                  setIsFetching(true);
//     try {                                 try {
//       const places = await                  const places = await
//         fetchUserPlaces();                    fetchAvailablePlaces();
//       setUserPlaces(places);               // ... process and set data
//     } catch (error) {                    } catch (error) {
//       setError({ message: ... });          setError({ message: ... });
//     }                                    }
//     setIsFetching(false);                 // setIsFetching(false);
//   }                                     }
//   fetchPlaces();                        fetchPlaces();
// }, []);                               }, []);
//
// The structure is IDENTICAL! Only the details differ:
//   - Which fetch function to call
//   - What to do with the data
//   - Error messages
//
// =============================================================================

import { useState, useEffect } from 'react';

import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  // ===========================================================================
  // THE THREE STATES - Same pattern as App.jsx!
  // ===========================================================================
  // This "trio" of states appears whenever we fetch data:
  //   1. Data state (availablePlaces)
  //   2. Loading state (isFetching)
  //   3. Error state (error)
  //
  // We're writing this AGAIN, even though App.jsx has the same pattern.
  // This is exactly what we want to extract into a custom hook!
  // ===========================================================================
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  // ===========================================================================
  // THE FETCH EFFECT - Same pattern as App.jsx!
  // ===========================================================================
  // Compare this to the useEffect in App.jsx - it's almost identical:
  //   1. Set loading to true
  //   2. Try to fetch data
  //   3. On success: set data
  //   4. On error: set error
  //   5. Set loading to false
  //
  // The ONLY differences are:
  //   - Which function we call (fetchAvailablePlaces vs fetchUserPlaces)
  //   - Extra processing (geolocation sorting)
  //
  // ===========================================================================
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();

        // This component has extra logic: sort by user's location
        // But the overall PATTERN is still the same as App.jsx
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || 'Could not fetch places, please try again later.',
        });
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  // ===========================================================================
  // WHY CAN'T WE JUST USE A REGULAR FUNCTION?
  // ===========================================================================
  //
  // You might think: "Let's create a shared function!"
  //
  //   // ❌ THIS WON'T WORK:
  //   function useFetchData(fetchFn) {
  //     const [data, setData] = useState([]);     // ERROR! Can't use hooks!
  //     const [loading, setLoading] = useState(false);
  //     const [error, setError] = useState();
  //
  //     useEffect(() => { ... }, []);             // ERROR! Can't use hooks!
  //
  //     return { data, loading, error };
  //   }
  //
  // This fails because:
  //   1. Hooks can ONLY be called from React component functions
  //   2. Or from OTHER HOOKS (custom hooks)
  //   3. Regular functions can't use useState, useEffect, etc.
  //
  // The solution: Make it a CUSTOM HOOK by:
  //   1. Naming it with "use" prefix (useFetch, not fetchData)
  //   2. This tells React "this function can use hooks"
  //   3. React will enforce that it's only called from valid places
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
// WHAT CUSTOM HOOKS WILL GIVE US
// =============================================================================
//
// After we create a custom hook, this component could look like:
//
//   export default function AvailablePlaces({ onSelectPlace }) {
//     const {
//       isFetching,
//       error,
//       fetchedData: availablePlaces,
//       setFetchedData: setAvailablePlaces
//     } = useFetch(fetchAvailablePlaces, []);
//
//     // Only the geolocation logic remains component-specific
//     // All the boilerplate is handled by the hook!
//
//     if (error) {
//       return <Error title="An error occurred!" message={error.message} />;
//     }
//
//     return <Places ... />;
//   }
//
// Benefits:
//   - Less code in each component
//   - Consistent handling across all fetch operations
//   - Bug fix in hook fixes everywhere
//   - Easier to test
//
// =============================================================================
