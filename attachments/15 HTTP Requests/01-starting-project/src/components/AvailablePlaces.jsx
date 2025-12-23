// =============================================================================
// FETCHING DATA FROM A BACKEND - Using async/await in useEffect
// =============================================================================
// This component demonstrates how to fetch data from a backend API in React
// using the modern async/await syntax inside useEffect.
//
// KEY CONCEPT: React apps often need to communicate with backend servers
// to fetch or send data. This is fundamentally different from accessing
// local data (like localStorage) because HTTP requests are ASYNCHRONOUS.
//
// =============================================================================

// =============================================================================
// THE TWO-SERVER ARCHITECTURE
// =============================================================================
//
// When working with a backend, you typically have TWO separate servers:
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │                     DEVELOPMENT SETUP                                   │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │                                                                         │
//   │   FRONTEND (Vite Dev Server)          BACKEND (Node/Express Server)    │
//   │   ─────────────────────────           ──────────────────────────────   │
//   │   • npm run dev                       • node app.js                    │
//   │   • http://localhost:5173             • http://localhost:3000          │
//   │   • Serves React app                  • Serves API endpoints           │
//   │   • Hot module replacement            • Handles data/images            │
//   │                                                                         │
//   │                    HTTP Request                                         │
//   │   React App ──────────────────────────────────> Backend API            │
//   │              <──────────────────────────────── JSON Response           │
//   │                                                                         │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// IMPORTANT: Both servers must be running simultaneously!
// - Terminal 1: npm run dev (frontend)
// - Terminal 2: cd backend && node app.js (backend)
//
// =============================================================================

// =============================================================================
// ASYNC/AWAIT IN useEffect - The Right Way
// =============================================================================
//
// PROBLEM: You CANNOT make the useEffect callback function async!
//
//   ❌ WRONG - This will cause a React warning:
//   ─────────────────────────────────────────────────────────────────────────
//   useEffect(async () => {
//     const response = await fetch(url);
//     // ...
//   }, []);
//
//   Why? Because useEffect expects:
//   - Either nothing returned (undefined)
//   - Or a CLEANUP FUNCTION returned
//
//   But async functions ALWAYS return a Promise!
//   React doesn't know what to do with a Promise as a cleanup function.
//
//   ✅ CORRECT - Define an async function INSIDE, then call it:
//   ─────────────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     async function fetchData() {     // 1. Define async function
//       const response = await fetch(url);
//       // ...
//     }
//     fetchData();                      // 2. Call it immediately
//   }, []);
//
// This is a very common pattern in React!
//
// =============================================================================

// =============================================================================
// .then() vs async/await - COMPARISON
// =============================================================================
//
//   Using .then() chains (previous approach):
//   ─────────────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     fetch('http://localhost:3000/places')
//       .then(response => response.json())
//       .then(data => setAvailablePlaces(data.places));
//   }, []);
//
//   Using async/await (cleaner, more readable):
//   ─────────────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     async function fetchPlaces() {
//       const response = await fetch('http://localhost:3000/places');
//       const resData = await response.json();
//       setAvailablePlaces(resData.places);
//     }
//     fetchPlaces();
//   }, []);
//
// Both approaches do EXACTLY the same thing!
// async/await is just "syntactic sugar" that makes the code look synchronous.
//
// Benefits of async/await:
//   1. More readable - looks like regular synchronous code
//   2. Easier to understand the flow
//   3. Better for complex logic with multiple steps
//   4. Easier error handling with try/catch
//
// =============================================================================

// =============================================================================
// HOW async/await WORKS
// =============================================================================
//
//   async function fetchPlaces() {
//     const response = await fetch(url);  // Pause here until fetch completes
//     const data = await response.json(); // Pause here until JSON is parsed
//     return data;                         // Return the result
//   }
//
// The "await" keyword:
//   - Can ONLY be used inside an async function
//   - PAUSES execution until the Promise resolves
//   - Returns the resolved value (not the Promise!)
//
// Under the hood, this is equivalent to:
//
//   fetch(url)
//     .then(response => response.json())
//     .then(data => { /* use data */ });
//
// The async function still returns a Promise, but the code LOOKS synchronous.
//
// =============================================================================

import { useState, useEffect } from 'react';

import Places from './Places.jsx';

// =============================================================================
// AVAILABLE PLACES COMPONENT
// =============================================================================
export default function AvailablePlaces({ onSelectPlace }) {
  // ===========================================================================
  // STATE FOR FETCHED DATA
  // ===========================================================================
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // ===========================================================================
  // FETCHING DATA WITH async/await INSIDE useEffect
  // ===========================================================================
  useEffect(() => {
    // -------------------------------------------------------------------------
    // STEP 1: DEFINE AN ASYNC FUNCTION INSIDE useEffect
    // -------------------------------------------------------------------------
    // We create a function called fetchPlaces and mark it as "async".
    // This is just a regular function defined inside useEffect.
    // React doesn't care about this function - it's purely JavaScript.
    //
    // Why can't we make the useEffect callback async directly?
    // Because useEffect expects the callback to return either:
    //   - undefined (nothing)
    //   - A cleanup function
    // But async functions ALWAYS return a Promise, which confuses React.
    //
    // By creating a separate async function, we avoid this issue.
    // -------------------------------------------------------------------------
    async function fetchPlaces() {
      // -----------------------------------------------------------------------
      // STEP 2: AWAIT THE FETCH REQUEST
      // -----------------------------------------------------------------------
      // The "await" keyword pauses execution until the Promise resolves.
      // When the server responds, "response" will be the Response object.
      //
      // Without await:
      //   const response = fetch(url);  // response is a Promise
      //
      // With await:
      //   const response = await fetch(url);  // response is the actual Response
      // -----------------------------------------------------------------------
      const response = await fetch('http://localhost:3000/places');

      // -----------------------------------------------------------------------
      // STEP 3: AWAIT THE JSON PARSING
      // -----------------------------------------------------------------------
      // response.json() also returns a Promise (parsing takes time).
      // We await it to get the actual parsed JavaScript object.
      //
      // resData will be: { places: [...] }
      // -----------------------------------------------------------------------
      const resData = await response.json();

      // -----------------------------------------------------------------------
      // STEP 4: UPDATE STATE
      // -----------------------------------------------------------------------
      // Now we have the data! Update state to trigger a re-render.
      // -----------------------------------------------------------------------
      setAvailablePlaces(resData.places);
    }

    // -------------------------------------------------------------------------
    // STEP 5: CALL THE ASYNC FUNCTION
    // -------------------------------------------------------------------------
    // We defined the function above, but we haven't CALLED it yet!
    // We need to invoke it so the fetch actually happens.
    //
    // Pattern: Define then immediately call
    //   async function doSomething() { ... }
    //   doSomething();
    //
    // Alternative (IIFE - Immediately Invoked Function Expression):
    //   (async () => {
    //     const response = await fetch(url);
    //     // ...
    //   })();
    //
    // The named function approach is more readable and easier to debug.
    // -------------------------------------------------------------------------
    fetchPlaces();
  }, []);
  // ^^^^^^^^^^^
  // EMPTY DEPENDENCY ARRAY = Run only once after initial render

  // ===========================================================================
  // RENDER THE PLACES
  // ===========================================================================
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

// =============================================================================
// THE async/await PATTERN IN useEffect
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │  THE PATTERN:                                                           │
//   │                                                                         │
//   │  useEffect(() => {                                                      │
//   │                                                                         │
//   │    async function fetchData() {   // 1. Define async function          │
//   │      const response = await fetch(url);                                 │
//   │      const data = await response.json();                                │
//   │      setState(data);                                                    │
//   │    }                                                                    │
//   │                                                                         │
//   │    fetchData();                   // 2. Call it immediately             │
//   │                                                                         │
//   │  }, [dependencies]);                                                    │
//   │                                                                         │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// This is the standard pattern for using async/await in useEffect.
// You'll see this in virtually every React codebase that fetches data!
//
// =============================================================================

// =============================================================================
// WHY NOT USE IIFE (Immediately Invoked Function Expression)?
// =============================================================================
//
// You might see this alternative pattern:
//
//   useEffect(() => {
//     (async () => {
//       const response = await fetch(url);
//       const data = await response.json();
//       setState(data);
//     })();
//   }, []);
//
// This is valid but:
//   - Less readable
//   - Harder to give a meaningful name
//   - Harder to reuse or debug
//
// The named function approach is preferred:
//   - Clear intent: "fetchPlaces" describes what it does
//   - Easier to read and maintain
//   - Could be called multiple times if needed
//
// =============================================================================

// =============================================================================
// COMPARISON: .then() vs async/await
// =============================================================================
//
//   .then() chains:
//   ─────────────────────────────────────────────────────────────────────────
//   fetch('http://localhost:3000/places')
//     .then(response => response.json())
//     .then(resData => setAvailablePlaces(resData.places));
//
//   async/await:
//   ─────────────────────────────────────────────────────────────────────────
//   const response = await fetch('http://localhost:3000/places');
//   const resData = await response.json();
//   setAvailablePlaces(resData.places);
//
// Both do the same thing! async/await is:
//   ✓ More readable (looks like synchronous code)
//   ✓ Easier to understand the data flow
//   ✓ Better for complex async logic
//   ✓ Easier error handling with try/catch (coming in next lessons!)
//
// =============================================================================
