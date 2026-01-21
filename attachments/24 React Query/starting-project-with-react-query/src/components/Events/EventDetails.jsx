/**
 * ============================================================================
 * EventDetails Component - LESSONS 420-423
 * ============================================================================
 *
 * This component demonstrates:
 * - Lesson 420-421: Using useQuery to fetch event details and useMutation to delete
 * - Lesson 422: Fixing the 404 error with refetchType: 'none'
 * - Lesson 423: Adding a confirmation modal before deletion
 *
 * ============================================================================
 * LESSON 423: CONFIRMATION MODAL BEFORE DELETION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now to enhance this app a bit more and this details page specifically, I now
 * also want to add a little feature to this app and to this page where we show
 * some confirmation modal before we actually trigger this deletion mutation."
 *
 * INSTRUCTOR QUOTE:
 * "So that if a user accidentally clicked on delete, the deletion is not
 * immediately initiated but we instead ask the user for confirmation first."
 *
 * INSTRUCTOR QUOTE:
 * "And this feature does now not require any specific new React Query feature.
 * Instead, it is something which we can build with our standard React knowledge."
 *
 * ============================================================================
 */

import { useState } from 'react';
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
import Modal from '../UI/Modal.jsx';
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
   * LESSON 423: STATE FOR DELETION CONFIRMATION MODAL
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Because here in the event details component, we can simply start managing
   * some state with the useState hook. And this could be some state that simply
   * tells us whether the user started the deletion process or not."
   *
   * INSTRUCTOR QUOTE:
   * "So I'll name my state variable here isDeleting and the updating function
   * setIsDeleting. And initially that's false because initially we're not trying
   * to delete this."
   *
   * State flow:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  isDeleting = false  →  Modal is hidden, normal UI shown               │
   * │  isDeleting = true   →  Modal opens, asking for confirmation           │
   * │                                                                         │
   * │  User clicks "Delete" button  →  setIsDeleting(true)  →  Modal opens   │
   * │  User clicks "Cancel" in modal  →  setIsDeleting(false)  →  Modal closes│
   * │  User clicks "Delete" in modal  →  handleDelete() triggers mutation    │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
  const [isDeleting, setIsDeleting] = useState(false);

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
     * WHY INVALIDATE ALL ['events'] QUERIES:
     * INSTRUCTOR QUOTE:
     * "So to an array that contains a single string that says events, because
     * all event related queries should be invalidated because they're all
     * affected by the fact that an event has been deleted."
     */
    onSuccess: () => {
      /**
       * =======================================================================
       * LESSON 422: FIXING THE 404 ERROR WITH refetchType: 'none'
       * =======================================================================
       *
       * THE 404 PROBLEM:
       * INSTRUCTOR QUOTE:
       * "If I delete an event and we're navigated back, I also get such a 404
       * request here. Now, if we take a closer look at this request, we see that
       * it actually was for one specific event with a specific ID."
       *
       * WHY THIS HAPPENS:
       * INSTRUCTOR QUOTE:
       * "Well, because for deleting an event, we were on that details page here
       * and when then after deleting an event, we invalidated all event related
       * queries. We still were on that page. And therefore, technically, since
       * we invalidated all queries. React Query went ahead and immediately
       * triggered a refetch for this details query here."
       *
       * Timeline of the problem:
       * ┌─────────────────────────────────────────────────────────────────────┐
       * │  1. User clicks Delete on EventDetails page (/events/e1)           │
       * │  2. DELETE request succeeds → event e1 is deleted from backend     │
       * │  3. onSuccess runs → invalidateQueries(['events']) called          │
       * │  4. We're STILL on EventDetails page (navigate hasn't happened)    │
       * │  5. React Query sees ['events', 'e1'] is invalid → tries refetch   │
       * │  6. GET /events/e1 → 404 (event no longer exists!)                 │
       * │  7. THEN navigate('/events') runs                                   │
       * └─────────────────────────────────────────────────────────────────────┘
       *
       * THE SOLUTION - refetchType: 'none':
       * INSTRUCTOR QUOTE:
       * "Now, to avoid this behavior, we should go back to invalidate queries
       * and add a second property to this configuration object for invalidate
       * queries. Here, you can set the re fetch type to none, which makes sure
       * that when you call invalidate queries, these existing queries will not
       * automatically be triggered again immediately."
       *
       * INSTRUCTOR QUOTE:
       * "Instead, they will just be invalidated and the next time they are
       * required, they will run again. But they will not be re-triggered
       * immediately which otherwise would be the default behavior."
       *
       * HOW IT WORKS:
       * ┌─────────────────────────────────────────────────────────────────────┐
       * │  refetchType options:                                               │
       * │                                                                     │
       * │  'active' (default) - Immediately refetch all active queries       │
       * │                       that match the queryKey                       │
       * │                                                                     │
       * │  'inactive' - Refetch inactive queries                              │
       * │                                                                     │
       * │  'all' - Refetch both active and inactive queries                   │
       * │                                                                     │
       * │  'none' - Don't refetch anything, just mark as stale               │
       * │           Queries will refetch when next needed                     │
       * └─────────────────────────────────────────────────────────────────────┘
       *
       * WHY 'none' IS PERFECT HERE:
       * INSTRUCTOR QUOTE:
       * "And here, that's what I want because this makes sure that this event
       * details query of this page on which I'm currently at is not triggered
       * again."
       *
       * INSTRUCTOR QUOTE:
       * "But if we then go back to this all events page here, the queries on
       * this page will be triggered again because this component re-rendered,
       * again, this entire page component and all the nested components, but
       * the query on the page on which we triggered the deletion, where this
       * component for this page was not re rendered, will not be triggered
       * just because we called invalidate queries."
       *
       * Fixed timeline:
       * ┌─────────────────────────────────────────────────────────────────────┐
       * │  1. User clicks Delete on EventDetails page                        │
       * │  2. DELETE request succeeds                                         │
       * │  3. invalidateQueries({ refetchType: 'none' }) - just marks stale  │
       * │  4. NO immediate refetch of ['events', 'e1'] → NO 404!             │
       * │  5. navigate('/events') runs                                        │
       * │  6. Events page mounts → queries are stale → refetch triggered     │
       * │  7. Fresh data loaded (without the deleted event)                   │
       * └─────────────────────────────────────────────────────────────────────┘
       */
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none',
      });
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
   * LESSON 423: HANDLERS FOR STARTING/STOPPING DELETION PROCESS
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "But I now wanna change this to true once the user clicks this button, this
   * delete button and then I want open up a modal where the user has to click
   * another button to actually start this mutation."
   *
   * INSTRUCTOR QUOTE:
   * "So I will add two new functions here, handleStartDelete in which I set
   * isDeleting to true and also handleStopDelete if the user cancels this
   * process, where I set isDeleting to false."
   *
   * TWO-STEP DELETION FLOW:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  Step 1: User clicks "Delete" button in event details                  │
   * │          → handleStartDelete() → setIsDeleting(true) → Modal opens     │
   * │                                                                         │
   * │  Step 2a: User clicks "Delete" in modal                                │
   * │           → handleDelete() → mutate() → DELETE request sent            │
   * │                                                                         │
   * │  Step 2b: User clicks "Cancel" in modal                                │
   * │           → handleStopDelete() → setIsDeleting(false) → Modal closes   │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
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
             * DELETE BUTTON - NOW OPENS CONFIRMATION MODAL (Lesson 423)
             *
             * INSTRUCTOR QUOTE:
             * "And it's now handleStartDelete that should be connected to this
             * delete button in this UI."
             *
             * Previously this called handleDelete directly, but now we show
             * a confirmation modal first by calling handleStartDelete.
             */}
            <button onClick={handleStartDelete}>Delete</button>
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
      {/**
       * =======================================================================
       * LESSON 423: CONFIRMATION MODAL FOR DELETION
       * =======================================================================
       *
       * INSTRUCTOR QUOTE:
       * "For that, down here in my return statement maybe above that outlet,
       * I'll add the modal component, a component that's built into this
       * application."
       *
       * CONDITIONAL RENDERING:
       * INSTRUCTOR QUOTE:
       * "This modal should be displayed conditionally. If isDeleting is true,
       * I wanna show it. If it's false, I don't wanna show it, so that this
       * really only shows up if we start that deletion process."
       *
       * onClose PROP:
       * INSTRUCTOR QUOTE:
       * "Now this modal component, which I built for this application, actually
       * also takes onClose prop, which wants a function that should be triggered
       * if this modal is closed. And here I then wanna stop the deletion of course."
       */}
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          {/**
           * CONFIRMATION CONTENT
           *
           * INSTRUCTOR QUOTE:
           * "And with modal imported, we can now show some confirmation text in
           * there. For example a title, a H2 title where we ask, are you sure?
           * And then a paragraph where we may be say, do you really want to
           * delete this event? This action cannot be undone."
           */}
          <h2>Are you sure?</h2>
          <p>
            Do you really want to delete this event? This action cannot be
            undone.
          </p>

          {/**
           * CONDITIONAL BUTTONS / LOADING STATE
           *
           * INSTRUCTOR QUOTE:
           * "I for example wanna replace these buttons with some loading text
           * if we are currently performing the deletion. So in here I'll
           * actually check isPendingDeletion. And if that's the case, I wanna
           * output some paragraph here where I simply say, deleting, please wait."
           *
           * INSTRUCTOR QUOTE:
           * "On the other hand, if deletion is not pending, if it's not on its
           * way, I wanna output these two buttons wrapped by a fragment since
           * we have two sibling components here."
           */}
          <div className="form-actions">
            {isPendingDeletion ? (
              <p>Deleting, please wait...</p>
            ) : (
              <>
                {/**
                 * CANCEL BUTTON
                 *
                 * INSTRUCTOR QUOTE:
                 * "If that other button here is pressed, I wanna trigger the
                 * handleStopDelete function to close this modal again."
                 *
                 * INSTRUCTOR QUOTE:
                 * "The cancel button should receive a button-text class."
                 */}
                <button onClick={handleStopDelete} className="button-text">
                  Cancel
                </button>

                {/**
                 * DELETE CONFIRMATION BUTTON
                 *
                 * INSTRUCTOR QUOTE:
                 * "Now this second button when it's clicked should trigger the
                 * handleDelete function we used before. And that's this function
                 * that contains the mutate function call. So this function which
                 * will then actually send that deletion request."
                 *
                 * INSTRUCTOR QUOTE:
                 * "And the delete button should receive a button class."
                 */}
                <button onClick={handleDelete} className="button">
                  Delete
                </button>
              </>
            )}
          </div>

          {/**
           * ERROR HANDLING IN MODAL
           *
           * INSTRUCTOR QUOTE:
           * "Now I also wanna show an error block if we got an error. And for
           * that here after this form actions div, but still in the modal, I'll
           * check if isErrorDeleting is true."
           */}
          {isErrorDeleting && (
            <ErrorBlock
              title="Failed to delete event"
              message={
                deleteError.info?.message ||
                'Failed to delete event, please try again later.'
              }
            />
          )}
        </Modal>
      )}

      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {/**
         * Note: Error handling for delete mutation is now inside the Modal
         * component (Lesson 423) where users can see errors and retry.
         */}
        {content}
      </article>
    </>
  );
}

/**
 * ============================================================================
 * LESSONS 422-423 SUMMARY
 * ============================================================================
 *
 * LESSON 422: 404 ERROR FIX
 * ─────────────────────────
 * Use refetchType: 'none' in invalidateQueries to prevent immediate refetch
 * of queries that reference a deleted resource.
 *
 * LESSON 423: CONFIRMATION MODAL
 * ──────────────────────────────
 * INSTRUCTOR QUOTE:
 * "And this feature does now not require any specific new React Query feature.
 * Instead, it is something which we can build with our standard React knowledge."
 *
 * ALIAS SYNTAX FOR DESTRUCTURING:
 * INSTRUCTOR QUOTE:
 * "Now since with that I would have a name clash with isPending from useQuery,
 * I'll assign a different name to it here by adding a colon here and then naming
 * this isPendingDeletion and this is standard JavaScript syntax where when using
 * object destructuring, as we're doing it here, you can assign an alias to one
 * of those properties you are pulling out of this object by adding a colon after
 * this original property name and then adding your new name under which you'll
 * be able to use it in this file here."
 *
 * KEY PATTERN - CONFIRMATION MODAL BEFORE MUTATION:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. Add useState to track if user started deletion: [isDeleting]        │
 * │  2. Main Delete button → sets isDeleting to true (opens modal)          │
 * │  3. Modal shows confirmation with Cancel and Delete buttons             │
 * │  4. Cancel button → sets isDeleting to false (closes modal)             │
 * │  5. Delete button in modal → calls mutate() (actually sends request)    │
 * │  6. Show isPendingDeletion loading state in modal                       │
 * │  7. Show isErrorDeleting errors in modal                                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * This is NOT a React Query feature - it's standard React state management
 * that WRAPS the React Query mutation for better UX.
 */
