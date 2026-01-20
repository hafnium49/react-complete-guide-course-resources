/**
 * ============================================================================
 * EventDetails Component - LESSON 420 CHALLENGE: Fetching & Deleting Events
 * ============================================================================
 *
 * This component demonstrates the CHALLENGE from Lesson 420:
 * 1. Using useQuery to fetch a SINGLE event's details
 * 2. Using useMutation to DELETE an event
 *
 * ============================================================================
 * CHALLENGE REQUIREMENTS (from instructor)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Your job is now to make sure that as this page is loaded, the details data
 * is loaded. So you should use useQuery with this fetch event function to fetch
 * the event details and you should then output that data here on this page."
 *
 * INSTRUCTOR QUOTE:
 * "And then as a second step, also make this delete button here work. So make
 * sure that when the Delete button is clicked, we use this delete event function
 * together with React Query's useMutation."
 *
 * INSTRUCTOR QUOTE:
 * "And you should also navigate the user away here and maybe also invalidate
 * the queries that are related to events."
 *
 * ============================================================================
 * DATA FLOW OVERVIEW
 * ============================================================================
 *
 * For FETCHING event details:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. User clicks on an event → navigates to /events/:id                  │
 * │  2. EventDetails component mounts                                        │
 * │  3. useParams() extracts the id from the URL                            │
 * │  4. useQuery calls fetchEvent({ id, signal })                           │
 * │  5. Backend returns event data                                           │
 * │  6. Component renders event details                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * For DELETING an event:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. User clicks Delete button                                           │
 * │  2. handleDelete calls mutate({ id })                                   │
 * │  3. useMutation calls deleteEvent({ id })                               │
 * │  4. Backend deletes the event                                           │
 * │  5. onSuccess: invalidateQueries + navigate away                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';

/**
 * IMPORTING BOTH useQuery AND useMutation
 *
 * INSTRUCTOR QUOTE:
 * "So you should use useQuery with this fetch event function to fetch the event
 * details... And then as a second step, also make this delete button here work...
 * you should use this delete event function together with React Query's useMutation."
 *
 * Why we need BOTH hooks here:
 * - useQuery: For FETCHING data (GET request when component mounts)
 * - useMutation: For DELETING data (DELETE request when user clicks button)
 */
import { useQuery, useMutation } from '@tanstack/react-query';

import Header from '../Header.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

/**
 * IMPORTING FUNCTIONS AND queryClient FROM http.js
 *
 * INSTRUCTOR QUOTE:
 * "I'll use this fetch event function for fetching one specific event."
 *
 * We import:
 * - fetchEvent: Query function for useQuery (GET single event)
 * - deleteEvent: Mutation function for useMutation (DELETE event)
 * - queryClient: To call invalidateQueries() after successful deletion
 */
import { fetchEvent, deleteEvent, queryClient } from '../../util/http.js';

export default function EventDetails() {
  /**
   * ============================================================================
   * GETTING THE EVENT ID FROM THE URL
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now where do we get that ID from? Well, we can use React Router's useParams
   * hook to get hold of the params that are part of the URL. For example, that ID."
   *
   * The route is defined as '/events/:id' in App.jsx, so:
   * - URL: /events/e1 → params.id = "e1"
   * - URL: /events/abc123 → params.id = "abc123"
   */
  const params = useParams();
  const navigate = useNavigate();

  /**
   * ============================================================================
   * useQuery FOR FETCHING EVENT DETAILS
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "So you should use useQuery with this fetch event function to fetch the event
   * details and you should then output that data here on this page."
   *
   * ABOUT THE queryKey:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  queryKey: ['events', params.id]                                        │
   * │                                                                          │
   * │  Why include both 'events' AND params.id?                               │
   * │                                                                          │
   * │  1. 'events' - Groups this with other event-related queries             │
   * │     - When we invalidateQueries({ queryKey: ['events'] }), this query   │
   * │       will also be invalidated (because it INCLUDES 'events')           │
   * │                                                                          │
   * │  2. params.id - Makes the cache UNIQUE per event                        │
   * │     - ['events', 'e1'] and ['events', 'e2'] are DIFFERENT cache entries │
   * │     - Viewing event e1, then e2, then e1 again → e1 loads from cache!   │
   * └─────────────────────────────────────────────────────────────────────────┘
   *
   * ABOUT THE queryFn:
   * We need to pass the id to fetchEvent. Since React Query passes its default
   * object (with signal) to queryFn, we use an arrow function to merge our id
   * with the signal from React Query.
   */
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });

  /**
   * ============================================================================
   * useMutation FOR DELETING THE EVENT
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Make sure that when the Delete button is clicked, we use this delete event
   * function together with React Query's useMutation. That's what we learned before."
   *
   * WHY useMutation FOR DELETE?
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  DELETE operations:                                                      │
   * │    - Should NOT happen automatically                                     │
   * │    - Should ONLY happen when user explicitly clicks Delete              │
   * │    - Need to handle success (navigate away, invalidate cache)           │
   * │    - Need to handle errors (show error message)                         │
   * │                                                                          │
   * │  useMutation is perfect because:                                        │
   * │    - Request only sent when mutate() is called                          │
   * │    - Provides isPending for loading state                               │
   * │    - Provides onSuccess callback for post-delete actions                │
   * └─────────────────────────────────────────────────────────────────────────┘
   *
   * ABOUT onSuccess:
   * INSTRUCTOR QUOTE:
   * "And you should also navigate the user away here and maybe also invalidate
   * the queries that are related to events."
   *
   * We invalidate queries with ['events'] to ensure:
   * - The events list is refetched (deleted event is removed)
   * - Any cached event details are marked as stale
   */
  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      /**
       * INVALIDATE AND NAVIGATE AFTER SUCCESSFUL DELETION
       *
       * Order matters here:
       * 1. Invalidate queries first - marks event data as stale
       * 2. Navigate away - takes user back to events list
       *
       * The events list will refetch automatically because:
       * - We invalidated queries with ['events']
       * - The Events page is about to become visible
       * - React Query refetches stale data when component mounts
       */
      queryClient.invalidateQueries({ queryKey: ['events'] });
      navigate('/events');
    },
  });

  /**
   * DELETE BUTTON HANDLER
   *
   * When user clicks Delete, we call mutate with the event ID.
   * The ID is passed to deleteEvent via mutationFn.
   */
  function handleDelete() {
    mutate({ id: params.id });
  }

  /**
   * ============================================================================
   * CONDITIONAL RENDERING FOR LOADING/ERROR/DATA STATES
   * ============================================================================
   *
   * Pattern used throughout this course:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  isPending = true  →  Show loading indicator                           │
   * │  isError = true    →  Show error message                               │
   * │  data exists       →  Show the actual content                          │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
  let content;

  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching event data...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            'Failed to fetch event data. Please try again later.'
          }
        />
      </div>
    );
  }

  /**
   * RENDERING EVENT DATA
   *
   * INSTRUCTOR QUOTE:
   * "You should then output that data here on this page."
   *
   * The event object from the backend has this shape:
   * {
   *   id: "e1",
   *   title: "Event Title",
   *   description: "Event description...",
   *   date: "2024-01-15",
   *   time: "18:00",
   *   location: "New York",
   *   image: "image1.jpg"
   * }
   *
   * IMAGE URL CONSTRUCTION:
   * Images are served from the backend at: http://localhost:3000/{image}
   * So if image = "image1.jpg", the full URL is: http://localhost:3000/image1.jpg
   *
   * DATE/TIME FORMATTING:
   * The dateTime attribute follows ISO 8601 format: YYYY-MM-DDTHH:MM
   * The displayed text shows a human-readable format
   */
  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            {/**
             * DELETE BUTTON WITH LOADING STATE
             *
             * While deletion is in progress (isPendingDeletion = true),
             * we show "Deleting..." to give user feedback.
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
         * If deletion fails, we show an error message at the top of the article.
         * The user stays on the page and can try again.
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
