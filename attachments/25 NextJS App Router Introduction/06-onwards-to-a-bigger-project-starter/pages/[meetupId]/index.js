/**
 * ============================================================================
 * pages/[meetupId]/index.js - LESSON 486: DYNAMIC MEETUP DETAIL PAGE
 * ============================================================================
 *
 * From the instructor:
 * "And then we also need this detail page which we load if a specific meetup
 * was clicked, and we want to view the details of that meetup."
 *
 * ============================================================================
 * 🎓 LESSON 486: DYNAMIC PAGES AND DYNAMIC FOLDERS
 * ============================================================================
 *
 * This is a DYNAMIC page - the URL contains a variable segment (the meetup ID).
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
 * 📁 DYNAMIC FOLDER NAMES (NEW CONCEPT!)
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
 * │                                                                          │
 * │  pages/                                                                  │
 * │  └── [meetupId].js    →  Route: /:meetupId                              │
 * │                                                                          │
 * │  The filename uses square brackets.                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  OPTION 2: DYNAMIC FOLDER (USED HERE)                                    │
 * │                                                                          │
 * │  pages/                                                                  │
 * │  └── [meetupId]/                                                        │
 * │      └── index.js     →  Route: /:meetupId                              │
 * │                                                                          │
 * │  The FOLDER name uses square brackets!                                  │
 * │  This allows for nested routes within the dynamic segment.              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "Here we could also use the sub-folder approach. It also is available for
 * dynamic pages. We could also create a folder named meetupId between square
 * brackets, and move that file in there and then it index.js. And that also
 * works. That's something we haven't seen before, and that's why I'm showing
 * it to you here because it is always important to be aware of the fact that
 * you can also have dynamic folder names here, and then create dynamic nested
 * pages if you need them. Or, like in this case, one single dynamic page."
 *
 * ============================================================================
 * 🆕 DYNAMIC FOLDERS - WHY THIS IS IMPORTANT
 * ============================================================================
 *
 * With a dynamic FOLDER, you could create nested routes like:
 *
 *   pages/[meetupId]/
 *   ├── index.js        →  /:meetupId          (meetup details)
 *   ├── edit.js         →  /:meetupId/edit     (edit this meetup)
 *   ├── attendees.js    →  /:meetupId/attendees (list of attendees)
 *   └── comments/
 *       └── index.js    →  /:meetupId/comments (comments section)
 *
 * Example URLs:
 * • /m1           - View meetup m1 details
 * • /m1/edit      - Edit meetup m1
 * • /m1/attendees - See who's attending m1
 * • /m1/comments  - View comments on m1
 *
 * ============================================================================
 * 🔑 ACCESSING THE DYNAMIC VALUE
 * ============================================================================
 *
 * To access the meetupId value in this component:
 *
 * ```javascript
 * import { useRouter } from 'next/router';
 *
 * function MeetupDetails() {
 *   const router = useRouter();
 *   const meetupId = router.query.meetupId;
 *   // meetupId will be "m1", "m2", "abc123", etc.
 * }
 * ```
 *
 * The property name (meetupId) matches the folder/file name in brackets.
 *
 * ============================================================================
 * 📝 WHAT THIS PAGE WILL DO
 * ============================================================================
 *
 * This page will:
 * • Extract the meetupId from the URL
 * • Fetch the specific meetup data from the database
 * • Display the meetup details using MeetupDetail component
 *
 * ============================================================================
 * 🔜 FUTURE IMPLEMENTATION
 * ============================================================================
 *
 * In upcoming lessons, this page will look like:
 *
 * ```javascript
 * import Layout from '../../components/layout/Layout';
 * import MeetupDetail from '../../components/meetups/MeetupDetail';
 *
 * function MeetupDetails(props) {
 *   return (
 *     <Layout>
 *       <MeetupDetail
 *         image={props.meetupData.image}
 *         title={props.meetupData.title}
 *         address={props.meetupData.address}
 *         description={props.meetupData.description}
 *       />
 *     </Layout>
 *   );
 * }
 *
 * export async function getStaticPaths() {
 *   // Define which dynamic paths to pre-generate
 *   return {
 *     paths: [
 *       { params: { meetupId: 'm1' } },
 *       { params: { meetupId: 'm2' } }
 *     ],
 *     fallback: false
 *   };
 * }
 *
 * export async function getStaticProps(context) {
 *   const meetupId = context.params.meetupId;
 *   // Fetch meetup data from database
 *   return { props: { meetupData: {...} } };
 * }
 * ```
 *
 * ============================================================================
 * 📂 FINAL PAGE STRUCTURE (LESSON 486)
 * ============================================================================
 *
 * From the instructor:
 * "And with that we got the page structure we want with those three pages."
 *
 *   /pages/
 *   ├── _app.js                    (root app component)
 *   │
 *   ├── index.js                   (home page)
 *   │   └── Route: /
 *   │   └── Shows: List of all meetups
 *   │
 *   ├── /new-meetup/
 *   │   └── index.js               (add meetup page)
 *   │       └── Route: /new-meetup
 *   │       └── Shows: Form to create meetup
 *   │
 *   └── /[meetupId]/
 *       └── index.js               ← THIS FILE (detail page)
 *           └── Route: /:meetupId (dynamic)
 *           └── Shows: Single meetup details
 *
 * ============================================================================
 * 🎯 WHAT'S NEXT?
 * ============================================================================
 *
 * From the instructor:
 * "And hence we can now get started working on those pages. We can fill those
 * components with some life, and then also step-by-step add data fetching
 * and learn how NextJS helps us with that."
 *
 * Upcoming lessons will cover:
 * 1. Filling these pages with actual components
 * 2. Adding data fetching (getStaticProps, getStaticPaths)
 * 3. Creating API routes for backend functionality
 * 4. Connecting to a database (MongoDB)
 *
 * ============================================================================
 */

/**
 * MeetupDetails Component - Dynamic Page for Individual Meetup
 *
 * This component displays the details of a specific meetup.
 * The meetup is identified by the URL parameter (meetupId).
 *
 * URL: http://localhost:3000/[meetupId]
 * Examples:
 *   - http://localhost:3000/m1
 *   - http://localhost:3000/first-meetup
 *   - http://localhost:3000/abc123
 *
 * NOTE: This is a placeholder. The actual implementation will be
 * added in upcoming lessons where we'll:
 * 1. Use useRouter to get the meetupId from URL
 * 2. Fetch meetup data using getStaticProps
 * 3. Define pre-generated paths using getStaticPaths
 * 4. Render the MeetupDetail component with fetched data
 */
function MeetupDetails() {
  return <h1>The Meetup Detail Page</h1>;
}

export default MeetupDetails;
