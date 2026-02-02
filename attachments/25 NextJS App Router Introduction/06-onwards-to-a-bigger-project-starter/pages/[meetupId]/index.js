/**
 * ============================================================================
 * pages/[meetupId]/index.js - LESSONS 486, 491 & 496: DYNAMIC MEETUP DETAIL
 * ============================================================================
 *
 * LESSON 486: Created this dynamic page file using the folder approach
 * LESSON 491: Added MeetupDetail component for presenting meetup information
 * LESSON 496: Added getStaticProps with context.params for dynamic data
 *
 * ============================================================================
 * 🎓 LESSON 496: getStaticProps ON DYNAMIC PAGES
 * ============================================================================
 *
 * From the instructor:
 * "Now that was a lot of talking about getStaticProps and getServerSideProps.
 * But these are two key concepts, two key functions built into NextJS, which
 * you need all the time."
 *
 * From the instructor:
 * "And hence, let's also use them for the MeetupDetail page now."
 *
 * ============================================================================
 * ❓ WHY DOESN'T new-meetup PAGE NEED getStaticProps?
 * ============================================================================
 *
 * From the instructor:
 * "For the new Meetup page, as explained earlier we don't need them because
 * here we don't need any data and therefore there is no need to add
 * getStaticProps. It's really only there to fetch data for the pre-generated
 * page if that page needs any data and therefore we don't need it here."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHEN TO USE getStaticProps                                              │
 * │                                                                          │
 * │  ✅ USE getStaticProps:                                                  │
 * │     • Page displays data that needs to be fetched                       │
 * │     • Data comes from database, API, or file system                     │
 * │     • Want SEO-friendly pre-rendered content                            │
 * │                                                                          │
 * │  ❌ DON'T NEED getStaticProps:                                          │
 * │     • Page only contains a form (new-meetup page)                       │
 * │     • Page is purely static with no dynamic data                        │
 * │     • Data is fetched client-side only (not SEO critical)               │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🤔 getStaticProps vs getServerSideProps FOR THIS PAGE
 * ============================================================================
 *
 * From the instructor:
 * "Now, which one is better? It depends on how often your data changes and
 * if you need access to the request object."
 *
 * From the instructor:
 * "And here it's probably fair to assume that the meetupData does not change
 * very often. Indeed this app doesn't even have a feature for changing the
 * meetupData. We can only add Meetups but even if it would have a change
 * feature, it would probably not be the case that a Meetup changes multiple
 * times every second."
 *
 * From the instructor:
 * "And therefore, for the MeetupDetails I would argue that again,
 * getStaticProps is better than getServerSideProps."
 *
 * OUR ANALYSIS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHY getStaticProps IS BETTER HERE                                       │
 * │                                                                          │
 * │  1. Meetup data doesn't change frequently                               │
 * │     • No edit feature in this app                                        │
 * │     • Even with editing, wouldn't change every second                   │
 * │                                                                          │
 * │  2. No need for request/response objects                                │
 * │     • Not doing authentication                                           │
 * │     • Not checking cookies                                               │
 * │                                                                          │
 * │  3. Better performance                                                   │
 * │     • Page can be cached on CDN                                          │
 * │     • Faster response times                                              │
 * │                                                                          │
 * │  → USE getStaticProps ✓                                                 │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔑 THE CHALLENGE: GETTING THE meetupId FROM URL
 * ============================================================================
 *
 * From the instructor:
 * "Keep in mind that this is a dynamic page. So when we reach out to an API
 * to fetch the data for a single meetup, we need a way of identifying that
 * meetup. We need its ID for example."
 *
 * From the instructor:
 * "Now the ID thankfully is encoded into URL."
 *
 * THE PROBLEM:
 * How do we get the meetupId (from URL like /m1) inside getStaticProps?
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ❌ CAN'T USE useRouter IN getStaticProps                               │
 * │                                                                          │
 * │  From the instructor:                                                    │
 * │  "And therefore, we did learn that we can use the useRouter hook to     │
 * │  get access to this router object and then use the query property there.│
 * │  That's what we did earlier in this course."                            │
 * │                                                                          │
 * │  From the instructor:                                                    │
 * │  "But the problem with that is that the useRouter hook can only be used │
 * │  in the component function, not in getStaticProps. That's not a function│
 * │  where you can use react hooks."                                        │
 * │                                                                          │
 * │  REASON:                                                                 │
 * │  • React hooks can ONLY be used inside React component functions        │
 * │  • getStaticProps is NOT a React component                              │
 * │  • It runs at BUILD TIME (or on server), not in browser                 │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ✅ THE SOLUTION: context.params
 * ============================================================================
 *
 * From the instructor:
 * "So we can't get to the meetup ID from the URL with help of useRouter in
 * here. But we also don't need to."
 *
 * From the instructor:
 * "Because you might remember this context parameter, which I mentioned. I
 * showed it to you on getServerSideProps, but I mentioned that it also
 * actually exists on getStaticProps."
 *
 * From the instructor:
 * "Now, when we accept it on getStaticProps, context will not hold request
 * and response, but it will, for example, have a params key."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  context OBJECT IN getStaticProps                                        │
 * │                                                                          │
 * │  export async function getStaticProps(context) {                        │
 * │                                                                          │
 * │    context.params   →  Dynamic route parameters                         │
 * │                        { meetupId: 'm1' }                                │
 * │                                                                          │
 * │    context.preview  →  Preview mode enabled?                            │
 * │    context.previewData → Preview mode data                              │
 * │    context.locale   →  Current locale (i18n)                            │
 * │                                                                          │
 * │    ❌ NO context.req or context.res (only in getServerSideProps)        │
 * │                                                                          │
 * │  }                                                                       │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔗 context.params EXPLAINED
 * ============================================================================
 *
 * From the instructor:
 * "So there will be context.params, and that will be an object where our
 * identifiers between the square brackets will be properties and the values
 * will be the actual values encoded in the URL."
 *
 * From the instructor:
 * "So our meetup ID, for example, could be accessed with context.params.meetupId.
 * meetupId because that's the identifier I have between the square brackets."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  HOW params KEYS ARE DETERMINED                                          │
 * │                                                                          │
 * │  FOLDER/FILE NAME           URL              context.params              │
 * │  ─────────────────────────────────────────────────────────────          │
 * │  [meetupId]/index.js        /m1              { meetupId: 'm1' }          │
 * │  [meetupId]/index.js        /abc123          { meetupId: 'abc123' }      │
 * │  [slug].js                  /hello           { slug: 'hello' }           │
 * │  [category]/[id].js         /tech/42         { category: 'tech',         │
 * │                                                 id: '42' }               │
 * │                                                                          │
 * │  The KEY name matches what's between the square brackets!               │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ⚠️ ERROR: getStaticPaths IS REQUIRED
 * ============================================================================
 *
 * From the instructor:
 * "With that if we saved this and visit the detailed page of a single meetup,
 * we get an error though, getStaticPaths is required."
 *
 * This error occurs because:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHY getStaticPaths IS REQUIRED                                          │
 * │                                                                          │
 * │  DYNAMIC PAGES + getStaticProps = NEED getStaticPaths                   │
 * │                                                                          │
 * │  The problem:                                                            │
 * │  • getStaticProps generates pages at BUILD TIME                         │
 * │  • This is a DYNAMIC page - infinite possible URLs                       │
 * │  • How does NextJS know which pages to pre-generate?                    │
 * │    - /m1?                                                                │
 * │    - /m2?                                                                │
 * │    - /abc123?                                                            │
 * │    - /literally-any-string?                                             │
 * │                                                                          │
 * │  The solution:                                                           │
 * │  • getStaticPaths tells NextJS WHICH paths to pre-generate              │
 * │  • You define the list of valid meetupId values                         │
 * │  • NextJS generates a page for each one                                 │
 * │                                                                          │
 * │  This will be covered in the NEXT LESSON!                               │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📁 FOLDER STRUCTURE REMINDER
 * ============================================================================
 *
 *   /pages/
 *   ├── index.js              ← Home page (has getStaticProps)
 *   ├── new-meetup/
 *   │   └── index.js          ← Form page (NO getStaticProps needed)
 *   └── [meetupId]/
 *       └── index.js          ← THIS FILE (has getStaticProps)
 *                               → Also needs getStaticPaths (next lesson)
 *
 * ============================================================================
 */

import MeetupDetail from '../../components/meetups/MeetupDetail';

/**
 * MeetupDetails - Page Component for Individual Meetup
 *
 * Now receives data via props from getStaticProps!
 *
 * @param {Object} props - Props provided by getStaticProps
 * @param {Object} props.meetupData - The meetup data object
 * @param {string} props.meetupData.id - Meetup ID
 * @param {string} props.meetupData.image - Image URL
 * @param {string} props.meetupData.title - Meetup title
 * @param {string} props.meetupData.address - Physical address
 * @param {string} props.meetupData.description - Meetup description
 */
function MeetupDetails(props) {
  /**
   * RENDER WITH DATA FROM getStaticProps
   *
   * The data now comes from props (which comes from getStaticProps)
   * instead of being hardcoded in this component.
   *
   * Data flow:
   * 1. User visits /m1
   * 2. getStaticProps runs with context.params.meetupId = 'm1'
   * 3. getStaticProps returns { props: { meetupData: {...} } }
   * 4. This component receives props.meetupData
   * 5. We pass that data to MeetupDetail for rendering
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
 * getStaticProps - LESSON 496: DATA FETCHING FOR DYNAMIC PAGE
 * ============================================================================
 *
 * From the instructor:
 * "So here we export getStaticProps and we can turn it into an async function
 * if we want to use async await."
 *
 * From the instructor:
 * "And then here we could fetch the data for a single meetup."
 *
 * @param {Object} context - The context object (different from getServerSideProps!)
 * @param {Object} context.params - Dynamic route parameters from the URL
 * @returns {Object} Object containing props for the page component
 */
export async function getStaticProps(context) {
  /**
   * ACCESSING THE DYNAMIC ROUTE PARAMETER
   *
   * From the instructor:
   * "So our meetup ID, for example, could be accessed with context.params.meetupId.
   * meetupId because that's the identifier I have between the square brackets."
   *
   * Our folder is named [meetupId], so we access context.params.meetupId
   *
   * Examples:
   * - URL: /m1       → context.params.meetupId = 'm1'
   * - URL: /m2       → context.params.meetupId = 'm2'
   * - URL: /abc123   → context.params.meetupId = 'abc123'
   */
  const meetupId = context.params.meetupId;

  /**
   * CONSOLE.LOG FOR DEBUGGING
   *
   * From the instructor:
   * "I can console log this here inside of getStaticProps so that we can see
   * that this really works."
   *
   * NOTE: This logs on the SERVER (or during build), not in browser console!
   * Check your terminal where `npm run dev` is running.
   */
  console.log(meetupId);

  /**
   * FETCH DATA FOR THIS SPECIFIC MEETUP
   *
   * From the instructor:
   * "And then here we could fetch the data for a single meetup."
   *
   * In a real app, you would:
   * - Query your database: await db.collection('meetups').findOne({ _id: meetupId })
   * - Call an API: await fetch(`/api/meetups/${meetupId}`)
   * - Read from file system: fs.readFileSync(`data/${meetupId}.json`)
   *
   * For now, we're using dummy data.
   */

  /**
   * RETURN PROPS FOR THE PAGE COMPONENT
   *
   * From the instructor:
   * "And then we can of course return as object with the props. And here we
   * could have our meetupData prop or however you want to name it, which could
   * again be a nested object where we then have this data here."
   *
   * From the instructor:
   * "And then it's this meetup ID, which we could set as ID here if we want
   * to expose it to the component function."
   */
  return {
    props: {
      meetupData: {
        /**
         * Include the ID in the props
         *
         * From the instructor:
         * "Where we have ID if we needed, M1."
         *
         * We use the dynamic meetupId from the URL here.
         */
        id: meetupId,

        /**
         * From the instructor:
         * "So we have image set to the string..."
         */
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',

        /**
         * From the instructor:
         * "Where we have the title, First Meetup here."
         */
        title: 'First Meetup',

        /**
         * From the instructor:
         * "Where we have the address and that's this address"
         */
        address: 'Some Street 5, Some City',

        /**
         * From the instructor:
         * "And where we then also have the description here, this description."
         */
        description: 'This is a first meetup!',
      },
    },
  };
}

/**
 * ============================================================================
 * 🚨 NEXT LESSON: getStaticPaths IS REQUIRED!
 * ============================================================================
 *
 * If you run this code now, you'll get an error:
 * "Error: getStaticPaths is required for dynamic SSG pages"
 *
 * From the instructor:
 * "With that if we saved this and visit the detailed page of a single meetup,
 * we get an error though, getStaticPaths is required."
 *
 * WHAT'S MISSING:
 * For dynamic pages using getStaticProps, NextJS needs to know WHICH
 * pages to pre-generate at build time.
 *
 * SOLUTION (Next Lesson):
 * We need to add getStaticPaths() to tell NextJS:
 * "Here are all the valid meetupId values you should generate pages for"
 *
 * ```javascript
 * export async function getStaticPaths() {
 *   return {
 *     paths: [
 *       { params: { meetupId: 'm1' } },
 *       { params: { meetupId: 'm2' } },
 *     ],
 *     fallback: false
 *   };
 * }
 * ```
 *
 * This will be covered in the next lesson!
 *
 * ============================================================================
 */

export default MeetupDetails;
