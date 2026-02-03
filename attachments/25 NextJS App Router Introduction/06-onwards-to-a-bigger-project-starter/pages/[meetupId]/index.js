/**
 * ============================================================================
 * pages/[meetupId]/index.js - LESSONS 486, 491, 496, 497 & 502
 * ============================================================================
 *
 * LESSON 486: Created this dynamic page file using the folder approach
 * LESSON 491: Added MeetupDetail component for presenting meetup information
 * LESSON 496: Added getStaticProps with context.params for dynamic data
 * LESSON 497: Added getStaticPaths to define which dynamic pages to pre-generate
 * LESSON 502: Connected both getStaticPaths and getStaticProps to MongoDB
 *
 * ============================================================================
 * 🎓 LESSON 502: FETCHING REAL DATA FOR DYNAMIC PAGES
 * ============================================================================
 *
 * This lesson replaces all hardcoded/dummy data with real MongoDB queries
 * in both getStaticPaths AND getStaticProps. Two separate database operations:
 *
 * 1. getStaticPaths: Fetch all meetup IDs to know which pages to generate
 * 2. getStaticProps: Fetch a single meetup's full data for each page
 *
 * ============================================================================
 * 🔄 HOW getStaticPaths AND getStaticProps WORK TOGETHER WITH MONGODB
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  AT BUILD TIME (or during ISR revalidation):                            │
 * │                                                                          │
 * │  STEP 1: getStaticPaths() runs FIRST                                   │
 * │  ─────────────────────────────────────                                  │
 * │  │                                                                       │
 * │  │  Connect to MongoDB                                                   │
 * │  │  Fetch ALL meetup _ids (just IDs, no other fields)                   │
 * │  │  Return: paths = [                                                    │
 * │  │    { params: { meetupId: '64a7b2c3...' } },                          │
 * │  │    { params: { meetupId: '64a7b2c4...' } },                          │
 * │  │    ...                                                                │
 * │  │  ]                                                                    │
 * │  │                                                                       │
 * │  STEP 2: getStaticProps(context) runs FOR EACH path                     │
 * │  ──────────────────────────────────────────────────                     │
 * │  │                                                                       │
 * │  │  For meetupId = '64a7b2c3...':                                       │
 * │  │    Connect to MongoDB                                                 │
 * │  │    findOne({ _id: ObjectId('64a7b2c3...') })                         │
 * │  │    Return: props = { meetupData: { id, title, image, ... } }         │
 * │  │    → Pre-render HTML page                                            │
 * │  │                                                                       │
 * │  │  For meetupId = '64a7b2c4...':                                       │
 * │  │    (same process)                                                     │
 * │  │                                                                       │
 * │  STEP 3: Static HTML pages ready to serve!                              │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔍 MONGODB find() WITH FIELD PROJECTION
 * ============================================================================
 *
 * When fetching documents, you don't always need ALL fields.
 * MongoDB's find() accepts a second argument for "projection" -
 * specifying which fields to include or exclude.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  SYNTAX: collection.find(filter, projection)                            │
 * │                                                                          │
 * │  // Get ALL fields from ALL documents:                                  │
 * │  collection.find()                                                      │
 * │  collection.find({})          // empty filter = no filtering            │
 * │                                                                          │
 * │  // Get ONLY the _id field from ALL documents:                          │
 * │  collection.find({}, { _id: 1 })                                        │
 * │  // 1 = include this field, everything else excluded                    │
 * │                                                                          │
 * │  // Get title and address, exclude _id:                                 │
 * │  collection.find({}, { title: 1, address: 1, _id: 0 })                 │
 * │  // 0 = explicitly exclude this field                                   │
 * │                                                                          │
 * │  WHY THIS MATTERS:                                                       │
 * │  In getStaticPaths, we only need IDs to generate paths.                 │
 * │  Fetching full documents would waste bandwidth and memory.              │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔎 MONGODB findOne() - FETCHING A SINGLE DOCUMENT
 * ============================================================================
 *
 * While find() returns multiple documents, findOne() returns exactly ONE
 * document that matches the filter criteria.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  SYNTAX: collection.findOne(filter)                                     │
 * │                                                                          │
 * │  // Find by any field:                                                   │
 * │  collection.findOne({ title: 'My Meetup' })                             │
 * │  collection.findOne({ address: '123 Street' })                          │
 * │                                                                          │
 * │  // Find by _id (most common for detail pages):                         │
 * │  collection.findOne({ _id: ObjectId('64a7b2c3...') })                  │
 * │                                                                          │
 * │  RETURNS: A single document object (or null if not found)               │
 * │  Unlike find(), no need for .toArray() since it returns one object      │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ⚠️ ObjectId: STRING ↔ OBJECTID CONVERSION
 * ============================================================================
 *
 * MongoDB stores IDs as ObjectId objects, NOT as plain strings.
 * When searching by _id, you must convert the string to an ObjectId.
 * When returning data to NextJS, you must convert ObjectId back to string.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  URL PARAMETER → STRING                                                  │
 * │  context.params.meetupId = '64a7b2c3d4e5f6a7b8c9d0e1'  (string)       │
 * │                                                                          │
 * │  MONGODB EXPECTS → ObjectId                                             │
 * │  { _id: ObjectId('64a7b2c3d4e5f6a7b8c9d0e1') }                        │
 * │                                                                          │
 * │  CONVERSION: import { ObjectId } from 'mongodb'                         │
 * │                                                                          │
 * │  String → ObjectId (for querying):                                      │
 * │    new ObjectId(meetupId)                                                │
 * │                                                                          │
 * │  ObjectId → String (for serialization):                                 │
 * │    document._id.toString()                                              │
 * │                                                                          │
 * │  Without conversion:                                                     │
 * │  ❌ findOne({ _id: '64a7b2c3...' })  → Won't find anything!           │
 * │  ✅ findOne({ _id: new ObjectId('64a7b2c3...') })  → Works!           │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🗂️ DYNAMIC PATHS FROM DATABASE (replacing hardcoded paths)
 * ============================================================================
 *
 * Previously, getStaticPaths had hardcoded paths:
 *   paths: [
 *     { params: { meetupId: 'm1' } },
 *     { params: { meetupId: 'm2' } },
 *   ]
 *
 * Now we generate them dynamically by querying MongoDB for all IDs
 * and mapping each one into the required { params: { meetupId: '...' } } format.
 *
 * This means:
 * - New meetups added to the database get their own pages automatically
 * - No code changes needed when meetups are added or removed
 * - The paths array is always in sync with the database
 *
 * ============================================================================
 * 🏗️ REFACTORING OPPORTUNITY
 * ============================================================================
 *
 * Both getStaticPaths and getStaticProps (and the API route) contain
 * duplicated MongoDB connection code. In a production app, you would
 * extract this into a shared helper function:
 *
 * ```javascript
 * // lib/db.js
 * export async function connectToDatabase() {
 *   const client = await MongoClient.connect('mongodb+srv://...');
 *   const db = client.db();
 *   return { client, db };
 * }
 * ```
 *
 * This avoids repeating the connection string in multiple places
 * and makes credential management easier. However, keeping the code
 * inline here makes each function's behavior completely transparent.
 *
 * ============================================================================
 */

import MeetupDetail from '../../components/meetups/MeetupDetail';

/**
 * IMPORT MongoClient AND ObjectId FROM MONGODB
 *
 * MongoClient: Used to establish connections to the MongoDB cluster
 * ObjectId: Used to convert string IDs to MongoDB's ObjectId format
 *
 * Both are used only in getStaticPaths and getStaticProps (server-side),
 * so NextJS will NOT include the mongodb package in the client-side bundle.
 * This keeps credentials safe and the client bundle small.
 */
import { MongoClient, ObjectId } from 'mongodb';

/**
 * MeetupDetails - Page Component for Individual Meetup
 *
 * Receives the full meetup data via props from getStaticProps.
 * The data is nested under props.meetupData, so we access fields as
 * props.meetupData.title, props.meetupData.image, etc.
 *
 * @param {Object} props - Props provided by getStaticProps
 * @param {Object} props.meetupData - The meetup data object
 * @param {string} props.meetupData.id - Meetup ID (converted from ObjectId)
 * @param {string} props.meetupData.image - Image URL
 * @param {string} props.meetupData.title - Meetup title
 * @param {string} props.meetupData.address - Physical address
 * @param {string} props.meetupData.description - Meetup description
 */
function MeetupDetails(props) {
  /**
   * RENDER USING REAL DATABASE DATA
   *
   * Previously this had hardcoded values. Now the data flows from MongoDB:
   *
   * MongoDB document
   *   → getStaticProps fetches and transforms it
   *   → passes as props.meetupData
   *   → we extract each field here for MeetupDetail component
   *
   * We drill into props.meetupData because getStaticProps returns:
   * { props: { meetupData: { id, title, image, address, description } } }
   */
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

/**
 * ============================================================================
 * getStaticPaths - DYNAMICALLY GENERATE PATHS FROM MONGODB (Lesson 502)
 * ============================================================================
 *
 * Previously returned hardcoded paths like 'm1' and 'm2'.
 * Now queries MongoDB to get ALL meetup IDs and generates paths dynamically.
 *
 * This means every meetup in the database gets its own pre-generated page.
 * When new meetups are added, they'll be included in the next build or
 * ISR revalidation.
 *
 * @returns {Object} Object with paths array and fallback setting
 */
export async function getStaticPaths() {
  /**
   * CONNECT TO MONGODB
   *
   * Same connection code used in getStaticProps and the API route.
   * In a production app, you'd extract this to a shared helper.
   *
   * IMPORTANT: Replace with YOUR MongoDB Atlas connection string.
   */
  const client = await MongoClient.connect(
    'mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  /**
   * FETCH ONLY THE IDs FROM ALL MEETUP DOCUMENTS
   *
   * We use field projection to fetch only the _id field:
   * - First argument: {} (empty filter = get all documents)
   * - Second argument: { _id: 1 } (only include the _id field)
   *
   * This is more efficient than fetching entire documents when
   * we only need IDs for generating paths. No need to pull title,
   * image, address, description across the network.
   */
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  /**
   * CLOSE THE CONNECTION
   *
   * Always close when done to prevent connection leaks.
   */
  client.close();

  return {
    /**
     * DYNAMICALLY GENERATE PATHS FROM DATABASE RESULTS
     *
     * We use .map() to transform each document (which only contains _id)
     * into the { params: { meetupId: '...' } } format that getStaticPaths requires.
     *
     * Each meetup._id is an ObjectId, so we call .toString() to convert
     * it to a plain string for the URL parameter.
     *
     * Example transformation:
     *   { _id: ObjectId("64a7b2c3...") }
     *   → { params: { meetupId: "64a7b2c3..." } }
     *
     * This replaces the old hardcoded array:
     *   paths: [
     *     { params: { meetupId: 'm1' } },
     *     { params: { meetupId: 'm2' } },
     *   ]
     */
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),

    /**
     * FALLBACK SETTING
     *
     * false: Only the paths listed above are valid.
     * Any meetupId NOT in the database will result in a 404 page.
     *
     * Alternatives:
     * - 'blocking': Generate unlisted pages on-demand (wait for result)
     * - true: Generate on-demand (show loading state first)
     */
    fallback: false,
  };
}

/**
 * ============================================================================
 * getStaticProps - FETCH SINGLE MEETUP FROM MONGODB (Lesson 502)
 * ============================================================================
 *
 * Previously returned hardcoded dummy data.
 * Now connects to MongoDB and fetches a specific meetup using findOne().
 *
 * This function runs once for EACH path returned by getStaticPaths.
 * If getStaticPaths returned 5 paths, this function runs 5 times,
 * each time with a different meetupId in context.params.
 *
 * @param {Object} context - Contains params from getStaticPaths
 * @param {Object} context.params - Dynamic route parameters
 * @param {string} context.params.meetupId - The meetup ID from the URL
 */
export async function getStaticProps(context) {
  /**
   * EXTRACT THE MEETUP ID FROM URL PARAMS
   *
   * The key name 'meetupId' matches the folder name [meetupId].
   * The value comes from the paths generated by getStaticPaths.
   *
   * Example: for path { params: { meetupId: '64a7b2c3...' } }
   *          meetupId = '64a7b2c3...'
   */
  const meetupId = context.params.meetupId;

  /**
   * CONNECT TO MONGODB
   *
   * This is a separate connection from getStaticPaths.
   * Each function establishes its own connection independently.
   */
  const client = await MongoClient.connect(
    'mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  /**
   * FIND A SINGLE MEETUP BY ITS ID
   *
   * findOne() returns a single document matching the filter criteria.
   * Unlike find(), it returns the document directly (not a cursor),
   * so no .toArray() is needed.
   *
   * CRITICAL: We must wrap meetupId with ObjectId()!
   *
   * The meetupId from the URL is a STRING: '64a7b2c3d4e5f6a7b8c9d0e1'
   * But MongoDB stores _id as an ObjectId, not a string.
   *
   * Without ObjectId conversion:
   *   findOne({ _id: '64a7b2c3...' })  → returns null (no match!)
   *
   * With ObjectId conversion:
   *   findOne({ _id: new ObjectId('64a7b2c3...') })  → returns the document!
   *
   * You could also search by other fields (e.g., { title: 'My Meetup' }),
   * but searching by _id is the most common pattern for detail pages
   * since IDs are unique and indexed for fast lookups.
   */
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  /**
   * CLOSE THE CONNECTION
   */
  client.close();

  return {
    props: {
      /**
       * TRANSFORM THE DOCUMENT FOR SERIALIZATION
       *
       * We manually construct the meetupData object instead of passing
       * the raw MongoDB document because:
       *
       * 1. _id is an ObjectId which is NOT JSON-serializable
       *    → Must convert to string with .toString()
       *
       * 2. We rename '_id' to 'id' to match our frontend component
       *    conventions (frontend uses 'id', MongoDB uses '_id')
       *
       * 3. We explicitly list each field rather than spreading the
       *    entire document, ensuring we only pass what's needed
       */
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
