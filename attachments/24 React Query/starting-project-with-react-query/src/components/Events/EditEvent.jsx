/**
 * ============================================================================
 * EditEvent Component - LESSONS 424-425
 * ============================================================================
 *
 * This component demonstrates:
 * - Lesson 424: Using useQuery to fetch and pre-populate form data
 * - Lesson 425: Using useMutation to update event data
 *
 * LESSON 424 - FETCHING DATA:
 * INSTRUCTOR QUOTE:
 * "And of course it would also be nice if this modal would be pre-populated with
 * the event data to which it belongs. So the event which we are trying to edit."
 *
 * LESSON 425 - UPDATING DATA:
 * INSTRUCTOR QUOTE:
 * "So let's work on this update functionality next. And for this, of course, we
 * need a mutation in this edit event component because we now wanna send a request
 * to the backend that changes the event data."
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
 *
 * LESSON 425 - ADDING useMutation:
 * INSTRUCTOR QUOTE:
 * "So as a first step, I'll import useMutation from React Query in the edit
 * event JSX file."
 */
import { useQuery, useMutation } from '@tanstack/react-query';

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
 *
 * LESSON 425 - updateEvent function:
 * INSTRUCTOR QUOTE:
 * "This updated file, which you find attached, it's this update event function
 * that's set up as a mutation function here."
 */
import { fetchEvent, updateEvent } from '../../util/http.js';

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

  /**
   * ============================================================================
   * LESSON 425: useMutation FOR UPDATING EVENT DATA
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And for this, of course, we need a mutation in this edit event component
   * because we now wanna send a request to the backend that changes the event data."
   *
   * INSTRUCTOR QUOTE:
   * "Therefore back in edit event, we now wanna create a mutation which we can
   * then trigger from inside our code and then target this update event function."
   *
   * INSTRUCTOR QUOTE:
   * "And then execute it here in this component function and pass this configuration
   * object to it. And here the mutation function should now be updateEvent."
   *
   * WHY NO isPending/isError EXTRACTION HERE:
   * INSTRUCTOR QUOTE:
   * "Now, unlike before in this section, for this mutation, I will actually not
   * pull out isPending and so on, because in the next lecture, I'll show you a
   * different way of handling mutations and the different states a mutation can
   * go through."
   *
   * This will be enhanced with "Optimistic Updating" in the next lesson!
   */
  const { mutate } = useMutation({
    mutationFn: updateEvent,
  });

  /**
   * ============================================================================
   * handleSubmit - TRIGGERS THE UPDATE MUTATION
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And with that, as you learned, we can extract this mutate function out of
   * this object that is returned by useMutation so that we can call this function
   * to trigger this mutation function."
   *
   * INSTRUCTOR QUOTE:
   * "And I wanna trigger this function from inside here, from inside this
   * handleSubmit function, which is connected to this event form."
   *
   * INSTRUCTOR QUOTE:
   * "And then we have to pass this object with the data that we wanna forward to
   * updateEvent to this mutate function. So in this case, an object that has an
   * id property and an event property, that's what we must pass here to mutate."
   *
   * DATA FLOW:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  1. User edits form and clicks "Update"                                │
   * │  2. EventForm calls onSubmit with formData                             │
   * │  3. handleSubmit receives formData                                      │
   * │  4. mutate({ id: params.id, event: formData }) is called               │
   * │  5. useMutation calls updateEvent({ id, event })                       │
   * │  6. PUT request sent to backend                                        │
   * │  7. navigate('../') closes the modal                                   │
   * └─────────────────────────────────────────────────────────────────────────┘
   *
   * WHY NAVIGATE IS CALLED AFTER mutate (NOT in onSuccess):
   * INSTRUCTOR QUOTE:
   * "I'll use this navigate function here to close this modal... And I'm
   * deliberately doing that here and not in this onSuccess method, in this
   * configuration object. And I'll explain why I am doing that in the next lecture."
   *
   * This is intentional setup for "Optimistic Updating" in the next lesson!
   */
  function handleSubmit(formData) {
    mutate({ id: params.id, event: formData });
    navigate('../');
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
 * LESSONS 424-425 SUMMARY
 * ============================================================================
 *
 * LESSON 424 - FETCHING DATA FOR EDIT FORM:
 * ─────────────────────────────────────────
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
 * LESSON 425 - UPDATING EVENT DATA:
 * ──────────────────────────────────
 * 1. ADDING useMutation FOR UPDATE
 *    - Import useMutation from @tanstack/react-query
 *    - Import updateEvent from http.js
 *    - Execute useMutation with updateEvent as mutationFn
 *
 * 2. handleSubmit IMPLEMENTATION
 *    - Call mutate({ id: params.id, event: formData })
 *    - Call navigate('../') to close modal
 *
 * IMPORTANT - CURRENT LIMITATION:
 * INSTRUCTOR QUOTE:
 * "And with this code in place, if I now save this and I reload and I add an
 * exclamation mark here and I click update, this closes. And of course we are
 * not seeing the exclamation mark here if I reload however it is here."
 *
 * INSTRUCTOR QUOTE:
 * "So the update worked, but because I just closed this and I navigate away and
 * because I did not call invalidate queries as I did before in this course in
 * other places, this updated data was not fetched here."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PROBLEM: After update, the EventDetails page shows OLD data           │
 * │                                                                         │
 * │  WHY: We didn't invalidate queries, so cached data is stale            │
 * │                                                                         │
 * │  SOLUTION: "Optimistic Updating" - coming in the next lesson!          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * TEASER FOR NEXT LESSON:
 * INSTRUCTOR QUOTE:
 * "So that is what will change in the next lecture."
 *
 * ============================================================================
 */
