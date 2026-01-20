/**
 * ============================================================================
 * NewEvent Component - LESSONS 417 & 419: Mutations & Invalidating Queries
 * ============================================================================
 *
 * This component demonstrates:
 * - LESSON 417: Using useMutation for sending data (POST requests)
 * - LESSON 419: Using onSuccess callback and invalidateQueries after mutations
 *
 * ============================================================================
 * WHY useMutation INSTEAD OF useQuery?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "To send data, to send a post request as we plan to do it here, you would
 * instead use useMutation."
 *
 * KEY DIFFERENCE - When requests are sent:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  useQuery:                                                              │
 * │    - Sends request AUTOMATICALLY when component renders                 │
 * │    - Good for fetching data to display                                  │
 * │    - Response data is cached                                            │
 * │                                                                          │
 * │  useMutation:                                                           │
 * │    - Sends request ONLY when you call mutate()                          │
 * │    - Good for creating/updating/deleting data                           │
 * │    - Response typically not cached                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

import { Link, useNavigate } from 'react-router-dom';

/**
 * IMPORTING useMutation FROM TANSTACK QUERY
 *
 * INSTRUCTOR QUOTE:
 * "And for this, we should again import something from React Query as before.
 * And that something now is a different hook. It's not useQuery anymore
 * because you only use useQuery to get data."
 */
import { useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

/**
 * IMPORTING THE MUTATION FUNCTION AND queryClient
 *
 * LESSON 419: We now also import queryClient to call invalidateQueries()
 *
 * INSTRUCTOR QUOTE:
 * "But now we can use that same queryClient in the new event JSX file here
 * in onSuccess because there, before navigating away, I now want to use this
 * queryClient. So we should import queryClient from going up two levels and
 * then UTIL and then HTTP JS."
 */
import { createNewEvent, queryClient } from '../../util/http.js';

export default function NewEvent() {
  const navigate = useNavigate();

  /**
   * ============================================================================
   * THE useMutation HOOK - FOR SENDING/CHANGING DATA
   * ============================================================================
   *
   * CONFIGURATION OPTIONS:
   *
   * mutationFn (required):
   *   The function that performs the mutation (sends the request)
   *
   * onSuccess (Lesson 419):
   *   Callback that runs ONLY when the mutation succeeds
   *
   * WHAT useMutation RETURNS:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  mutate    - Function to trigger the mutation (MOST IMPORTANT!)        │
   * │  isPending - true while request is in progress                         │
   * │  isError   - true if request failed                                    │
   * │  error     - Error object with details if request failed               │
   * │  data      - Response data (if needed)                                 │
   * │  reset     - Function to reset mutation state                          │
   * └─────────────────────────────────────────────────────────────────────────┘
   *
   * The data passed to mutate() is automatically forwarded to mutationFn!
   */
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,

    /**
     * =========================================================================
     * LESSON 419: onSuccess CALLBACK - WHAT TO DO AFTER MUTATION SUCCEEDS
     * =========================================================================
     *
     * WHY USE onSuccess INSTEAD OF NAVIGATING IN handleSubmit?
     *
     * INSTRUCTOR QUOTE:
     * "We could navigate away programmatically, for example, with help of the
     * useNavigate hook provided by React Router. Here in handleSubmit, we could
     * call navigate and go back to /events for example. We could do that here,
     * but we also might want to wait for this mutation to be finished until we
     * do that so that we don't close this screen whilst the request is still
     * on its way."
     *
     * INSTRUCTOR QUOTE:
     * "This also makes sure that this code will only execute if the mutation
     * did succeed. If we instead would navigate away here in handleSubmit we
     * would always do that no matter if the mutation succeeds or fails."
     *
     * INSTRUCTOR QUOTE:
     * "So if it fails and an error message should be displayed, we would never
     * see that because we instantly navigate away. If we instead do that in
     * onSuccess, we'll stay on this screen until the mutation did really succeed.
     * So any errors would be shown to us."
     *
     * Comparison:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  Navigate in handleSubmit:                                          │
     * │    - Navigates IMMEDIATELY (doesn't wait for response)              │
     * │    - User never sees error messages                                 │
     * │    - BAD user experience                                            │
     * │                                                                      │
     * │  Navigate in onSuccess:                                             │
     * │    - Navigates ONLY after mutation succeeds                         │
     * │    - Error messages are shown if mutation fails                     │
     * │    - GOOD user experience                                           │
     * └─────────────────────────────────────────────────────────────────────┘
     *
     * =========================================================================
     * invalidateQueries - TELLING REACT QUERY TO REFETCH DATA
     * =========================================================================
     *
     * THE PROBLEM:
     * INSTRUCTOR QUOTE:
     * "If you would go back here and you would submit such a new event here by
     * clicking Create, you would see that it is submitted but it's not showing
     * up here under my recently added events... It's not showing up here until
     * I, for example, switch to a different page and come back because as you
     * learned, this triggers React Query to refetch data behind the scenes."
     *
     * THE SOLUTION:
     * INSTRUCTOR QUOTE:
     * "But of course, if I know that the data just changed because I added a
     * new event, for example, I want React Query to immediately refetch data.
     * I wanted to immediately update my data here."
     *
     * WHAT invalidateQueries DOES:
     * INSTRUCTOR QUOTE:
     * "And we can achieve this by calling a method that's provided by React
     * Query that allows us to invalidate one or more queries. So that allows
     * us to tell React Query that the data that's connected to some queries
     * is outdated and that it should be refetched."
     *
     * INSTRUCTOR QUOTE:
     * "Invalidate queries which does what its name implies. It in the end tells
     * React Query that the data fetched by certain queries is outdated now,
     * that it should be marked as stale and that an immediate refetch should
     * be triggered if the Query belongs to a component that's currently visible
     * on the screen."
     *
     * HOW queryKey MATCHING WORKS:
     * INSTRUCTOR QUOTE:
     * "And this will then invalidate all queries that include this key. It does
     * not have to be exactly the same key. So for example, in FindEventsSection
     * I have a Query key that includes events and then also this object, this
     * Query here with this key will also be invalidated because it includes
     * events and I'm invalidating any Query key that does include events."
     *
     * Example of which queries get invalidated:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  invalidateQueries({ queryKey: ['events'] }) invalidates:           │
     * │                                                                      │
     * │  ✅ ['events']                     - NewEventsSection               │
     * │  ✅ ['events', { search: 'city' }] - FindEventSection               │
     * │  ✅ ['events', eventId]            - EventDetails (if it existed)  │
     * │  ❌ ['events-images']              - NOT invalidated (different key)│
     * └─────────────────────────────────────────────────────────────────────┘
     *
     * ABOUT THE exact OPTION:
     * INSTRUCTOR QUOTE:
     * "We could work around that by also setting the exact property on this
     * object that we're passing to invalidateQueries to true and now only
     * queries with exactly that key would be invalidated."
     *
     * WHY WE DON'T USE exact: true:
     * INSTRUCTOR QUOTE:
     * "But since you should build your Query keys such that they kind of
     * describe the data you are fetching, it makes sense to invalidate all
     * queries that include events because all those queries would otherwise
     * be dealing with old data. For example, here in FindEventsSection where
     * I'm looking for events based on a search term entered by the user, I
     * of course don't want to ignore new events that have been added."
     */
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/events');
    },
  });

  /**
   * FORM SUBMIT HANDLER - TRIGGERING THE MUTATION
   *
   * Note: We only call mutate() here. Navigation happens in onSuccess!
   *
   * How data flows from form to backend:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  1. User fills form and clicks Create                                  │
   * │  2. EventForm's handleSubmit collects data and calls onSubmit(data)    │
   * │  3. Our handleSubmit receives formData                                 │
   * │  4. We call mutate({ event: formData })                                │
   * │  5. useMutation calls createNewEvent({ event: formData })              │
   * │  6. createNewEvent sends POST request to backend                       │
   * │  7. On success: onSuccess runs → invalidateQueries → navigate          │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {/**
         * ===================================================================
         * CONDITIONAL RENDERING BASED ON MUTATION STATE
         * ===================================================================
         */}
        {isPending && 'Submitting...'}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>

      {/**
       * =====================================================================
       * ERROR HANDLING FOR MUTATIONS
       * =====================================================================
       *
       * INSTRUCTOR QUOTE (about why onSuccess is better):
       * "So if it fails and an error message should be displayed, we would
       * never see that because we instantly navigate away. If we instead do
       * that in onSuccess, we'll stay on this screen until the mutation did
       * really succeed. So any errors would be shown to us."
       */}
      {isError && (
        <ErrorBlock
          title="Failed to create event"
          message={
            error.info?.message ||
            'Failed to create event. Please check your inputs and try again later.'
          }
        />
      )}
    </Modal>
  );
}
