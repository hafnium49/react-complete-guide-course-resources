/**
 * ============================================================================
 * Header Component - LESSON 428: useIsFetching Hook
 * ============================================================================
 *
 * This component demonstrates the useIsFetching hook from React Query,
 * which provides a GLOBAL loading indicator for all ongoing queries.
 *
 * ============================================================================
 * LESSON 428: GLOBAL FETCHING INDICATOR
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "To provide a better user experience here we can use another hook provided
 * by React Query. And that's the useIsFetching hook."
 *
 * INSTRUCTOR QUOTE:
 * "This hook does not need any arguments. Instead it will just yield a number,
 * the number of currently ongoing requests."
 *
 * THE PROBLEM WITHOUT useIsFetching:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  When using React Router loaders:                                       │
 * │    - Data is fetched BEFORE the component renders                       │
 * │    - The component doesn't show its own loading state                   │
 * │    - User has NO INDICATION that data is being loaded!                  │
 * │                                                                          │
 * │  With useIsFetching in Header:                                          │
 * │    - Header always shows when ANY query is fetching                     │
 * │    - Works for loader-based fetches AND component-based fetches        │
 * │    - Provides consistent user feedback                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * IMPORTING useIsFetching FROM REACT QUERY
 *
 * INSTRUCTOR QUOTE:
 * "To provide a better user experience here we can use another hook provided
 * by React Query. And that's the useIsFetching hook."
 *
 * useIsFetching is a React Query hook that:
 * - Returns the NUMBER of currently ongoing fetches (queries)
 * - Updates automatically as fetches start and complete
 * - Works globally - tracks ALL queries in the application
 * - 0 means no fetches in progress
 * - > 0 means at least one fetch is in progress
 */
import { useIsFetching } from '@tanstack/react-query';

export default function Header({ children }) {
  /**
   * ============================================================================
   * useIsFetching - TRACK GLOBAL QUERY STATE
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "This hook does not need any arguments. Instead it will just yield a number,
   * the number of currently ongoing requests."
   *
   * HOW IT WORKS:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  fetching === 0  →  No queries currently loading                       │
   * │  fetching === 1  →  One query is loading                               │
   * │  fetching === 2  →  Two queries are loading                            │
   * │  fetching > 0    →  At least one query is loading (show indicator!)    │
   * └─────────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE:
   * "With that we can go to the Header JSX file, use this hook there, and
   * based on this number we get back, output some content conditionally."
   *
   * This is especially useful when:
   * - Using React Router loaders (no component loading state)
   * - Having multiple queries that might fetch at different times
   * - Wanting a consistent "app is loading" indicator
   */
  const fetching = useIsFetching();

  return (
    <>
      {/**
       * CONDITIONAL LOADING INDICATOR
       *
       * INSTRUCTOR QUOTE:
       * "And here I will now check if fetching is greater than zero because
       * if it is we can be sure that at least one query is currently fetching
       * data somewhere in this application."
       *
       * INSTRUCTOR QUOTE:
       * "And for this loading state, I prepared this div with ID main header
       * loading. If we output a progress element here, an HTML progress element,
       * this will actually look like a loading bar."
       *
       * THE PROGRESS ELEMENT:
       * - HTML5 element that displays a progress indicator
       * - Without value/max attributes, shows an indeterminate spinner/bar
       * - CSS in index.css styles this to appear at the top of the header
       *
       * VISUAL FLOW:
       * ┌─────────────────────────────────────────────────────────────────────┐
       * │  User navigates to /events/:id/edit                                 │
       * │       │                                                             │
       * │       ▼                                                             │
       * │  loader() starts fetching                                           │
       * │       │                                                             │
       * │       ├─→ useIsFetching() returns > 0                               │
       * │       │                                                             │
       * │       ├─→ <progress> element displayed in Header                    │
       * │       │                                                             │
       * │       ▼                                                             │
       * │  loader() completes                                                 │
       * │       │                                                             │
       * │       ├─→ useIsFetching() returns 0                                 │
       * │       │                                                             │
       * │       └─→ <progress> element removed                                │
       * │                                                                     │
       * │  EditEvent component renders with cached data                       │
       * └─────────────────────────────────────────────────────────────────────┘
       */}
      <div id="main-header-loading">
        {fetching > 0 && <progress />}
      </div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}

/**
 * ============================================================================
 * LESSON 428 SUMMARY: useIsFetching FOR GLOBAL LOADING STATE
 * ============================================================================
 *
 * WHY THIS IS USEFUL:
 *
 * INSTRUCTOR QUOTE:
 * "To provide a better user experience here we can use another hook provided
 * by React Query. And that's the useIsFetching hook."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BENEFITS OF useIsFetching:                                              │
 * │                                                                          │
 * │  1. Global visibility                                                   │
 * │     - Works for ANY query in the entire app                             │
 * │     - No need to pass loading state through props                       │
 * │                                                                          │
 * │  2. Works with loaders                                                  │
 * │     - React Router loaders don't have component loading state           │
 * │     - useIsFetching still tracks these fetches!                         │
 * │                                                                          │
 * │  3. Consistent UX                                                       │
 * │     - Same loading indicator regardless of which component fetches      │
 * │     - User always knows when the app is working                         │
 * │                                                                          │
 * │  4. Simple implementation                                               │
 * │     - Just one hook call: const fetching = useIsFetching()              │
 * │     - Check if fetching > 0 to show loading state                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ALTERNATIVE: useIsFetching WITH QUERY FILTERS
 *
 * If you want to track only specific queries:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  // Track all fetching queries (what we use):                           │
 * │  const fetching = useIsFetching();                                      │
 * │                                                                          │
 * │  // Track only 'events' queries:                                        │
 * │  const eventsFetching = useIsFetching({ queryKey: ['events'] });        │
 * │                                                                          │
 * │  // Track queries matching multiple criteria:                           │
 * │  const specificFetching = useIsFetching({                               │
 * │    queryKey: ['events'],                                                │
 * │    exact: false,  // Include all queries starting with ['events']       │
 * │  });                                                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
