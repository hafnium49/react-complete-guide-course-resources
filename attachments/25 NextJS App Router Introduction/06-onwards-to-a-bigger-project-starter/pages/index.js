/**
 * ============================================================================
 * pages/index.js - LESSONS 486-495: THE STARTING PAGE (HOME PAGE)
 * ============================================================================
 *
 * LESSON 486: Created this page file
 * LESSON 487: Filled this page with actual content (MeetupList + dummy data)
 * LESSON 492: Demonstrated the PROBLEM with client-side data fetching
 * LESSON 493: THE SOLUTION - getStaticProps for Static Generation
 * LESSON 494: Incremental Static Regeneration (ISR) with revalidate
 * LESSON 495: getServerSideProps - Server-Side Rendering alternative
 *
 * ============================================================================
 * 🎓 LESSON 495: getServerSideProps - SERVER-SIDE RENDERING
 * ============================================================================
 *
 * From the instructor:
 * "So getStaticProps is a very useful function which you can export in your
 * page components to ensure that your pre-rendered pages contain data you
 * might need to wait for. Now with revalidate, you can ensure that this page
 * is also updated regularly after deployment."
 *
 * But sometimes that's not enough...
 *
 * From the instructor:
 * "But sometimes even a regular update is not enough. Sometimes you really
 * want to regenerate this page for every incoming request."
 *
 * ============================================================================
 * ⚡ WHEN getStaticProps + revalidate ISN'T ENOUGH
 * ============================================================================
 *
 * From the instructor:
 * "So you want to pre-generate the page dynamically on the fly after
 * deployment on the server. Not during the build process and not every
 * couple of seconds, but for every request."
 *
 * USE CASES WHERE YOU NEED EVERY-REQUEST RENDERING:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  SCENARIOS REQUIRING getServerSideProps                                  │
 * │                                                                          │
 * │  1. AUTHENTICATION REQUIRED                                              │
 * │     • Check session cookies on each request                              │
 * │     • Verify user tokens                                                 │
 * │     • Show user-specific data                                            │
 * │                                                                          │
 * │  2. DATA CHANGES MULTIPLE TIMES PER SECOND                               │
 * │     • Live stock prices                                                  │
 * │     • Real-time auction bids                                             │
 * │     • Live sports scores                                                 │
 * │                                                                          │
 * │  3. NEED REQUEST/RESPONSE OBJECTS                                        │
 * │     • Access headers                                                     │
 * │     • Read cookies directly                                              │
 * │     • Custom server logic                                                │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔄 getServerSideProps - THE ALTERNATIVE
 * ============================================================================
 *
 * From the instructor:
 * "And if that's your goal, then there is an alternative to getStaticProps.
 * And that would be another function which you can export. A function that
 * can also be async if you want to. And that's the getServerSideProps function."
 *
 * From the instructor:
 * "Just like getStaticProps, that is a reserved name, which NextJS will be
 * looking for."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  getServerSideProps BASICS                                               │
 * │                                                                          │
 * │  export async function getServerSideProps(context) {                    │
 * │    // This runs on EVERY request, on the server                         │
 * │    return {                                                              │
 * │      props: { ... }                                                      │
 * │    };                                                                    │
 * │  }                                                                       │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🕐 WHEN DOES getServerSideProps RUN?
 * ============================================================================
 *
 * From the instructor:
 * "And the difference to getStaticProps is that this function will now not
 * run during the build process, but instead always on the server after
 * deployment."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  COMPARISON: WHEN CODE RUNS                                              │
 * │                                                                          │
 * │  getStaticProps:                                                         │
 * │  ┌───────────────────────────────────────────────────────────────────┐  │
 * │  │  BUILD TIME: npm run build → Runs ONCE                            │  │
 * │  │  WITH ISR:   After revalidate seconds → Runs in background        │  │
 * │  │  DEV MODE:   npm run dev → Runs on each request (for testing)     │  │
 * │  └───────────────────────────────────────────────────────────────────┘  │
 * │                                                                          │
 * │  getServerSideProps:                                                     │
 * │  ┌───────────────────────────────────────────────────────────────────┐  │
 * │  │  ALWAYS: Runs on EVERY incoming request                           │  │
 * │  │          User visits page → Server runs function → Returns HTML   │  │
 * │  │          No caching, no build-time generation                     │  │
 * │  └───────────────────────────────────────────────────────────────────┘  │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔒 SECURITY: SERVER-SIDE ONLY (SAME AS getStaticProps)
 * ============================================================================
 *
 * From the instructor:
 * "Any code you write in here will always run on the server, never in the
 * client. So you can run server side code in here, you can also perform
 * operations that use credentials that should not be exposed to your users,
 * because this code only runs on the server."
 *
 * Both getStaticProps and getServerSideProps:
 * ✅ Run only on the server
 * ✅ Can use credentials/secrets
 * ✅ Can access databases directly
 * ✅ Code is never sent to client
 *
 * ============================================================================
 * ❌ NO revalidate IN getServerSideProps
 * ============================================================================
 *
 * From the instructor:
 * "Now you can't set revalidate here, because it doesn't make any sense here.
 * This getServerSideProps function runs for every incoming request anyways,
 * so there is no need to revalidate every x seconds."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  RETURN VALUE COMPARISON                                                 │
 * │                                                                          │
 * │  getStaticProps returns:           getServerSideProps returns:          │
 * │  ┌─────────────────────────┐       ┌─────────────────────────┐          │
 * │  │ {                       │       │ {                       │          │
 * │  │   props: { ... },       │       │   props: { ... },       │          │
 * │  │   revalidate: 10, ✅    │       │   // NO revalidate! ❌  │          │
 * │  │   notFound: true,       │       │   notFound: true,       │          │
 * │  │   redirect: {...}       │       │   redirect: {...}       │          │
 * │  │ }                       │       │ }                       │          │
 * │  └─────────────────────────┘       └─────────────────────────┘          │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📨 THE context PARAMETER - ACCESS TO REQUEST/RESPONSE
 * ============================================================================
 *
 * From the instructor:
 * "Now what you can do in here, is you can work with a parameter, which you'll
 * receive. The context parameter. You actually also get this in getStaticProps,
 * but I will come back to it there, later."
 *
 * From the instructor:
 * "You do get it here and getServerSideProps as well. And there in this context
 * argument, in this context parameter, you also get access to the request object
 * under the req key, and the response object that will be sent back."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  THE context OBJECT IN getServerSideProps                                │
 * │                                                                          │
 * │  export async function getServerSideProps(context) {                    │
 * │                                                                          │
 * │    context.req    →  Incoming request object                            │
 * │                      • headers                                           │
 * │                      • cookies                                           │
 * │                      • body                                              │
 * │                      • method                                            │
 * │                                                                          │
 * │    context.res    →  Response object                                    │
 * │                      • Can set headers                                   │
 * │                      • Can set cookies                                   │
 * │                                                                          │
 * │    context.params →  Dynamic route parameters                           │
 * │                      • e.g., { meetupId: 'm1' }                          │
 * │                                                                          │
 * │    context.query  →  Query string parameters                            │
 * │                      • e.g., ?sort=date → { sort: 'date' }              │
 * │                                                                          │
 * │  }                                                                       │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔐 AUTHENTICATION USE CASE
 * ============================================================================
 *
 * From the instructor:
 * "And if you worked with NodeJS and Express before, this might look familiar
 * to you. There, you also get request and response objects in your middleware
 * to then work with those."
 *
 * From the instructor:
 * "And especially having access to the concrete request object can be helpful.
 * For example, when you're working with authentication, and you need to check
 * some session cookie or anything like this."
 *
 * AUTHENTICATION EXAMPLE:
 *
 * ```javascript
 * export async function getServerSideProps(context) {
 *   const { req, res } = context;
 *
 *   // Check session cookie
 *   const sessionToken = req.cookies.session;
 *
 *   if (!sessionToken) {
 *     // Redirect to login if no session
 *     return {
 *       redirect: {
 *         destination: '/login',
 *         permanent: false,
 *       },
 *     };
 *   }
 *
 *   // Verify token and get user data
 *   const user = await verifySession(sessionToken);
 *
 *   return {
 *     props: { user },
 *   };
 * }
 * ```
 *
 * From the instructor:
 * "This is something which I show in my full NextJS course, it's a little
 * too advanced here. But you do have access to the incoming request and all
 * its headers and the request body if you need to."
 *
 * ============================================================================
 * 🤔 WHICH ONE SHOULD YOU USE?
 * ============================================================================
 *
 * From the instructor:
 * "Now, which one of the two should you use? Is getServerSideProps better
 * or getStaticProps?"
 *
 * From the instructor:
 * "getServerSideProps might sound better because it's guaranteed to run for
 * every request. But that actually can be a disadvantage, because that means
 * that you need to wait for your page to be generated on every incoming request."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  🏆 DECISION GUIDE                                                       │
 * │                                                                          │
 * │  USE getStaticProps WHEN:                                               │
 * │  ✅ Data doesn't change every second                                    │
 * │  ✅ Don't need request/response objects                                 │
 * │  ✅ Want maximum performance (CDN caching)                              │
 * │  ✅ Page can be pre-built                                               │
 * │  ✅ ISR (revalidate) is sufficient for freshness                        │
 * │                                                                          │
 * │  USE getServerSideProps WHEN:                                           │
 * │  ✅ Need access to req/res objects                                      │
 * │  ✅ Working with authentication/sessions                                │
 * │  ✅ Data changes multiple times per second                              │
 * │  ✅ Data is user-specific                                               │
 * │  ✅ Need to check cookies/headers on every request                      │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ⚡ PERFORMANCE COMPARISON
 * ============================================================================
 *
 * From the instructor:
 * "Now if you don't have data that changes all the time, and with that, I
 * really mean that it changes multiple times every second. And if you don't
 * need access to the request object, let's say for authentication,
 * getStaticProps is actually better."
 *
 * From the instructor:
 * "Because there you pre-generate an HTML file, that file can then be stored
 * and served by a CDN. And that simply is faster than regenerating and
 * fetching that data for every incoming request."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PERFORMANCE COMPARISON                                                  │
 * │                                                                          │
 * │  getStaticProps:                                                         │
 * │  ┌───────────────────────────────────────────────────────────────────┐  │
 * │  │  User Request → CDN serves cached HTML → FAST! (~50ms)            │  │
 * │  │                                                                    │  │
 * │  │  [User] ──→ [CDN Cache] ──→ [User sees page]                      │  │
 * │  │               ↑                                                    │  │
 * │  │         Pre-built HTML                                             │  │
 * │  └───────────────────────────────────────────────────────────────────┘  │
 * │                                                                          │
 * │  getServerSideProps:                                                     │
 * │  ┌───────────────────────────────────────────────────────────────────┐  │
 * │  │  User Request → Server runs code → Generates HTML → SLOWER        │  │
 * │  │                                                                    │  │
 * │  │  [User] ──→ [Server] ──→ [Fetch Data] ──→ [Generate] ──→ [User]  │  │
 * │  │                              ~200-500ms+                           │  │
 * │  └───────────────────────────────────────────────────────────────────┘  │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "So your page will be faster when working with getStaticProps, because
 * then it can be cached and reused, instead of regenerated all the time."
 *
 * ============================================================================
 * 🎯 OUR DECISION FOR THIS APP
 * ============================================================================
 *
 * From the instructor:
 * "Hence, you should really only use getServerSideProps if you need access
 * to that concrete request object, because you don't have access to request
 * and response in getStaticProps. Or if you really have data that changes
 * multiple times every second, then therefore even revalidate won't help
 * you, then getServerSideProps is a great choice."
 *
 * From the instructor:
 * "Now here for our meetup list, though, it's not a great choice, because
 * that is not data which changes frequently. And here I also don't need to
 * work with the incoming request."
 *
 * From the instructor:
 * "And therefore I will comment getServerSideProps out again, and comment
 * getStaticProps in. Because with that, we can take advantage of the caching
 * and we're not regenerating the page multiple times, unnecessarily."
 *
 * FOR OUR MEETUPS APP:
 * • Meetups don't change multiple times per second ✓
 * • No authentication needed on homepage ✓
 * • ISR with revalidate: 10 is sufficient ✓
 * • → USE getStaticProps! ✓
 *
 * ============================================================================
 * 📊 FINAL COMPARISON TABLE
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Feature              │ getStaticProps      │ getServerSideProps        │
 * │  ─────────────────────┼─────────────────────┼────────────────────────── │
 * │  Runs at              │ Build time          │ Every request             │
 * │  Can use revalidate   │ ✅ Yes              │ ❌ No                      │
 * │  Access to req/res    │ ❌ No               │ ✅ Yes                     │
 * │  CDN Cacheable        │ ✅ Yes              │ ❌ No                      │
 * │  Performance          │ ⭐⭐⭐⭐⭐            │ ⭐⭐⭐                       │
 * │  Data Freshness       │ Periodic (ISR)      │ Always fresh              │
 * │  Build output icon    │ ● (SSG)             │ λ (Lambda/SSR)            │
 * │  Best for             │ Most pages          │ Auth, real-time data      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

import MeetupList from '../components/meetups/MeetupList';

/**
 * DUMMY_MEETUPS - Simulating Data from a Backend
 */
const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!',
  },
];

/**
 * HomePage Component - Receives Pre-fetched Data via Props
 *
 * This component works the same whether data comes from
 * getStaticProps or getServerSideProps - it just receives props!
 *
 * @param {Object} props - Props provided by getStaticProps/getServerSideProps
 * @param {Array} props.meetups - Array of meetup objects
 */
function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

/**
 * ============================================================================
 * getStaticProps - STATIC GENERATION (RECOMMENDED FOR THIS APP)
 * ============================================================================
 *
 * This is the ACTIVE data fetching method for our homepage.
 *
 * From the instructor:
 * "Because with that, we can take advantage of the caching and we're not
 * regenerating the page multiple times, unnecessarily."
 *
 * WHY WE USE THIS:
 * 1. Meetups don't change every second
 * 2. No authentication needed
 * 3. ISR with revalidate: 10 keeps data fresh enough
 * 4. Better performance (CDN caching)
 */
export async function getStaticProps() {
  // Fetch data here (from API, database, file system, etc.)
  // This code runs at build time + every 10 seconds (ISR)

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 10, // ISR: Regenerate page at most every 10 seconds
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
 * From the instructor:
 * "Now, I will comment out getStaticProps, because it is the better choice
 * here and I wanna use it later again. But I want to show you this
 * alternative as well."
 *
 * From the instructor:
 * "The difference to getStaticProps is that this function will now not run
 * during the build process, but instead always on the server after deployment."
 *
 * UNCOMMENT THIS (and comment out getStaticProps above) IF:
 * - You need access to req/res objects
 * - You're implementing authentication
 * - Your data changes multiple times per second
 *
 * @param {Object} context - The context object with request/response
 * @param {Object} context.req - Incoming request object
 * @param {Object} context.res - Response object
 * @param {Object} context.params - Dynamic route parameters
 * @param {Object} context.query - Query string parameters
 */
// export async function getServerSideProps(context) {
//   /**
//    * ACCESS TO REQUEST AND RESPONSE OBJECTS
//    *
//    * From the instructor:
//    * "You also get access to the request object under the req key, and the
//    * response object that will be sent back."
//    *
//    * From the instructor:
//    * "And if you worked with NodeJS and Express before, this might look
//    * familiar to you. There, you also get request and response objects in
//    * your middleware to then work with those."
//    */
//   const req = context.req; // Incoming request
//   const res = context.res; // Outgoing response
//
//   /**
//    * EXAMPLE: AUTHENTICATION CHECK
//    *
//    * From the instructor:
//    * "And especially having access to the concrete request object can be
//    * helpful. For example, when you're working with authentication, and you
//    * need to check some session cookie or anything like this."
//    *
//    * Example authentication code:
//    * const session = req.cookies.session;
//    * if (!session) {
//    *   return { redirect: { destination: '/login', permanent: false } };
//    * }
//    */
//
//   /**
//    * FETCH DATA
//    *
//    * From the instructor:
//    * "And you can still then fetch data from an API here, or from the file
//    * system, whatever you want to do."
//    *
//    * This code runs on EVERY request, so data is always fresh.
//    * But it also means no caching - slower than getStaticProps!
//    */
//
//   /**
//    * RETURN PROPS (NO revalidate!)
//    *
//    * From the instructor:
//    * "Now you can't set revalidate here, because it doesn't make any sense
//    * here. This getServerSideProps function runs for every incoming request
//    * anyways, so there is no need to revalidate every x seconds."
//    *
//    * From the instructor:
//    * "Ultimately, you then don't return a response by working on that
//    * response object here, but instead, you return this object with the
//    * props key, which holds the props for this page component function."
//    */
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     // NOTE: No revalidate here! It runs on every request anyway.
//   };
// }

export default HomePage;
