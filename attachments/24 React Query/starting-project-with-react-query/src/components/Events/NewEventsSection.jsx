/**
 * ============================================================================
 * NewEventsSection - USING TANSTACK QUERY (Lesson 412)
 * ============================================================================
 *
 * LESSON 412 - Installing & Using Tanstack Query
 *
 * This component demonstrates the NEW Tanstack Query approach using useQuery.
 * Compare this with the traditional useEffect + fetch pattern to see how
 * much simpler the code becomes!
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
     * queryFn - THE FUNCTION THAT FETCHES DATA
     *
     * INSTRUCTOR QUOTE:
     * "With this function, you define the actual code that will be executed
     * that will send the actual request and that's really important."
     *
     * INSTRUCTOR QUOTE:
     * "It's now this fetchEvents function at which I wanna point here
     * as a value for the QueryFN property. So that fetchEvents will be
     * executed by Tanstack Query to fetch my data."
     *
     * Important: We pass the FUNCTION REFERENCE, not the result!
     * ✓ queryFn: fetchEvents      (correct - passes the function)
     * ✗ queryFn: fetchEvents()    (wrong - would execute immediately)
     */
    queryFn: fetchEvents,

    /**
     * queryKey - UNIQUE IDENTIFIER FOR CACHING
     *
     * INSTRUCTOR QUOTE:
     * "Every Query, every fetch request you are sending, so every GET HTTP
     * request you are sending in the end also should have such a Query key
     * which will then internally be used by React Query, by Tanstack Query
     * as it's called now, to cache the data that's yielded by that request."
     *
     * INSTRUCTOR QUOTE:
     * "So that the response from that request could be reused in the future
     * if you are trying to send the same request again and you can configure
     * how long data should be stored and reused by React Query."
     *
     * INSTRUCTOR QUOTE:
     * "So that's why every Query needs such a key. And that key is actually
     * an array. An array of values which are then internally stored by
     * React Query such that whenever you are using a similar array of
     * similar values, React Query sees that and is able to reuse existing data."
     *
     * INSTRUCTOR QUOTE:
     * "So here we could for example add a string value as a first element
     * to this array and give this an identifier of events but this is
     * totally up to you."
     *
     * INSTRUCTOR QUOTE:
     * "The key here could contain multiple values and you are not limited
     * to just using strings here. You could also have objects in there
     * or nested arrays or other kinds of values."
     *
     * Examples of query keys:
     * - ['events']                        → Simple key for all events
     * - ['events', { max: 3 }]            → Events with filter parameters
     * - ['events', eventId]               → Specific event by ID
     * - ['events', 'search', searchTerm]  → Search results
     */
    queryKey: ['events'],
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
