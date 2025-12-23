// =============================================================================
// FETCHING DATA FROM A BACKEND - Introduction
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
// SYNCHRONOUS vs ASYNCHRONOUS DATA FETCHING
// =============================================================================
//
// LOCAL STORAGE (Synchronous):
// ─────────────────────────────────────────────────────────────────────────────
//   const places = localStorage.getItem('places');
//   // Data is available IMMEDIATELY - no waiting!
//   // This works because localStorage is in the browser's memory
//
// HTTP REQUEST (Asynchronous):
// ─────────────────────────────────────────────────────────────────────────────
//   fetch('http://localhost:3000/places')
//   // Data is NOT available immediately!
//   // The request must:
//   //   1. Travel through the network to the server
//   //   2. Server processes the request
//   //   3. Server sends back a response
//   //   4. Response travels back through the network
//   // This takes milliseconds or even seconds!
//
// =============================================================================

// =============================================================================
// WHY WE CAN'T FETCH DATA DIRECTLY IN COMPONENT FUNCTION
// =============================================================================
//
// You might think we could do this:
//
//   function AvailablePlaces() {
//     const response = fetch('http://localhost:3000/places');  // ❌ Won't work!
//     const places = response.json();
//     return <Places places={places} />;
//   }
//
// This DOESN'T work because:
//
//   1. fetch() returns a PROMISE, not the data itself
//   2. Component functions execute instantly in one single step
//   3. The function doesn't "wait" for the HTTP request to complete
//   4. By the time the data arrives, the function has already returned!
//
// SOLUTION: Use useState + useEffect
//   1. Start with empty/default data (useState)
//   2. Send the HTTP request (useEffect)
//   3. When data arrives, update the state
//   4. React re-renders the component with the new data
//
// =============================================================================

import { useState } from 'react';

import Places from './Places.jsx';

// =============================================================================
// AVAILABLE PLACES COMPONENT
// =============================================================================
// This component fetches and displays places that users can select.
// The data comes from our backend API, not from the React project itself.
// =============================================================================
export default function AvailablePlaces({ onSelectPlace }) {
  // ===========================================================================
  // STATE FOR FETCHED DATA
  // ===========================================================================
  // We use useState to manage the places data.
  //
  // IMPORTANT: We start with an EMPTY ARRAY as the initial value!
  //
  // Why empty array?
  // ─────────────────────────────────────────────────────────────────────────
  // 1. The HTTP request hasn't been sent yet
  // 2. Even after sending, the response takes time to arrive
  // 3. We need to render SOMETHING while waiting for the data
  // 4. An empty array allows the component to render without errors
  //
  // The data flow will be:
  //   1. Component renders with empty array (shows "No places available")
  //   2. HTTP request is sent to backend
  //   3. Data arrives from backend
  //   4. State is updated with the fetched data
  //   5. Component RE-RENDERS with the actual places
  //
  // ===========================================================================
  const [availablePlaces, setAvailablePlaces] = useState([]);

  // ===========================================================================
  // UPCOMING: FETCH DATA FROM BACKEND
  // ===========================================================================
  // In the next lesson, we'll add useEffect to fetch data:
  //
  //   useEffect(() => {
  //     fetch('http://localhost:3000/places')
  //       .then(response => response.json())
  //       .then(data => setAvailablePlaces(data.places));
  //   }, []);
  //
  // The useEffect hook is perfect for this because:
  // - It runs AFTER the component renders
  // - We can send HTTP requests (side effects) inside it
  // - We can update state when the response arrives
  // ===========================================================================

  // ===========================================================================
  // RENDER THE PLACES
  // ===========================================================================
  // Initially, availablePlaces is an empty array, so fallbackText is shown.
  // Once data is fetched and state is updated, the actual places will appear.
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
// SUMMARY: FETCHING DATA IN REACT
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │  STEP 1: Initial Render                                                │
//   │    • Component renders with empty state                                │
//   │    • User sees loading state or fallback                               │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │  STEP 2: Fetch Data (useEffect)                                        │
//   │    • Send HTTP request to backend                                      │
//   │    • Request travels through network                                   │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │  STEP 3: Receive Response                                              │
//   │    • Backend sends JSON data                                           │
//   │    • Parse the response                                                │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │  STEP 4: Update State                                                  │
//   │    • Call setState with the fetched data                               │
//   │    • Triggers a re-render                                              │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │  STEP 5: Re-render with Data                                           │
//   │    • Component renders again with actual data                          │
//   │    • User sees the fetched content                                     │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// =============================================================================

// =============================================================================
// KEY TAKEAWAYS
// =============================================================================
//
// 1. HTTP requests are ASYNCHRONOUS - they take time!
// 2. Component functions execute INSTANTLY - they don't wait
// 3. Use useState with empty initial value to handle "no data yet" state
// 4. Use useEffect to send HTTP requests after component mounts
// 5. Update state when data arrives to trigger a re-render
// 6. The UI updates automatically when state changes (React's job!)
//
// =============================================================================
