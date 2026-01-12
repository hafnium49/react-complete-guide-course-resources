/**
 * ============================================================================
 * HOME PAGE COMPONENT (Lesson 360 - Task 1 Solution)
 * ============================================================================
 *
 * TASK 1 SOLUTION (Lesson 360):
 * =============================
 * INSTRUCTOR QUOTE:
 * "I will of course start with task number one which requires me to add a
 * couple of pages here. And for that, I'll add a brand new folder, the pages
 * folder."
 *
 * INSTRUCTOR QUOTE:
 * "And in that folder here, I will add a HomePage.js file."
 *
 * FILE NAMING CONVENTION (Lesson 360):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "And actually, I'll remove the word page from the file names. We could also
 * leave it there, but since the folder is already named pages, I'll omit page
 * from the file name."
 *
 * So the file is named Home.jsx (not HomePage.jsx) because:
 * - The folder is already named "pages"
 * - Avoids redundancy (pages/Home.jsx vs pages/HomePage.jsx)
 * - Either naming convention works, this is a style choice
 *
 * SIMPLE PLACEHOLDER CONTENT (Lesson 360):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "And for the content, I'll just return a dummy h1 element as was requested
 * here in the task description because for the moment, the actual content
 * isn't too important, that is something we will work on throughout this
 * course section."
 *
 * INSTRUCTOR QUOTE:
 * "But for a start, I'll just output this h1 title with a text of HomePage."
 *
 * ============================================================================
 * ROUTE CONFIGURATION
 * ============================================================================
 *
 * This page is loaded by the index route (home route):
 *
 * {
 *   path: '/',
 *   element: <RootLayout />,
 *   children: [
 *     { index: true, element: <HomePage /> },  // ← This page
 *     ...
 *   ]
 * }
 *
 * URL: http://localhost:3000/
 *
 * ============================================================================
 */

/**
 * HOME PAGE COMPONENT:
 * ====================
 * The main landing page of the application.
 *
 * Currently displays placeholder content.
 * Will be enhanced with actual content in later lessons.
 */
function HomePage() {
  return <h1>HomePage</h1>;
}

export default HomePage;
