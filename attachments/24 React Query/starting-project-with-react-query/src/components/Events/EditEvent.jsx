/**
 * ============================================================================
 * EditEvent Component - LESSONS 424-428
 * ============================================================================
 *
 * This component demonstrates:
 * - Lesson 424: Using useQuery to fetch and pre-populate form data
 * - Lesson 425: Using useMutation to update event data
 * - Lesson 426: OPTIMISTIC UPDATING - Update UI instantly without waiting!
 * - Lesson 428: COMBINING REACT ROUTER WITH REACT QUERY
 *
 * ============================================================================
 * LESSON 428: REACT ROUTER + REACT QUERY INTEGRATION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And the great thing is we can combine both. We can use both React Router
 * features and React Query features. So we don't have to decide for one
 * and throw away the other."
 *
 * KEY CONCEPTS IN THIS LESSON:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. loader function:                                                    │
 * │     - Uses queryClient.fetchQuery() to pre-fetch data                   │
 * │     - Runs BEFORE the component renders                                 │
 * │     - Stores data in React Query's cache                                │
 * │                                                                          │
 * │  2. action function:                                                    │
 * │     - Handles form submissions via React Router                         │
 * │     - Called when form is submitted                                      │
 * │     - Extracts data and sends to backend                                │
 * │                                                                          │
 * │  3. useSubmit hook:                                                     │
 * │     - Programmatically submit forms                                      │
 * │     - Replaces useMutation for form submissions                         │
 * │                                                                          │
 * │  4. useNavigation hook:                                                 │
 * │     - Tracks navigation/submission state                                 │
 * │     - Provides feedback during submission                                │
 * │                                                                          │
 * │  5. staleTime configuration:                                            │
 * │     - Prevents redundant fetches                                         │
 * │     - Data reused from loader without immediate refetch                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WHY COMBINE BOTH?
 *
 * INSTRUCTOR QUOTE:
 * "But then inside of the component, I use useQuery with the same query
 * key. And the advantage of this is that the loader will start fetching
 * the data, will store that in the cache, and therefore when the component
 * then renders, the data will be there already."
 *
 * ============================================================================
 */

/**
 * IMPORTS
 *
 * LESSON 428: NEW IMPORTS FOR REACT ROUTER INTEGRATION
 *
 * INSTRUCTOR QUOTE:
 * "We can use the useNavigation hook provided by React Router to find out
 * whether a form is currently being submitted."
 *
 * useSubmit: Programmatically trigger form submissions
 * useNavigation: Track navigation/submission state across the app
 * redirect: Return redirect responses from action functions
 */
import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

/**
 * LESSON 428: Import queryClient for loader function
 *
 * INSTRUCTOR QUOTE:
 * "Because that query client here actually also has a fetchQuery method
 * which can be used to trigger a query programmatically."
 *
 * The queryClient is used in the loader to:
 * - Fetch data BEFORE the component renders
 * - Store the fetched data in React Query's cache
 * - The component's useQuery then finds the data already in cache
 */
import { fetchEvent, updateEvent, queryClient } from '../../util/http.js';

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();

  /**
   * ============================================================================
   * LESSON 428: useSubmit HOOK
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Well, we can get hold of a submit function and use that to submit
   * our form programmatically. And for this, I'll import useSubmit from
   * React Router DOM."
   *
   * useSubmit returns a function that triggers form submission.
   * This replaces the useMutation approach for handling form data.
   *
   * WHY useSubmit INSTEAD OF useMutation?
   * - Integrates with React Router's action pattern
   * - Form data handled automatically via formData API
   * - Works with React Router's built-in navigation state
   */
  const submit = useSubmit();

  /**
   * ============================================================================
   * LESSON 428: useNavigation HOOK FOR SUBMISSION STATE
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "We can use the useNavigation hook provided by React Router to find
   * out whether a form is currently being submitted."
   *
   * useNavigation provides state about ongoing navigations/submissions:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  navigation.state:                                                      │
   * │    - 'idle': No navigation/submission in progress                      │
   * │    - 'submitting': Form is being submitted                             │
   * │    - 'loading': Navigation is loading new page                         │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
  const { state } = useNavigation();

  /**
   * ============================================================================
   * useQuery WITH staleTime TO PREVENT REDUNDANT FETCHES
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "In the component, the useQuery hook triggers and would send another
   * request under the hood to also get that data even though we already
   * are fetching it through the loader."
   *
   * INSTRUCTOR QUOTE:
   * "And the fix for that is quite simple. We can set staleTime here
   * on this useQuery configuration object to, let's say 10,000 for
   * 10 seconds."
   *
   * WHY staleTime MATTERS HERE:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  WITHOUT staleTime:                                                     │
   * │    1. loader calls fetchQuery → Fetches and caches data                │
   * │    2. Component renders with useQuery                                   │
   * │    3. useQuery sees data in cache but treats it as "stale"             │
   * │    4. useQuery triggers ANOTHER fetch (redundant!)                     │
   * │                                                                          │
   * │  WITH staleTime: 10000:                                                 │
   * │    1. loader calls fetchQuery → Fetches and caches data                │
   * │    2. Component renders with useQuery                                   │
   * │    3. useQuery sees data in cache, checks staleTime                    │
   * │    4. Data is < 10 seconds old → Reuses cached data (no refetch!)      │
   * └─────────────────────────────────────────────────────────────────────────┘
   *
   * INSTRUCTOR QUOTE:
   * "This means that for 10 seconds, the cached data is not updated behind
   * the scenes. And with this, even if we visit this edit page repeatedly,
   * even if we go back to the events, let's say, and visit it again,
   * you see that no request is being sent."
   */
  const { data, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
    staleTime: 10000, // 10 seconds - prevents refetch if data was just loaded by loader
  });

  /**
   * ============================================================================
   * LESSON 428: handleSubmit USING useSubmit
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And then I submit this here, this formData by passing it to submit
   * and we provide a second argument where we configure how this submission
   * should be handled."
   *
   * INSTRUCTOR QUOTE:
   * "We wanna make clear that this is a PUT request because we wanna
   * update our event data. So in the form tag you could have set method
   * to PUT to set up such a request."
   *
   * The submit() function signature:
   *   submit(data, { method: 'PUT' })
   *
   * This triggers the action function defined on this route.
   */
  function handleSubmit(formData) {
    submit(formData, { method: 'PUT' });
  }

  function handleClose() {
    navigate('../');
  }

  /**
   * ============================================================================
   * CONDITIONAL RENDERING - NO MORE isPending STATE!
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And we could get rid of this loading state that's being shown initially
   * whilst we're waiting for the data to be fetched because now that we have
   * a loader, the data will be fetched before this page is even rendered."
   *
   * With the loader pattern:
   * - The loader fetches data BEFORE the component renders
   * - By the time EditEvent renders, data is already in cache
   * - No need for loading state - data is always available!
   *
   * BEFORE (Lesson 426):          AFTER (Lesson 428):
   * ┌────────────────────────┐    ┌────────────────────────┐
   * │ isPending → Loading... │    │ No isPending check!    │
   * │ isError → ErrorBlock   │    │ isError → ErrorBlock   │
   * │ data → EventForm       │    │ data → EventForm       │
   * └────────────────────────┘    └────────────────────────┘
   */
  let content;

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
        {/**
         * LESSON 428: SHOWING SUBMISSION STATE
         *
         * INSTRUCTOR QUOTE:
         * "So I wanna disable my update button when we are submitting and
         * maybe also show a different text on it."
         *
         * Using navigation.state to provide user feedback:
         * - state === 'submitting' → Show "Sending..." and disable button
         * - state !== 'submitting' → Show normal "Update" button
         */}
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button" disabled={state === 'submitting'}>
          {state === 'submitting' ? 'Sending...' : 'Update'}
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

/**
 * ============================================================================
 * LESSON 428: LOADER FUNCTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So here I will go to the EditEvent.jsx file, and in there below this
 * component function or above, it doesn't matter, I'll export a new
 * function called loader."
 *
 * INSTRUCTOR QUOTE:
 * "Because that query client here actually also has a fetchQuery method
 * which can be used to trigger a query programmatically."
 *
 * HOW THE LOADER WORKS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. User navigates to /events/:id/edit                                  │
 * │  2. React Router calls this loader function FIRST                       │
 * │  3. loader uses queryClient.fetchQuery() to fetch data                  │
 * │  4. fetchQuery stores the result in React Query's cache                 │
 * │  5. THEN React Router renders the EditEvent component                   │
 * │  6. EditEvent's useQuery finds data already in cache!                   │
 * │  7. User sees the form immediately - no loading spinner!                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * fetchQuery vs useQuery:
 *
 * INSTRUCTOR QUOTE:
 * "We shouldn't use this inside of a component. You should typically use
 * the useQuery hook, but we're not in a component here. Instead we are
 * in that loader function."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  useQuery:                                                              │
 * │    - Hook - can ONLY be used inside React components                   │
 * │    - Automatically manages loading/error states                         │
 * │    - Re-renders component when data changes                             │
 * │                                                                          │
 * │  fetchQuery:                                                            │
 * │    - Method - can be used ANYWHERE (including loader functions)        │
 * │    - Returns a promise with the data                                    │
 * │    - Stores result in React Query cache                                 │
 * │    - Does NOT re-render anything automatically                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {Object} params - Object containing route parameters
 * @param {Object} params.params - The URL parameters (e.g., { id: 'e1' })
 */
export function loader({ params }) {
  /**
   * Using the SAME queryKey and queryFn as the component's useQuery!
   *
   * INSTRUCTOR QUOTE:
   * "We're using the same query key in the loader and in the component.
   * That's important because that means that both use the same cache entry
   * and therefore the data fetched in the loader will be available in
   * the component."
   *
   * This ensures cache sharing between loader and component.
   */
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });
}

/**
 * ============================================================================
 * LESSON 428: ACTION FUNCTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "But of course we can also export a second function, a second function
 * which I'll call action."
 *
 * INSTRUCTOR QUOTE:
 * "And this function here will receive this request object and from that
 * request we can get hold of the submitted form data by awaiting request
 * form data."
 *
 * HOW THE ACTION WORKS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. User fills out form and clicks "Update"                             │
 * │  2. handleSubmit calls submit(formData, { method: 'PUT' })              │
 * │  3. React Router calls this action function                             │
 * │  4. action extracts form data from the request                          │
 * │  5. action calls updateEvent() to send data to backend                  │
 * │  6. action invalidates queries to refresh cache                         │
 * │  7. action returns redirect() to navigate back                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {Object} params - Object containing request and route params
 * @param {Request} params.request - The form submission request
 * @param {Object} params.params - URL parameters (e.g., { id: 'e1' })
 */
export async function action({ request, params }) {
  /**
   * EXTRACTING FORM DATA
   *
   * INSTRUCTOR QUOTE:
   * "And this function here will receive this request object and from
   * that request we can get hold of the submitted form data by awaiting
   * request form data."
   *
   * INSTRUCTOR QUOTE:
   * "And this form data here can then be converted to a simple JavaScript
   * object by calling object from entries and passing the form data to it."
   *
   * This transforms FormData into a plain JavaScript object:
   * FormData { title: 'Event', date: '2024-01-01', ... }
   *     ↓
   * { title: 'Event', date: '2024-01-01', ... }
   */
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);

  /**
   * SENDING THE UPDATE REQUEST
   *
   * We call updateEvent with the event ID and the updated data.
   * Note: We await this to ensure the update completes before redirecting.
   */
  await updateEvent({ id: params.id, event: updatedEventData });

  /**
   * INVALIDATING QUERIES TO REFRESH CACHE
   *
   * INSTRUCTOR QUOTE:
   * "And you might also wanna invalidate your queries here after updating
   * an event."
   *
   * This ensures that after the update:
   * - The cache is marked as stale
   * - Next time this event is viewed, fresh data is fetched
   * - All components showing this event will see the updated version
   */
  await queryClient.invalidateQueries(['events']);

  /**
   * REDIRECT BACK TO EVENT DETAILS
   *
   * INSTRUCTOR QUOTE:
   * "And then you can use the redirect function to redirect the user
   * back to the event details page."
   *
   * redirect('../') navigates one level up from /events/:id/edit to /events/:id
   */
  return redirect('../');
}

/**
 * ============================================================================
 * LESSON 428 SUMMARY: REACT ROUTER + REACT QUERY INTEGRATION
 * ============================================================================
 *
 * THE COMBINED APPROACH:
 *
 * INSTRUCTOR QUOTE:
 * "So we don't have to decide for one and throw away the other."
 *
 * INSTRUCTOR QUOTE:
 * "But then inside of the component, I use useQuery with the same query
 * key. And the advantage of this is that the loader will start fetching
 * the data, will store that in the cache, and therefore when the component
 * then renders, the data will be there already."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  REACT ROUTER provides:                                                  │
 * │    - loader: Pre-fetch data before component renders                    │
 * │    - action: Handle form submissions declaratively                      │
 * │    - redirect: Navigate after actions complete                          │
 * │    - useNavigation: Track submission state                              │
 * │                                                                          │
 * │  REACT QUERY provides:                                                   │
 * │    - Caching: Don't refetch if data is fresh (staleTime)                │
 * │    - Cache sharing: Same queryKey = same cached data                    │
 * │    - Automatic revalidation: Keep data fresh                            │
 * │    - Background updates: Sync without blocking UI                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * DATA FLOW VISUALIZATION:
 *
 *   User navigates to /events/:id/edit
 *           │
 *           ▼
 *   ┌───────────────┐
 *   │    loader()   │ ← Uses queryClient.fetchQuery()
 *   └───────┬───────┘
 *           │ Stores data in React Query cache
 *           ▼
 *   ┌───────────────┐
 *   │  EditEvent    │ ← useQuery finds data in cache (no loading state!)
 *   │  component    │
 *   └───────┬───────┘
 *           │ User submits form
 *           ▼
 *   ┌───────────────┐
 *   │   action()    │ ← Handles form submission
 *   └───────┬───────┘
 *           │ Invalidates queries & redirects
 *           ▼
 *   ┌───────────────┐
 *   │ EventDetails  │ ← Shows updated event
 *   └───────────────┘
 *
 * KEY CONFIGURATION: staleTime
 *
 * INSTRUCTOR QUOTE:
 * "This means that for 10 seconds, the cached data is not updated behind
 * the scenes."
 *
 * staleTime: 10000 ensures:
 * - Data fetched by loader is NOT immediately refetched by useQuery
 * - Prevents duplicate requests
 * - Data stays "fresh" for 10 seconds
 *
 * ============================================================================
 */
