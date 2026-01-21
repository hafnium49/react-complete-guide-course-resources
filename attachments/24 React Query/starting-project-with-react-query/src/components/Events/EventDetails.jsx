/**
 * ============================================================================
 * EventDetails Component - LESSON 421: Challenge Solution
 * ============================================================================
 *
 * This is the INSTRUCTOR'S SOLUTION to the challenge from Lesson 420.
 * The challenge had two parts:
 * 1. Load and display event detail data using useQuery
 * 2. Make the Delete button work using useMutation
 *
 * ============================================================================
 * PART 1: FETCHING EVENT DETAILS WITH useQuery
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And for that, of course, I'll start here in event details by importing
 * useQuery from @tanstack/react-query. And then here we should execute useQuery
 * in this EventDetails component function."
 *
 * INSTRUCTOR QUOTE:
 * "And of course, as always, this should then also be configured. We need a
 * query function and we need that queryKey, as always."
 *
 * ============================================================================
 * PART 2: DELETING EVENTS WITH useMutation
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So therefore here we of course have a mutation because we're not fetching
 * or getting any data, instead we're sending a DELETE request. We are trying
 * to change, to mutate, data on the backend. Hence we now also need useMutation
 * from React Query."
 *
 * ============================================================================
 */

import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';

/**
 * IMPORTING useQuery AND useMutation
 *
 * INSTRUCTOR QUOTE:
 * "And for that, of course, I'll start here in event details by importing
 * useQuery from @tanstack/react-query."
 *
 * INSTRUCTOR QUOTE (for delete):
 * "Hence we now also need useMutation from React Query."
 */
import { useQuery, useMutation } from '@tanstack/react-query';

import Header from '../Header.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

/**
 * IMPORTING FUNCTIONS AND queryClient FROM http.js
 *
 * INSTRUCTOR QUOTE:
 * "Now, for the query function, as mentioned, it's this fetchEvent function
 * that should be triggered."
 *
 * INSTRUCTOR QUOTE:
 * "And for that, as mentioned before, you should use this deleteEvent function
 * where a DELETE HTTP request is sent to the backend."
 *
 * INSTRUCTOR QUOTE (for invalidation):
 * "Now, to do that I also must import my query client from http.js and we can
 * then use this queryClient here to call invalidate queries."
 */
import { fetchEvent, deleteEvent, queryClient } from '../../util/http.js';

export default function EventDetails() {
  /**
   * ============================================================================
   * GETTING THE EVENT ID FROM URL PARAMS
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And this id will be available in this event details component because it
   * is loaded through React Router. If you take a look at app.jsx you see that
   * this EventDetails component is loaded for this dynamic route which includes
   * a path segment with an identifier of id."
   *
   * INSTRUCTOR QUOTE:
   * "And therefore, as you learned in the routing section we can extract this
   * id by using the useParams hook provided by react-router-dom."
   *
   * INSTRUCTOR QUOTE:
   * "And it's dot id here because in app.jsx it's colon id in this route
   * definition. That's how we can get access to that id."
   *
   * Route definition in App.jsx: path: '/events/:id'
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  URL: /events/e1       →  params.id = "e1"                              │
   * │  URL: /events/abc123   →  params.id = "abc123"                          │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
  const params = useParams();

  /**
   * INSTRUCTOR QUOTE:
   * "And here in our mutation onSuccess function I wanna call navigate and go
   * back to /events."
   *
   * INSTRUCTOR QUOTE:
   * "You can add the onSuccess property to this mutation configuration object.
   * And here we can then navigate away by using the navigate function, which we
   * get from react-router-dom, with help of that useNavigate Hook."
   */
  const navigate = useNavigate();

  /**
   * ============================================================================
   * useQuery FOR FETCHING EVENT DETAILS
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And of course, as always, this should then also be configured. We need a
   * query function and we need that queryKey, as always."
   */
  const { data, isPending, isError, error } = useQuery({
    /**
     * =========================================================================
     * queryKey - UNIQUE IDENTIFIER FOR THIS SPECIFIC EVENT
     * =========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "Now for the queryKey, I want to have an identifier that starts with
     * events as a first element in this key array because we're still fetching
     * some event data, but I then pass a second element to this key to make
     * this key a bit more complex."
     *
     * INSTRUCTOR QUOTE:
     * "And that second element should be the actual ID for which we're executing
     * this query because when this EventDetails component is rendered for
     * different IDs, so for different events, I of course wanna fetch different
     * data for different events."
     *
     * INSTRUCTOR QUOTE:
     * "So we need different keys so that we're not caching and reusing the same
     * data for the same single event all the time. Therefore, I'll add my ID
     * here into this key."
     *
     * Why this matters:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  ['events', 'e1'] and ['events', 'e2'] = DIFFERENT cache entries   │
     * │                                                                     │
     * │  View event e1 → cached as ['events', 'e1']                        │
     * │  View event e2 → cached as ['events', 'e2']                        │
     * │  View event e1 again → loads from cache instantly!                  │
     * └─────────────────────────────────────────────────────────────────────┘
     *
     * INSTRUCTOR QUOTE:
     * "And this is one way of doing it. We could also wrap it into an object
     * like this, that's totally up to you, but here I'll just add it like this
     * to my overall key."
     */
    queryKey: ['events', params.id],

    /**
     * =========================================================================
     * queryFn - WRAPPING fetchEvent WITH AN ANONYMOUS FUNCTION
     * =========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "Now, for the query function, as mentioned, it's this fetchEvent function
     * that should be triggered. And if you take a look at this function, you see
     * that it accepts an object as a parameter, which should contain this signal
     * property, which is provided by React Query, but which also wants an id
     * property, which we have to provide, the ID of the selected event."
     *
     * INSTRUCTOR QUOTE:
     * "So back in EventDetails, this means that we wanna wrap this fetchEvent
     * function with our own anonymous function, which is then the actual function
     * that's defined as a query function."
     *
     * INSTRUCTOR QUOTE:
     * "Now this fetchEvent function should receive an object as an argument, an
     * object with a signal property as you just saw, and an id property. So
     * therefore I'll pass both here as properties to this object and we'll get
     * this signal from this object which we automatically receive on this query
     * function from React Query."
     *
     * Data flow:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  1. React Query calls our arrow function with { signal, ... }       │
     * │  2. We destructure to get the signal                                │
     * │  3. We call fetchEvent({ id: params.id, signal })                   │
     * │  4. fetchEvent sends GET request to /events/{id}                    │
     * │  5. Returns the event object                                         │
     * └─────────────────────────────────────────────────────────────────────┘
     */
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });

  /**
   * ============================================================================
   * useMutation FOR DELETING THE EVENT
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "So therefore here we of course have a mutation because we're not fetching
   * or getting any data, instead we're sending a DELETE request. We are trying
   * to change, to mutate, data on the backend."
   *
   * INSTRUCTOR QUOTE:
   * "And this hook should now also be executed here, useMutation, and in this
   * configuration object that's passed to useMutation we then have to define a
   * mutation function, which as mentioned is this deleteEvent function from the
   * http.js file."
   */
  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    /**
     * INSTRUCTOR QUOTE:
     * "So this function must be imported and should then be used here as a
     * value for this mutation function."
     */
    mutationFn: deleteEvent,

    /**
     * =========================================================================
     * onSuccess - WHAT HAPPENS AFTER SUCCESSFUL DELETION
     * =========================================================================
     *
     * THE PROBLEM WITHOUT onSuccess:
     * INSTRUCTOR QUOTE:
     * "And now of course, nothing happens here. And we had that behavior before
     * in this course because we haven't defined what should happen after the
     * mutation succeeds. But if I go back to view all events I can tell that
     * this event indeed is gone."
     *
     * THE SOLUTION:
     * INSTRUCTOR QUOTE:
     * "But of course it would be nice if we would give the user some feedback
     * regarding that, or if we would do something after deleting it. And you
     * also learned how to do that. You can add the onSuccess property to this
     * mutation configuration object."
     *
     * NAVIGATE AWAY:
     * INSTRUCTOR QUOTE:
     * "And here we can then navigate away by using the navigate function...
     * And then here in our mutation onSuccess function I wanna call navigate
     * and go back to /events."
     *
     * INVALIDATE QUERIES:
     * INSTRUCTOR QUOTE:
     * "In addition, I also wanna invalidate my queries, my event related queries,
     * because since I deleted an event of course, all that data should be marked
     * as outdated and React Query should be forced to fetch data again."
     *
     * INSTRUCTOR QUOTE:
     * "And we can then use this queryClient here to call invalidate queries and
     * pass this configuration object to invalidateQueries where I set the
     * queryKey of the query that should be invalidated to just events."
     *
     * WHY INVALIDATE ALL ['events'] QUERIES:
     * INSTRUCTOR QUOTE:
     * "So to an array that contains a single string that says events, because
     * all event related queries should be invalidated because they're all
     * affected by the fact that an event has been deleted."
     */
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/events');
    },
  });

  /**
   * ============================================================================
   * handleDelete - TRIGGERED WHEN DELETE BUTTON IS CLICKED
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "As you learned, this useMutation hook then returns an object where we most
   * importantly get a mutate property, a function we can call to trigger this
   * mutation function. And I wanna trigger it when that Delete button is pressed."
   *
   * INSTRUCTOR QUOTE:
   * "Therefore, here in this component function, we can add a new function,
   * handleDelete could be a fitting name. And in this function I want to call
   * this mutate function."
   *
   * INSTRUCTOR QUOTE:
   * "Now, deleteEvent, if you take a look at it, wants an object as an input,
   * an object with an id property which should contain the ID of the event that
   * should be deleted. Therefore here I'll pass an object to mutate and I'll add
   * an id property. And the value of that id property of course is that ID of
   * this event here, so params.id."
   */
  function handleDelete() {
    mutate({ id: params.id });
  }

  /**
   * ============================================================================
   * CONDITIONAL RENDERING WITH content VARIABLE
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And we can now use these pieces of data to output different content on the
   * screen depending on the current state of this query. For that, just as I did
   * it before in another component, I'll add a new content variable."
   *
   * States handled:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  isPending = true  →  Show "Fetching event data..." message            │
   * │  isError = true    →  Show ErrorBlock with error details               │
   * │  data exists       →  Show event details (title, image, etc.)          │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
  let content;

  /**
   * LOADING STATE
   *
   * INSTRUCTOR QUOTE:
   * "And then I'll check if isPending is true. If that's the case, my content
   * should be equal to some loading fallback text."
   *
   * INSTRUCTOR QUOTE:
   * "Here, for styling purposes, I'll output a div with an id of
   * event-details-content... And I'll add a class name of center to center these
   * elements here. And this element is simply a paragraph where I'll say,
   * 'Fetching event data.'"
   *
   * INSTRUCTOR QUOTE:
   * "But again, it doesn't really matter which content you are outputting in your
   * loading state, it's just important that you are handling this loading state
   * in some way at all."
   */
  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching event data...</p>
      </div>
    );
  }

  /**
   * ERROR STATE
   *
   * INSTRUCTOR QUOTE:
   * "Now with that, I'll... as a next step check if we got an error, in which
   * case content should be equal to that error block, though again wrapped in
   * this special div, which will just make sure that it looks good on this page."
   *
   * INSTRUCTOR QUOTE:
   * "So here, I'll then output my ErrorBlock component and give this a title of
   * 'Failed to load event.' And then as a message I'll output error.info?.message.
   * So if we have an info property on the error I'll dig into its message and
   * output that or if any of that seems to be undefined I'll output a hardcoded
   * error message."
   */
  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            'Failed to fetch event data, please try again later.'
          }
        />
      </div>
    );
  }

  /**
   * ============================================================================
   * DATA STATE - DISPLAYING EVENT DETAILS
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Well, and now as a last step, I of course want to check if data is set,
   * if we got some data, and in that case I'll set content equal to this content
   * here down there."
   */
  if (data) {
    /**
     * DATE FORMATTING (Optional polish)
     *
     * INSTRUCTOR QUOTE:
     * "And now as our last step, so to say, to polish this, I also wanna make
     * sure that in the EventDetails component this date is formatted in a nice
     * way, which of course is 100% optional and not part of the solution you
     * must have, just something I wanna do here."
     *
     * INSTRUCTOR QUOTE:
     * "And in that data block, so if we have data, I'll get my formatted date by
     * constructing a new date object and passing the date I'm getting back from
     * the backend as a value to this date constructor."
     *
     * INSTRUCTOR QUOTE:
     * "So that then, on this date object, I can call toLocaleDateString, a method
     * built into the browser on this date object, which allows me to create a
     * nicely formatted date by passing en-US as a first argument and then a
     * configuration object as a second argument."
     *
     * INSTRUCTOR QUOTE:
     * "And in that configuration object we can control how the day, month, and
     * year part of the date should be formatted."
     */
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    /**
     * INSTRUCTOR QUOTE:
     * "So that this is now my content if we do have data, where I'm outputting
     * the title in the header and all the other information below that in this div."
     *
     * INSTRUCTOR QUOTE:
     * "And I'll then construct this URL to this image dynamically by using this
     * template, literal syntax, and injecting data.image here as a value into
     * this image URL."
     */
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            {/**
             * DELETE BUTTON
             *
             * INSTRUCTOR QUOTE:
             * "With that, this request should be sent and now we just have to
             * connect handleDelete to this Delete button. So down here I'll add
             * the onClick prop and point at handleDelete."
             */}
            <button onClick={handleDelete} disabled={isPendingDeletion}>
              {isPendingDeletion ? 'Deleting...' : 'Delete'}
            </button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`${data.date}T${data.time}`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  /**
   * INSTRUCTOR QUOTE:
   * "And with that, we got different pieces of content for different circumstances.
   * And hence now between those article tags we can output this content variable,
   * which will either be that loading text, that error block, or this data block here."
   */
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {/**
         * ERROR HANDLING FOR DELETE MUTATION
         *
         * If deletion fails, show error at top while keeping event details visible.
         */}
        {isErrorDeleting && (
          <ErrorBlock
            title="Failed to delete event"
            message={
              deleteError.info?.message ||
              'Failed to delete event. Please try again later.'
            }
          />
        )}
        {content}
      </article>
    </>
  );
}

/**
 * ============================================================================
 * TEASER FOR NEXT LESSON
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With that, again, if I go back and I view the details here and I open the
 * network tab just to see whether everything works, if I click Delete here
 * that's deleted, and I'm navigated back to the starting page. And there this
 * event is now indeed missing."
 *
 * INSTRUCTOR QUOTE:
 * "Though you might also notice that I also got one request here, which actually
 * yielded a 404 response, and that's what we'll tackle next."
 *
 * The 404 issue happens because:
 * - We invalidate queries BEFORE navigating away
 * - React Query tries to refetch the deleted event's data
 * - But the event no longer exists on the backend → 404!
 *
 * This will be addressed in the next lesson.
 */
