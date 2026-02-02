/**
 * ============================================================================
 * pages/index.js - LESSONS 486, 487 & 492: THE STARTING PAGE (HOME PAGE)
 * ============================================================================
 *
 * LESSON 486: Created this page file
 * LESSON 487: Filled this page with actual content (MeetupList + dummy data)
 * LESSON 492: Demonstrating the PROBLEM with client-side data fetching
 *
 * ============================================================================
 * ⚠️ LESSON 492: THE DATA FETCHING PROBLEM IN NEXTJS
 * ============================================================================
 *
 * This lesson demonstrates a CRITICAL PROBLEM with the traditional React
 * approach to data fetching when used in NextJS.
 *
 * From the instructor:
 * "Now at the moment, we are using this dummy meetups array for rendering our
 * list of meetups. And on the meetup detailed page, we just have some hard
 * coded dummy data and that's not realistic. In reality, we would have a
 * backend, some database which holds that data."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  🎯 GOAL OF THIS LESSON                                                 │
 * │                                                                          │
 * │  We're SIMULATING what would happen if we fetched data from a backend   │
 * │  using the traditional React approach (useEffect + useState).           │
 * │                                                                          │
 * │  This reveals a fundamental problem with SEO and pre-rendering!         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔄 THE TRADITIONAL REACT APPROACH
 * ============================================================================
 *
 * From the instructor:
 * "And how would we typically do this in React? Well, if we wanna send a HTTP
 * request once this page is rendered, we would typically use the useEffect
 * hook to control this."
 *
 * Traditional React data fetching pattern:
 * 1. Component renders with initial/empty state
 * 2. useEffect runs AFTER the render
 * 3. Fetch data from API/backend
 * 4. Update state with fetched data
 * 5. Component re-renders with actual data
 *
 * From the instructor:
 * "So we would import useEffect from React and then execute useEffect here
 * and have an empty dependencies array, probably, which means that this
 * effect function runs whenever the component is first rendered, but never
 * thereafter."
 *
 * ============================================================================
 * 🐛 THE PROBLEM: TWO RENDER CYCLES
 * ============================================================================
 *
 * From the instructor:
 * "But technically there is a difference because it is important to note that
 * useEffect works such that it executes this function after important, AFTER
 * the component function was executed."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  HOW useEffect TIMING WORKS                                             │
 * │                                                                          │
 * │  RENDER CYCLE 1:                                                        │
 * │  ┌──────────────────────────────────────────────┐                       │
 * │  │ 1. Component function executes               │                       │
 * │  │ 2. loadedMeetups = [] (empty array)          │                       │
 * │  │ 3. JSX renders with EMPTY list               │                       │
 * │  │ 4. React commits to DOM                      │                       │
 * │  │ 5. useEffect runs (schedules state update)   │                       │
 * │  └──────────────────────────────────────────────┘                       │
 * │                                                                          │
 * │  RENDER CYCLE 2:                                                        │
 * │  ┌──────────────────────────────────────────────┐                       │
 * │  │ 1. State changed → component re-renders      │                       │
 * │  │ 2. loadedMeetups = [meetup1, meetup2]        │                       │
 * │  │ 3. JSX renders with ACTUAL data              │                       │
 * │  │ 4. User finally sees the meetups             │                       │
 * │  └──────────────────────────────────────────────┘                       │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "So that means that, the first time this homepage component is rendered,
 * loadedMeetups will be an empty array. Then this effect function will
 * execute, it will then update the state and then this component function
 * will execute again because the state changed and it will then re-render
 * the list with the actual data but we'll have two component render cycles."
 *
 * ============================================================================
 * 🔍 THE SEO PROBLEM - VIEW PAGE SOURCE
 * ============================================================================
 *
 * From the instructor:
 * "Because of these two render cycles, we have a problem with search engine
 * optimization. If I viewed a page source, you will notice that in there,
 * the actual meetup data is missing. I got my unordered list here and this
 * unordered list is EMPTY."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHAT YOU SEE ON SCREEN vs WHAT'S IN THE HTML SOURCE                    │
 * │                                                                          │
 * │  ON SCREEN (after JavaScript runs):                                     │
 * │  ┌────────────────────────────────┐                                     │
 * │  │  [Image]                       │                                     │
 * │  │  A First Meetup                │                                     │
 * │  │  Some address 5, 12345...      │                                     │
 * │  │  [Show Details]                │                                     │
 * │  │                                │                                     │
 * │  │  [Image]                       │                                     │
 * │  │  A Second Meetup               │                                     │
 * │  │  ...                           │                                     │
 * │  └────────────────────────────────┘                                     │
 * │                                                                          │
 * │  IN HTML SOURCE (View Page Source):                                     │
 * │  ┌────────────────────────────────┐                                     │
 * │  │  <ul class="list">             │                                     │
 * │  │  </ul>                         │  ← EMPTY! No list items!            │
 * │  └────────────────────────────────┘                                     │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🤖 WHY SEARCH ENGINES CAN'T SEE THE DATA
 * ============================================================================
 *
 * From the instructor:
 * "So the items which we see on the screen here, these items are MISSING in
 * the HTML content. In the HTML page we fetched from the server and they are
 * missing because they are only rendered in the second component execution
 * cycle."
 *
 * The problem explained:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  NEXTJS PRE-RENDERING BEHAVIOR                                          │
 * │                                                                          │
 * │  NextJS pre-renders pages on the server to send HTML to the browser.    │
 * │                                                                          │
 * │  BUT: NextJS only takes the result of the FIRST render cycle!           │
 * │                                                                          │
 * │  It does NOT wait for:                                                  │
 * │  • useEffect to complete                                                 │
 * │  • State updates                                                         │
 * │  • Async operations                                                      │
 * │  • Second render cycle                                                   │
 * │                                                                          │
 * │  Result: The pre-rendered HTML is EMPTY of dynamic data!                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "But the pre-rendered HTML page generated by NextJS automatically does not
 * wait for this second cycle. It always takes the result of the first render
 * cycle and return stat as the pre-rendered HTML code. And there, this data
 * is missing."
 *
 * ============================================================================
 * 😟 WHY THIS MATTERS
 * ============================================================================
 *
 * From the instructor:
 * "Now, why am I emphasizing this? Because if we would fetch this from a
 * backend, our users might see a loading spinner briefly, which could or
 * could not be the user experience we wanna offer."
 *
 * TWO MAIN ISSUES:
 *
 * 1. USER EXPERIENCE
 *    - Users see empty page/loading spinner first
 *    - Then content pops in
 *    - Can feel slow and janky
 *
 * 2. SEO (Search Engine Optimization)
 *    - Search engine bots crawl the HTML
 *    - They see an EMPTY page
 *    - Your content won't be indexed properly
 *    - Bad for search rankings
 *
 * ============================================================================
 * 💡 SOLUTION PREVIEW
 * ============================================================================
 *
 * From the instructor:
 * "But thankfully, NextJS also has solutions to this problem. It has more
 * core features built into NextJS that help us with precisely this problem
 * that we wanna pre-render a page with data, but with data for which we
 * have to wait."
 *
 * NextJS provides special functions:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  UPCOMING: DATA FETCHING SOLUTIONS                                       │
 * │                                                                          │
 * │  getStaticProps()                                                        │
 * │  • Runs at BUILD TIME                                                    │
 * │  • Fetches data BEFORE page is pre-rendered                             │
 * │  • Data is included in the initial HTML                                 │
 * │  • Perfect for SEO!                                                      │
 * │                                                                          │
 * │  getServerSideProps()                                                    │
 * │  • Runs on EVERY REQUEST                                                 │
 * │  • Fetches fresh data server-side                                       │
 * │  • Data is included in the initial HTML                                 │
 * │                                                                          │
 * │  These will be covered in the next lessons!                             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "And we need to tell NextJS, once we're done waiting and therefore that's
 * now what we're going to explore next, how we can fetch data for pre-rendering."
 *
 * ============================================================================
 * 🧪 TRY IT YOURSELF
 * ============================================================================
 *
 * To see the problem in action:
 *
 * 1. Start the development server:
 *    npm run dev
 *
 * 2. Visit http://localhost:3000
 *
 * 3. You'll see the meetups appear (JavaScript runs, second cycle completes)
 *
 * 4. Right-click and select "View Page Source" (NOT Developer Tools!)
 *
 * 5. Look for <ul class="list">...</ul>
 *
 * 6. Notice: The <ul> is EMPTY - no <li> items!
 *
 * This proves that the server-rendered HTML doesn't contain the meetup data.
 *
 * ============================================================================
 */

/**
 * Import React hooks for the traditional data fetching pattern
 *
 * From the instructor:
 * "Well, if we wanna send a HTTP request once this page is rendered, we would
 * typically use the useEffect hook to control this... And then we could manage
 * some state for this component with the useState hook."
 *
 * useState: Manages the list of meetups (starts empty, gets populated)
 * useEffect: Runs the "fetch" logic after component mounts
 */
import { useEffect, useState } from 'react';

import MeetupList from '../components/meetups/MeetupList';

/**
 * DUMMY_MEETUPS - Simulating Data from a Backend
 *
 * From the instructor:
 * "And for the moment, let's just simulate that we fetched the dummy meetups.
 * Of course, they are available right from the start here, but let's assume
 * we just fetched them from a server."
 *
 * In a real application, this data would come from:
 * - A REST API endpoint
 * - A GraphQL query
 * - A database query
 * - A third-party service
 *
 * We're using local data to SIMULATE the fetch behavior without needing
 * an actual backend. The TIMING behavior is what matters here.
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
 * HomePage Component - Demonstrating the Data Fetching Problem
 *
 * This component uses the TRADITIONAL React pattern for data fetching,
 * which works fine for client-side React apps, but has problems in NextJS.
 *
 * From the instructor:
 * "Let's change this component to behave the way it would behave if we would
 * reach out to a backend."
 */
function HomePage() {
  /**
   * STATE: Managing the loaded meetups
   *
   * From the instructor:
   * "And then here, we could manage our list of meetups. Let's say the
   * loadedMeetups and we have our setLoadedMeetups state updating function."
   *
   * IMPORTANT: Initial state is an EMPTY ARRAY!
   *
   * This means on the FIRST render cycle:
   * - loadedMeetups = []
   * - MeetupList receives an empty array
   * - No meetups are rendered
   * - This is what gets pre-rendered by NextJS!
   */
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  /**
   * EFFECT: Simulating a data fetch from a backend
   *
   * From the instructor:
   * "And then execute useEffect here and have an empty dependencies array,
   * probably, which means that this effect function runs whenever the
   * component is first rendered, but never thereafter."
   *
   * CRITICAL TIMING:
   * useEffect runs AFTER the component renders, not before!
   *
   * Timeline:
   * 1. Component function runs
   * 2. useState returns [] (initial state)
   * 3. JSX renders with empty array
   * 4. React commits to DOM
   * 5. useEffect callback runs ← DATA IS FETCHED HERE
   * 6. setLoadedMeetups triggers re-render
   * 7. Component function runs again with actual data
   *
   * From the instructor:
   * "And in useEffect, we would send that HTTP request and fetch data.
   * And then once that's done, it would be an asynchronous task, of course,
   * but once that's done, we would call setLoadedMeetups like this and set
   * the meetups that we fetched from a server as the meetups for this component."
   */
  useEffect(() => {
    /**
     * SIMULATING AN API FETCH
     *
     * In a real application, this would look like:
     *
     * ```javascript
     * fetch('/api/meetups')
     *   .then(response => response.json())
     *   .then(data => {
     *     setLoadedMeetups(data.meetups);
     *   });
     * ```
     *
     * Or with async/await:
     *
     * ```javascript
     * const fetchMeetups = async () => {
     *   const response = await fetch('/api/meetups');
     *   const data = await response.json();
     *   setLoadedMeetups(data.meetups);
     * };
     * fetchMeetups();
     * ```
     *
     * From the instructor:
     * "And for the moment, let's just simulate that we fetched the dummy meetups.
     * Of course, they are available right from the start here, but let's assume
     * we just fetched them from a server. So some promise completed here and we
     * got back the response."
     */
    setLoadedMeetups(DUMMY_MEETUPS);
  }, []); // Empty dependency array = runs once on mount

  /**
   * RENDER: Passing state to MeetupList
   *
   * From the instructor:
   * "And now I set my dummy meetups as the loaded meetups and here in the JSX
   * code, we pass the loaded meetups, so our state into meetup list."
   *
   * FIRST RENDER: loadedMeetups = [] → Empty list displayed
   * SECOND RENDER: loadedMeetups = [m1, m2] → Meetups displayed
   *
   * THE PROBLEM:
   * NextJS pre-renders the FIRST render result (empty list)!
   * View Page Source will show an empty <ul></ul>
   *
   * From the instructor:
   * "If we do all of that, if we visit the starting page with all the meetups,
   * we don't see any difference there. When I reload, all the meetups are there,
   * right from the start because we never really send a HTTP request."
   *
   * The user sees meetups because JavaScript runs in the browser
   * and completes the second render cycle. But search engines
   * and the initial HTML only get the first (empty) render.
   */
  return <MeetupList meetups={loadedMeetups} />;
}

export default HomePage;
