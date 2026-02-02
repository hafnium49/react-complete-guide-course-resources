/**
 * ============================================================================
 * pages/[meetupId]/index.js - LESSON 486 & 491: DYNAMIC MEETUP DETAIL PAGE
 * ============================================================================
 *
 * LESSON 486: Created this dynamic page file using the folder approach
 * LESSON 491: Added MeetupDetail component for presenting meetup information
 *
 * ============================================================================
 * 🎓 LESSON 486: DYNAMIC PAGES AND DYNAMIC FOLDERS
 * ============================================================================
 *
 * From the instructor:
 * "And for this, we need a dynamic page because of course we'll have multiple
 * meetups with different IDs and the ID should be part of the URL, and then
 * when we load the page we want to use that ID to fetch and to display the
 * appropriate data."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  DYNAMIC URL EXAMPLES                                                    │
 * │                                                                          │
 * │  /m1              →  meetupId = "m1"                                    │
 * │  /m2              →  meetupId = "m2"                                    │
 * │  /first-meetup    →  meetupId = "first-meetup"                          │
 * │  /abc123          →  meetupId = "abc123"                                │
 * │                                                                          │
 * │  ALL these URLs are handled by THIS SINGLE FILE!                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📁 DYNAMIC FOLDER NAMES
 * ============================================================================
 *
 * From the instructor:
 * "We can create a dynamic page with square brackets and then .js, and then
 * simply use any identifier name of our choice between the square brackets.
 * For example, meetupId."
 *
 * TWO WAYS TO CREATE DYNAMIC PAGES:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  OPTION 1: DYNAMIC FILE                                                  │
 * │  pages/[meetupId].js    →  Route: /:meetupId                           │
 * │                                                                          │
 * │  OPTION 2: DYNAMIC FOLDER (USED HERE)                                    │
 * │  pages/[meetupId]/index.js  →  Route: /:meetupId                       │
 * │                                                                          │
 * │  The FOLDER name uses square brackets!                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "Here we could also use the sub-folder approach. It also is available for
 * dynamic pages. We could also create a folder named meetupId between square
 * brackets, and move that file in there and then it index.js."
 *
 * ============================================================================
 * 🎓 LESSON 491: KEEPING PAGE COMPONENTS LEAN
 * ============================================================================
 *
 * From the instructor:
 * "Now for that, we can of course start outputting that content here in that
 * MeetupDetails function. But I actually wanna outsource that into a separate
 * component, because it is a good practice to keep your page component files
 * pretty lean and outsource the actual JSX code, the actual markup, into
 * separate standalone component files."
 *
 * KEY PRINCIPLE:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PAGE COMPONENTS VS PRESENTATIONAL COMPONENTS                            │
 * │                                                                          │
 * │  PAGE COMPONENT (this file):                                            │
 * │  • Lives in /pages folder                                                │
 * │  • Handles data fetching (getStaticProps, etc.)                         │
 * │  • Defines routes                                                        │
 * │  • Should be LEAN - minimal JSX                                         │
 * │  • Passes data to presentational components                             │
 * │                                                                          │
 * │  PRESENTATIONAL COMPONENT (MeetupDetail.js):                            │
 * │  • Lives in /components folder                                          │
 * │  • Contains the actual markup/JSX                                       │
 * │  • Receives data via props                                              │
 * │  • Has its own styling (CSS Module)                                     │
 * │  • Reusable across multiple pages                                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔗 DATA FLOW ARCHITECTURE
 * ============================================================================
 *
 * In the final implementation, data flows like this:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  [URL Parameter]                                                        │
 * │       │                                                                  │
 * │       │  meetupId from URL (e.g., "m1")                                 │
 * │       ▼                                                                  │
 * │  [getStaticProps / getServerSideProps]                                  │
 * │       │                                                                  │
 * │       │  Fetches meetup data from database                              │
 * │       ▼                                                                  │
 * │  [MeetupDetails Page Component] (this file)                             │
 * │       │                                                                  │
 * │       │  Passes data as props                                           │
 * │       ▼                                                                  │
 * │  [MeetupDetail Presentational Component]                                │
 * │       │                                                                  │
 * │       │  Renders the markup with styling                                │
 * │       ▼                                                                  │
 * │  [User sees the meetup details]                                         │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📝 CURRENT STATUS (DUMMY DATA)
 * ============================================================================
 *
 * Currently, this page uses DUMMY DATA for demonstration.
 * In upcoming lessons, we will:
 *
 * 1. Add getStaticProps() to fetch real data from database
 * 2. Add getStaticPaths() to define which paths to pre-generate
 * 3. Connect to MongoDB for persistent storage
 * 4. Use the meetupId from URL to fetch specific meetup
 *
 * For now, we just display hardcoded data to verify the component works.
 *
 * ============================================================================
 * 🔜 FUTURE IMPLEMENTATION (UPCOMING LESSONS)
 * ============================================================================
 *
 * The page will eventually look like this:
 *
 * ```javascript
 * export async function getStaticPaths() {
 *   // Fetch all meetup IDs from database
 *   const meetups = await getAllMeetups();
 *   return {
 *     paths: meetups.map(m => ({ params: { meetupId: m.id } })),
 *     fallback: false
 *   };
 * }
 *
 * export async function getStaticProps(context) {
 *   const meetupId = context.params.meetupId;
 *   const meetup = await getMeetupById(meetupId);
 *   return {
 *     props: { meetupData: meetup }
 *   };
 * }
 * ```
 *
 * ============================================================================
 * 📂 RELATED FILES
 * ============================================================================
 *
 *   /components/meetups/
 *   ├── MeetupDetail.js         ← Presentational component (used here)
 *   └── MeetupDetail.module.css ← Scoped styles for MeetupDetail
 *
 *   /pages/
 *   └── [meetupId]/
 *       └── index.js            ← THIS FILE (page component)
 *
 * ============================================================================
 */

/**
 * Import the MeetupDetail presentational component
 *
 * From the instructor:
 * "So therefore I will add a new component in the Meetups folder, and that
 * will be the MeetupDetail component."
 *
 * This component handles all the JSX/markup for displaying meetup details.
 * We keep this page file lean by outsourcing the presentation to MeetupDetail.
 *
 * Path breakdown:
 * - We're in: /pages/[meetupId]/index.js
 * - Go up 2 levels: ../../ (to project root)
 * - Then: components/meetups/MeetupDetail
 */
import MeetupDetail from '../../components/meetups/MeetupDetail';

/**
 * MeetupDetails - Page Component for Individual Meetup
 *
 * This is a PAGE COMPONENT (in the pages folder), responsible for:
 * - Being the route handler for /:meetupId URLs
 * - Eventually fetching data (getStaticProps)
 * - Passing data to presentational components
 *
 * From the instructor:
 * "But I actually wanna outsource that into a separate component, because
 * it is a good practice to keep your page component files pretty lean and
 * outsource the actual JSX code, the actual markup, into separate standalone
 * component files."
 *
 * URL: http://localhost:3000/[meetupId]
 * Examples:
 *   - http://localhost:3000/m1
 *   - http://localhost:3000/first-meetup
 */
function MeetupDetails() {
  /**
   * RENDER THE MEETUP DETAIL COMPONENT
   *
   * From the instructor:
   * "Now for that, we can of course start outputting that content here in that
   * MeetupDetails function. But I actually wanna outsource that into a separate
   * component..."
   *
   * We pass the meetup data as individual props to MeetupDetail.
   *
   * CURRENT: Using dummy/hardcoded data
   * FUTURE: Data will come from getStaticProps, fetched from database
   *
   * The MeetupDetail component receives:
   * - image: URL of the meetup image
   * - title: Name of the meetup
   * - address: Physical location
   * - description: What the meetup is about
   */
  return (
    <MeetupDetail
      image='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg'
      title='A First Meetup'
      address='Some Street 5, Some City'
      description='This is a first meetup!'
    />
  );
}

/**
 * Export the page component
 *
 * Default export is REQUIRED for NextJS page components.
 * NextJS uses the default export to render the page.
 */
export default MeetupDetails;
