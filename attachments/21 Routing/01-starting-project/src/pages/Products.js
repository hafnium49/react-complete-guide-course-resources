/**
 * ============================================================================
 * PRODUCTS PAGE COMPONENT (Lessons 347, 349)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 347):
 * "So let's add more pages. And for that I'm first of all going to add another
 * component to the pages folder. And I'll name it 'Products JS.'"
 *
 * ============================================================================
 * NAVIGATION WITH LINK COMPONENT (Lesson 349)
 * ============================================================================
 *
 * Just like in Home.js, we use the Link component here for navigation.
 * This ensures users can navigate back to the home page without:
 * - Sending a new HTTP request
 * - Reloading the entire application
 * - Losing application state
 *
 * See Home.js for detailed explanation of Link vs anchor tags.
 */

import { Link } from 'react-router-dom';

/**
 * PRODUCTS PAGE COMPONENT:
 * ========================
 * INSTRUCTOR QUOTE (Lesson 347):
 * "Here I'll add a products page, but it will still just be a dummy page,
 * without any actual real content on it."
 *
 * This component demonstrates:
 * 1. A page component rendered by React Router
 * 2. Using Link for navigation back to home
 */
function ProductsPage() {
  return (
    <>
      <h1>The Products Page</h1>

      {/**
       * LINK BACK TO HOME (Lesson 349):
       * ================================
       * Using Link component for client-side navigation.
       *
       * The 'to' attribute specifies the path:
       * - "/" means the root path (home page)
       * - This matches the path defined in App.js route configuration
       *
       * INSTRUCTOR QUOTE (Lesson 349):
       * "That is how we should navigate between pages with react-router-dom."
       */}
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </>
  );
}

export default ProductsPage;
