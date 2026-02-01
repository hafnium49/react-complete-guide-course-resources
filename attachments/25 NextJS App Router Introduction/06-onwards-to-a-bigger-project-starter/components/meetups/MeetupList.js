/**
 * ============================================================================
 * MeetupList.js - LESSON 485: MEETUP LIST COMPONENT
 * ============================================================================
 *
 * This component renders a list of meetups by mapping over an array.
 * It's pure React - no NextJS-specific code here!
 *
 * From the instructor:
 * "These are mostly just React components and standard React code.
 * There's nothing NextJS specific about those files... We get components
 * for showing meetups as a list."
 *
 * ============================================================================
 * 🎓 COMPONENT PURPOSE
 * ============================================================================
 *
 * MeetupList takes an array of meetup data and renders each one using
 * the MeetupItem component. This is a classic React "list rendering" pattern.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  DATA FLOW                                                               │
 * │                                                                          │
 * │  [Parent Page]                                                           │
 * │       │                                                                  │
 * │       │ meetups={[{id, title, image, address}, ...]}                    │
 * │       ▼                                                                  │
 * │  [MeetupList]  ──────────────────────────────────────────────────────┐  │
 * │       │                                                               │  │
 * │       │ maps over array                                               │  │
 * │       ▼                                                               │  │
 * │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                   │  │
 * │  │ MeetupItem  │  │ MeetupItem  │  │ MeetupItem  │  ...              │  │
 * │  └─────────────┘  └─────────────┘  └─────────────┘                   │  │
 * │                                                                       │  │
 * └──────────────────────────────────────────────────────────────────────┘  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📋 PROPS THIS COMPONENT RECEIVES
 * ============================================================================
 *
 * ┌─────────────┬─────────────────────────────────────────────────────────┐
 * │ Prop        │ Description                                              │
 * ├─────────────┼─────────────────────────────────────────────────────────┤
 * │ meetups     │ Array of meetup objects                                 │
 * └─────────────┴─────────────────────────────────────────────────────────┘
 *
 * Each meetup object in the array should have:
 * {
 *   id: string,       // Unique identifier (used as React key)
 *   title: string,    // Meetup name
 *   image: string,    // Image URL
 *   address: string   // Physical location
 * }
 *
 * Example:
 * ```javascript
 * const DUMMY_MEETUPS = [
 *   {
 *     id: 'm1',
 *     title: 'A First Meetup',
 *     image: 'https://example.com/img1.jpg',
 *     address: 'Some Street 5, Some City'
 *   },
 *   {
 *     id: 'm2',
 *     title: 'A Second Meetup',
 *     image: 'https://example.com/img2.jpg',
 *     address: 'Another Street 10, Another City'
 *   }
 * ];
 *
 * <MeetupList meetups={DUMMY_MEETUPS} />
 * ```
 *
 * ============================================================================
 * 🗺️ THE .map() PATTERN
 * ============================================================================
 *
 * This is one of the most common React patterns for rendering lists:
 *
 * 1. Receive an array via props
 * 2. Call .map() on the array
 * 3. Return a component for each array item
 * 4. Pass data as props to each component
 * 5. Always include a unique "key" prop!
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHY IS THE "key" PROP REQUIRED?                                         │
 * │                                                                          │
 * │  React uses keys to identify which items in a list have:                │
 * │  • Changed                                                               │
 * │  • Been added                                                            │
 * │  • Been removed                                                          │
 * │                                                                          │
 * │  Without keys, React would re-render the entire list on any change.     │
 * │  With keys, React can efficiently update only what changed.             │
 * │                                                                          │
 * │  Keys should be:                                                         │
 * │  • Unique among siblings                                                 │
 * │  • Stable (don't change between renders)                                │
 * │  • Typically use database IDs or unique identifiers                     │
 * │                                                                          │
 * │  ⚠️ DON'T USE ARRAY INDEX AS KEY (unless list is static)               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📝 HOW THIS WILL BE USED IN NEXTJS
 * ============================================================================
 *
 * In upcoming lessons, you'll use this component in page files:
 *
 * Example pages/index.js (Home Page):
 * ```javascript
 * import MeetupList from '../components/meetups/MeetupList';
 * import Layout from '../components/layout/Layout';
 *
 * function HomePage(props) {
 *   return (
 *     <Layout>
 *       <MeetupList meetups={props.meetups} />
 *     </Layout>
 *   );
 * }
 *
 * // Data fetching with getStaticProps (you'll learn this!)
 * export async function getStaticProps() {
 *   // Fetch meetups from database or API
 *   const meetups = await fetchMeetupsFromDatabase();
 *   return {
 *     props: { meetups }
 *   };
 * }
 *
 * export default HomePage;
 * ```
 *
 * ============================================================================
 * 🏗️ COMPONENT HIERARCHY
 * ============================================================================
 *
 *   [Page Component]
 *   └── Layout.js
 *       └── MeetupList.js (THIS FILE)
 *           ├── MeetupItem.js (meetup 1)
 *           ├── MeetupItem.js (meetup 2)
 *           ├── MeetupItem.js (meetup 3)
 *           └── ... (more items)
 *
 * ============================================================================
 * ⚛️ REACT CONCEPTS USED
 * ============================================================================
 *
 * 1. LIST RENDERING WITH .map()
 *    Transforms array data into React elements
 *
 * 2. KEY PROP
 *    Essential for efficient list updates (uses meetup.id)
 *
 * 3. PROPS SPREADING (Individual props vs. spread)
 *    Each prop is passed individually for clarity
 *    Alternative: <MeetupItem key={meetup.id} {...meetup} />
 *
 * 4. CSS MODULES
 *    Scoped styles via MeetupList.module.css
 *
 * ============================================================================
 */

import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

/**
 * MeetupList Component - Renders a List of Meetup Cards
 *
 * Takes an array of meetup data and renders a MeetupItem for each one.
 *
 * @param {Object} props
 * @param {Array} props.meetups - Array of meetup objects to display
 * @param {string} props.meetups[].id - Unique identifier
 * @param {string} props.meetups[].title - Meetup title
 * @param {string} props.meetups[].image - Image URL
 * @param {string} props.meetups[].address - Physical address
 *
 * @example
 * <MeetupList meetups={[
 *   { id: 'm1', title: 'First', image: 'url1', address: 'Address 1' },
 *   { id: 'm2', title: 'Second', image: 'url2', address: 'Address 2' }
 * ]} />
 */
function MeetupList(props) {
  return (
    // Unordered list container
    // MeetupItem renders <li> elements inside this <ul>
    <ul className={classes.list}>
      {/*
       * Array.map() - Transforms each meetup object into a MeetupItem
       *
       * For each meetup in the array:
       * 1. Create a MeetupItem component
       * 2. Pass meetup data as props
       * 3. Include unique key for React's reconciliation
       *
       * The (meetup) parameter represents each object in props.meetups
       *
       * Arrow function syntax:
       * props.meetups.map((meetup) => <Component />)
       *                  ↑ current item in iteration
       */}
      {props.meetups.map((meetup) => (
        <MeetupItem
          // KEY PROP - Required for lists!
          // Uses meetup.id as unique identifier
          // React uses this to track item identity across re-renders
          key={meetup.id}
          // ID - Passed for potential navigation (detail page link)
          id={meetup.id}
          // IMAGE - URL for the meetup's image
          image={meetup.image}
          // TITLE - The meetup's name/title
          title={meetup.title}
          // ADDRESS - Physical location of the meetup
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
