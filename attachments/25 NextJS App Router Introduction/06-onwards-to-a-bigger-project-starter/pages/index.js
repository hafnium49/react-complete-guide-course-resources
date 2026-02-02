/**
 * ============================================================================
 * pages/index.js - LESSONS 486, 487, 492, 493 & 494: THE STARTING PAGE
 * ============================================================================
 *
 * LESSON 486: Created this page file
 * LESSON 487: Filled this page with actual content (MeetupList + dummy data)
 * LESSON 492: Demonstrated the PROBLEM with client-side data fetching
 * LESSON 493: THE SOLUTION - getStaticProps for Static Generation
 * LESSON 494: Incremental Static Regeneration (ISR) with revalidate
 *
 * ============================================================================
 * 🎓 LESSON 494: INCREMENTAL STATIC REGENERATION (ISR)
 * ============================================================================
 *
 * This lesson covers:
 * 1. Understanding the `npm run build` output
 * 2. The problem with outdated data in static pages
 * 3. The `revalidate` property for ISR
 *
 * ============================================================================
 * 📦 UNDERSTANDING `npm run build` OUTPUT
 * ============================================================================
 *
 * From the instructor:
 * "Now to fully understand getStaticProps and also see what we can do with it,
 * let's quit the dev server for now and run npm run build. This is the build
 * command which you need to run before you deploy your NextJS site."
 *
 * When you run `npm run build`, you see output like this:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BUILD OUTPUT EXAMPLE                                                    │
 * │                                                                          │
 * │  Route (pages)                Size     First Load JS                    │
 * │  ┌ ● /                       1.2 kB   78 kB                             │
 * │  ├ ○ /404                    194 B    77 kB                             │
 * │  ├ ○ /[meetupId]             365 B    77 kB                             │
 * │  └ ○ /new-meetup             512 B    77 kB                             │
 * │                                                                          │
 * │  ● (SSG) - Static Site Generation (with getStaticProps)                 │
 * │  ○ (Static) - Static (no initial props)                                  │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "And in this output, we see what it did and that it generated some static
 * pages, for example, four pages to be precise."
 *
 * ============================================================================
 * 🔵 BUILD OUTPUT ICONS EXPLAINED
 * ============================================================================
 *
 * From the instructor:
 * "And then we got these icons here next to the pages. A filled dot and three
 * empty dots. If we scroll down, we see a legend here."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ICON LEGEND                                                             │
 * │                                                                          │
 * │  ● (Filled dot) = SSG - Static Site Generation                          │
 * │     • Page has getStaticProps                                            │
 * │     • Data was fetched at build time                                     │
 * │     • HTML + JSON generated                                              │
 * │     • JSON used for client-side navigation                              │
 * │                                                                          │
 * │  ○ (Empty dot) = Static                                                  │
 * │     • No getStaticProps                                                  │
 * │     • No data fetching needed                                            │
 * │     • Just HTML (no JSON)                                                │
 * │     • Example: form pages, static content                                │
 * │                                                                          │
 * │  λ (Lambda) = Server-side Rendering                                     │
 * │     • Has getServerSideProps                                             │
 * │     • Rendered on each request                                           │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "We learn that a filled dot is a statically generated site, that's what SSG
 * stands for, Static Site Generation, which was automatically generated as
 * HTML and JSON, which is then used for pre-fetching data once the page
 * turned into a single page application."
 *
 * From the instructor:
 * "The empty dot stands for Static Generation. That's almost the same. The
 * only difference is that here we got no initial props. So we have no initial
 * data that was fetched."
 *
 * ============================================================================
 * 📊 OUR PAGES IN THE BUILD
 * ============================================================================
 *
 * From the instructor:
 * "And indeed, only for the root page, we are fetching data because that is
 * the page where we added getStaticProps and that's why we have the filled
 * dot here."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  OUR APPLICATION'S PAGES                                                 │
 * │                                                                          │
 * │  /              ●  SSG - Has getStaticProps (fetches meetups)           │
 * │  /404           ○  Static - Auto-generated 404 page                     │
 * │  /[meetupId]    ○  Static - No getStaticProps yet (will add later)      │
 * │  /new-meetup    ○  Static - Form only, no data fetching needed          │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "For example, the new-meetup page does not need any data fetching. There,
 * we, in the end, only render our form and we don't need any data here, we
 * don't fetch any data from a server and therefore, the new-meetup page will
 * always stay a static page with no content. So that is fine."
 *
 * ============================================================================
 * ⚠️ THE PROBLEM: OUTDATED DATA
 * ============================================================================
 *
 * From the instructor:
 * "And one pretty big problem, which we could face in some websites, depending
 * on what we're doing is that the data here could be outdated."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  THE STALE DATA PROBLEM                                                  │
 * │                                                                          │
 * │  TIMELINE:                                                               │
 * │                                                                          │
 * │  Day 1: npm run build                                                    │
 * │         └─ Page generated with 2 meetups                                 │
 * │                                                                          │
 * │  Day 1: Deploy to production                                             │
 * │         └─ Users see 2 meetups ✅                                       │
 * │                                                                          │
 * │  Day 2: New meetup added to database                                     │
 * │         └─ Database now has 3 meetups                                    │
 * │                                                                          │
 * │  Day 2: Users visit the site                                             │
 * │         └─ Users still see 2 meetups ❌ (OUTDATED!)                     │
 * │                                                                          │
 * │  The pre-built HTML doesn't know about the new meetup!                  │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "This page, as I mentioned, is generated during the build process. So
 * thereafter, we deploy it. If we then add more meetups to our database,
 * this pre-generated page would not know about them."
 *
 * ============================================================================
 * 🔄 SOLUTION 1: REBUILD AND REDEPLOY
 * ============================================================================
 *
 * From the instructor:
 * "Now, we can always rebuild our site and redeploy when our data changes.
 * And for some websites, like personal blogs, this is a great alternative
 * because there data doesn't change too frequently."
 *
 * WHEN REBUILD/REDEPLOY IS FINE:
 * • Personal blogs (occasional posts)
 * • Documentation sites (occasional updates)
 * • Portfolio sites (rarely updated)
 * • Marketing pages (weekly/monthly updates)
 *
 * WHEN REBUILD/REDEPLOY IS NOT IDEAL:
 * • E-commerce (inventory changes constantly)
 * • News sites (content added frequently)
 * • Social platforms (user-generated content)
 * • Our meetup app (new meetups added often)
 *
 * ============================================================================
 * ⚡ SOLUTION 2: INCREMENTAL STATIC REGENERATION (ISR)
 * ============================================================================
 *
 * From the instructor:
 * "But if data does change more frequently, there is an extra property, which
 * we can add to this returned object. And that's the revalidate property."
 *
 * From the instructor:
 * "When we add this property to the object returned by getStaticProps, we
 * unlock a feature called Incremental Static Generation."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHAT IS ISR (Incremental Static Regeneration)?                          │
 * │                                                                          │
 * │  ISR allows you to:                                                      │
 * │  • Keep the benefits of static generation (speed, SEO)                  │
 * │  • Update static pages AFTER deployment                                  │
 * │  • Without rebuilding the entire site                                    │
 * │                                                                          │
 * │  It's the BEST OF BOTH WORLDS:                                          │
 * │  ✅ Fast like static pages                                               │
 * │  ✅ Fresh data like server-rendered pages                               │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔢 HOW revalidate WORKS
 * ============================================================================
 *
 * From the instructor:
 * "Revalidate wants a number, let's say 10, and this number is the number of
 * seconds NextJS will wait until it regenerates this page for an incoming
 * request."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  revalidate: 10 - THE FLOW                                               │
 * │                                                                          │
 * │  BUILD TIME:                                                             │
 * │  ┌───────────────────────────────────────────────────────────────────┐  │
 * │  │  npm run build → Page generated with data                         │  │
 * │  │                → This is the "initial" version                    │  │
 * │  └───────────────────────────────────────────────────────────────────┘  │
 * │                                                                          │
 * │  FIRST REQUEST (within 10 seconds):                                      │
 * │  ┌───────────────────────────────────────────────────────────────────┐  │
 * │  │  User visits → Gets the cached/built page immediately             │  │
 * │  │             → No regeneration (too soon)                          │  │
 * │  └───────────────────────────────────────────────────────────────────┘  │
 * │                                                                          │
 * │  REQUEST AFTER 10+ SECONDS:                                              │
 * │  ┌───────────────────────────────────────────────────────────────────┐  │
 * │  │  User visits → Gets the cached page immediately (still fast!)     │  │
 * │  │             → NextJS triggers regeneration IN THE BACKGROUND      │  │
 * │  │             → New page is generated with fresh data               │  │
 * │  │             → New page REPLACES the old cached page               │  │
 * │  └───────────────────────────────────────────────────────────────────┘  │
 * │                                                                          │
 * │  NEXT REQUEST:                                                           │
 * │  ┌───────────────────────────────────────────────────────────────────┐  │
 * │  │  User visits → Gets the NEW page (with fresh data!)               │  │
 * │  │             → Cycle repeats...                                    │  │
 * │  └───────────────────────────────────────────────────────────────────┘  │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "That means that with revalidate set to some number, this page will not
 * just be generated during the build process. It will be generated there but
 * not just but it will also be generated every couple of seconds on the
 * server, at least if there are requests for this page."
 *
 * ============================================================================
 * ⏱️ CHOOSING THE RIGHT revalidate VALUE
 * ============================================================================
 *
 * From the instructor:
 * "And therefore, the number of seconds you wanna use here depends on your
 * data update frequency. If your data changes once every hour, then setting
 * this to 3600 might be great. If it changes all the time, one second might
 * be better."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  RECOMMENDED revalidate VALUES                                           │
 * │                                                                          │
 * │  Data Change Frequency        Suggested Value                           │
 * │  ─────────────────────────────────────────────────────────────          │
 * │  Real-time (seconds)          1-10 seconds                              │
 * │  Frequently (minutes)         60-300 seconds (1-5 min)                  │
 * │  Hourly                       3600 seconds (1 hour)                     │
 * │  Daily                        86400 seconds (24 hours)                  │
 * │  Rarely                       false (no ISR, just rebuild)              │
 * │                                                                          │
 * │  EXAMPLES:                                                               │
 * │  • Stock prices: revalidate: 1                                          │
 * │  • News headlines: revalidate: 60                                        │
 * │  • Blog posts: revalidate: 3600                                          │
 * │  • Product catalog: revalidate: 300                                      │
 * │  • Our meetups app: revalidate: 10 (demo) or 3600 (real)                │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎯 KEY BENEFIT OF ISR
 * ============================================================================
 *
 * From the instructor:
 * "But whatever you set this number to, you will ensure that this page will
 * occasionally be re pre-generated on the server after deployment so that
 * you don't have to redeploy and rebuild all the time just because some
 * data changed."
 *
 * ISR ADVANTAGES:
 * 1. NO FULL REBUILD needed when data changes
 * 2. Pages update AUTOMATICALLY in production
 * 3. Users always see FAST responses (cached page served first)
 * 4. Fresh data is available within revalidate seconds
 * 5. Server load is reduced (not regenerating on every request)
 *
 * ============================================================================
 * 📊 ISR vs OTHER OPTIONS COMPARISON
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  COMPARISON TABLE                                                        │
 * │                                                                          │
 * │  Option              When Generated    Data Freshness   Performance     │
 * │  ─────────────────────────────────────────────────────────────────      │
 * │  Static (no SSG)     Build only        Stale            ⭐⭐⭐⭐⭐      │
 * │  SSG (no revalidate) Build only        Stale            ⭐⭐⭐⭐⭐      │
 * │  SSG + ISR           Build + interval  Fresh-ish        ⭐⭐⭐⭐        │
 * │  SSR                 Every request     Always fresh     ⭐⭐            │
 * │  Client-side         After hydration   Always fresh     ⭐⭐⭐          │
 * │                                                                          │
 * │  ISR = Best balance of performance and freshness!                       │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🧪 TESTING ISR
 * ============================================================================
 *
 * To test ISR in production mode:
 *
 * 1. Build the app: npm run build
 * 2. Start production: npm start
 * 3. Visit the page
 * 4. Modify the DUMMY_MEETUPS data
 * 5. Wait 10+ seconds
 * 6. Refresh the page
 * 7. The new data should appear!
 *
 * NOTE: ISR works differently in development (npm run dev) vs production.
 * In dev mode, pages regenerate on every request for easier development.
 *
 * ============================================================================
 */

import MeetupList from '../components/meetups/MeetupList';

/**
 * DUMMY_MEETUPS - Simulating Data from a Backend
 *
 * In a real application with ISR:
 * - This data would come from a database
 * - When the database changes, ISR would pick up the changes
 * - No rebuild needed!
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
 * This component doesn't need to know about ISR or revalidation.
 * It just receives props and renders - separation of concerns!
 *
 * @param {Object} props - Props provided by getStaticProps
 * @param {Array} props.meetups - Array of meetup objects
 */
function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

/**
 * ============================================================================
 * getStaticProps - WITH INCREMENTAL STATIC REGENERATION
 * ============================================================================
 *
 * This function now includes the `revalidate` property to enable ISR.
 *
 * From the instructor:
 * "When we add this property to the object returned by getStaticProps, we
 * unlock a feature called Incremental Static Generation."
 *
 * @returns {Object} Object containing props and revalidate configuration
 */
export async function getStaticProps() {
  /**
   * FETCH DATA
   *
   * In a real application, this would be:
   * - const meetups = await fetchFromDatabase();
   * - const meetups = await fetchFromAPI();
   *
   * With ISR, this code runs:
   * 1. Once at build time
   * 2. Then periodically (every `revalidate` seconds) when requests come in
   *
   * This means fresh data from your database/API will be picked up
   * automatically without redeploying!
   */

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },

    /**
     * =========================================================================
     * revalidate - LESSON 494: INCREMENTAL STATIC REGENERATION
     * =========================================================================
     *
     * From the instructor:
     * "Revalidate wants a number, let's say 10, and this number is the number
     * of seconds NextJS will wait until it regenerates this page for an
     * incoming request."
     *
     * HOW IT WORKS:
     *
     * 1. Page is generated at build time (npm run build)
     * 2. User requests the page → Gets cached version immediately
     * 3. If 10+ seconds have passed since last generation:
     *    - User still gets the cached version (fast!)
     *    - NextJS regenerates the page in the background
     *    - New version replaces the old cached version
     * 4. Next user gets the fresh version
     *
     * From the instructor:
     * "So that means that this page, with revalidate set to 10, would be
     * regenerated on the server at least every 10 seconds if there are
     * requests coming in for this page."
     *
     * From the instructor:
     * "And with that, you would ensure that your data is never older than
     * 10 seconds."
     *
     * CHOOSING A VALUE:
     *
     * From the instructor:
     * "The number of seconds you wanna use here depends on your data update
     * frequency. If your data changes once every hour, then setting this to
     * 3600 might be great. If it changes all the time, one second might be
     * better."
     *
     * IMPORTANT:
     * - Lower values = Fresher data but more server load
     * - Higher values = Faster responses but potentially staler data
     * - Find the right balance for YOUR application
     *
     * From the instructor:
     * "It doesn't really matter to us here, especially not as long as we're
     * just using this dummy array but it is an important feature you should
     * know about and that is how you can set it."
     */
    revalidate: 10, // Regenerate page at most every 10 seconds
  };
}

export default HomePage;
