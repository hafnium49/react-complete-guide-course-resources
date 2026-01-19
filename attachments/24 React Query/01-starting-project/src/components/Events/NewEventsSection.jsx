/**
 * ============================================================================
 * NewEventsSection - THE TRADITIONAL APPROACH (useEffect + fetch)
 * ============================================================================
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
 * PROBLEMS WITH THIS APPROACH
 * ============================================================================
 *
 * 1. BOILERPLATE CODE:
 *    - Need 3 separate useState hooks (data, error, isLoading)
 *    - Need to manually manage all state transitions
 *
 * 2. NO CACHING:
 *    - Every time this component mounts, it fetches data again
 *    - If user navigates away and back, another request is made
 *    - No way to share cached data between components
 *
 * 3. NO BACKGROUND REFETCHING:
 *    - Data becomes stale but UI doesn't know
 *    - No automatic refresh when user returns to the tab
 *
 * 4. NO REQUEST DEDUPLICATION:
 *    - If multiple components need the same data, each makes its own request
 *
 * 5. MANUAL ERROR HANDLING:
 *    - Must implement try/catch or .catch() manually
 *    - No built-in retry logic
 *
 * 6. NO LOADING STATE SHARING:
 *    - Each component manages its own loading state
 *    - Can't easily show a global loading indicator
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
   * TRADITIONAL APPROACH: Manual State Management
   *
   * We need THREE separate pieces of state:
   * - data: The fetched events
   * - error: Any error that occurred
   * - isLoading: Whether we're currently fetching
   *
   * With Tanstack Query, we'll get all three from ONE hook:
   * const { data, error, isPending } = useQuery(...)
   */
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * TRADITIONAL APPROACH: useEffect for Data Fetching
   *
   * Problems with this pattern:
   * 1. Runs on every mount (no caching)
   * 2. Can cause race conditions if component unmounts during fetch
   * 3. No automatic refetch on window focus
   * 4. Must handle loading/error states manually
   *
   * With Tanstack Query:
   * - Caches results automatically
   * - Handles race conditions
   * - Can refetch on window focus
   * - Provides loading/error states automatically
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
   * TRADITIONAL APPROACH: Conditional Rendering
   *
   * We must manually check each state and render accordingly.
   * This pattern is repeated in EVERY component that fetches data.
   *
   * Tanstack Query's useQuery provides:
   * - isPending (loading state)
   * - isError (error state)
   * - data (success state)
   * - error (error details)
   *
   * Making this pattern much cleaner!
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
