/**
 * ============================================================================
 * NewEventsSection - USING TANSTACK QUERY (Lessons 412-415, 427)
 * ============================================================================
 *
 * LESSON 412 - Installing & Using Tanstack Query
 * LESSON 413 - Understanding & Configuring Query Behavior (Caching)
 * LESSON 415 - React Query's Default Object & Abort Signal
 * LESSON 427 - Limiting Events & Using queryKey to Avoid Redundancy
 *
 * This component demonstrates the NEW Tanstack Query approach using useQuery.
 * Compare this with the traditional useEffect + fetch pattern to see how
 * much simpler the code becomes!
 *
 * ============================================================================
 * LESSON 427: LIMITING EVENTS IN "RECENTLY ADDED EVENTS"
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And the first thing is that here, under recently added events, we are
 * currently always showing all events which doesn't make a lot of sense.
 * It would be better if we would only see some events here."
 *
 * INSTRUCTOR QUOTE:
 * "And to achieve this, we can go to the NewEventsSection JSX file where we
 * got this NewEventsSection component. And here we can tweak that query such
 * that it does not fetch all events, but instead just some events, just the
 * first three events, for example."
 *
 * ============================================================================
 *
 * ============================================================================
 * LESSON 413 - CACHING: A KEY FEATURE OF TANSTACK QUERY
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "React Query caches response data. And as a result, if we're on our website,
 * we can, for example, go to a different page by clicking View Details.
 * And if we then go back by clicking View All Events, the events here are
 * available instantly."
 *
 * INSTRUCTOR QUOTE:
 * "Now, this might seem obvious, but it is not, because before, when we used
 * useEffect and our own fetching logic, this was not the case. There, if we
 * went to a different page and came back, a brand new request was sent and
 * all the data was fetched again."
 *
 * HOW CACHING WORKS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. Component renders → useQuery checks cache for queryKey ['events']   │
 * │  2. If cached data exists → Return it INSTANTLY (no loading spinner!)   │
 * │  3. Simultaneously → Send background request for updated data           │
 * │  4. When response arrives → Silently update the cached data             │
 * │  5. Component re-renders with fresh data (if changed)                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "React Query caches the response data you are getting back from your
 * requests and it will reuse that data whenever it encounters a new useQuery
 * execution with the same Query Key."
 *
 * INSTRUCTOR QUOTE:
 * "It will then instantly yield that data, but at the same time, also send
 * this request again Behind the Scenes to see if updated data is available.
 * And then it will kind of silently replace that data with the updated data
 * so that after a couple of seconds or however long it takes to fetch that
 * data, we do have the updated data on the screen."
 *
 * INSTRUCTOR QUOTE:
 * "So that we get the best of both worlds. Instant results, but still
 * updated data, once this Behind the Scenes request is done."
 *
 * ============================================================================
 * WHAT useQuery DOES FOR US
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And this hook will now behind the scenes send an HTTP request,
 * get us this events data that we need in this section and also give us
 * information about the loading state. So if we are currently sending
 * the request and potential errors."
 *
 * Before (with useEffect):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  const [data, setData] = useState();                                    │
 * │  const [error, setError] = useState();                                  │
 * │  const [isLoading, setIsLoading] = useState(false);                    │
 * │                                                                          │
 * │  useEffect(() => {                                                       │
 * │    async function fetchEvents() { ... }                                 │
 * │    fetchEvents()                                                         │
 * │      .then(setData)                                                      │
 * │      .catch(setError)                                                    │
 * │      .finally(() => setIsLoading(false));                               │
 * │  }, []);                                                                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * After (with useQuery):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  const { data, isPending, isError, error } = useQuery({                 │
 * │    queryKey: ['events'],                                                 │
 * │    queryFn: fetchEvents,                                                 │
 * │  });                                                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * That's it! All state management is handled automatically!
 *
 * ============================================================================
 */

/**
 * IMPORTING FROM TANSTACK QUERY
 *
 * INSTRUCTOR QUOTE:
 * "For that we should import from @tanstack/react-query.
 * And from there import the useQuery hook, a custom hook built by
 * the Tanstack React Query team."
 */
import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

/**
 * Import the fetch function from our utility file.
 *
 * INSTRUCTOR QUOTE:
 * "So I import this from going up one level, going up another level
 * and then diving into the util folder and there http.js"
 */
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  /**
   * ============================================================================
   * THE useQuery HOOK - HEART OF TANSTACK QUERY
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now we can and must use this hook here in the new events section
   * component and this hook will now behind the scenes send an HTTP request."
   *
   * useQuery CONFIGURATION OBJECT:
   *
   * INSTRUCTOR QUOTE:
   * "Now to do all that, we of course must configure this hook and we do that
   * by passing an object to useQuery. In this object, we can set various
   * properties."
   */
  const { data, isPending, isError, error } = useQuery({
    /**
     * =========================================================================
     * LESSON 427: queryKey WITH max PARAMETER
     * =========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "But now we should of course also update the queryKey. For example, by
     * passing an object here where we also say max 3, so that we have a
     * dedicated queryKey for this query."
     *
     * INSTRUCTOR QUOTE:
     * "And that's of course kind of the same thing we did in the FindEventSection
     * before with the searchTerm. There I also included the searchTerm in the
     * queryKey."
     *
     * WHY UPDATE THE queryKey?
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  Old queryKey: ['events']                                           │
     * │    - Same as FindEventSection's queryKey for all events             │
     * │    - Would share cached data (wrong! we only want 3 events)        │
     * │                                                                      │
     * │  New queryKey: ['events', { max: 3 }]                               │
     * │    - Unique key for "latest 3 events"                               │
     * │    - Cached separately from all events queries                      │
     * └─────────────────────────────────────────────────────────────────────┘
     *
     * Examples of query keys:
     * - ['events']                        → All events (no filter)
     * - ['events', { max: 3 }]            → Latest 3 events
     * - ['events', { search: 'city' }]    → Search results
     * - ['events', eventId]               → Specific event by ID
     */
    queryKey: ['events', { max: 3 }],

    /**
     * =========================================================================
     * LESSON 427: USING queryKey TO AVOID REDUNDANCY
     * =========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "So fetchEvents should be wrapped in an anonymous function here so that
     * we can control how it will be executed. And we should pull out that signal,
     * which we're getting from React Query here in this argument list, and
     * forward it through that object, which we pass through fetchEvents."
     *
     * INSTRUCTOR QUOTE:
     * "But then here, in addition, I also wanna set max to 3, for example,
     * if I want to have the latest three events."
     *
     * THE REDUNDANCY PROBLEM:
     * INSTRUCTOR QUOTE:
     * "Because if you take a closer look at this code, you can see that we're
     * passing the same information here essentially to the queryKey and also
     * to fetchEvents. And that's of course kind of redundant."
     *
     * THE ELEGANT SOLUTION - REUSING queryKey:
     * INSTRUCTOR QUOTE:
     * "Especially since you also might recall that in this object which we're
     * getting from React Query passed into this query function, we also get
     * the queryKey that is responsible for triggering this function here.
     * So we get this queryKey as an input here, and therefore it is actually
     * enough to provide this information here once and then reuse it here."
     *
     * INSTRUCTOR QUOTE:
     * "So in order to pass this information along with the signal to fetchEvents,
     * we can simply use the spread operator that's built into JavaScript and
     * spread this object which is the second element in our queryKey here by
     * using queryKey[1]."
     *
     * INSTRUCTOR QUOTE:
     * "queryKey[1] to access this second element here in the array, and then
     * the spread operator to basically copy this object with its properties
     * into this object."
     *
     * HOW THIS WORKS:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  queryKey: ['events', { max: 3 }]                                   │
     * │                                                                      │
     * │  In queryFn, React Query gives us:                                  │
     * │    { signal, queryKey: ['events', { max: 3 }], meta }               │
     * │                                                                      │
     * │  queryKey[0] = 'events'                                             │
     * │  queryKey[1] = { max: 3 }                                           │
     * │                                                                      │
     * │  ...queryKey[1] spreads to: max: 3                                  │
     * │                                                                      │
     * │  Result: fetchEvents({ signal, max: 3 })                            │
     * └─────────────────────────────────────────────────────────────────────┘
     *
     * INSTRUCTOR QUOTE:
     * "And this simply allows us to avoid some copy and pasting and repetition."
     */
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),

    /**
     * =========================================================================
     * LESSON 413: staleTime - CONTROL BACKGROUND REFETCHING
     * =========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "As a developer, when using React Query, you can of course, control if
     * this is the behavior you want. For example, by setting a staleTime on
     * your queries."
     *
     * INSTRUCTOR QUOTE:
     * "This controls after which time React Query will send such a Behind the
     * Scenes request to get updated data if it found data in your cache.
     * And the default is zero, which means it will use data from the cache,
     * but it will then always also send such a Behind the Scenes request to
     * get updated data."
     *
     * INSTRUCTOR QUOTE:
     * "If you set this to 5,000, for example, it will wait for 5,000
     * milliseconds before sending another request. So if this component was
     * rendered and therefore this request was sent, and within five seconds
     * this component is rendered again, and the same request would need to be
     * sent, React Query would not send it if the staleTime is set to 5,000."
     *
     * staleTime values explained:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  staleTime: 0        → Default. Always refetch in background        │
     * │  staleTime: 5000     → Data is "fresh" for 5 seconds               │
     * │  staleTime: 60000    → Data is "fresh" for 1 minute                │
     * │  staleTime: Infinity → Never automatically refetch                  │
     * └─────────────────────────────────────────────────────────────────────┘
     *
     * Try changing this value and observing the Network tab to see the effect!
     */
    staleTime: 5000, // 5 seconds - prevents unnecessary requests

    /**
     * =========================================================================
     * LESSON 413: gcTime - GARBAGE COLLECTION TIME (Cache Duration)
     * =========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "Another value you can set here is the gcTime, the Garbage Collection
     * Time. This controls how long the data and the cache will be kept around.
     * And the default here are five minutes."
     *
     * INSTRUCTOR QUOTE:
     * "This would mean that the cached data would only be kept around for
     * half a minute and thereafter, it would be discarded. So thereafter,
     * if this component needs to render again, there would be no cached data,
     * and therefore, React Query would always need to send a new request to
     * get some data before it can show anything."
     *
     * IMPORTANT DIFFERENCE between staleTime and gcTime:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  staleTime: How long before a BACKGROUND refetch is triggered       │
     * │             (data is still shown instantly from cache)              │
     * │                                                                      │
     * │  gcTime:    How long before cached data is DELETED entirely         │
     * │             (after deletion, must wait for fresh request)           │
     * └─────────────────────────────────────────────────────────────────────┘
     *
     * INSTRUCTOR QUOTE:
     * "I'm exploring these topics in great depth here, because this is one
     * of the main features of React Query. Being able to control how long
     * data is kept around and when new requests will be sent."
     *
     * Default gcTime is 5 minutes (300000ms) - usually fine for most apps.
     * Uncomment below to experiment:
     * gcTime: 30000, // 30 seconds - cache expires after 30 seconds
     */
    // gcTime: 300, // 0.3 seconds - cache expires after 3 seconds
  });

  /**
   * ============================================================================
   * WHAT useQuery RETURNS
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And now we'll get something back from useQuery and that something will
   * be an object. An object on which we can use object destructuring to pull
   * out the elements that are most important to us."
   *
   * Properties returned by useQuery:
   *
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  data       - The response data (once the request succeeds)            │
   * │  isPending  - true while the request is in progress                    │
   * │  isError    - true if the request failed                               │
   * │  error      - The error object if request failed                       │
   * │  refetch    - Function to manually re-run the query                    │
   * │  isStale    - true if cached data is considered stale                  │
   * │  isFetching - true during any fetch (including background refetch)     │
   * └─────────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE (about data):
   * "That will be a property which holds the actual response data as a value.
   * So that data, which in the end is returned by your custom fetching
   * function, that data is what will end up in this data property as a
   * value once this Query is done."
   *
   * INSTRUCTOR QUOTE (about isPending):
   * "This object also contains an isPending property which tells us whether
   * the request is currently still on its way or if we already get a response."
   *
   * INSTRUCTOR QUOTE (about isError):
   * "If we do have a response, it must not necessarily be that data here.
   * Instead, we could also be facing an error if something went wrong on
   * the server for example and therefore useQuery also gives us an isError
   * property on this object here, which will be true if we got back an
   * error response."
   *
   * INSTRUCTOR QUOTE (about refetch):
   * "A refetch function as it turns out which you could call manually to
   * send the same Query again for example if the user clicked a button."
   */

  let content;

  /**
   * HANDLING LOADING STATE
   *
   * INSTRUCTOR QUOTE:
   * "We can now use isPending instead of isLoading to show the loading
   * indicator whilst we're waiting for the response."
   */
  if (isPending) {
    content = <LoadingIndicator />;
  }

  /**
   * HANDLING ERROR STATE
   *
   * INSTRUCTOR QUOTE:
   * "And we can also check for isError here to show the error block."
   *
   * INSTRUCTOR QUOTE:
   * "And in that error block here for the message, instead of having the
   * hard coded message, we could now for example, use that error object
   * here which contains more information about the error that occurred."
   *
   * INSTRUCTOR QUOTE:
   * "And we could check if that error has an info property, which it should
   * have if we had an error status code because I'm adding that info property
   * to the error object here in this line, so we can check if it has an
   * info property and if it does have that, if this is not undefined, we
   * could access the message on that object and otherwise, as a fallback
   * value simply show the hard-coded text, 'Failed to fetch events.'"
   */
  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || 'Failed to fetch events'}
      />
    );
  }

  /**
   * RENDERING DATA
   *
   * INSTRUCTOR QUOTE:
   * "And we're outputting our data down there with this code, which can
   * stay the way it was because I was using the name data before as well
   * if we did successfully fetch the events."
   */
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

/**
 * ============================================================================
 * LESSON 427 SUMMARY: LIMITING EVENTS & queryKey SPREADING
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And if I do that in both components here and I reload, you see that now we
 * just got three elements here instead of all four elements. So we are just
 * fetching the latest three elements, so the three most recently added elements."
 *
 * WHAT WE IMPLEMENTED:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. UPDATED http.js fetchEvents():                                      │
 * │     - Added 'max' parameter support                                     │
 * │     - Handles multiple query parameter combinations                     │
 * │     - URL: ?search=term&max=3 or ?max=3 or ?search=term                │
 * │                                                                          │
 * │  2. UPDATED NewEventsSection queryKey:                                  │
 * │     - From: ['events']                                                  │
 * │     - To:   ['events', { max: 3 }]                                      │
 * │                                                                          │
 * │  3. USED queryKey SPREADING PATTERN:                                    │
 * │     - Extract { signal, queryKey } from React Query's object           │
 * │     - Pass { signal, ...queryKey[1] } to fetchEvents                   │
 * │     - Avoids duplicating parameters in both queryKey and queryFn       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WHY queryKey SPREADING IS ELEGANT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  BEFORE (Redundant - max appears twice):                                │
 * │    queryKey: ['events', { max: 3 }],                                    │
 * │    queryFn: ({ signal }) => fetchEvents({ signal, max: 3 }),           │
 * │                                                                          │
 * │  AFTER (DRY - max only in queryKey):                                    │
 * │    queryKey: ['events', { max: 3 }],                                    │
 * │    queryFn: ({ signal, queryKey }) =>                                   │
 * │              fetchEvents({ signal, ...queryKey[1] }),                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And this is just a little tweak or little extra feature which I also
 * wanted to show you because it allows you to avoid some repetition and
 * write a bit more flexible code."
 *
 * ============================================================================
 */
