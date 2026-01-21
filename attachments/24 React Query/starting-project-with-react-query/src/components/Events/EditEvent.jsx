/**
 * ============================================================================
 * EditEvent Component - LESSONS 424-426
 * ============================================================================
 *
 * This component demonstrates:
 * - Lesson 424: Using useQuery to fetch and pre-populate form data
 * - Lesson 425: Using useMutation to update event data
 * - Lesson 426: OPTIMISTIC UPDATING - Update UI instantly without waiting!
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
 * LESSON 426: OPTIMISTIC UPDATING - THE CORE CONCEPT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So optimistic updating means that we update the UI in a optimistic way. So
 * we're assuming that the backend request will succeed and we update the data
 * on the frontend before the backend response is there."
 *
 * INSTRUCTOR QUOTE:
 * "And if the update then happens to fail, we roll back and we show the old
 * data again."
 *
 * WHY USE OPTIMISTIC UPDATING?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WITHOUT Optimistic Updating:                                           │
 * │    1. User clicks "Update"                                              │
 * │    2. Request sent to backend                                           │
 * │    3. WAIT for response...                                              │
 * │    4. UI updates (slow user experience)                                 │
 * │                                                                          │
 * │  WITH Optimistic Updating:                                              │
 * │    1. User clicks "Update"                                              │
 * │    2. UI updates IMMEDIATELY (instant feedback!)                        │
 * │    3. Request sent to backend in background                             │
 * │    4. If fails → Roll back to previous state                            │
 * └─────────────────────────────────────────────────────────────────────────┘
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
 * ============================================================================
 */

/**
 * IMPORTS
 *
 * LESSON 426 - IMPORTING queryClient:
 * INSTRUCTOR QUOTE:
 * "We should, for example, import query client, which we exported from
 * this HTTP JS file."
 *
 * Why import queryClient?
 * - We need direct access to manipulate the cache
 * - queryClient.cancelQueries() - Stop ongoing queries
 * - queryClient.getQueryData() - Read current cached data
 * - queryClient.setQueryData() - Manually update cached data
 * - queryClient.invalidateQueries() - Mark data as stale for refetch
 */
import { useQuery, useMutation } from '@tanstack/react-query';

import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

/**
 * LESSON 426: Import queryClient for optimistic updating
 *
 * INSTRUCTOR QUOTE:
 * "We should, for example, import query client, which we exported from
 * this HTTP JS file."
 *
 * The queryClient gives us methods to:
 * - Cancel queries: Prevent race conditions during optimistic update
 * - Get cached data: Save previous state for potential rollback
 * - Set cached data: Instantly update UI without waiting for backend
 * - Invalidate queries: Sync with backend after mutation completes
 */
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';

export default function EditEvent() {
  const navigate = useNavigate();

  /**
   * ============================================================================
   * GETTING THE EVENT ID FROM URL PARAMS
   * ============================================================================
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
   * "I'm using the same query with the same key, events params ID in this
   * EditEvent component and in the event details component. It's the same
   * query with the same key, therefore this cached data is reused between
   * those two components."
   */
  const { data, isPending, isError, error } = useQuery({
    /**
     * SAME queryKey AS EventDetails!
     * This enables cache sharing between components.
     */
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });

  /**
   * ============================================================================
   * LESSON 426: useMutation WITH OPTIMISTIC UPDATING
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And it all starts by adding a new property to this use mutation configuration
   * object. And that's the onMutate property."
   *
   * INSTRUCTOR QUOTE:
   * "onMutate will be executed right when you call mutate. So before this process
   * is done, before you got back a response."
   *
   * THREE KEY CALLBACKS FOR OPTIMISTIC UPDATING:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  onMutate:   Runs BEFORE mutation completes                            │
   * │              → Update cache optimistically                              │
   * │              → Save previous data for potential rollback                │
   * │                                                                          │
   * │  onError:    Runs if mutation FAILS                                     │
   * │              → Roll back to previous cached data                        │
   * │                                                                          │
   * │  onSettled:  Runs when mutation is DONE (success or failure)           │
   * │              → Invalidate queries to sync with actual backend state    │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
  const { mutate } = useMutation({
    mutationFn: updateEvent,

    /**
     * ========================================================================
     * onMutate - RUNS BEFORE THE MUTATION COMPLETES
     * ========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "onMutate will be executed right when you call mutate. So before this
     * process is done, before you got back a response."
     *
     * INSTRUCTOR QUOTE:
     * "And in here, you can then manipulate that cached data stored by React
     * Query behind the scenes to make sure that you already update the data
     * without waiting for the response."
     *
     * This function receives the same data that was passed to mutate():
     * mutate({ id: params.id, event: formData })
     * ↓
     * onMutate receives: { id: '...', event: { ...formData } }
     */
    onMutate: async (data) => {
      /**
       * EXTRACT THE NEW EVENT DATA
       *
       * INSTRUCTOR QUOTE:
       * "So in the end, it's the event data which I wanna get here as new event."
       */
      const newEvent = data.event;

      /**
       * STEP 1: CANCEL ONGOING QUERIES
       *
       * INSTRUCTOR QUOTE:
       * "But before you manipulate the data behind the scenes yourself,
       * you should also use query client to cancel all active queries for
       * a specific key."
       *
       * INSTRUCTOR QUOTE:
       * "And that's important because if we had any outgoing queries for that
       * same key, the response data from those queries would replace our
       * optimistically updated query data. And that's of course something
       * we wanna avoid."
       *
       * WHY await?
       * INSTRUCTOR QUOTE:
       * "And you should await this because this will return a promise."
       *
       * Race condition prevention:
       * ┌─────────────────────────────────────────────────────────────────────┐
       * │  WITHOUT cancelQueries:                                             │
       * │    1. Old query in progress fetching data                          │
       * │    2. User updates event                                            │
       * │    3. We set new data in cache                                      │
       * │    4. Old query completes and OVERWRITES our optimistic update!    │
       * │                                                                      │
       * │  WITH cancelQueries:                                                │
       * │    1. Old query in progress fetching data                          │
       * │    2. User updates event                                            │
       * │    3. We CANCEL the old query                                       │
       * │    4. We set new data in cache                                      │
       * │    5. Our optimistic update is preserved!                          │
       * └─────────────────────────────────────────────────────────────────────┘
       */
      await queryClient.cancelQueries({ queryKey: ['events', params.id] });

      /**
       * STEP 2: GET THE PREVIOUS DATA FOR POTENTIAL ROLLBACK
       *
       * INSTRUCTOR QUOTE:
       * "We also need to get the old data and store that old data somewhere
       * so that we can roll back to it if the mutation should fail."
       *
       * INSTRUCTOR QUOTE:
       * "For this we use query client, and there we use the getQueryData
       * method which allows us to get currently stored query data."
       *
       * This retrieves the data currently in the cache (before our update).
       */
      const previousEvent = queryClient.getQueryData(['events', params.id]);

      /**
       * STEP 3: UPDATE THE CACHE OPTIMISTICALLY
       *
       * INSTRUCTOR QUOTE:
       * "For this, we can use query client and call the setQueryData method.
       * And as I mentioned before, this method allows us to manipulate the
       * stored data without waiting for a response."
       *
       * INSTRUCTOR QUOTE:
       * "And here we should then set the new data, so new event, which is
       * that object with the title, the description, the image, and so on."
       *
       * This IMMEDIATELY updates the cache with the new data!
       * The UI will reflect this change INSTANTLY.
       */
      queryClient.setQueryData(['events', params.id], newEvent);

      /**
       * STEP 4: RETURN CONTEXT FOR POTENTIAL ROLLBACK
       *
       * INSTRUCTOR QUOTE:
       * "And then we can return this previous event in an object that wraps
       * it with this previous event key because I'll need that old data later
       * to roll it back if things should fail."
       *
       * INSTRUCTOR QUOTE:
       * "Whatever you return in onMutate will be passed to onError as a
       * third argument, this context."
       *
       * The returned object becomes the "context" parameter in onError.
       */
      return { previousEvent };
    },

    /**
     * ========================================================================
     * onError - RUNS IF THE MUTATION FAILS
     * ========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "So if the backend should fail for whatever reason, if an error is
     * thrown on the backend, onError here will be executed."
     *
     * INSTRUCTOR QUOTE:
     * "And in onError we typically wanna roll back our optimistic update
     * to then show the old data again."
     *
     * Parameters:
     * - error: The error that was thrown
     * - data: The data that was passed to mutate()
     * - context: The object returned from onMutate (contains previousEvent)
     *
     * ROLLBACK MECHANISM:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  1. User updates event                                               │
     * │  2. onMutate: Cache updated with new data (optimistic)              │
     * │  3. Backend request FAILS                                            │
     * │  4. onError: Cache RESTORED to previous data (rollback)             │
     * │  5. User sees original data again                                    │
     * └─────────────────────────────────────────────────────────────────────┘
     */
    onError: (error, data, context) => {
      /**
       * ROLL BACK TO PREVIOUS DATA
       *
       * INSTRUCTOR QUOTE:
       * "Here I wanna use query client set query data again, for this query
       * key to set the old data again, so context previous event."
       *
       * This restores the cache to its state before the optimistic update.
       */
      queryClient.setQueryData(['events', params.id], context.previousEvent);
    },

    /**
     * ========================================================================
     * onSettled - RUNS WHEN MUTATION IS DONE (SUCCESS OR FAILURE)
     * ========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "The unsettled property, which takes a function that will simply be
     * called whenever this mutation is done, no matter if it failed or succeeded."
     *
     * INSTRUCTOR QUOTE:
     * "And in here I wanna make sure that we sync the data with the backend
     * because our frontend data might now be out of sync with the backend data."
     *
     * WHY INVALIDATE?
     * Even if the update succeeded, the backend might have made additional
     * changes (timestamps, validation, etc.). Invalidating ensures we have
     * the TRUE current state from the backend.
     *
     * SYNC MECHANISM:
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  SUCCESS CASE:                                                       │
     * │    1. Optimistic update shown to user                               │
     * │    2. Backend confirms update                                        │
     * │    3. onSettled: Invalidate to fetch fresh data from backend        │
     * │    4. User sees confirmed data (likely same as optimistic)          │
     * │                                                                      │
     * │  FAILURE CASE:                                                       │
     * │    1. Optimistic update shown to user                               │
     * │    2. Backend rejects update                                         │
     * │    3. onError: Roll back to previous data                           │
     * │    4. onSettled: Invalidate to confirm rollback matches backend     │
     * └─────────────────────────────────────────────────────────────────────┘
     */
    onSettled: () => {
      /**
       * INVALIDATE TO SYNC WITH BACKEND
       *
       * INSTRUCTOR QUOTE:
       * "And we do sync by calling invalidate queries for this query key here."
       *
       * This marks the cached data as "stale" and triggers a refetch.
       * React Query will fetch fresh data from the backend to ensure
       * our frontend state matches the actual backend state.
       */
      queryClient.invalidateQueries({ queryKey: ['events', params.id] });
    },
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
   * DATA FLOW WITH OPTIMISTIC UPDATING:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  1. User edits form and clicks "Update"                                │
   * │  2. handleSubmit receives formData                                      │
   * │  3. mutate({ id, event }) is called                                     │
   * │  4. onMutate runs IMMEDIATELY:                                          │
   * │     - Cancel any ongoing queries                                        │
   * │     - Save previous data for rollback                                   │
   * │     - Update cache with new data                                        │
   * │  5. navigate('../') closes the modal                                    │
   * │  6. User INSTANTLY sees updated data on EventDetails page!             │
   * │  7. Backend request completes in background                             │
   * │  8. onSettled: Sync with backend to confirm                            │
   * └─────────────────────────────────────────────────────────────────────────┘
   *
   * WHY NAVIGATE IS CALLED AFTER mutate:
   * INSTRUCTOR QUOTE:
   * "If we now give this a try and I add this exclamation mark and I click
   * update, not only does this close immediately, but the data is already
   * updated here on this detail page as well."
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
   * CONDITIONAL RENDERING
   * ============================================================================
   *
   * States handled:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  isPending = true  →  Show LoadingIndicator                            │
   * │  isError = true    →  Show ErrorBlock with "Okay" link to close        │
   * │  data exists       →  Show EventForm with pre-populated data           │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

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

  return <Modal onClose={handleClose}>{content}</Modal>;
}

/**
 * ============================================================================
 * LESSON 426 SUMMARY: OPTIMISTIC UPDATING
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "That's the advantage of optimistic updating. We don't wait for the response,
 * instead we just update the UI and assume that it will succeed."
 *
 * INSTRUCTOR QUOTE:
 * "If it doesn't succeed, we roll back. And to make sure that we are in sync
 * with the backend again, we also use onSettled to then invalidate the queries
 * and fetch the latest data."
 *
 * THE THREE CALLBACKS EXPLAINED:
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 1. onMutate (runs IMMEDIATELY when mutate() is called):
 *    - await queryClient.cancelQueries() - Prevent race conditions
 *    - queryClient.getQueryData() - Save old data for rollback
 *    - queryClient.setQueryData() - Update cache optimistically
 *    - return { previousData } - Pass context to onError
 *
 * 2. onError (runs if mutation FAILS):
 *    - queryClient.setQueryData(key, context.previousData) - Roll back
 *
 * 3. onSettled (runs when mutation is DONE - success or failure):
 *    - queryClient.invalidateQueries() - Sync with actual backend state
 *
 * VISUAL FLOW:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  mutate() called                                                         │
 * │       │                                                                  │
 * │       ▼                                                                  │
 * │  ┌─────────────┐                                                         │
 * │  │  onMutate   │ ← Update UI immediately                                │
 * │  └──────┬──────┘                                                         │
 * │         │                                                                │
 * │         ▼                                                                │
 * │  ┌─────────────────────────────────────────┐                             │
 * │  │     Backend request in progress...       │                            │
 * │  └────────────────┬────────────────────────┘                             │
 * │                   │                                                      │
 * │         ┌─────────┴─────────┐                                            │
 * │         │                   │                                            │
 * │         ▼                   ▼                                            │
 * │  ┌─────────────┐     ┌─────────────┐                                     │
 * │  │   SUCCESS   │     │   FAILURE   │                                     │
 * │  └──────┬──────┘     └──────┬──────┘                                     │
 * │         │                   │                                            │
 * │         │                   ▼                                            │
 * │         │            ┌─────────────┐                                     │
 * │         │            │   onError   │ ← Roll back UI                      │
 * │         │            └──────┬──────┘                                     │
 * │         │                   │                                            │
 * │         └─────────┬─────────┘                                            │
 * │                   │                                                      │
 * │                   ▼                                                      │
 * │            ┌─────────────┐                                               │
 * │            │  onSettled  │ ← Sync with backend                           │
 * │            └─────────────┘                                               │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WHY THIS PATTERN IS POWERFUL:
 * - Instant UI feedback (no loading states needed!)
 * - Graceful error handling with automatic rollback
 * - Eventual consistency with backend via onSettled
 *
 * ============================================================================
 */
