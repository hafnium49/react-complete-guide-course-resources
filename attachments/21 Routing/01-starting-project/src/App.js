/**
 * ============================================================================
 * APP COMPONENT - Root Component for Routing (Lesson 345)
 * ============================================================================
 *
 * SECTION 21: REACT ROUTER
 * ========================
 * This section teaches how to implement client-side routing in React using
 * the react-router-dom package.
 *
 * ============================================================================
 * WHAT IS ROUTING? (Lesson 345)
 * ============================================================================
 *
 * Routing is the feature of:
 * - Watching the URL in the browser
 * - Loading different content based on the URL path
 * - Allowing users to navigate between different "pages" without full reloads
 *
 * INSTRUCTOR QUOTE (Lesson 345):
 * "This Routing functionality, this feature of watching the URL and loading
 * different content is not built into React."
 *
 * ============================================================================
 * WHY USE A ROUTING LIBRARY? (Lesson 345)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Whilst we could try to write our own logic, our own router, so to say,
 * that would be rather complex because there are a lot of nuances and features
 * you might wanna have to properly support these URL changes and different
 * use cases."
 *
 * That's why we use react-router-dom - it handles all the complexity for us!
 *
 * ============================================================================
 * INSTALLING REACT ROUTER (Lesson 345)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "We'll install an extra package with npm install here in the terminal and
 * we'll install the react-router-dom package."
 *
 * INSTALLATION COMMAND:
 * ====================
 * npm install react-router-dom
 *
 * ABOUT THE PACKAGE (Lesson 345):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "This react-router-dom package belongs to the React Router tool. And you can
 * visit reactrouter.com to learn all about this tool and this package."
 *
 * DOCUMENTATION: https://reactrouter.com
 *
 * INSTRUCTOR QUOTE:
 * "Here you can learn about all its features and behaviors and its entire API,
 * so all the functionalities exposed by this package."
 *
 * ============================================================================
 * THREE STEPS TO ADD ROUTING (Lesson 345)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "This is actually a multi-step process."
 *
 * STEP 1: DEFINE ROUTES
 * =====================
 * INSTRUCTOR QUOTE:
 * "The first step, is that we must define the routes we wanna support, so we
 * must define which URLs, which paths we wanna support, and which components
 * should be loaded for different paths."
 *
 * Example:
 * | Path        | Component to Load |
 * |-------------|-------------------|
 * | /           | HomePage          |
 * | /products   | ProductsPage      |
 * | /about      | AboutPage         |
 *
 * STEP 2: ACTIVATE THE ROUTER
 * ===========================
 * INSTRUCTOR QUOTE:
 * "The second step is to activate our router and load the route definitions
 * that we defined in the first step."
 *
 * This is done by wrapping your app with a Router provider component.
 *
 * STEP 3: COMPONENTS & NAVIGATION
 * ===============================
 * INSTRUCTOR QUOTE:
 * "The third step of course, is to make sure that we have all these components
 * that we do wanna load and that we maybe also provide some means of navigating
 * between those pages so that our users can move smoothly between the different
 * pages."
 *
 * This includes:
 * - Creating page components for each route
 * - Adding navigation links (Link, NavLink components)
 * - Handling navigation programmatically (useNavigate hook)
 *
 * ============================================================================
 * PROJECT STRUCTURE (Lesson 345)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "It is a very simple project created with create-react-app, and it doesn't
 * contain a lot of content, just some basic styles with which we can work and
 * an empty root component, the app component."
 *
 * INSTRUCTOR QUOTE:
 * "We'll use this project to learn about the basics of Routing before we then
 * later in this course section we'll also build a slightly more realistic
 * project and use more advanced Routing features."
 *
 * Current project structure:
 * src/
 *   App.js      <- THIS FILE: Root component (empty for now)
 *   index.js    <- Entry point
 *   index.css   <- Basic styles
 *
 * ============================================================================
 * WHAT WE'LL BUILD IN THIS SECTION
 * ============================================================================
 *
 * Basic Routing Features (coming in next lessons):
 * - Route definitions with createBrowserRouter
 * - RouterProvider for activating routes
 * - Page components for different routes
 * - Link and NavLink for navigation
 * - Dynamic routes with parameters
 * - Nested routes and layouts
 * - Error handling with errorElement
 *
 * Advanced Routing Features (later lessons):
 * - Data loading with loaders
 * - Form handling with actions
 * - Deferred loading and Suspense
 * - Protected routes
 * - And more!
 */

/**
 * APP COMPONENT (Lesson 345):
 * ===========================
 * INSTRUCTOR QUOTE:
 * "An empty root component, the app component."
 *
 * This component is currently empty. In the next lessons, we'll:
 * 1. Define routes using createBrowserRouter
 * 2. Wrap this with RouterProvider
 * 3. Add page components and navigation
 */
function App() {
  return <div></div>;
}

export default App;
