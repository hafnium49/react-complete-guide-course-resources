// =============================================================================
// FETCHING DATA FROM A BACKEND - Using fetch() and useEffect
// =============================================================================
// This component demonstrates how to fetch data from a backend API in React.
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
// THE FETCH API
// =============================================================================
//
// fetch() is a BUILT-IN browser function (not from React!) for sending
// HTTP requests. Despite the name, it can both FETCH and SEND data.
//
// Basic syntax:
//   fetch(url)                    // GET request (default)
//   fetch(url, { method: 'POST', body: ... })  // POST request
//
// Key points about fetch():
//   1. Returns a PROMISE (not the data itself!)
//   2. By default, sends a GET request
//   3. Works with any backend that speaks HTTP
//   4. Built into all modern browsers
//
// =============================================================================

// =============================================================================
// PROMISES - A Quick Refresher
// =============================================================================
//
// A Promise is a JavaScript object that represents a value that will
// eventually be available (or an error if something goes wrong).
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │                    PROMISE LIFECYCLE                                    │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │                                                                         │
//   │   fetch(url)  ──────>  Promise (pending)                               │
//   │                              │                                          │
//   │                              │ (network request in progress...)        │
//   │                              │                                          │
//   │                              ▼                                          │
//   │                        ┌─────────────┐                                  │
//   │                        │  resolved   │ ──> .then(data => ...)          │
//   │                        │     OR      │                                  │
//   │                        │  rejected   │ ──> .catch(error => ...)        │
//   │                        └─────────────┘                                  │
//   │                                                                         │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// Think of a Promise as a "wrapper" around a value that's not there YET
// but WILL be there eventually (like a package being delivered).
//
// =============================================================================

// =============================================================================
// PROMISE CHAINING with .then()
// =============================================================================
//
// The .then() method lets you specify what to do when a Promise resolves:
//
//   fetch(url)
//     .then(response => {
//       // This function runs LATER, when the response arrives
//       // NOT immediately after calling fetch()!
//       return response.json();  // Also returns a Promise!
//     })
//     .then(data => {
//       // This runs after response.json() resolves
//       console.log(data);
//     });
//
// Each .then() returns a NEW Promise, allowing you to chain them.
// This is called "Promise chaining".
//
// =============================================================================

// =============================================================================
// ASYNC/AWAIT - Alternative Syntax (NOT usable in component functions!)
// =============================================================================
//
// Modern JavaScript has async/await for cleaner Promise handling:
//
//   async function fetchData() {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   }
//
// BUT: React DOES NOT allow async component functions!
//
//   ❌ async function AvailablePlaces() { ... }  // NOT ALLOWED!
//
// This is a restriction imposed by React because:
// - Component functions must return JSX synchronously
// - React needs to render immediately, not wait for data
//
// We CAN use async/await inside useEffect (we'll see this later).
//
// =============================================================================

// =============================================================================
// JSON - The Data Format
// =============================================================================
//
// JSON (JavaScript Object Notation) is the standard format for API data.
// It looks like JavaScript objects/arrays, but:
//   - All keys MUST be wrapped in double quotes
//   - It's a TEXT format (string), not actual JavaScript
//
// Example from backend/data/places.json:
//   {
//     "places": [
//       { "id": "p1", "title": "Forest Waterfall", ... },
//       { "id": "p2", "title": "Grand Canyon", ... }
//     ]
//   }
//
// response.json() PARSES this text into actual JavaScript objects.
//
// =============================================================================

// =============================================================================
// THE INFINITE LOOP PROBLEM
// =============================================================================
//
// ❌ WRONG - Calling fetch directly in component function:
//
//   function AvailablePlaces() {
//     fetch('http://localhost:3000/places')
//       .then(response => response.json())
//       .then(data => setAvailablePlaces(data.places));  // Updates state!
//
//     return <Places places={availablePlaces} />;
//   }
//
// This creates an INFINITE LOOP:
//
//   ┌──────────────────────────────────────────────────────────────────────────┐
//   │                     THE INFINITE LOOP                                   │
//   │                                                                          │
//   │   Component renders ──> fetch() called ──> response arrives             │
//   │         ▲                                         │                      │
//   │         │                                         ▼                      │
//   │         └────────────── setState() ◄──────────────┘                     │
//   │                     (triggers re-render!)                                │
//   │                                                                          │
//   │   This loops FOREVER until your browser crashes!                        │
//   └──────────────────────────────────────────────────────────────────────────┘
//
// The cycle:
//   1. Component function executes
//   2. fetch() is called
//   3. Response arrives, setState() is called
//   4. State update triggers re-render
//   5. Component function executes AGAIN
//   6. fetch() is called AGAIN
//   7. ...and so on, infinitely!
//
// SOLUTION: useEffect with an empty dependency array []
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
  // useEffect - THE SOLUTION TO THE INFINITE LOOP
  // ===========================================================================
  // useEffect lets us run "side effects" (like HTTP requests) in a controlled way.
  //
  // Why useEffect solves the infinite loop:
  // ─────────────────────────────────────────────────────────────────────────
  // 1. The effect function runs AFTER the component renders
  // 2. The dependency array [] means "only run once, after initial render"
  // 3. Even though setState triggers a re-render, the effect WON'T run again
  //    because the dependencies haven't changed (there are none!)
  //
  // The flow with useEffect:
  //   1. Component renders (with empty places)
  //   2. useEffect runs ONCE after render
  //   3. fetch() sends request
  //   4. Response arrives, setState() updates state
  //   5. Component re-renders with data
  //   6. useEffect does NOT run again (deps unchanged)
  //   7. No infinite loop!
  //
  // ===========================================================================
  useEffect(() => {
    // -------------------------------------------------------------------------
    // SENDING THE HTTP REQUEST
    // -------------------------------------------------------------------------
    // fetch() is a built-in browser function for HTTP requests.
    //
    // The URL breakdown:
    //   http://localhost:3000  - The backend server address
    //   /places                - The API endpoint (defined in backend/app.js)
    //
    // By default, fetch() sends a GET request, which is what we need
    // to retrieve (fetch) data from the server.
    // -------------------------------------------------------------------------
    fetch('http://localhost:3000/places')
      // -----------------------------------------------------------------------
      // FIRST .then() - Handle the Response Object
      // -----------------------------------------------------------------------
      // When the server responds, we get a Response object.
      // This object contains:
      //   - status code (200, 404, 500, etc.)
      //   - headers
      //   - body (the actual data, but not directly accessible)
      //
      // response.json() extracts and PARSES the JSON body.
      // It returns ANOTHER Promise (hence the second .then()).
      // -----------------------------------------------------------------------
      .then((response) => {
        return response.json();
      })
      // -----------------------------------------------------------------------
      // SECOND .then() - Handle the Parsed Data
      // -----------------------------------------------------------------------
      // Now we have the actual JavaScript data (parsed from JSON).
      //
      // Our backend returns: { places: [...] }
      // So we access resData.places to get the array.
      //
      // We then update state with this data, which triggers a re-render
      // and displays the places to the user!
      // -----------------------------------------------------------------------
      .then((resData) => {
        setAvailablePlaces(resData.places);
      });
  }, []);
  // ^^^^^^^^^^^
  // EMPTY DEPENDENCY ARRAY = Run only once after initial render
  //
  // If we had dependencies like [someValue]:
  //   - Effect would run on mount AND whenever someValue changes
  //
  // With no dependencies []:
  //   - Effect runs ONLY on mount (like componentDidMount in class components)

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
// THE COMPLETE DATA FLOW
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │  1. INITIAL RENDER                                                      │
//   │     • availablePlaces = [] (empty)                                     │
//   │     • User sees "No places available"                                  │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │  2. AFTER RENDER - useEffect RUNS                                      │
//   │     • fetch('http://localhost:3000/places') is called                  │
//   │     • Request travels to backend server                                │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │  3. BACKEND RESPONDS                                                    │
//   │     • First .then(): response.json() parses the JSON                   │
//   │     • Second .then(): we get { places: [...] }                         │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │  4. STATE UPDATE                                                        │
//   │     • setAvailablePlaces(resData.places) is called                     │
//   │     • React schedules a re-render                                       │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │  5. RE-RENDER WITH DATA                                                 │
//   │     • availablePlaces now contains the fetched places                  │
//   │     • User sees the list of places!                                    │
//   │     • useEffect does NOT run again (deps unchanged)                    │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// =============================================================================

// =============================================================================
// SUMMARY: fetch() + useEffect Pattern
// =============================================================================
//
// This is the standard pattern for fetching data in React:
//
//   const [data, setData] = useState(initialValue);
//
//   useEffect(() => {
//     fetch(url)
//       .then(response => response.json())
//       .then(data => setData(data));
//   }, []);  // Empty array = run once on mount
//
// Key points:
//   1. fetch() is a browser API, not React
//   2. fetch() returns a Promise
//   3. .then() chains let you handle async results
//   4. response.json() parses JSON (also returns a Promise!)
//   5. useEffect prevents infinite loops
//   6. Empty dependency array [] = run only once
//
// =============================================================================
