// =============================================================================
// HTTP UTILITY FUNCTIONS - Reusable Data Fetching Logic
// =============================================================================
//
// This file contains utility functions for making HTTP requests.
// By extracting HTTP logic into a separate file, we achieve:
//
//   1. SEPARATION OF CONCERNS
//      - Components focus on UI and state management
//      - HTTP logic is isolated in its own module
//      - Easier to understand and maintain each part
//
//   2. REUSABILITY
//      - Same fetch function can be used by multiple components
//      - No code duplication across the app
//      - Change the API URL in one place, affects everywhere
//
//   3. TESTABILITY
//      - HTTP functions can be unit tested independently
//      - Mock the module in component tests
//      - Test error handling without touching components
//
//   4. CLEANER COMPONENTS
//      - Components become leaner and more readable
//      - Focus on what to do with data, not how to fetch it
//      - Reduced cognitive load when reading component code
//
// =============================================================================

// =============================================================================
// COMMON PATTERNS FOR ORGANIZING HTTP CODE
// =============================================================================
//
// There are several ways to organize HTTP/API code in React apps:
//
// 1. UTILITY FILE (this approach)
//    - Simple functions in a file like http.js or api.js
//    - Good for small to medium apps
//    - Easy to understand
//
// 2. API SERVICE CLASS
//    - Class with methods for each endpoint
//    - Can store base URL, auth tokens, etc.
//    - Good for larger apps with many endpoints
//
//    class ApiService {
//      constructor(baseUrl) { this.baseUrl = baseUrl; }
//      async getPlaces() { ... }
//      async updatePlace(id, data) { ... }
//    }
//
// 3. CUSTOM HOOKS
//    - useFetch, useApi hooks that handle loading/error states
//    - Combines fetching logic with React state
//    - We'll learn about this later!
//
// 4. LIBRARIES
//    - React Query, SWR, Apollo (GraphQL)
//    - Handle caching, refetching, optimistic updates
//    - Best for complex data requirements
//
// For learning purposes, the utility file approach is perfect!
//
// =============================================================================

// =============================================================================
// FETCH AVAILABLE PLACES
// =============================================================================
// This function fetches the list of available places from our backend API.
//
// WHY IS THIS AN ASYNC FUNCTION?
// --------------------------------
// We mark it with `async` because:
//   1. We use `await` inside it (for fetch and response.json)
//   2. Async functions ALWAYS return a Promise
//
// This is important! Even though we `return resData.places` (an array),
// the caller receives a Promise that resolves to that array.
//
//   // Inside this function:
//   return resData.places;  // Looks like we return an array
//
//   // But for the caller:
//   const places = await fetchAvailablePlaces();  // Must await!
//   // OR
//   fetchAvailablePlaces().then(places => { ... });  // Or use .then()
//
// =============================================================================
export async function fetchAvailablePlaces() {
  // ---------------------------------------------------------------------------
  // STEP 1: SEND THE HTTP REQUEST
  // ---------------------------------------------------------------------------
  // fetch() returns a Promise that resolves to a Response object.
  // We await it to pause execution until the response arrives.
  //
  // Note: We're using the full URL including http://localhost:3000
  // In a real app, you might use:
  //   - Environment variables: process.env.REACT_APP_API_URL
  //   - A base URL constant: const API_BASE = 'http://localhost:3000'
  //   - Relative URLs if frontend and backend are on same domain
  // ---------------------------------------------------------------------------
  const response = await fetch('http://localhost:3000/places');

  // ---------------------------------------------------------------------------
  // STEP 2: CHECK FOR HTTP ERRORS
  // ---------------------------------------------------------------------------
  // Remember: fetch() doesn't throw for HTTP errors (404, 500, etc.)
  // We must check response.ok manually and throw if it's false.
  //
  // This throw will:
  //   1. Exit this function immediately
  //   2. Reject the Promise returned by this async function
  //   3. Be caught by try-catch in the calling code
  //
  // The error propagates UP to whoever called fetchAvailablePlaces().
  // ---------------------------------------------------------------------------
  if (!response.ok) {
    throw new Error('Failed to fetch places.');
  }

  // ---------------------------------------------------------------------------
  // STEP 3: PARSE THE JSON RESPONSE
  // ---------------------------------------------------------------------------
  // response.json() also returns a Promise, so we await it.
  // This parses the response body as JSON and returns a JavaScript object.
  //
  // Our backend returns: { places: [...] }
  // So resData.places is the array we want.
  // ---------------------------------------------------------------------------
  const resData = await response.json();

  // ---------------------------------------------------------------------------
  // STEP 4: RETURN THE DATA
  // ---------------------------------------------------------------------------
  // We return just the places array, not the whole response object.
  // This makes the function's return value clean and predictable.
  //
  // The caller gets exactly what they need: an array of places.
  //
  // IMPORTANT: Because this is an async function, this return statement
  // actually resolves the Promise that the function returns.
  //
  //   return resData.places;
  //   // Is equivalent to:
  //   return Promise.resolve(resData.places);
  //
  // ---------------------------------------------------------------------------
  return resData.places;
}

// =============================================================================
// HOW ERRORS PROPAGATE FROM THIS FUNCTION
// =============================================================================
//
// When an error occurs in this function (either thrown or from fetch):
//
//   1. The async function's Promise is REJECTED
//   2. The error propagates to the calling code
//   3. It can be caught with try-catch (if using await) or .catch()
//
// Example of how errors flow:
//
//   // In http.js:
//   export async function fetchAvailablePlaces() {
//     if (!response.ok) {
//       throw new Error('Failed!');  // Error thrown here
//     }
//   }
//
//   // In AvailablePlaces.jsx:
//   try {
//     const places = await fetchAvailablePlaces();  // Called here
//   } catch (error) {
//     // Error caught here!
//     console.log(error.message);  // "Failed!"
//   }
//
// This is why we can still use try-catch in AvailablePlaces.jsx
// even though the actual fetch code is now in this file.
//
// =============================================================================

// =============================================================================
// EXTENDING THIS FILE
// =============================================================================
//
// As your app grows, you can add more functions here:
//
//   export async function fetchPlaceById(id) {
//     const response = await fetch(`http://localhost:3000/places/${id}`);
//     if (!response.ok) throw new Error('Failed to fetch place.');
//     const resData = await response.json();
//     return resData.place;
//   }
//
//   export async function updateUserPlaces(places) {
//     const response = await fetch('http://localhost:3000/user-places', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ places })
//     });
//     if (!response.ok) throw new Error('Failed to update places.');
//     const resData = await response.json();
//     return resData.message;
//   }
//
// Common patterns:
//   - Each endpoint gets its own function
//   - Functions handle request/response details
//   - Components just call functions and handle returned data
//
// =============================================================================

// =============================================================================
// DRY PRINCIPLE: DON'T REPEAT YOURSELF
// =============================================================================
//
// Before extracting to http.js:
//
//   // Component A:
//   const response = await fetch('http://localhost:3000/places');
//   if (!response.ok) throw new Error('Failed...');
//   const data = await response.json();
//
//   // Component B (needs same data):
//   const response = await fetch('http://localhost:3000/places');  // Same!
//   if (!response.ok) throw new Error('Failed...');                // Same!
//   const data = await response.json();                            // Same!
//
// After extracting to http.js:
//
//   // Component A:
//   const places = await fetchAvailablePlaces();
//
//   // Component B:
//   const places = await fetchAvailablePlaces();
//
// Benefits:
//   - Less code in each component
//   - Bug fix in one place fixes everywhere
//   - API URL change in one place
//   - Consistent error handling
//
// =============================================================================
