/**
 * ============================================================================
 * useHttp CUSTOM HOOK - REUSABLE HTTP REQUEST LOGIC
 * ============================================================================
 *
 * This custom hook encapsulates all the logic for making HTTP requests,
 * including loading states, error handling, and data management.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Creating custom hooks for reusable logic
 * 2. Managing async operations with loading/error states
 * 3. Using useCallback to memoize functions
 * 4. Automatic GET request execution on mount
 * 5. Manual POST/PUT/DELETE request triggering
 *
 * WHY A CUSTOM HOOK?
 * ==================
 * Without this hook, every component that fetches data would need:
 * - useState for data
 * - useState for loading
 * - useState for error
 * - useEffect to trigger the fetch
 * - Try/catch for error handling
 *
 * This is a lot of boilerplate to repeat. A custom hook:
 * - Reduces code duplication
 * - Ensures consistent behavior
 * - Makes components cleaner
 * - Centralizes HTTP logic
 *
 * USAGE EXAMPLES:
 * ===============
 * GET request (automatic):
 * const { data, isLoading, error } = useHttp('/api/meals', {}, []);
 *
 * POST request (manual):
 * const { data, sendRequest, isLoading } = useHttp('/api/orders', { method: 'POST', headers: {...} });
 * sendRequest(JSON.stringify(orderData));
 */

import { useCallback, useEffect, useState } from 'react';

/**
 * SEND HTTP REQUEST HELPER
 * ========================
 * This is a pure async function (not a hook) that handles the actual
 * HTTP request. It's extracted to keep the hook logic cleaner.
 *
 * WHY SEPARATE THIS FUNCTION?
 * ---------------------------
 * 1. Keeps the hook focused on state management
 * 2. This function is just about HTTP mechanics
 * 3. Easier to test in isolation
 * 4. Could be reused outside of React if needed
 *
 * @param {string} url - The URL to fetch
 * @param {Object} config - Fetch configuration (method, headers, body, etc.)
 * @returns {Promise<any>} The parsed JSON response
 * @throws {Error} If response is not OK (status 4xx or 5xx)
 */
async function sendHttpRequest(url, config) {
  /**
   * FETCH API
   * =========
   * fetch() is the modern browser API for making HTTP requests.
   * It returns a Promise that resolves to a Response object.
   *
   * The config object can include:
   * - method: 'GET', 'POST', 'PUT', 'DELETE'
   * - headers: { 'Content-Type': 'application/json' }
   * - body: JSON string of data to send
   */
  const response = await fetch(url, config);

  /**
   * PARSE JSON RESPONSE
   * ===================
   * response.json() parses the response body as JSON.
   * This also returns a Promise, hence the await.
   *
   * We parse the response BEFORE checking if it's OK because:
   * - Error responses often include useful JSON data (error messages)
   * - We want to include that data in our error handling
   */
  const resData = await response.json();

  /**
   * ERROR HANDLING
   * ==============
   * response.ok is true for status codes 200-299.
   * If false (4xx or 5xx), we throw an error.
   *
   * We use the message from the server if available, otherwise
   * provide a generic message.
   *
   * Throwing an error here will be caught by the try/catch in sendRequest.
   */
  if (!response.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request.'
    );
  }

  return resData;
}

/**
 * useHttp CUSTOM HOOK
 * ===================
 * A reusable hook for making HTTP requests with loading and error states.
 *
 * HOOK RULES:
 * -----------
 * Custom hooks must:
 * - Start with "use" (useHttp, useState, useEffect, etc.)
 * - Only be called at the top level of components or other hooks
 * - Can use other hooks inside them
 *
 * @param {string} url - The URL to fetch
 * @param {Object} config - Fetch configuration
 * @param {any} initialData - Initial value for data state
 *
 * @returns {Object} Hook return value
 * @returns {any} data - Response data
 * @returns {boolean} isLoading - True while request is in progress
 * @returns {string|undefined} error - Error message if request failed
 * @returns {Function} sendRequest - Function to trigger the request
 * @returns {Function} clearData - Function to reset data to initial value
 */
export default function useHttp(url, config, initialData) {
  /**
   * STATE MANAGEMENT
   * ================
   * We track three pieces of state:
   * - data: The response data (starts with initialData)
   * - isLoading: Whether a request is in progress
   * - error: Any error message from a failed request
   */
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  /**
   * CLEAR DATA FUNCTION
   * ===================
   * Resets data to the initial value.
   * Useful after successful operations (e.g., clear form data after submit).
   *
   * Used in Checkout.jsx after successful order submission.
   */
  function clearData() {
    setData(initialData);
  }

  /**
   * SEND REQUEST FUNCTION
   * =====================
   * This function actually sends the HTTP request.
   * It's wrapped in useCallback to prevent unnecessary re-creations.
   *
   * WHY useCallback?
   * ----------------
   * Without useCallback, a new sendRequest function would be created
   * on every render. This would cause the useEffect below to run on
   * every render (since sendRequest is in its dependency array).
   *
   * useCallback memoizes the function - it only creates a new function
   * when the dependencies (url, config) change.
   *
   * DEPENDENCY ARRAY: [url, config]
   * -------------------------------
   * sendRequest depends on url and config because it uses them to
   * make the request. If these change, we need a new function.
   *
   * @param {string} data - Request body data (for POST/PUT requests)
   */
  const sendRequest = useCallback(
    async function sendRequest(data) {
      /**
       * SET LOADING STATE
       * =================
       * Before starting the request, set isLoading to true.
       * Components can use this to show loading indicators.
       */
      setIsLoading(true);

      try {
        /**
         * MAKE THE REQUEST
         * ================
         * Call our helper function with the URL and config.
         * We spread the config and add the body data.
         *
         * { ...config, body: data }
         * - Copies all properties from config (method, headers, etc.)
         * - Adds/overwrites body with the data parameter
         *
         * For GET requests, data will be undefined and body will be ignored.
         */
        const resData = await sendHttpRequest(url, { ...config, body: data });

        /**
         * SUCCESS - UPDATE DATA
         * =====================
         * If request succeeds, store the response data.
         * This will trigger a re-render in consuming components.
         */
        setData(resData);
      } catch (error) {
        /**
         * ERROR - STORE ERROR MESSAGE
         * ===========================
         * If request fails, store the error message.
         * The error could come from:
         * - Network failure
         * - Our thrown error (non-OK response)
         * - JSON parsing error
         */
        setError(error.message || 'Something went wrong!');
      }

      /**
       * CLEAR LOADING STATE
       * ===================
       * Whether success or error, we're done loading.
       * This runs after either the try or catch block.
       */
      setIsLoading(false);
    },
    [url, config]
  );

  /**
   * AUTOMATIC GET REQUEST
   * =====================
   * For GET requests, we want to fetch data immediately when the
   * component mounts. This useEffect handles that.
   *
   * CONDITION:
   * ----------
   * We only auto-fetch if:
   * - config exists AND method is 'GET' OR method is undefined (default is GET)
   * - OR config doesn't exist at all
   *
   * This means:
   * - useHttp('/meals', {}) → Auto-fetch (GET)
   * - useHttp('/meals', { method: 'GET' }) → Auto-fetch (GET)
   * - useHttp('/orders', { method: 'POST' }) → Don't auto-fetch
   *
   * For POST/PUT/DELETE, the component must call sendRequest manually.
   *
   * DEPENDENCY ARRAY: [sendRequest, config]
   * ---------------------------------------
   * - sendRequest: Function to call (memoized, so stable)
   * - config: To re-check the condition if config changes
   */
  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  /**
   * RETURN VALUE
   * ============
   * Return an object with all the state and functions.
   *
   * Components destructure what they need:
   * const { data, isLoading, error } = useHttp(...);
   * const { sendRequest, isLoading } = useHttp(...);
   */
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * CUSTOM HOOKS:
 * =============
 * Custom hooks let you extract component logic into reusable functions.
 *
 * Rules:
 * - Name must start with "use"
 * - Can call other hooks inside
 * - Share logic, not state (each component gets its own state)
 *
 * HOOK RETURN PATTERN:
 * ====================
 * Return an object with named properties:
 * return { data, isLoading, error, sendRequest };
 *
 * This allows consumers to destructure only what they need.
 *
 * useCallback:
 * ============
 * Memoizes a function to prevent unnecessary re-creations.
 *
 * Without: New function every render → useEffect runs every render
 * With: Same function until deps change → useEffect runs only when needed
 *
 * LOADING/ERROR STATE PATTERN:
 * ============================
 * The three-state pattern for async operations:
 * - isLoading: true while in progress
 * - error: set if operation failed
 * - data: set if operation succeeded
 *
 * This pattern allows components to show appropriate UI for each state.
 *
 * USAGE IN COMPONENTS:
 * ====================
 *
 * GET Request (Meals.jsx):
 * ------------------------
 * const { data: meals, isLoading, error } = useHttp('/meals', {}, []);
 * // Automatically fetches on mount
 * // Show loading, error, or meals based on state
 *
 * POST Request (Checkout.jsx):
 * ----------------------------
 * const { sendRequest, isLoading, error } = useHttp('/orders', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' }
 * });
 * // Call sendRequest(JSON.stringify(data)) when form is submitted
 * // Show loading state while submitting
 */
