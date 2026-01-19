/**
 * ============================================================================
 * NewEventsSection - THE TRADITIONAL APPROACH (useEffect + fetch)
 * ============================================================================
 *
 * LESSON 411 - WHY TANSTACK QUERY IS USEFUL
 *
 * This component demonstrates the TRADITIONAL way of fetching data in React
 * using useEffect and the built-in fetch API.
 *
 * INSTRUCTOR QUOTE (Lesson 409):
 * "Of course, in this course, you already learned how to do that, for example,
 * with useEffect and using the built-in fetch function that's provided by the
 * browser."
 *
 * In upcoming lessons, we'll REPLACE this implementation with Tanstack Query
 * to see how much simpler and more powerful it can be!
 *
 * ============================================================================
 * WHAT IS TANSTACK QUERY?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 411):
 * "Tanstack Query is a library that helps you with sending HTTP requests and
 * keeping your frontend user interface in sync with your backend data."
 *
 * KEY INSIGHT: You don't NEED Tanstack Query - useEffect + fetch works fine!
 * But Tanstack Query makes your code simpler and adds powerful features.
 *
 * ============================================================================
 * PROBLEM #1: TOO MUCH CODE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 411):
 * "It's quite a lot of code that we have to write here... in every component
 * that wants to send HTTP requests."
 *
 * Look at this component - we need:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • 3 separate useState hooks (data, error, isLoading)                   │
 * │  • A useEffect hook with an async function inside                       │
 * │  • Manual state transitions (setIsLoading, setData, setError)          │
 * │  • Promise handling with .then(), .catch(), .finally()                 │
 * │  • Conditional rendering logic for each state                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * And this same pattern must be REPEATED in every component that fetches data!
 *
 * ============================================================================
 * PROBLEM #2: CUSTOM HOOKS DON'T FULLY SOLVE IT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 411):
 * "We could simplify this code... by building a custom hook... But even if
 * we would build such a custom hook this code would still have some problems."
 *
 * Even with a custom useFetch hook, you'd still be missing:
 * - Caching
 * - Background refetching
 * - Request deduplication
 * - Automatic retries
 *
 * ============================================================================
 * PROBLEM #3: NO AUTOMATIC REFETCHING
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 411):
 * "For example, the data will not automatically be fetched again if you
 * leave this tab and then come back to it."
 *
 * Why this matters:
 * - User opens your app, sees data
 * - User switches to another tab for 5 minutes
 * - Meanwhile, data changes on the server
 * - User returns to your tab → SEES STALE DATA!
 *
 * Tanstack Query can automatically refetch when the window regains focus.
 *
 * ============================================================================
 * PROBLEM #4: NO CACHING
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 411):
 * "It will not cache data in memory so that it can be reused if the same
 * data is needed again."
 *
 * Current behavior without caching:
 * - Navigate to Events page → fetch events
 * - Navigate to Event Details → fetch single event
 * - Navigate back to Events → fetch events AGAIN (even though we just had them!)
 *
 * With Tanstack Query:
 * - Data is cached in memory
 * - Subsequent requests for same data use the cache
 * - Cache can be configured with staleTime and cacheTime
 *
 * ============================================================================
 * THESE SUBTLE FEATURES MATTER
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 411):
 * "These are subtle features... but they can make a big difference in how
 * your application feels to users and how efficient it is."
 *
 * Tanstack Query provides:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ Automatic caching                                                    │
 * │  ✓ Background refetching on window focus                               │
 * │  ✓ Request deduplication                                                │
 * │  ✓ Automatic retries on failure                                        │
 * │  ✓ Optimistic updates                                                   │
 * │  ✓ Pagination/infinite query support                                   │
 * │  ✓ DevTools for debugging                                               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * TANSTACK QUERY WILL SOLVE ALL OF THESE PROBLEMS!
 *
 * ============================================================================
 */

import { useEffect, useState } from 'react';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

export default function NewEventsSection() {
  /**
   * TRADITIONAL APPROACH: Manual State Management (Lesson 411)
   *
   * INSTRUCTOR QUOTE (Lesson 411):
   * "It's quite a lot of code that we have to write here."
   *
   * We need THREE separate pieces of state:
   * - data: The fetched events
   * - error: Any error that occurred
   * - isLoading: Whether we're currently fetching
   *
   * This is the "boilerplate" that must be repeated in EVERY component
   * that needs to fetch data. Tanstack Query eliminates this with:
   *
   * const { data, error, isPending } = useQuery(...)  // ONE line!
   */
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * TRADITIONAL APPROACH: useEffect for Data Fetching (Lesson 411)
   *
   * INSTRUCTOR QUOTE (Lesson 411):
   * "The data will not automatically be fetched again if you leave this
   * tab and then come back to it."
   *
   * INSTRUCTOR QUOTE (Lesson 411):
   * "It will not cache data in memory so that it can be reused if the
   * same data is needed again."
   *
   * Problems with this pattern:
   * 1. Runs on every mount (NO CACHING - wastes bandwidth)
   * 2. Can cause race conditions if component unmounts during fetch
   * 3. NO automatic refetch on window focus (data becomes stale)
   * 4. Must handle loading/error states manually
   * 5. Must be duplicated in every component that fetches data
   *
   * With Tanstack Query (coming in next lessons):
   * - Caches results automatically in memory
   * - Handles race conditions internally
   * - Refetches on window focus (configurable)
   * - Provides loading/error states automatically
   * - One hook replaces all this code!
   */
  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/events');

      if (!response.ok) {
        const error = new Error('An error occurred while fetching the events');
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }

      const { events } = await response.json();

      return events;
    }

    fetchEvents()
      .then((events) => {
        setData(events);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  /**
   * TRADITIONAL APPROACH: Conditional Rendering (Lesson 411)
   *
   * INSTRUCTOR QUOTE (Lesson 411):
   * "It's quite a lot of code that we have to write here... in every
   * component that wants to send HTTP requests."
   *
   * We must manually check each state and render accordingly.
   * This exact pattern is COPIED into every component that fetches data:
   * - Check isLoading → show spinner
   * - Check error → show error message
   * - Check data → render the content
   *
   * Tanstack Query's useQuery provides cleaner alternatives:
   * - isPending (loading state)
   * - isError (error state)
   * - data (success state)
   * - error (error details)
   *
   * Plus additional states like: isStale, isFetching, isRefetching
   */
  let content;

  if (isLoading) {
    content = <LoadingIndicator />;
  }

  if (error) {
    content = (
      <ErrorBlock title="An error occurred" message="Failed to fetch events" />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
