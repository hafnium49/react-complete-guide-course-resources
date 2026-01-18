/**
 * ============================================================================
 * EVENT DETAIL PAGE (Updated in Lesson 394)
 * ============================================================================
 *
 * This page displays a single event's details and handles event deletion.
 * The delete action now includes an Authorization header with the JWT token.
 *
 * ============================================================================
 * LESSON 394 - ATTACHING THE TOKEN TO REQUESTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So that's how we can manage that token. And therefore, now, deleting here
 * should also work. Because now we do send that token along with the delete
 * request to the backend."
 *
 * PROTECTED ACTIONS ON THIS PAGE:
 * - DELETE event (requires authentication)
 *
 * UNPROTECTED ACTIONS ON THIS PAGE:
 * - VIEW event details (GET - no auth required)
 * - VIEW events list (GET - no auth required)
 *
 * ============================================================================
 */

import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';

import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

/**
 * ============================================================================
 * IMPORTING THE AUTH UTILITY (Lesson 394)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And for attaching it to requests, we, of course, have to go to the places
 * where those requests get sent. And for example, in the event detail page,
 * we got that action for deleting events."
 *
 * INSTRUCTOR QUOTE:
 * "So here I can import that getAuthToken function from... and then we gotta
 * go up one level, util, auth."
 */
import { getAuthToken } from '../util/auth';

function EventDetailPage() {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
}

/**
 * ============================================================================
 * DELETE EVENT ACTION (Updated in Lesson 394)
 * ============================================================================
 *
 * This action handles event deletion. It now includes the JWT token in the
 * Authorization header to authenticate with the backend.
 *
 * INSTRUCTOR QUOTE:
 * "So here in the delete action, I first of all get my token by calling
 * getAuthToken. And then below where I set up my request configuration object,
 * I can add headers here."
 *
 * WHY AUTHORIZATION IS NEEDED:
 * - The backend's DELETE /events/:id route is protected
 * - Without a valid token, the backend returns 401 Unauthorized
 * - The token proves the user has permission to delete events
 *
 * ============================================================================
 */
export async function action({ params, request }) {
  const eventId = params.eventId;

  /**
   * INSTRUCTOR QUOTE:
   * "So here in the delete action, I first of all get my token by calling
   * getAuthToken."
   *
   * Get the stored token from localStorage via our utility function
   */
  const token = getAuthToken();

  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
    /**
     * ========================================================================
     * ADDING THE AUTHORIZATION HEADER (Lesson 394)
     * ========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "And then below where I set up my request configuration object, I can add
     * headers here. And I can set an authorization header here, and set this
     * equal to 'Bearer ' and then the token."
     *
     * AUTHORIZATION HEADER FORMAT:
     * Authorization: Bearer <token>
     *
     * INSTRUCTOR QUOTE:
     * "This is a format that is expected on the backend for this specific
     * API, by the way, where you first have the word Bearer, then a white
     * space, and then the token."
     *
     * WHY "Bearer" PREFIX?
     * - Industry standard for JWT token authentication (RFC 6750)
     * - "Bearer" indicates the token type (bearer token)
     * - Backend parses this format to extract and validate the token
     * - Format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     */
    headers: {
      'Authorization': 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete event.' },
      {
        status: 500,
      }
    );
  }
  return redirect('/events');
}
