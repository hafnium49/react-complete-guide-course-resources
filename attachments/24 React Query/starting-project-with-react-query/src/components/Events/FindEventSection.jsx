/**
 * ============================================================================
 * FindEventSection - LESSONS 414-416: Dynamic Queries, Query Keys & Disabling
 * ============================================================================
 *
 * This component demonstrates:
 * 1. Using useQuery with dynamic parameters (search term)
 * 2. Using dynamic queryKeys that change based on user input
 * 3. Why different queries need different queryKeys
 * 4. Combining useState with useQuery for reactive searches
 * 5. (Lesson 415) Forwarding React Query's signal to enable request abortion
 * 6. (Lesson 416) Disabling queries with `enabled` property
 * 7. (Lesson 416) Difference between `isPending` and `isLoading`
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
 * LESSON 415: BUG FIX - FORWARDING THE SIGNAL
 * ============================================================================
 *
 * THE BUG (from Lesson 414):
 * INSTRUCTOR QUOTE:
 * "If you go back and you reload you'll see that here in the find your next
 * event section. We got some events, but we also see that they now
 * disappeared here in recently added events."
 *
 * THE FIX:
 * INSTRUCTOR QUOTE:
 * "Now to also forward that signal here, we can simply accept this object
 * here in this anonymous function because that's now the function that will
 * actually be called by React Query and therefore we'll get the signal here."
 *
 * INSTRUCTOR QUOTE:
 * "We can then simply set it as a key value pair in this object here as well.
 * And therefore now we have the highest degree of flexibility we can have."
 *
 * TWO WAYS TO USE queryFn (Lesson 415):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. DIRECT ASSIGNMENT (when no custom data needed):                     │
 * │     queryFn: fetchEvents                                                │
 * │     → React Query passes { signal, queryKey } directly to fetchEvents  │
 * │                                                                          │
 * │  2. WRAPPER FUNCTION (when custom data needed):                         │
 * │     queryFn: ({ signal }) => fetchEvents({ signal, searchTerm })       │
 * │     → We receive React Query's object, extract what we need,            │
 * │       and pass our own object to fetchEvents                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "We can wrap fetchEvents with an anonymous function to pass any data we
 * want via that object to fetchEvents and still get that data that's provided
 * to us by React Query."
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
  const { data, isLoading, isError, error } = useQuery({
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
     * QUERY FUNCTION WITH WRAPPER (Lessons 414-415)
     *
     * INSTRUCTOR QUOTE (Lesson 414):
     * "The query function is now again fetchEvents but we now actually must
     * control how this will be called to make sure that this search term
     * that was entered in this input is forwarded to fetchEvents."
     *
     * INSTRUCTOR QUOTE (Lesson 415):
     * "Now to also forward that signal here, we can simply accept this object
     * here in this anonymous function because that's now the function that
     * will actually be called by React Query and therefore we'll get the
     * signal here."
     *
     * How this works:
     * 1. React Query calls our arrow function with { signal, queryKey, meta }
     * 2. We destructure to extract just the signal
     * 3. We pass { signal, searchTerm } to fetchEvents
     * 4. fetchEvents uses signal for abort capability and searchTerm for URL
     */
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),

    /**
     * =========================================================================
     * LESSON 416: DISABLING QUERIES WITH enabled PROPERTY
     * =========================================================================
     *
     * THE PROBLEM:
     * INSTRUCTOR QUOTE:
     * "Because when the application initially loads, no searchTerm has been
     * entered yet here. No one clicked to search button yet, yet a search
     * request is being sent. And I don't really want that."
     *
     * INSTRUCTOR QUOTE:
     * "Instead it would be great if that request here would not be sent
     * initially and only once the user did click the search button and did
     * search for something."
     *
     * THE SOLUTION - enabled property:
     * INSTRUCTOR QUOTE:
     * "Well, there is another configuration option you can add here and that's
     * the enabled option. This allows you to disable this query."
     *
     * INSTRUCTOR QUOTE:
     * "If you set it to false, this query will not be sent. And we can set
     * this dynamically. For example, if the searchTerm is undefined because
     * no one searched for anything yet, we could set this to false."
     *
     * How enabled works:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  searchTerm = undefined  →  enabled = false  →  Query NOT sent     │
     * │  searchTerm = ''         →  enabled = true   →  Query IS sent      │
     * │  searchTerm = 'city'     →  enabled = true   →  Query IS sent      │
     * └─────────────────────────────────────────────────────────────────────┘
     *
     * INSTRUCTOR QUOTE:
     * "We should check whether the searchTerm is not equal to undefined.
     * So if it's anything but undefined this will be true and the query will
     * be enabled. If it is undefined, it will be false and the query will
     * not be enabled."
     *
     * WHY CHECK FOR undefined SPECIFICALLY (not falsy)?
     * INSTRUCTOR QUOTE:
     * "If searchTerm is an empty string, the query should be sent to get
     * all events back, just as it worked before. But if it's undefined,
     * meaning the user never searched for anything, the query should not be
     * sent at all."
     *
     * Initial state flow:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  1. Component mounts → searchTerm = undefined                       │
     * │  2. enabled = (undefined !== undefined) = false                     │
     * │  3. Query is DISABLED → No request sent                             │
     * │  4. User clicks Search with empty input → searchTerm = ''          │
     * │  5. enabled = ('' !== undefined) = true                             │
     * │  6. Query is ENABLED → Request sent for all events                  │
     * └─────────────────────────────────────────────────────────────────────┘
     */
    enabled: searchTerm !== undefined,
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

  /**
   * =========================================================================
   * LESSON 416: isPending vs isLoading - CRITICAL DIFFERENCE
   * =========================================================================
   *
   * THE PROBLEM WITH isPending:
   * INSTRUCTOR QUOTE:
   * "The problem is that we are using isPending here because we learned
   * that isPending is the property that tells us whether the Query is still
   * in progress, whether it's still waiting for a response. Now this is not
   * wrong, but here we got a problem."
   *
   * INSTRUCTOR QUOTE:
   * "Now the problem just is that isPending is true if the Query is disabled,
   * because technically it hasn't received a response yet."
   *
   * WHY THIS MATTERS:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  isPending = true when:                                             │
   * │    - Request is in progress (waiting for response)                  │
   * │    - Query is DISABLED (no request sent yet)  ← PROBLEM!            │
   * │                                                                      │
   * │  isLoading = true when:                                             │
   * │    - Request is in progress AND query is enabled                    │
   * │    - NOT true when query is disabled                                │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE:
   * "And the difference here simply is that isLoading will be true if
   * isPending is true, so if the request is on its way, and if the query
   * is enabled. And therefore if you use isLoading instead of isPending,
   * the Loading indicator won't be shown anymore initially."
   *
   * Visual comparison:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  SCENARIO                    │  isPending  │  isLoading            │
   * │──────────────────────────────│─────────────│───────────────────────│
   * │  Query disabled (enabled=false)│    true     │    false            │
   * │  Query enabled, fetching     │    true     │    true               │
   * │  Query enabled, data ready   │    false    │    false              │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE:
   * "So now therefore, if we check for isLoading and we have this enabled
   * check here, we can load this page here. And now you see we don't see
   * that Loading indicator anymore. Instead we see this text
   * 'Please enter a search term'."
   */
  if (isLoading) {
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
