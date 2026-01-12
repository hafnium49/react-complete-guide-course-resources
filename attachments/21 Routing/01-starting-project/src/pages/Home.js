/**
 * ============================================================================
 * HOME PAGE COMPONENT (Lesson 346)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 346):
 * "I'll add a folder named pages here to this project to hold the components
 * that will be loaded as pages by the router."
 *
 * WHY A PAGES FOLDER?
 * ===================
 * INSTRUCTOR QUOTE:
 * "These components that are loaded as pages by the router, typically they're
 * not put into a components folder, because all the other components are in
 * there, which are not page-level components."
 *
 * Organization convention:
 * - /pages/     - Components loaded by routes (page-level)
 * - /components/ - Reusable UI components (not page-level)
 *
 * This separation makes it clear which components are:
 * - Directly rendered by routes (pages)
 * - Reused across multiple pages (components)
 *
 * ============================================================================
 * THE HOME PAGE (Lesson 346)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Here we could then add a Home.js file that contains our homepage component."
 *
 * This is a simple page component that will be:
 * 1. Imported in App.js
 * 2. Used as the `element` for a route
 * 3. Rendered when the route path matches
 */

/**
 * HOME COMPONENT:
 * ===============
 * INSTRUCTOR QUOTE:
 * "Just a very simple function, which for the moment just contains an h1 tag
 * where it says My Home Page."
 *
 * This component will be rendered when the user visits the root path (/).
 * In later lessons, this will be expanded with more content and navigation.
 */
function HomePage() {
  return <h1>My Home Page</h1>;
}

export default HomePage;
