/**
 * ============================================================================
 * EditEvent Component - LESSON 424: Fetching Data for Edit Form
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now there's one other thing we can do on this event details page. We can also
 * click this edit button to edit an event. And currently of course, this
 * functionality is also missing."
 *
 * INSTRUCTOR QUOTE:
 * "And of course it would also be nice if this modal would be pre-populated with
 * the event data to which it belongs. So the event which we are trying to edit.
 * And that's what we'll work on next."
 *
 * ============================================================================
 * KEY CONCEPT: REUSING CACHED DATA ACROSS COMPONENTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "It's also worth noting that if I load this details page, it takes a short
 * while, but then once I got this data, this edit page opens up pretty much
 * instantly and that's the case because this data is cached as you learned before."
 *
 * INSTRUCTOR QUOTE:
 * "And I'm using the same query with the same key, events params ID in this
 * EditEvent component and in the event details component. It's the same query
 * with the same key, therefore this cached data is reused between those two
 * components."
 *
 * Cache sharing flow:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  EventDetails component:                                                 │
 * │    queryKey: ['events', params.id]  →  Fetches and caches event data    │
 * │                                                                          │
 * │  EditEvent component (same queryKey!):                                   │
 * │    queryKey: ['events', params.id]  →  Uses CACHED data instantly!      │
 * │                                                                          │
 * │  Result: Edit form opens instantly with pre-populated data              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "That's why if we are on this detail page, this edit page opens up instantly.
 * Whereas on the other hand, if I reload with that edit page opened, we see that
 * loading spinner initially. Because if we reload, the data is not there yet.
 * If we come from the details page, it is already there."
 *
 * INSTRUCTOR QUOTE:
 * "So that's another great example showing us why using React Query can lead to
 * a better user experience."
 *
 * ============================================================================
 */

/**
 * IMPORTS
 *
 * INSTRUCTOR QUOTE:
 * "And of course, fetching this data again means that we should use useQuery
 * from React Query, just as we did it before in this course."
 */
import { useQuery } from '@tanstack/react-query';

/**
 * INSTRUCTOR QUOTE:
 * "And to get this ID, we of course can and should use useParams from React
 * Router DOM to get this params object, because that then allows us to access
 * params.id."
 */
import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

/**
 * INSTRUCTOR QUOTE:
 * "And here for this query function I want to use a function which I already
 * have in my HTTP JS file. This fetchEvent function because that will fetch us
 * the event details with which we want pre-populate this form."
 */
import { fetchEvent } from '../../util/http.js';

export default function EditEvent() {
  const navigate = useNavigate();

  /**
   * ============================================================================
   * GETTING THE EVENT ID FROM URL PARAMS
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Because in our route definition, if we take a look at that, for the edit
   * page, we got this dynamic path segment with an identifier of ID. So therefore,
   * in this EditEvent component, this is how we can prepare our query function
   * that should be executed."
   *
   * Route definition: /events/:id/edit
   * Example: /events/e1/edit → params.id = "e1"
   */
  const params = useParams();

  /**
   * ============================================================================
   * useQuery FOR FETCHING EVENT DATA TO PRE-POPULATE FORM
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "So with that imported, here in this component function. I'll execute it,
   * pass this configuration object to it."
   *
   * INSTRUCTOR QUOTE:
   * "Now this function needs the ID of the event, for which the data should be
   * fetched and an abort signal as an input. And therefore, here in edit event
   * for this query function we should define an anonymous function where we
   * automatically get an object that contains a signal property from React Query."
   *
   * INSTRUCTOR QUOTE:
   * "Of course, I also want to have a query key and here, that's events, and then
   * again, params.id because this query depends on the ID of the event which
   * we're trying to edit."
   */
  const { data, isPending, isError, error } = useQuery({
    /**
     * SAME queryKey AS EventDetails!
     *
     * INSTRUCTOR QUOTE:
     * "I'm using the same query with the same key, events params ID in this
     * EditEvent component and in the event details component. It's the same
     * query with the same key, therefore this cached data is reused between
     * those two components."
     *
     * This is KEY for React Query's cache sharing:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  EventDetails uses: queryKey: ['events', params.id]                 │
     * │  EditEvent uses:    queryKey: ['events', params.id]                 │
     * │                                                                      │
     * │  SAME KEY = SAME CACHE ENTRY = INSTANT DATA!                        │
     * └─────────────────────────────────────────────────────────────────────┘
     */
    queryKey: ['events', params.id],

    /**
     * INSTRUCTOR QUOTE:
     * "And then here we should execute fetchEvent which must be imported from
     * the HTTP JS file. And we then pass an object to fetchEvent which contains
     * this signal and also this ID of this event here."
     */
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });

  function handleSubmit(formData) {
    // Will be implemented in the next lesson (Lesson 425)
  }

  function handleClose() {
    navigate('../');
  }

  /**
   * ============================================================================
   * CONDITIONAL RENDERING WITH content VARIABLE
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Therefore, just as before, I'll actually add a content variable and check
   * if isPending is true."
   *
   * States handled:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  isPending = true  →  Show LoadingIndicator                            │
   * │  isError = true    →  Show ErrorBlock with "Okay" link to close        │
   * │  data exists       →  Show EventForm with pre-populated data           │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
  let content;

  /**
   * LOADING STATE
   *
   * INSTRUCTOR QUOTE:
   * "And if that's the case, if we are waiting for the response, I wanna output
   * a div with a class name of center for styling purposes. And in there I want
   * to have that loading indicator."
   *
   * INSTRUCTOR QUOTE:
   * "And that loading indicator is simply a component you have to import from
   * the UI folder."
   */
  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  /**
   * ERROR STATE
   *
   * INSTRUCTOR QUOTE:
   * "As a next step, I'll check if we got an error just as we did it many times
   * before in other components. And if that's the case, content will be set equal
   * to a fragment, where for one, I want to have this error block. But below that,
   * then also a div, which has a class of form-actions where I wanna provide a
   * link which is a component provided by React Router which simply should allow
   * me to leave this page and close this modal therefore, if we got an error
   * fetching those events."
   *
   * INSTRUCTOR QUOTE:
   * "So here I'll just say, okay, and give this link a class of button for
   * styling purposes."
   *
   * NOTE ON ERROR BEHAVIOR:
   * INSTRUCTOR QUOTE:
   * "If I, for example, would try to load this page for an invalid ID... I get
   * the loading spinner and it'll take a while because React Query actually
   * tries re-fetching if we got an error. But then I got the error."
   */
  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            'Failed to load event. Please check your inputs and try again later.'
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  /**
   * DATA STATE - FORM WITH PRE-POPULATED DATA
   *
   * INSTRUCTOR QUOTE:
   * "Last but not least, if we have data, I'll set content equal to this event
   * form here because then I want to present this form."
   *
   * INSTRUCTOR QUOTE:
   * "Now, in this component, as a first step we should load the data that should
   * be filled into this form as a default. And for that, my custom event form
   * component, which I'm providing as part of this project, actually has an
   * inputData prop which can be used to pass an object with the default data for
   * all these fields to this component."
   *
   * INSTRUCTOR QUOTE:
   * "So now we can use data to pre-populate this form... we can therefore set
   * inputData equal to this data because I built this event form component as
   * such that it exactly expects data in that shape as we get it back from this
   * backend. So this should just work."
   */
  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  /**
   * INSTRUCTOR QUOTE:
   * "And then, in the end, it's this content which should be output in this modal."
   */
  return <Modal onClose={handleClose}>{content}</Modal>;
}

/**
 * ============================================================================
 * LESSON 424 SUMMARY
 * ============================================================================
 *
 * WHAT THIS LESSON DEMONSTRATES:
 *
 * 1. REUSING useQuery WITH SAME queryKey FOR CACHE SHARING
 *    - EventDetails and EditEvent both use queryKey: ['events', params.id]
 *    - If EventDetails already fetched the data, EditEvent gets it instantly
 *    - No duplicate network requests = better user experience
 *
 * 2. PRE-POPULATING FORM DATA
 *    - Fetch event data with useQuery
 *    - Pass to EventForm via inputData prop
 *    - Form fields are automatically filled with existing values
 *
 * 3. CONDITIONAL RENDERING PATTERN (same as EventDetails)
 *    - isPending → LoadingIndicator
 *    - isError → ErrorBlock with close button
 *    - data → Form with pre-populated values
 *
 * TEASER FOR NEXT LESSON:
 * INSTRUCTOR QUOTE:
 * "But speaking of a user experience, the next step, of course is to make this
 * update button work, so that we do actually send an update request to the backend."
 *
 * ============================================================================
 */
