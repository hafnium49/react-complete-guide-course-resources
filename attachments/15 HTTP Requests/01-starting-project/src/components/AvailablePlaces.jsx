// =============================================================================
// FETCHING DATA FROM A BACKEND - With Loading State
// =============================================================================
// This component demonstrates how to fetch data from a backend API in React
// using the modern async/await syntax inside useEffect, AND how to manage
// a loading state for better user experience.
//
// KEY CONCEPTS:
// 1. Async data fetching with useEffect
// 2. Managing LOADING STATE alongside DATA STATE
// 3. Providing user feedback during data fetching
//
// =============================================================================

// =============================================================================
// WHY MANAGE LOADING STATE?
// =============================================================================
//
// HTTP requests take time - especially on slow networks!
//
// Problem without loading state:
//   1. Component renders with places = []
//   2. User sees "No places available" (confusing!)
//   3. Eventually places load and appear
//
// Solution with loading state:
//   1. Component renders with isFetching = true
//   2. User sees "Fetching place data..." (clear feedback!)
//   3. Eventually places load and appear
//
// This is a better user experience!
//
// =============================================================================

// =============================================================================
// MULTIPLE STATES FOR ASYNC OPERATIONS
// =============================================================================
//
// When fetching data, you typically need MULTIPLE pieces of state:
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │  STATE             │  PURPOSE                                          │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │  data              │  The actual fetched data (places array)          │
//   │  isLoading         │  Are we currently fetching? (boolean)            │
//   │  error             │  Did something go wrong? (coming next!)          │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// This is such a common pattern that libraries like React Query, SWR, and
// TanStack Query are built specifically to manage these states for you!
//
// But understanding how to do it manually is important for learning.
//
// =============================================================================

// =============================================================================
// THE DATA FLOW WITH LOADING STATE
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │  TIME         │  isFetching  │  places  │  USER SEES                   │
//   ├───────────────┼──────────────┼──────────┼──────────────────────────────┤
//   │  Initial      │  false       │  []      │  (nothing yet)               │
//   │  Start fetch  │  true        │  []      │  "Fetching place data..."    │
//   │  (waiting...) │  true        │  []      │  "Fetching place data..."    │
//   │  Data arrives │  false       │  [...]   │  List of places!             │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// The key insight: There may be SECONDS between setting isFetching = true
// and setting isFetching = false. During that time, the user sees the
// loading message instead of a confusing "No places available" message.
//
// =============================================================================

import { useState, useEffect } from 'react';

import Places from './Places.jsx';

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
  // This state tracks whether an HTTP request is in progress.
  //
  // Why do we need this?
  // - Without it, we can't distinguish between:
  //   a) "We have no data YET" (still loading)
  //   b) "We have no data BECAUSE there is none" (done loading, empty result)
  //
  // Initial value: false
  //   We haven't started fetching yet, so we're not "fetching".
  //   We set it to true inside useEffect when we START the fetch.
  //
  // Alternative approach: Start with true
  //   const [isFetching, setIsFetching] = useState(true);
  //   This would show loading immediately, which some prefer.
  //   But then you need to make sure to set it false even if fetch fails.
  // ===========================================================================
  const [isFetching, setIsFetching] = useState(false);

  // ===========================================================================
  // FETCHING DATA WITH LOADING STATE
  // ===========================================================================
  useEffect(() => {
    async function fetchPlaces() {
      // -----------------------------------------------------------------------
      // STEP 1: SET LOADING TO TRUE (before fetch)
      // -----------------------------------------------------------------------
      // We're about to start fetching, so set isFetching to true.
      // This will trigger a re-render showing the loading text.
      //
      // You could also set this outside of fetchPlaces(), right after
      // the function definition. It doesn't matter much since both
      // execute synchronously before any async operation.
      // -----------------------------------------------------------------------
      setIsFetching(true);

      // -----------------------------------------------------------------------
      // STEP 2: FETCH THE DATA
      // -----------------------------------------------------------------------
      // This is where the actual network request happens.
      // The await keyword pauses execution here until the server responds.
      //
      // On a fast connection: milliseconds
      // On a slow connection (Slow 3G): several seconds!
      //
      // During this time, isFetching remains true, and the user sees
      // "Fetching place data..." instead of "No places available".
      // -----------------------------------------------------------------------
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();

      // -----------------------------------------------------------------------
      // STEP 3: UPDATE DATA STATE
      // -----------------------------------------------------------------------
      // Now we have the data! Store it in state.
      // -----------------------------------------------------------------------
      setAvailablePlaces(resData.places);

      // -----------------------------------------------------------------------
      // STEP 4: SET LOADING TO FALSE (after fetch)
      // -----------------------------------------------------------------------
      // We're done fetching! Set isFetching to false.
      // This will trigger a re-render showing the actual places.
      //
      // IMPORTANT: The code between setIsFetching(true) and setIsFetching(false)
      // may look like just 3 lines, but the await statements can take SECONDS
      // to complete. That's why we need this loading state!
      //
      // Timeline:
      //   t=0.000s: setIsFetching(true)
      //   t=0.001s: fetch() starts
      //   t=2.500s: response arrives (on slow network)
      //   t=2.501s: JSON parsed
      //   t=2.502s: setAvailablePlaces(data)
      //   t=2.503s: setIsFetching(false)
      //
      // During those ~2.5 seconds, the user sees the loading message!
      // -----------------------------------------------------------------------
      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  // ===========================================================================
  // RENDER WITH LOADING STATE PROPS
  // ===========================================================================
  // We pass the loading state and text to the Places component.
  //
  // isLoading={isFetching}
  //   - true while we're fetching
  //   - false when we're done
  //
  // loadingText="Fetching place data..."
  //   - Shown to the user while isLoading is true
  //   - Clear, user-friendly message
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
// THE COMPLETE LOADING STATE PATTERN
// =============================================================================
//
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//
//   useEffect(() => {
//     async function fetchData() {
//       setIsLoading(true);              // 1. Start loading
//
//       const response = await fetch(url);
//       const result = await response.json();
//
//       setData(result);                 // 2. Store data
//       setIsLoading(false);             // 3. Done loading
//     }
//     fetchData();
//   }, []);
//
// This is a fundamental pattern you'll use in almost every React app!
//
// =============================================================================

// =============================================================================
// TESTING THE LOADING STATE
// =============================================================================
//
// On a fast connection, the loading state flashes by so quickly you might
// not even see it! To test it properly:
//
//   1. Open DevTools (F12)
//   2. Go to Network tab
//   3. Find the throttling dropdown
//   4. Select "Slow 3G"
//   5. Reload the page
//
// Now you'll see:
//   - "Fetching place data..." appears
//   - After a few seconds, places appear
//
// This simulates real-world slow connections!
//
// =============================================================================

// =============================================================================
// COMING NEXT: ERROR HANDLING
// =============================================================================
//
// What happens if the fetch fails? (Server down, network error, etc.)
//
// Currently, we don't handle errors at all. The user would see the loading
// message forever, or the app might crash.
//
// In the next lessons, we'll add:
//
//   const [error, setError] = useState(null);
//
//   try {
//     const response = await fetch(url);
//     // ...
//   } catch (error) {
//     setError(error);
//   }
//
// This completes the "Loading/Error/Data" pattern!
//
// =============================================================================
