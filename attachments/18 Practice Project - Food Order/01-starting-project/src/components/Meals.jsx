/**
 * ============================================================================
 * MEALS COMPONENT - FETCHING AND DISPLAYING MEALS
 * ============================================================================
 *
 * This component is responsible for fetching meal data from the backend
 * and displaying it in a responsive grid layout.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Fetching data from a backend API using a custom hook
 * 2. Handling loading, error, and success states
 * 3. Rendering lists of data with proper keys
 * 4. Component composition (Meals contains MealItem components)
 *
 * DATA FLOW:
 * ==========
 * 1. Component mounts
 * 2. useHttp hook sends GET request to /meals
 * 3. While loading: Show "Fetching meals..." message
 * 4. If error: Show Error component
 * 5. If success: Render grid of MealItem components
 *
 * BACKEND API:
 * ============
 * GET http://localhost:3000/meals
 *
 * Response:
 * [
 *   {
 *     "id": "m1",
 *     "name": "Mac & Cheese",
 *     "price": "8.99",
 *     "description": "Creamy cheddar cheese...",
 *     "image": "images/mac-and-cheese.jpg"
 *   },
 *   ...
 * ]
 */

/**
 * IMPORTS
 * =======
 * - useHttp: Custom hook for HTTP requests (handles loading/error/data states)
 * - MealItem: Component for rendering individual meal cards
 * - Error: Component for displaying error messages
 */
import useHttp from '../hooks/useHttp.js';
import MealItem from './MealItem.jsx';
import Error from './Error.jsx';

/**
 * REQUEST CONFIG
 * ==============
 * Configuration object for the HTTP request.
 *
 * WHY DEFINE THIS OUTSIDE THE COMPONENT?
 * --------------------------------------
 * If we defined this inside the component:
 * const requestConfig = {};
 *
 * A new object would be created on every render. Even though both
 * objects have the same content (empty), they're different objects
 * in memory ({ } !== { }).
 *
 * This would cause useHttp's useEffect to run on every render because
 * 'config' is in its dependency array and it sees a "new" config object.
 *
 * By defining it outside, we use the SAME object reference every time,
 * preventing unnecessary re-fetches.
 *
 * EMPTY OBJECT = GET REQUEST:
 * ---------------------------
 * When config is empty (or just has method: 'GET'), useHttp automatically
 * sends the request when the component mounts.
 */
const requestConfig = {};

/**
 * MEALS COMPONENT
 * ===============
 * Fetches and displays all available meals from the backend.
 *
 * This component handles three states:
 * 1. LOADING: Displays a loading message
 * 2. ERROR: Displays an error component with the error message
 * 3. SUCCESS: Displays a grid of MealItem components
 */
export default function Meals() {
  /**
   * USING THE CUSTOM HTTP HOOK
   * ==========================
   * useHttp abstracts all the HTTP logic:
   * - Sending the request
   * - Tracking loading state
   * - Catching errors
   * - Storing response data
   *
   * Parameters:
   * - url: The endpoint to fetch from
   * - requestConfig: Configuration (method, headers, etc.)
   * - initialData: Initial value for data (empty array)
   *
   * Returns:
   * - data: Response data (renamed to loadedMeals)
   * - isLoading: Boolean, true while request is in progress
   * - error: Error message if request failed
   *
   * DESTRUCTURING WITH RENAME:
   * --------------------------
   * { data: loadedMeals } extracts 'data' and renames it to 'loadedMeals'.
   * This makes the code more semantic - we're working with meals, not generic data.
   */
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  /**
   * LOADING STATE
   * =============
   * While the request is in progress, show a loading message.
   *
   * Early return pattern:
   * - If isLoading is true, render loading message and exit
   * - This prevents trying to render meals that don't exist yet
   *
   * CSS class "center" centers the text (defined in index.css).
   */
  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  /**
   * ERROR STATE
   * ===========
   * If the request failed, show an error message.
   *
   * The Error component displays:
   * - title: A headline describing the error
   * - message: The actual error message from the backend or hook
   *
   * This could happen if:
   * - Backend is not running
   * - Network error
   * - Server returns an error status
   */
  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  /**
   * SUCCESS STATE
   * =============
   * If we reach this point:
   * - isLoading is false (request completed)
   * - error is undefined/null (no error occurred)
   * - loadedMeals contains the array of meals from the backend
   *
   * RENDERING THE MEALS:
   * --------------------
   * We use an unordered list (<ul>) with id="meals" for CSS styling.
   *
   * The CSS rules for #meals (from index.css):
   * - display: grid
   * - grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr))
   * - gap: 1rem
   *
   * This creates a responsive grid that adjusts columns based on screen width.
   */
  return (
    <ul id="meals">
      {/*
        MAPPING MEALS TO COMPONENTS
        ===========================
        We use Array.map() to transform each meal object into a MealItem component.

        For each meal in loadedMeals array:
        1. Create a MealItem component
        2. Pass the meal data as a prop
        3. Use meal.id as the key for React's reconciliation

        KEY PROP:
        ---------
        key={meal.id}

        The key prop is CRUCIAL for React's performance:
        - Helps React identify which items changed/added/removed
        - Must be unique among siblings
        - Should be stable (same item = same key every render)

        Using meal.id (from backend) is perfect because:
        - It's unique (each meal has a different ID)
        - It's stable (same meal always has same ID)
        - It's from the data itself (not array index)

        BAD: key={index} - can cause bugs when array order changes
        BAD: key={Math.random()} - different every render, defeats purpose
        GOOD: key={meal.id} - unique and stable

        MEAL PROP:
        ----------
        meal={meal}

        We pass the entire meal object to MealItem. The object contains:
        - id: Unique identifier
        - name: Display name
        - price: Price value
        - description: Meal description
        - image: Image path
      */}
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * COMPONENT RESPONSIBILITIES:
 * ===========================
 * This component has a clear single responsibility:
 * - Fetch meals from backend
 * - Handle loading/error states
 * - Display meals in a grid
 *
 * It delegates individual meal display to MealItem component.
 *
 * CUSTOM HOOKS FOR DATA FETCHING:
 * ===============================
 * Using a custom hook (useHttp) for data fetching:
 * - Keeps component code clean
 * - Reusable across components
 * - Centralizes HTTP logic
 * - Handles loading/error states consistently
 *
 * CONDITIONAL RENDERING PATTERN:
 * ==============================
 * The "guard clause" pattern with early returns:
 *
 * if (isLoading) return <Loading />;
 * if (error) return <Error />;
 * return <Success />;
 *
 * This is cleaner than nested ternaries:
 * return isLoading ? <Loading /> : error ? <Error /> : <Success />
 *
 * LIST RENDERING:
 * ===============
 * array.map(item => <Component key={item.id} data={item} />)
 *
 * Remember:
 * - Always use a key prop
 * - Use unique, stable identifiers (not array indices)
 * - Pass data as props to child components
 *
 * CSS GRID LAYOUT:
 * ================
 * The #meals ID connects to CSS rules that create a responsive grid:
 * - Cards automatically arrange in rows
 * - Number of columns adjusts to screen width
 * - Minimum card width of 20rem
 * - 1rem gap between cards
 */
