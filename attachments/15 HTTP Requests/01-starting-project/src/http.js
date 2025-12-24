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
//
//   2. REUSABILITY
//      - Same fetch function can be used by multiple components
//      - No code duplication across the app
//
//   3. TESTABILITY
//      - HTTP functions can be unit tested independently
//
//   4. CLEANER COMPONENTS
//      - Components become leaner and more readable
//
// =============================================================================

// =============================================================================
// HTTP METHODS OVERVIEW
// =============================================================================
//
// HTTP defines several REQUEST METHODS (also called "verbs"):
//
//   GET     - Retrieve data (default for fetch)
//   POST    - Create new data
//   PUT     - Update/replace existing data
//   PATCH   - Partially update existing data
//   DELETE  - Remove data
//
// These methods tell the server what KIND of operation you want to perform.
//
// For fetch(), the default method is GET. To use others, you must specify
// the method in the configuration object:
//
//   fetch(url);                           // GET (default)
//   fetch(url, { method: 'POST' });       // POST
//   fetch(url, { method: 'PUT' });        // PUT
//   fetch(url, { method: 'DELETE' });     // DELETE
//
// =============================================================================

// =============================================================================
// FETCH AVAILABLE PLACES (GET Request)
// =============================================================================
// Fetches the list of available places from our backend API.
// This is a simple GET request - no body, no special headers needed.
// =============================================================================
export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');

  if (!response.ok) {
    throw new Error('Failed to fetch places.');
  }

  const resData = await response.json();
  return resData.places;
}

// =============================================================================
// FETCH USER PLACES (GET Request)
// =============================================================================
// Fetches the USER'S saved places from the backend.
//
// This is almost identical to fetchAvailablePlaces, but:
//   - Uses a different endpoint: /user-places instead of /places
//   - Returns the user's personally saved places, not all available places
//
// WHY DUPLICATE THE FUNCTION?
// ---------------------------
// You might wonder: "Why not just have one function with a parameter?"
//
//   export async function fetchPlaces(endpoint) {
//     const response = await fetch(`http://localhost:3000/${endpoint}`);
//     ...
//   }
//
// That would work! But separate functions are often clearer because:
//   - Each function has a specific, descriptive name
//   - Error messages can be tailored to each use case
//   - If the endpoints diverge in the future, changes are isolated
//   - IDE autocomplete shows exactly what operations are available
//
// Both approaches are valid. For a small app like this, either works.
// For larger apps, you might create a more generic function and wrap it.
// =============================================================================
export async function fetchUserPlaces() {
  // Same pattern as fetchAvailablePlaces, different endpoint
  const response = await fetch('http://localhost:3000/user-places');

  if (!response.ok) {
    throw new Error('Failed to fetch user places.');
  }

  const resData = await response.json();
  return resData.places;
}

// =============================================================================
// UPDATE USER PLACES (PUT Request)
// =============================================================================
//
// This function sends the user's selected places to the backend to be stored.
// Unlike fetchAvailablePlaces (which just GETs data), this function:
//   - Changes data on the server (requires PUT method)
//   - Sends data IN the request (requires body)
//   - Must tell the server what format the data is in (requires headers)
//
// =============================================================================
//
// SENDING DATA WITH fetch() - THE THREE KEY PROPERTIES
// =====================================================
//
// When sending data to a server, you need to configure THREE things:
//
//   1. METHOD: What operation are you performing?
//      - 'GET' (default) - Just fetching data, no body needed
//      - 'POST' - Creating new data
//      - 'PUT' - Replacing/updating data (what we use here)
//      - 'PATCH' - Partially updating data
//      - 'DELETE' - Removing data
//
//   2. BODY: What data are you sending?
//      - Must be a STRING (JSON, form data, etc.)
//      - JavaScript objects/arrays must be CONVERTED to JSON first
//      - Use JSON.stringify() to convert JS → JSON string
//
//   3. HEADERS: Metadata about the request
//      - 'Content-Type' tells the server the format of the body
//      - 'application/json' means "I'm sending JSON data"
//      - Without this, the server might not parse the data correctly!
//
// =============================================================================
//
// JSON.stringify() - CONVERTING JS TO JSON
// =========================================
//
// JavaScript objects/arrays are NOT directly sendable over HTTP.
// They must be converted to a STRING format first.
//
// JSON (JavaScript Object Notation) is a text format that looks like JS:
//
//   JavaScript:          JSON string:
//   { name: "Bob" }  →  '{"name":"Bob"}'
//   [1, 2, 3]        →  '[1,2,3]'
//
// JSON.stringify() converts JS → JSON string:
//   const obj = { name: "Bob", age: 25 };
//   const json = JSON.stringify(obj);
//   // json = '{"name":"Bob","age":25}'
//
// JSON.parse() converts JSON string → JS:
//   const json = '{"name":"Bob"}';
//   const obj = JSON.parse(json);
//   // obj = { name: "Bob" }
//
// Note: response.json() does JSON.parse() for us automatically!
//
// =============================================================================
export async function updateUserPlaces(places) {
  // ---------------------------------------------------------------------------
  // SENDING A PUT REQUEST WITH DATA
  // ---------------------------------------------------------------------------
  // fetch() accepts a second argument: a configuration object.
  // This lets us customize the request beyond a simple GET.
  // ---------------------------------------------------------------------------
  const response = await fetch('http://localhost:3000/user-places', {
    // -------------------------------------------------------------------------
    // METHOD: Specify the HTTP method
    // -------------------------------------------------------------------------
    // Our backend expects a PUT request for updating user places.
    // PUT means "replace the resource with this new data".
    //
    // If we don't specify method, fetch() defaults to 'GET'.
    // GET requests are for reading data, not writing it!
    // -------------------------------------------------------------------------
    method: 'PUT',

    // -------------------------------------------------------------------------
    // BODY: The data to send
    // -------------------------------------------------------------------------
    // The body must be a STRING, not a JavaScript object.
    // We use JSON.stringify() to convert our data to JSON format.
    //
    // IMPORTANT: Our backend expects the data in a specific format:
    //   { places: [...] }
    //
    // NOT just the array directly:
    //   [...] ← This would cause an error!
    //
    // This is a common gotcha! Always check what format your API expects.
    //
    // We use the shorthand { places } which is the same as { places: places }
    // -------------------------------------------------------------------------
    body: JSON.stringify({ places }),

    // -------------------------------------------------------------------------
    // HEADERS: Metadata about the request
    // -------------------------------------------------------------------------
    // Headers provide additional information about the request.
    //
    // 'Content-Type': 'application/json'
    //   - Tells the server: "The body of this request is JSON formatted"
    //   - The server uses this to know HOW to parse the body
    //   - Without it, the server might fail to understand the data!
    //
    // Other common Content-Type values:
    //   - 'application/x-www-form-urlencoded' (HTML form data)
    //   - 'multipart/form-data' (file uploads)
    //   - 'text/plain' (plain text)
    // -------------------------------------------------------------------------
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // ---------------------------------------------------------------------------
  // CHECK FOR ERRORS
  // ---------------------------------------------------------------------------
  // Just like with GET requests, we must check response.ok for HTTP errors.
  // -------------------------------------------------------------------------
  if (!response.ok) {
    throw new Error('Failed to update user data.');
  }

  // ---------------------------------------------------------------------------
  // PARSE AND RETURN THE RESPONSE
  // ---------------------------------------------------------------------------
  // Our backend returns: { message: "User places updated!" }
  // We return just the message string.
  //
  // In this app, we won't actually use this return value,
  // but it's good practice to return the server's response.
  // ---------------------------------------------------------------------------
  const resData = await response.json();
  return resData.message;
}

// =============================================================================
// COMPARISON: GET vs PUT REQUEST
// =============================================================================
//
//   GET REQUEST (fetchAvailablePlaces):
//   -----------------------------------
//   fetch('http://localhost:3000/places')
//
//   - No configuration needed (GET is default)
//   - No body (we're just requesting data)
//   - No Content-Type (nothing to describe)
//
//
//   PUT REQUEST (updateUserPlaces):
//   --------------------------------
//   fetch('http://localhost:3000/user-places', {
//     method: 'PUT',
//     body: JSON.stringify({ places }),
//     headers: { 'Content-Type': 'application/json' }
//   })
//
//   - Must specify method
//   - Must include body with data
//   - Must set Content-Type header
//
// =============================================================================

// =============================================================================
// THE FULL FETCH CONFIGURATION OBJECT
// =============================================================================
//
// fetch() accepts many configuration options:
//
//   fetch(url, {
//     method: 'POST',              // HTTP method
//     body: JSON.stringify(data),  // Request body
//     headers: {                   // Request headers
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer token123'
//     },
//     credentials: 'include',      // Include cookies
//     mode: 'cors',                // CORS mode
//     cache: 'no-cache',           // Cache mode
//     redirect: 'follow',          // Redirect handling
//     signal: abortController.signal  // For cancellation
//   });
//
// For most cases, you only need: method, body, headers
//
// =============================================================================

// =============================================================================
// ERROR HANDLING FOR PUT/POST REQUESTS
// =============================================================================
//
// Errors in PUT/POST requests can occur for many reasons:
//
//   1. NETWORK ERRORS
//      - No internet connection
//      - Server is down
//      → fetch() throws, caught by try-catch
//
//   2. HTTP ERRORS (response.ok is false)
//      - 400 Bad Request (invalid data format)
//      - 401 Unauthorized (not logged in)
//      - 403 Forbidden (no permission)
//      - 404 Not Found (wrong URL)
//      - 500 Server Error (server bug)
//      → We check response.ok and throw
//
//   3. JSON PARSING ERRORS
//      - Server returns invalid JSON
//      → response.json() throws
//
// Our pattern handles all these by:
//   1. Checking response.ok and throwing if false
//   2. Letting network/parsing errors propagate
//   3. Caller uses try-catch to handle all errors
//
// =============================================================================
