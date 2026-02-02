/**
 * ============================================================================
 * pages/index.js - LESSONS 486, 487, 492 & 493: THE STARTING PAGE (HOME PAGE)
 * ============================================================================
 *
 * LESSON 486: Created this page file
 * LESSON 487: Filled this page with actual content (MeetupList + dummy data)
 * LESSON 492: Demonstrated the PROBLEM with client-side data fetching
 * LESSON 493: THE SOLUTION - getStaticProps for Static Generation
 *
 * ============================================================================
 * 🎓 LESSON 493: STATIC GENERATION WITH getStaticProps
 * ============================================================================
 *
 * From the instructor:
 * "NextJS has this built-in page pre-rendering but this built-in process has
 * a flaw if you wanna call it like this. As I showed you a couple of seconds
 * ago, the page that is pre-rendered has basically the snapshot after the
 * first component render cycle as its content and that might be missing
 * crucial data."
 *
 * ============================================================================
 * 🔄 RECAP: THE HYDRATION PROCESS
 * ============================================================================
 *
 * From the instructor:
 * "After this HTML page was received, React will actually take over, the page
 * is hydrated as this process is called, which means that now React will turn
 * this into a single page application and take over control."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHAT IS HYDRATION?                                                      │
 * │                                                                          │
 * │  1. Server sends pre-rendered HTML to browser                           │
 * │  2. Browser displays the HTML immediately (fast!)                       │
 * │  3. JavaScript bundles load                                              │
 * │  4. React "hydrates" the page:                                          │
 * │     - Attaches event listeners                                          │
 * │     - Makes components interactive                                       │
 * │     - Takes over DOM management                                          │
 * │  5. Page becomes a fully interactive SPA                                │
 * │                                                                          │
 * │  Problem: If data is fetched client-side (useEffect), the initial       │
 * │  HTML is empty of that data - bad for SEO!                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ⚡ TWO FORMS OF PRE-RENDERING IN NEXTJS
 * ============================================================================
 *
 * From the instructor:
 * "NextJS gives us two forms of pre-rendering, which we can use for controlling
 * how the pages should be rendered. It has something which is called Static
 * Generation and it has an alternative, which is called Server-side Rendering.
 * And the two might sound similar but they run or the code runs at different
 * points of time."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  NEXTJS PRE-RENDERING OPTIONS                                            │
 * │                                                                          │
 * │  ┌───────────────────────────────────────────────────────────────────┐  │
 * │  │  1. STATIC GENERATION (getStaticProps) ← THIS LESSON              │  │
 * │  │     • Page is pre-rendered at BUILD TIME                          │  │
 * │  │     • HTML is generated when you run `npm run build`              │  │
 * │  │     • Same HTML is served to ALL users                            │  │
 * │  │     • FASTEST option - HTML is cached on CDN                      │  │
 * │  │     • Use when: Data doesn't change frequently                    │  │
 * │  └───────────────────────────────────────────────────────────────────┘  │
 * │                                                                          │
 * │  ┌───────────────────────────────────────────────────────────────────┐  │
 * │  │  2. SERVER-SIDE RENDERING (getServerSideProps)                    │  │
 * │  │     • Page is pre-rendered on EVERY REQUEST                       │  │
 * │  │     • HTML is generated for each user request                     │  │
 * │  │     • Can access request/response objects                         │  │
 * │  │     • Use when: Data changes frequently or is user-specific       │  │
 * │  └───────────────────────────────────────────────────────────────────┘  │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "We're going to start with Static Generation because that is the approach
 * which you typically should use."
 *
 * ============================================================================
 * 🏗️ STATIC GENERATION - WHEN DOES IT RUN?
 * ============================================================================
 *
 * From the instructor:
 * "When using Static Generation, a page component is pre-rendered when you
 * build your application, when you build the next project. So when you build
 * it for production. And that's important."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STATIC GENERATION TIMELINE                                              │
 * │                                                                          │
 * │  DEVELOPMENT:                                                            │
 * │  ┌─────────────────────────────────────────────────────────────────┐    │
 * │  │  npm run dev → getStaticProps runs on each request              │    │
 * │  │  (for easier development/testing)                                │    │
 * │  └─────────────────────────────────────────────────────────────────┘    │
 * │                                                                          │
 * │  PRODUCTION BUILD:                                                       │
 * │  ┌─────────────────────────────────────────────────────────────────┐    │
 * │  │  npm run build → getStaticProps runs ONCE                       │    │
 * │  │                 → HTML files are generated                       │    │
 * │  │                 → These files are STATIC                        │    │
 * │  └─────────────────────────────────────────────────────────────────┘    │
 * │                                                                          │
 * │  DEPLOYMENT:                                                             │
 * │  ┌─────────────────────────────────────────────────────────────────┐    │
 * │  │  npm start → Serves the pre-built HTML files                    │    │
 * │  │            → No data fetching happens                            │    │
 * │  │            → Super fast response times!                          │    │
 * │  └─────────────────────────────────────────────────────────────────┘    │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "With Static Generation, by default, your page is not pre-rendered on the
 * fly on the server when a request reaches the server but instead, it is
 * pre-rendered when you as a developer build your site for production."
 *
 * ============================================================================
 * 🔄 WHAT ABOUT DATA UPDATES?
 * ============================================================================
 *
 * From the instructor:
 * "And that means that after it was deployed, that pre-rendered page does not
 * change. At least not by default. If you then updated the data and you know
 * that the pre-rendered page needs to change, you need to start that build
 * process again and redeploy again."
 *
 * IMPORTANT: This might sound limiting, but:
 *
 * From the instructor:
 * "But that might sound worse than it actually is because for a lot of
 * applications, pages don't change all the time. Page content doesn't change
 * all the time and if it should change frequently, there are alternatives,
 * which I will also show you in a couple of minutes."
 *
 * Alternatives for frequently changing data:
 * • Incremental Static Regeneration (ISR) - revalidate prop
 * • Server-Side Rendering (getServerSideProps)
 * • Client-side fetching (for non-SEO critical data)
 *
 * ============================================================================
 * 📦 THE getStaticProps FUNCTION
 * ============================================================================
 *
 * From the instructor:
 * "If you need to wait for data, if you need to add data fetching to a page
 * component, you can do so by exporting a special function from inside your
 * page component file."
 *
 * CRITICAL RULES:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  getStaticProps REQUIREMENTS                                             │
 * │                                                                          │
 * │  ✅ Must be EXPORTED (export function or export async function)         │
 * │  ✅ Must be named EXACTLY "getStaticProps" (reserved name)              │
 * │  ✅ Only works in PAGE component files (pages/ folder)                  │
 * │  ❌ Does NOT work in regular component files                            │
 * │  ❌ Does NOT work in components/ folder                                 │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "This now only works in your page component files, not in other component
 * files. Only in component files inside of the pages folder."
 *
 * From the instructor:
 * "In there, you can export a function, a function called getStaticProps and
 * it has to be called getStaticProps. This is a reserved name so to say.
 * NextJS will look for a function with that name and if it finds it, it
 * executes this function during this pre-rendering process."
 *
 * ============================================================================
 * ⚙️ HOW getStaticProps CHANGES THE RENDERING FLOW
 * ============================================================================
 *
 * From the instructor:
 * "So it will then not directly call your component function and use the
 * returned JSX snapshot as HTML content but it will, first of all, call
 * getStaticProps before it calls the component function."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WITHOUT getStaticProps (Lesson 492)                                     │
 * │                                                                          │
 * │  1. Component function runs                                              │
 * │  2. JSX is rendered (with empty state)                                  │
 * │  3. HTML snapshot is taken ← DATA MISSING!                              │
 * │  4. useEffect runs client-side (too late for SEO)                       │
 * │                                                                          │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │  WITH getStaticProps (This Lesson)                                       │
 * │                                                                          │
 * │  1. getStaticProps() runs FIRST                                         │
 * │  2. Data is fetched (can be async)                                      │
 * │  3. Props are returned                                                   │
 * │  4. Component function runs WITH props                                  │
 * │  5. JSX is rendered with ACTUAL DATA                                    │
 * │  6. HTML snapshot is taken ← DATA INCLUDED!                             │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ⏳ ASYNC SUPPORT - WAITING FOR DATA
 * ============================================================================
 *
 * From the instructor:
 * "And getStaticProps has this name because indeed, its job is to prepare
 * props for this page. And these props could then contain the data this page
 * needs. And that's useful because getStaticProps is allowed to be asynchronous."
 *
 * From the instructor:
 * "You can return a promise there and then, and that's the key thing, NextJS
 * will wait for this promise to resolve, which means it waits until your data
 * is loaded and then you return the props for this component function."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ASYNC DATA FETCHING EXAMPLE                                             │
 * │                                                                          │
 * │  export async function getStaticProps() {                               │
 * │    // Fetch from API                                                     │
 * │    const response = await fetch('https://api.example.com/meetups');     │
 * │    const data = await response.json();                                   │
 * │                                                                          │
 * │    // Or query a database                                                │
 * │    const meetups = await db.collection('meetups').find().toArray();     │
 * │                                                                          │
 * │    // NextJS WAITS for all this to complete!                            │
 * │    return {                                                              │
 * │      props: { meetups: data }                                           │
 * │    };                                                                    │
 * │  }                                                                       │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔒 SECURITY: SERVER-SIDE ONLY CODE
 * ============================================================================
 *
 * From the instructor:
 * "Now, here in getStaticProps, you can also execute any code that would
 * normally only run on a server. You could access a file system here or
 * securely connect to a database because any code you write in here will
 * never end up on the client side and it will never execute on the client
 * side simply because this code is executed during the build process, not
 * on the server and especially not on the clients of your visitors."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  🔐 WHAT YOU CAN SAFELY DO IN getStaticProps                            │
 * │                                                                          │
 * │  ✅ Access the file system (fs module)                                  │
 * │  ✅ Connect to databases directly                                       │
 * │  ✅ Use API keys and secrets                                            │
 * │  ✅ Query internal services                                              │
 * │  ✅ Read environment variables                                          │
 * │                                                                          │
 * │  WHY IS THIS SAFE?                                                       │
 * │                                                                          │
 * │  From the instructor:                                                    │
 * │  "So the code in here will never reach the machines of your visitors.  │
 * │  It will never execute on their machines."                              │
 * │                                                                          │
 * │  The code is:                                                            │
 * │  • Executed during build (npm run build)                                │
 * │  • Stripped from the client-side JavaScript bundle                      │
 * │  • Never sent to the browser                                             │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📤 THE RETURN VALUE
 * ============================================================================
 *
 * From the instructor:
 * "But then once you're done with whatever you did to get the data you need,
 * you need to return an object here in getStaticProps. You always need to
 * return an object here."
 *
 * From the instructor:
 * "Now, in this object, you can configure various things but most importantly,
 * you typically set a props property here and it has to be named props."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  getStaticProps RETURN OBJECT                                            │
 * │                                                                          │
 * │  return {                                                                │
 * │    props: {                    // REQUIRED: Props for the component     │
 * │      meetups: [...],          // Your data                              │
 * │      // any other props...                                               │
 * │    },                                                                    │
 * │    revalidate: 10,            // OPTIONAL: ISR - regenerate every 10s  │
 * │    notFound: true,            // OPTIONAL: Return 404 page              │
 * │    redirect: {                // OPTIONAL: Redirect to another page    │
 * │      destination: '/other'                                              │
 * │    }                                                                     │
 * │  };                                                                      │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔗 THE PROPS CONNECTION
 * ============================================================================
 *
 * From the instructor:
 * "And that then holds another object, which will be the props object you
 * receive in your component function here in this page component function.
 * This now receives a props object and the object will be the object you
 * set as props here in getStaticProps."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  DATA FLOW                                                               │
 * │                                                                          │
 * │  getStaticProps()                      HomePage(props)                  │
 * │  ┌────────────────────┐                ┌────────────────────┐           │
 * │  │ return {           │                │ function HomePage  │           │
 * │  │   props: {         │  ─────────►    │   (props) {        │           │
 * │  │     meetups: [...]│                │   props.meetups    │           │
 * │  │   }                │                │   ...              │           │
 * │  │ }                  │                │ }                  │           │
 * │  └────────────────────┘                └────────────────────┘           │
 * │                                                                          │
 * │  The "props" object from getStaticProps becomes the props parameter!   │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🧹 NO MORE useState/useEffect NEEDED!
 * ============================================================================
 *
 * From the instructor:
 * "Therefore, in this page component, we no longer need to manage state, we
 * no longer need useEffect and we can therefore get rid of those imports
 * here because now we get the data through props."
 *
 * BEFORE (Lesson 492):
 * ```javascript
 * import { useEffect, useState } from 'react';
 *
 * function HomePage() {
 *   const [loadedMeetups, setLoadedMeetups] = useState([]);
 *   useEffect(() => {
 *     setLoadedMeetups(DUMMY_MEETUPS);
 *   }, []);
 *   return <MeetupList meetups={loadedMeetups} />;
 * }
 * ```
 *
 * AFTER (This Lesson):
 * ```javascript
 * function HomePage(props) {
 *   return <MeetupList meetups={props.meetups} />;
 * }
 *
 * export async function getStaticProps() {
 *   return { props: { meetups: DUMMY_MEETUPS } };
 * }
 * ```
 *
 * Much cleaner! Data fetching is separated from rendering.
 *
 * ============================================================================
 * ✅ THE RESULT - SEO FRIENDLY HTML
 * ============================================================================
 *
 * From the instructor:
 * "If I now save everything, if we reload our page, we still see our meetups
 * here but if I now view the page source, we see that we no longer have an
 * empty unordered list, instead we have an unordered list, which has list
 * items with the images and the title and so on."
 *
 * From the instructor:
 * "So now this is pre-rendered and it now contains the full HTML code and
 * that's, of course, also great for search engines then because now, data
 * is not fetched in a second component render cycle on the client but
 * initially, before this page is pre-rendered, during the build process."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  VIEW PAGE SOURCE COMPARISON                                             │
 * │                                                                          │
 * │  BEFORE (useEffect):                  AFTER (getStaticProps):           │
 * │  ┌─────────────────────┐              ┌─────────────────────┐           │
 * │  │ <ul class="list">   │              │ <ul class="list">   │           │
 * │  │ </ul>               │              │   <li>              │           │
 * │  │                     │              │     <img src="..."> │           │
 * │  │ ← EMPTY!            │              │     <h3>A First...  │           │
 * │  │                     │              │     ...             │           │
 * │  │                     │              │   </li>             │           │
 * │  │                     │              │   <li>              │           │
 * │  │                     │              │     ...             │           │
 * │  │                     │              │   </li>             │           │
 * │  │                     │              │ </ul>               │           │
 * │  └─────────────────────┘              └─────────────────────┘           │
 * │                                                                          │
 * │  Search engines can now see and index all the meetup data!              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎯 KEY TAKEAWAYS
 * ============================================================================
 *
 * From the instructor:
 * "And that's a great plus and one of the main features of NextJS, this data
 * fetching for pre-rendering. And getStaticProps will be a function you use
 * a lot when working with NextJS."
 *
 * 1. Use getStaticProps for data that doesn't change frequently
 * 2. It runs at BUILD TIME (not on every request)
 * 3. Code is secure - never sent to client
 * 4. Must be exported from page component files only
 * 5. Must return an object with a props property
 * 6. The component receives props as a parameter
 *
 * ============================================================================
 */

import MeetupList from '../components/meetups/MeetupList';

/**
 * DUMMY_MEETUPS - Simulating Data from a Backend
 *
 * In a real application, this data would be fetched from:
 * - A database (MongoDB, PostgreSQL, etc.)
 * - A REST API endpoint
 * - A CMS (Content Management System)
 * - Files on the file system
 *
 * From the instructor:
 * "Here in getStaticProps, you can do whatever you want, for example, fetch
 * data from an API or from a database or read data from some files in the
 * file system."
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
 * HomePage Component - Now Receives Data via Props
 *
 * IMPORTANT CHANGE FROM LESSON 492:
 * - No more useState for managing meetups
 * - No more useEffect for "fetching" data
 * - Data comes through props from getStaticProps
 *
 * From the instructor:
 * "Therefore, in this page component, we no longer need to manage state,
 * we no longer need useEffect and we can therefore get rid of those imports
 * here because now we get the data through props."
 *
 * @param {Object} props - Props provided by getStaticProps
 * @param {Array} props.meetups - Array of meetup objects
 */
function HomePage(props) {
  /**
   * RENDERING WITH PROPS
   *
   * From the instructor:
   * "And our meetups for the MeetupList component are props.meetups.
   * .meetups because I'm adding a meetups prop down there."
   *
   * The meetups data is:
   * 1. Loaded in getStaticProps (at build time)
   * 2. Passed as props to this component
   * 3. Available immediately - no waiting!
   * 4. Already in the pre-rendered HTML
   */
  return <MeetupList meetups={props.meetups} />;
}

/**
 * ============================================================================
 * getStaticProps - THE STAR OF LESSON 493
 * ============================================================================
 *
 * This is a special NextJS function for Static Generation.
 *
 * From the instructor:
 * "NextJS will look for a function with that name and if it finds it, it
 * executes this function during this pre-rendering process."
 *
 * WHEN THIS RUNS:
 * • Development (npm run dev): On each page request
 * • Production build (npm run build): Once, during build
 * • Production (npm start): Never - uses cached result
 *
 * From the instructor:
 * "And with that, you're able to load data before this component function
 * is executed so that this component can be rendered with the required data."
 *
 * @returns {Object} Object containing props for the page component
 */
export async function getStaticProps() {
  /**
   * DATA FETCHING HAPPENS HERE
   *
   * From the instructor:
   * "Here in getStaticProps, you can do whatever you want, for example,
   * fetch data from an API or from a database or read data from some
   * files in the file system."
   *
   * This is where you would typically:
   *
   * 1. Fetch from an API:
   *    const response = await fetch('https://api.example.com/meetups');
   *    const data = await response.json();
   *
   * 2. Query a database directly:
   *    const client = await MongoClient.connect(process.env.MONGODB_URI);
   *    const meetups = await client.db().collection('meetups').find().toArray();
   *
   * 3. Read from the file system:
   *    const filePath = path.join(process.cwd(), 'data', 'meetups.json');
   *    const fileData = fs.readFileSync(filePath);
   *    const meetups = JSON.parse(fileData);
   *
   * SECURITY NOTE:
   * From the instructor:
   * "Any code you write in here will never end up on the client side and
   * it will never execute on the client side simply because this code is
   * executed during the build process."
   *
   * For now, we're using DUMMY_MEETUPS to simulate fetched data.
   */

  /**
   * RETURN THE PROPS OBJECT
   *
   * From the instructor:
   * "But then once you're done with whatever you did to get the data you need,
   * you need to return an object here in getStaticProps. You always need to
   * return an object here."
   *
   * The returned object MUST have a 'props' property:
   *
   * From the instructor:
   * "You typically set a props property here and it has to be named props.
   * And that then holds another object, which will be the props object you
   * receive in your component function."
   */
  return {
    /**
     * PROPS - Data for the Page Component
     *
     * From the instructor:
     * "And there we could have our meetups key in there. The structure of
     * this props object is totally up to you, which holds our DUMMY_MEETUPS."
     *
     * This object becomes available as `props` in HomePage(props).
     * So props.meetups will contain the DUMMY_MEETUPS array.
     *
     * From the instructor:
     * "With that, those DUMMY_MEETUPS would be loaded and prepared in
     * getStaticProps and then they would be set as props for this page component."
     */
    props: {
      meetups: DUMMY_MEETUPS,
    },

    /**
     * OPTIONAL: revalidate (Incremental Static Regeneration)
     *
     * Uncomment this to enable ISR - the page will be regenerated
     * at most once every X seconds when a request comes in.
     *
     * Example: revalidate: 10 means:
     * - Serve cached page immediately
     * - If 10+ seconds have passed, regenerate in background
     * - Next request gets the new page
     *
     * This is covered in later lessons!
     */
    // revalidate: 10,
  };
}

export default HomePage;
