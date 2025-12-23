// =============================================================================
// ERROR COMPONENT - Displaying Error Messages to Users
// =============================================================================
// This component displays error information to users in a user-friendly way.
// It's used when HTTP requests fail or other errors occur.
//
// IMPORTANT NAMING NOTE:
// ─────────────────────────────────────────────────────────────────────────────
// When importing this component, use a different name like "ErrorPage":
//
//   import ErrorPage from './Error.jsx';
//
// Why? Because "Error" is a GLOBAL built-in JavaScript class!
//
//   const err = new Error('Something went wrong');  // Built-in Error class
//
// If you import this component as "Error", it will SHADOW (override) the
// global Error class in that file, which can cause confusion and bugs.
//
// GOOD:
//   import ErrorPage from './Error.jsx';
//   <ErrorPage title="..." message="..." />
//
// RISKY:
//   import Error from './Error.jsx';       // Shadows global Error!
//   const err = new Error('...');          // Now refers to your component!
//
// =============================================================================

// =============================================================================
// WHY DO WE NEED AN ERROR COMPONENT?
// =============================================================================
//
// When fetching data, things can go wrong:
//   - Server is down
//   - Network connection lost
//   - Invalid response from server
//   - Timeout
//   - User is offline
//
// Without error handling, the app might:
//   - Crash completely
//   - Show a blank page
//   - Get stuck on "Loading..." forever
//
// With this Error component, we can:
//   - Show a friendly error message
//   - Explain what went wrong
//   - Give users an action to take (retry, go back, etc.)
//
// =============================================================================

// =============================================================================
// USAGE EXAMPLE (in AvailablePlaces.jsx - coming in next lesson)
// =============================================================================
//
//   import ErrorPage from './Error.jsx';
//
//   // In your component:
//   const [error, setError] = useState(null);
//
//   // In your fetch function:
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error('Failed to fetch places');
//     }
//     // ...
//   } catch (error) {
//     setError(error);
//   }
//
//   // In your JSX:
//   if (error) {
//     return <ErrorPage title="An error occurred!" message={error.message} />;
//   }
//
// =============================================================================

// =============================================================================
// PROPS
// =============================================================================
//
//   title     - The error title (e.g., "An error occurred!")
//   message   - Detailed error message (e.g., "Failed to fetch places")
//   onConfirm - Optional: Callback when user clicks "Okay" button
//               If not provided, no button is shown
//
// =============================================================================

export default function Error({ title, message, onConfirm }) {
  return (
    <div className="error">
      {/* -------------------------------------------------------------------
          ERROR TITLE
          -------------------------------------------------------------------
          A brief, user-friendly headline for the error.
          Examples:
            - "An error occurred!"
            - "Something went wrong"
            - "Failed to load data"
      ------------------------------------------------------------------- */}
      <h2>{title}</h2>

      {/* -------------------------------------------------------------------
          ERROR MESSAGE
          -------------------------------------------------------------------
          More details about what went wrong.
          This often comes from error.message in a catch block.
          Examples:
            - "Failed to fetch places. Please try again later."
            - "Could not connect to the server."
            - "Network request failed"
      ------------------------------------------------------------------- */}
      <p>{message}</p>

      {/* -------------------------------------------------------------------
          OPTIONAL CONFIRM BUTTON
          -------------------------------------------------------------------
          Only rendered if onConfirm prop is provided.
          This allows the parent component to handle user acknowledgment.

          Use cases:
            - Close an error modal
            - Retry the failed operation
            - Navigate away from the error state

          The && operator is a common React pattern for conditional rendering:
            {condition && <Element />}
          Only renders <Element /> if condition is truthy.
      ------------------------------------------------------------------- */}
      {onConfirm && (
        <div id="confirmation-actions">
          <button onClick={onConfirm} className="button">
            Okay
          </button>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// THE COMPLETE ERROR HANDLING PATTERN
// =============================================================================
//
// In the next lesson, we'll implement this full pattern:
//
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);        // NEW!
//
//   useEffect(() => {
//     async function fetchData() {
//       setIsLoading(true);
//       setError(null);                              // Clear previous errors
//
//       try {
//         const response = await fetch(url);
//
//         if (!response.ok) {                        // Check for HTTP errors
//           throw new Error('Failed to fetch data');
//         }
//
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         setError(err);                             // Store the error
//       }
//
//       setIsLoading(false);
//     }
//     fetchData();
//   }, []);
//
//   // Render error state if there's an error
//   if (error) {
//     return <ErrorPage title="An error occurred!" message={error.message} />;
//   }
//
// =============================================================================

// =============================================================================
// WHY CHECK response.ok?
// =============================================================================
//
// IMPORTANT: fetch() does NOT throw an error for HTTP error codes!
//
//   fetch('http://example.com/not-found')  // Returns 404
//     .then(response => {
//       // This runs! fetch() "succeeded" (got a response)
//       // Even though it's a 404 error!
//     })
//     .catch(error => {
//       // This only runs for NETWORK errors
//       // NOT for 404, 500, or other HTTP errors!
//     });
//
// The response.ok property is true only for status codes 200-299.
// We must check it manually and throw an error if it's false:
//
//   if (!response.ok) {
//     throw new Error('Request failed');
//   }
//
// This is a common gotcha with the fetch API!
//
// =============================================================================

// =============================================================================
// NAMING CONFLICTS IN JAVASCRIPT
// =============================================================================
//
// JavaScript has several global built-in objects you should avoid shadowing:
//
//   Error      - Error class for creating error objects
//   Object     - Object constructor
//   Array      - Array constructor
//   String     - String constructor
//   Number     - Number constructor
//   Boolean    - Boolean constructor
//   Function   - Function constructor
//   Date       - Date class
//   Promise    - Promise class
//   Map, Set   - Collection classes
//   JSON       - JSON parsing/stringifying
//
// If you name a component or variable the same as these, you'll shadow
// the global and lose access to the built-in functionality in that file.
//
// Best practice: Use descriptive names that don't conflict:
//   Error      → ErrorPage, ErrorMessage, ErrorDisplay
//   Object     → ObjectDisplay, DataObject
//   Array      → ArrayDisplay, ItemList
//
// =============================================================================
