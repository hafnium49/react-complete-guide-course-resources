/**
 * ============================================================================
 * pages/index.js - LESSONS 486-495, 501 & 504: THE STARTING PAGE (HOME PAGE)
 * ============================================================================
 *
 * LESSON 486: Created this page file
 * LESSON 487: Filled this page with actual content (MeetupList + dummy data)
 * LESSON 492: Demonstrated the PROBLEM with client-side data fetching
 * LESSON 493: THE SOLUTION - getStaticProps for Static Generation
 * LESSON 494: Incremental Static Regeneration (ISR) with revalidate
 * LESSON 495: getServerSideProps - Server-Side Rendering alternative
 * LESSON 501: Replaced dummy data with real MongoDB queries in getStaticProps
 * LESSON 503: Added Head metadata (title + description) for SEO
 * LESSON 504: Deployment - how build process and ISR work in production
 *
 * ============================================================================
 * 🎓 LESSON 501: FETCHING DATA FROM MONGODB IN getStaticProps
 * ============================================================================
 *
 * This lesson demonstrates how to fetch real data from MongoDB directly
 * inside getStaticProps, rather than using dummy data or calling an
 * API route.
 *
 * ============================================================================
 * ❌ THE WRONG APPROACH: CALLING YOUR OWN API ROUTE
 * ============================================================================
 *
 * You might think the right approach is to:
 *   1. Create an API route (e.g., /api/meetups) that fetches data from MongoDB
 *   2. Use fetch('/api/meetups') inside getStaticProps to get that data
 *
 * This WORKS, but is REDUNDANT. Here's why:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  THE REDUNDANT APPROACH (don't do this):                                │
 * │                                                                          │
 * │  getStaticProps                                                          │
 * │    │                                                                     │
 * │    │  fetch('/api/meetups')  ← Sends HTTP request to yourself           │
 * │    ▼                                                                     │
 * │  API Route (/api/meetups)                                               │
 * │    │                                                                     │
 * │    │  MongoClient.connect(...)  ← Connects to MongoDB                   │
 * │    │  collection.find()         ← Fetches data                          │
 * │    ▼                                                                     │
 * │  Returns JSON response                                                  │
 * │    │                                                                     │
 * │    ▼                                                                     │
 * │  getStaticProps receives data                                           │
 * │                                                                          │
 * │  ⚠️ This creates an UNNECESSARY extra HTTP request!                     │
 * │  The server is sending a request to itself!                              │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  THE BETTER APPROACH (what we do here):                                 │
 * │                                                                          │
 * │  getStaticProps                                                          │
 * │    │                                                                     │
 * │    │  MongoClient.connect(...)  ← Connect directly to MongoDB           │
 * │    │  collection.find()         ← Fetch data directly                   │
 * │    ▼                                                                     │
 * │  Use data as props                                                      │
 * │                                                                          │
 * │  ✅ No unnecessary HTTP request!                                         │
 * │  ✅ Direct database access - faster and simpler!                         │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * Both getStaticProps and getServerSideProps run ONLY on the server,
 * so it's perfectly safe and efficient to access the database directly.
 *
 * ============================================================================
 * 🔒 SMART IMPORT SPLITTING: CLIENT VS SERVER BUNDLES
 * ============================================================================
 *
 * When you import a package in a page component file, NextJS analyzes
 * WHERE that import is used:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  import { MongoClient } from 'mongodb';  // Imported at top of file     │
 * │  import SomeComponent from '../components/X';                            │
 * │                                                                          │
 * │  function HomePage(props) {                                              │
 * │    return <SomeComponent />;  ← Uses SomeComponent                      │
 * │  }                            ← SomeComponent → CLIENT bundle           │
 * │                                                                          │
 * │  export async function getStaticProps() {                                │
 * │    MongoClient.connect(...)   ← Uses MongoClient                        │
 * │  }                            ← MongoClient → SERVER bundle only        │
 * │                                                                          │
 * │  RESULT:                                                                 │
 * │  • MongoClient is NOT included in the JavaScript sent to browsers       │
 * │  • SomeComponent IS included in the client-side bundle                  │
 * │  • NextJS automatically separates them!                                 │
 * │                                                                          │
 * │  This is great for:                                                      │
 * │  • Bundle size: No server-only code bloating client downloads           │
 * │  • Security: Database credentials never reach the browser               │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔍 MONGODB find() AND toArray()
 * ============================================================================
 *
 * The find() method on a MongoDB collection returns a cursor, not an array.
 * A cursor is a pointer to the result set that you can iterate over.
 *
 * To get all documents as a standard JavaScript array, chain toArray():
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  // Returns a cursor (not directly usable as array)                     │
 * │  const cursor = collection.find();                                      │
 * │                                                                          │
 * │  // Converts cursor to an array of documents                            │
 * │  const documents = await collection.find().toArray();                   │
 * │                                                                          │
 * │  // With a filter (find specific documents):                            │
 * │  const filtered = await collection.find({ title: 'X' }).toArray();     │
 * │                                                                          │
 * │  // With no filter, find() returns ALL documents in the collection      │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ⚠️ THE _id PROBLEM: ObjectId IS NOT SERIALIZABLE
 * ============================================================================
 *
 * MongoDB automatically assigns an _id field to every document.
 * This _id is an ObjectId, which is a special BSON type - NOT a simple string.
 *
 * NextJS requires all props to be serializable (convertible to JSON).
 * ObjectId objects are NOT serializable, so passing them directly causes
 * an error.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  RAW DOCUMENT FROM MONGODB:                                             │
 * │  {                                                                       │
 * │    _id: ObjectId("64a7b2c3d4e5f6a7b8c9d0e1"),  ← NOT a string!        │
 * │    title: "My Meetup",                                                   │
 * │    image: "https://...",                                                 │
 * │    address: "123 Street",                                                │
 * │    description: "Great meetup"                                          │
 * │  }                                                                       │
 * │                                                                          │
 * │  ❌ Passing this directly to props causes an error:                     │
 * │     "SerializableError: Error serializing props"                        │
 * │                                                                          │
 * │  ✅ SOLUTION: Transform data with .map()                                │
 * │  {                                                                       │
 * │    id: "64a7b2c3d4e5f6a7b8c9d0e1",     ← Converted to string!         │
 * │    title: "My Meetup",                                                   │
 * │    image: "https://...",                                                 │
 * │    address: "123 Street"                                                │
 * │  }                                                                       │
 * │                                                                          │
 * │  Note: We use 'id' (not '_id') to match our frontend component props   │
 * │  Note: We omit 'description' since the list page doesn't display it    │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📊 FINAL COMPARISON TABLE (From Lesson 495)
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Feature              │ getStaticProps      │ getServerSideProps        │
 * │  ─────────────────────┼─────────────────────┼────────────────────────── │
 * │  Runs at              │ Build time          │ Every request             │
 * │  Can use revalidate   │ Yes                 │ No                        │
 * │  Access to req/res    │ No                  │ Yes                       │
 * │  CDN Cacheable        │ Yes                 │ No                        │
 * │  Data Freshness       │ Periodic (ISR)      │ Always fresh              │
 * │  Best for             │ Most pages          │ Auth, real-time data      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

import MeetupList from '../components/meetups/MeetupList';

/**
 * IMPORT MONGOCLIENT FOR DIRECT DATABASE ACCESS
 *
 * We import MongoClient here at the top of the page component file.
 * Since we only use it inside getStaticProps (server-side code),
 * NextJS will NOT include the mongodb package in the client-side bundle.
 *
 * This is safe because:
 * - getStaticProps runs only on the server / at build time
 * - The import is automatically excluded from client-side JavaScript
 * - Database credentials in getStaticProps never reach the browser
 */
import { MongoClient } from 'mongodb';

/**
 * LESSON 503: IMPORT Head FROM next/head FOR PAGE METADATA
 *
 * The Head component is a built-in NextJS component that allows you to
 * inject elements into the HTML <head> section of your page.
 *
 * This is how you add metadata like:
 * - <title> - The page title (shows in browser tab and search results)
 * - <meta name="description"> - Page description (used by search engines)
 * - <meta name="viewport"> - Responsive design settings
 * - <link rel="icon"> - Favicon
 * - Any other valid HTML head element
 *
 * WHY THIS MATTERS:
 * Without proper metadata, your pages will:
 * - Show the URL as the tab title (looks unprofessional)
 * - Have no description in search engine results
 * - Score poorly on SEO (Search Engine Optimization)
 */
import Head from 'next/head';

/**
 * LESSON 503: IMPORT Fragment FROM React
 *
 * Fragment is needed because React components can only return a single
 * root element. Since we now want to return BOTH the Head component
 * AND the MeetupList component, we need a wrapper.
 *
 * Fragment is an invisible wrapper - it groups elements without adding
 * any extra DOM nodes (unlike wrapping in a <div>).
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  WITHOUT Fragment (ERROR - adjacent JSX elements):                      │
 * │  return (                                                                │
 * │    <Head>...</Head>                                                      │
 * │    <MeetupList />        ← Error! Two root elements!                    │
 * │  );                                                                      │
 * │                                                                          │
 * │  WITH Fragment (WORKS):                                                  │
 * │  return (                                                                │
 * │    <Fragment>                                                            │
 * │      <Head>...</Head>                                                    │
 * │      <MeetupList />      ← Both wrapped in invisible container          │
 * │    </Fragment>                                                           │
 * │  );                                                                      │
 * │                                                                          │
 * │  ALTERNATIVE SHORTHAND: <> ... </>                                      │
 * │  return (                                                                │
 * │    <>                                                                    │
 * │      <Head>...</Head>                                                    │
 * │      <MeetupList />                                                      │
 * │    </>                                                                   │
 * │  );                                                                      │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
import { Fragment } from 'react';

/**
 * HomePage Component - Receives Pre-fetched Data via Props
 *
 * This component receives meetup data from getStaticProps.
 * It doesn't know or care WHERE the data comes from - it just renders it.
 * Previously it used dummy data; now it receives real data from MongoDB.
 *
 * LESSON 503: Now also includes Head metadata for SEO.
 *
 * @param {Object} props - Props provided by getStaticProps
 * @param {Array} props.meetups - Array of meetup objects from MongoDB
 */
function HomePage(props) {
  return (
    <Fragment>
      {/**
       * LESSON 503: HEAD SECTION - PAGE METADATA
       *
       * Everything placed between <Head> and </Head> gets injected into
       * the HTML <head> section of the rendered page.
       *
       * This works because NextJS's Head component uses React portals
       * to move its children into the document's <head> element,
       * regardless of where in the component tree it's rendered.
       *
       * The metadata defined here:
       * - Shows "React Meetups" in the browser tab
       * - Provides a description for search engines like Google
       * - Both are critical for SEO and user experience
       *
       * WHAT APPEARS IN THE RENDERED HTML:
       *
       * <html>
       *   <head>
       *     <title>React Meetups</title>
       *     <meta name="description" content="Browse a huge list..." />
       *     ... (other head elements)
       *   </head>
       *   <body>
       *     ... (page content)
       *   </body>
       * </html>
       */}
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

/**
 * ============================================================================
 * getStaticProps - NOW FETCHING REAL DATA FROM MONGODB (Lesson 501)
 * ============================================================================
 *
 * Previously, this function returned dummy data from a hardcoded array.
 * Now it connects directly to MongoDB Atlas and fetches real meetup data.
 *
 * WHY DIRECT DATABASE ACCESS (not through an API route):
 * - getStaticProps already runs on the server, so there's no security risk
 * - Calling your own API route would add an unnecessary HTTP round-trip
 * - Direct access is simpler and more efficient
 *
 * WHEN THIS CODE RUNS:
 * - During `npm run build` (build time)
 * - Every 10 seconds after a request (ISR with revalidate: 10)
 * - On every request in dev mode (npm run dev)
 */
export async function getStaticProps() {
  /**
   * CONNECT TO MONGODB
   *
   * This is the same connection code used in our API route.
   * We could extract this into a shared helper function to avoid
   * duplication, but keeping it explicit here shows clearly what
   * code runs where.
   *
   * IMPORTANT: Replace the connection string with YOUR MongoDB Atlas
   * credentials. This is safe here because getStaticProps code is
   * never sent to the client.
   */
  const client = await MongoClient.connect(
    process.env.MONGODB_URI
  );

  /**
   * GET DATABASE AND COLLECTION REFERENCES
   *
   * db() returns the database specified in the connection string.
   * collection('meetups') returns the "meetups" collection.
   *
   * Both are created automatically if they don't exist yet.
   */
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  /**
   * FETCH ALL MEETUPS FROM THE COLLECTION
   *
   * find() with no arguments returns ALL documents in the collection.
   * It returns a cursor (a pointer to results), not an array.
   *
   * toArray() converts the cursor into a standard JavaScript array
   * of document objects. This is an async operation, so we await it.
   *
   * COMMON find() PATTERNS:
   * - find()                    → All documents
   * - find({ title: 'X' })     → Documents where title is 'X'
   * - find({}, { title: 1 })   → All documents, only return title field
   */
  const meetups = await meetupsCollection.find().toArray();

  /**
   * CLOSE THE DATABASE CONNECTION
   *
   * Always close the connection when done to free up resources.
   * This is especially important in getStaticProps since it runs
   * periodically (with revalidate) and you don't want connection leaks.
   */
  client.close();

  return {
    props: {
      /**
       * TRANSFORM MONGODB DOCUMENTS FOR SERIALIZATION
       *
       * We cannot pass raw MongoDB documents as props because:
       * 1. The _id field is an ObjectId (not serializable to JSON)
       * 2. Our frontend components expect 'id', not '_id'
       * 3. The list page doesn't need 'description', so we omit it
       *
       * The .map() transforms each document:
       * - meetup._id.toString() converts ObjectId to a plain string
       * - We rename '_id' to 'id' to match our component prop names
       * - We only include fields the MeetupList component needs
       */
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    /**
     * INCREMENTAL STATIC REGENERATION (ISR)
     *
     * With revalidate: 10, NextJS will re-run this function at most
     * once every 10 seconds when requests come in, keeping the
     * pre-rendered page reasonably up-to-date with database changes.
     *
     * =====================================================================
     * LESSON 504: HOW revalidate BEHAVES IN PRODUCTION
     * =====================================================================
     *
     * During local development (npm run dev), getStaticProps runs on
     * EVERY request, so changes appear immediately. But in production,
     * the behavior is different:
     *
     * ┌─────────────────────────────────────────────────────────────────┐
     * │                                                                  │
     * │  npm run build                                                   │
     * │    → getStaticProps runs ONCE                                   │
     * │    → HTML file for this page is generated in .next/ folder      │
     * │    → This pre-built HTML is served to ALL visitors initially    │
     * │                                                                  │
     * │  npm start (production server)                                   │
     * │    → Serves the pre-built HTML from .next/                      │
     * │    → After a request, if 10+ seconds have passed:               │
     * │      → NextJS re-runs getStaticProps in the background          │
     * │      → Generates a NEW version of the page                      │
     * │      → The NEXT visitor sees the updated page                   │
     * │    → The visitor who triggered revalidation still sees the      │
     * │      OLD page (the new one is ready for the next visitor)       │
     * │                                                                  │
     * │  This means: after adding a new meetup via the form, it may    │
     * │  NOT appear immediately on the home page. It shows up after    │
     * │  a subsequent visit triggers revalidation.                      │
     * │                                                                  │
     * └─────────────────────────────────────────────────────────────────┘
     *
     * THE BUILD PROCESS (npm run build):
     *
     * Running `npm run build` creates the .next/ folder containing:
     * - Optimized and minified JavaScript bundles
     * - Pre-rendered HTML files for all static pages
     * - Server-side code for API routes and SSR pages
     *
     * Hosting providers like Vercel run this command automatically
     * when you push code to your GitHub repository. You only need
     * to run it manually if you're self-hosting on your own server.
     * After building, `npm start` launches the production server.
     */
    revalidate: 10,
  };
}

/**
 * ============================================================================
 * getServerSideProps - SERVER-SIDE RENDERING (ALTERNATIVE - COMMENTED OUT)
 * ============================================================================
 *
 * LESSON 495: This is an alternative to getStaticProps that runs on
 * EVERY incoming request instead of at build time.
 *
 * UNCOMMENT THIS (and comment out getStaticProps above) IF:
 * - You need access to req/res objects
 * - You're implementing authentication
 * - Your data changes multiple times per second
 *
 * For our meetups app, getStaticProps with revalidate is the better choice
 * because meetup data doesn't change every second, and we don't need
 * access to the request object.
 *
 * @param {Object} context - The context object with request/response
 * @param {Object} context.req - Incoming request object
 * @param {Object} context.res - Response object
 */
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//
//   // Fetch data here...
//
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     // NOTE: No revalidate here! It runs on every request anyway.
//   };
// }

export default HomePage;
