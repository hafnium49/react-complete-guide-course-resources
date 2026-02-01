/**
 * ============================================================================
 * pages/index.js - LESSON 486: THE STARTING PAGE (HOME PAGE)
 * ============================================================================
 *
 * From the instructor:
 * "For this demo application, for this project which we're building here,
 * we will need three pages. A starting page, which shows a list of all meetups."
 *
 * ============================================================================
 * 🎓 LESSON 486: ADDING FIRST PAGES TO THE PROJECT
 * ============================================================================
 *
 * This lesson covers creating the page structure for our meetup application.
 * We need three pages:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  THE THREE PAGES WE'RE CREATING                                          │
 * │                                                                          │
 * │  1. STARTING PAGE (THIS FILE)                                           │
 * │     • Route: / (domain.com/)                                            │
 * │     • File: pages/index.js                                              │
 * │     • Purpose: Shows list of all meetups                                │
 * │                                                                          │
 * │  2. NEW MEETUP PAGE                                                     │
 * │     • Route: /new-meetup                                                │
 * │     • File: pages/new-meetup/index.js                                   │
 * │     • Purpose: Form to add a new meetup                                 │
 * │                                                                          │
 * │  3. MEETUP DETAIL PAGE                                                  │
 * │     • Route: /[meetupId] (dynamic)                                      │
 * │     • File: pages/[meetupId]/index.js                                   │
 * │     • Purpose: Show details for a selected meetup                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📁 WHY index.js IN THE PAGES FOLDER?
 * ============================================================================
 *
 * From the instructor:
 * "I'll start with the starting page with index.js directly in the pages folder,
 * because you learned that index is this special file name which will be loaded
 * for just slash nothing in the given sub-folder. And here we're not in a
 * sub-folder at all, so index.js will be loaded for our-domain.com slash nothing."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE PATH TO URL MAPPING                                                │
 * │                                                                          │
 * │  pages/index.js         →  /                                            │
 * │  pages/about.js         →  /about                                       │
 * │  pages/blog/index.js    →  /blog                                        │
 * │  pages/blog/[slug].js   →  /blog/my-post                                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * The "index.js" file is special:
 * • In /pages/ → loads at /
 * • In /pages/folder/ → loads at /folder
 *
 * ============================================================================
 * 🚀 GETTING STARTED (FIRST STEPS)
 * ============================================================================
 *
 * From the instructor:
 * "First of all, we need to install all dependencies though with npm install
 * and then we can use npm run dev. And then we'll start the development server,
 * but of course at the moment I got no pages."
 *
 * Steps to run this project:
 * 1. cd into the project directory
 * 2. npm install (install all dependencies)
 * 3. npm run dev (start development server)
 * 4. Open http://localhost:3000 in browser
 *
 * ============================================================================
 * 📝 WHAT THIS PAGE WILL DO
 * ============================================================================
 *
 * This starting page will:
 * • Display a list of all meetups
 * • Use the MeetupList component we examined in Lesson 485
 * • Later: fetch meetup data using NextJS data fetching methods
 *
 * ============================================================================
 * 🔜 UPCOMING IN LATER LESSONS
 * ============================================================================
 *
 * From the instructor:
 * "And hence we can now get started working on those pages. We can fill those
 * components with some life, and then also step-by-step add data fetching
 * and learn how NextJS helps us with that."
 *
 * What we'll add later:
 * • Import and use Layout component for consistent navigation
 * • Import and use MeetupList to display meetups
 * • Add getStaticProps for data fetching at build time
 * • Connect to a database (MongoDB) to store real meetup data
 *
 * ============================================================================
 */

/**
 * HomePage Component - The Main Landing Page
 *
 * This is the entry point of our application.
 * Currently a placeholder - will be enhanced in upcoming lessons.
 *
 * URL: http://localhost:3000/
 *
 * FUTURE IMPLEMENTATION:
 * ```javascript
 * import Layout from '../components/layout/Layout';
 * import MeetupList from '../components/meetups/MeetupList';
 *
 * function HomePage(props) {
 *   return (
 *     <Layout>
 *       <MeetupList meetups={props.meetups} />
 *     </Layout>
 *   );
 * }
 *
 * export async function getStaticProps() {
 *   // Fetch data from database
 *   return { props: { meetups: [...] } };
 * }
 * ```
 */
function HomePage() {
  return <h1>The Home Page</h1>;
}

export default HomePage;
