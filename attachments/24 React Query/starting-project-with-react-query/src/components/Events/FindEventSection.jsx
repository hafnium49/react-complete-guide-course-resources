/**
 * ============================================================================
 * FindEventSection - LESSON 414: Dynamic Queries & Query Keys
 * ============================================================================
 *
 * This component demonstrates:
 * 1. Using useQuery with dynamic parameters (search term)
 * 2. Using dynamic queryKeys that change based on user input
 * 3. Why different queries need different queryKeys
 * 4. Combining useState with useQuery for reactive searches
 *
 * ============================================================================
 * WHY DIFFERENT QUERIES NEED DIFFERENT KEYS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now if we would use this queryKey, we would of course be using the same
 * queryKey as in the NewEventsSection component. There we currently have
 * exactly the same queryKey. And as a result of using the same key, React
 * Query would actually use the result from this first query in the
 * NewEventsSection component in that other query in that other component
 * because the results are cached, they are available, and therefore they
 * would be used here."
 *
 * INSTRUCTOR QUOTE:
 * "But that of course would be wrong because that would typically be too
 * many results because typically we're searching for something that should
 * only yield a couple of results, not all of them."
 *
 * QueryKey Comparison:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  NewEventsSection:   queryKey: ['events']                               │
 * │  FindEventSection:   queryKey: ['events', { search: searchTerm }]       │
 * │                                                                          │
 * │  These are DIFFERENT keys, so they are cached SEPARATELY!               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "Therefore here we should also include some other piece of information in
 * that queryKey. And that other piece of information should be dynamic
 * because it should be that search term for which we're looking."
 *
 * ============================================================================
 * WHY useState INSTEAD OF JUST useRef?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "But using this ref value for fetchEvents and for this key is actually not
 * ideal, because refs, unlike state in React don't cause this component
 * function to re-execute which means that as the value entered into this
 * input here changes, this query is not updated and not sent again."
 *
 * INSTRUCTOR QUOTE:
 * "But of course we would wanna send it again to get new data if the user
 * did enter a different search term."
 *
 * Flow with useState:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. User types in search input                                          │
 * │  2. User clicks Search button → form submits                            │
 * │  3. handleSubmit calls setSearchTerm(input value)                       │
 * │  4. State changes → Component re-renders                                │
 * │  5. useQuery sees new searchTerm → Sends new query with new key         │
 * │  6. New results are displayed                                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * NOTE: BUG IN THIS LESSON (Fixed in Lesson 415)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "If you go back and you reload you'll see that here in the find your next
 * event section. We got some events, but we also see that they now
 * disappeared here in recently added events."
 *
 * The bug: NewEventsSection also calls fetchEvents, but useQuery passes
 * an object to queryFn, not the searchTerm directly. This causes
 * "object-object" to be sent as the search parameter.
 *
 * This will be fixed in Lesson 415!
 *
 * ============================================================================
 */

import { useRef, useState } from 'react';
/**
 * IMPORTING useQuery (Lesson 414)
 *
 * INSTRUCTOR QUOTE:
 * "Because in this file we can and should now also again import useQuery
 * to send another query with help of TanStack React Query."
 */
import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

/**
 * Import fetchEvents from our utility file.
 *
 * INSTRUCTOR QUOTE:
 * "And of course we also need to import fetchEvents.
 * So we should import fetchEvents from going up, going up, util/http.js."
 */
import { fetchEvents } from '../../util/http.js';

export default function FindEventSection() {
  const searchElement = useRef();

  /**
   * STATE FOR SEARCH TERM (Lesson 414)
   *
   * INSTRUCTOR QUOTE:
   * "Therefore, here in this component I will also manage some state with
   * the useState hook and that state will be my search term."
   *
   * Why state instead of just ref?
   * - Refs don't trigger re-renders when they change
   * - State changes cause the component to re-render
   * - useQuery will re-run with the new searchTerm value
   * - This creates reactive search behavior!
   */
  const [searchTerm, setSearchTerm] = useState();

  /**
   * ============================================================================
   * useQuery FOR SEARCH (Lesson 414)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "So here we can then execute useQuery and again of course configure it.
   * And we'll need a query function and as you learned before, also this
   * query key. This doesn't change."
   */
  const { data, isPending, isError, error } = useQuery({
    /**
     * QUERY KEY WITH DYNAMIC SEARCH TERM
     *
     * INSTRUCTOR QUOTE:
     * "And here the queryKey should be events, but it should be more than
     * just that because this is now a query that does not have the goal of
     * fetching all events but instead only events that match our search term."
     *
     * INSTRUCTOR QUOTE:
     * "So we need a different queryKey here so that this query works
     * independently from this query. And the results from this query in the
     * NewEventsSection component are not used as results for this query in
     * the FindEventSection component."
     *
     * INSTRUCTOR QUOTE:
     * "So we could, for example, pass an object here to this key where we
     * have a search property and then our dynamic search term as a value.
     * Alternatively, we could also just pass our searchTerm as a dynamic
     * value here. This is up to you, but here I'll go for this extra object
     * to make it very clear which kind of other value we have in this queryKey."
     *
     * How queryKey enables proper caching:
     * - ['events', { search: 'city' }]  → Cached separately
     * - ['events', { search: 'park' }]  → Cached separately
     * - ['events']                       → NewEventsSection cache (different!)
     */
    queryKey: ['events', { search: searchTerm }],

    /**
     * QUERY FUNCTION WITH WRAPPER
     *
     * INSTRUCTOR QUOTE:
     * "The query function is now again fetchEvents but we now actually must
     * control how this will be called to make sure that this search term
     * that was entered in this input is forwarded to fetchEvents."
     *
     * INSTRUCTOR QUOTE:
     * "And to do that, we can actually wrap this in a function, an anonymous
     * arrow function here in my case, and then pass the value that was
     * entered into this input to fetchEvents."
     *
     * Why wrap in an arrow function?
     * - useQuery calls queryFn with an object containing query info
     * - We need to pass our searchTerm to fetchEvents
     * - The wrapper lets us control exactly what fetchEvents receives
     */
    queryFn: () => fetchEvents(searchTerm),
  });

  /**
   * FORM SUBMIT HANDLER
   *
   * INSTRUCTOR QUOTE:
   * "And my goal in handleSubmit is now to call setSearchTerm and to pass
   * the searchElement value as a value to this state updating function so
   * that my searchTerm is the value entered in this input field, but only
   * after the form was submitted."
   */
  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  /**
   * ============================================================================
   * CONDITIONAL CONTENT RENDERING
   * ============================================================================
   *
   * Similar to NewEventsSection, but with a default "enter search term" message.
   */
  let content = <p>Please enter a search term and to find events.</p>;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || 'Failed to fetch events'}
      />
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
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
