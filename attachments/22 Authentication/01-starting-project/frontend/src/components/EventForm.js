/**
 * ============================================================================
 * EVENT FORM COMPONENT (Updated in Lesson 394)
 * ============================================================================
 *
 * This component provides the form for creating and editing events.
 * The action function now includes the JWT token in the Authorization header
 * for authenticated requests to protected backend endpoints.
 *
 * ============================================================================
 * LESSON 394 - ATTACHING TOKEN TO CREATE/EDIT REQUESTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "The same has to be done in the event form, where we send create and edit
 * requests, which are both protected."
 *
 * PROTECTED ACTIONS IN THIS FILE:
 * - CREATE event (POST /events) - requires authentication
 * - EDIT event (PATCH /events/:id) - requires authentication
 *
 * ============================================================================
 */

import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect
} from 'react-router-dom';

import classes from './EventForm.module.css';

/**
 * ============================================================================
 * IMPORTING THE AUTH UTILITY (Lesson 394)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So here I'll also import getAuthToken from util/auth."
 *
 * We import the same utility function used in EventDetail.js to maintain
 * consistency in how we retrieve the stored authentication token.
 */
import { getAuthToken } from '../util/auth';

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ''}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ''}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ''}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

/**
 * ============================================================================
 * CREATE/EDIT EVENT ACTION (Updated in Lesson 394)
 * ============================================================================
 *
 * This action handles both creating new events (POST) and editing existing
 * events (PATCH). Both operations require authentication.
 *
 * INSTRUCTOR QUOTE:
 * "The same has to be done in the event form, where we send create and edit
 * requests, which are both protected."
 *
 * FLOW:
 * 1. Extract form data (title, image, date, description)
 * 2. Get authentication token from localStorage
 * 3. Determine URL based on method (POST for new, PATCH for edit)
 * 4. Send request with Authorization header
 * 5. Handle response (errors or redirect)
 *
 * ============================================================================
 */
export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  /**
   * INSTRUCTOR QUOTE:
   * "And here I'll then get my token by calling getAuthToken."
   *
   * Retrieve the JWT token from localStorage
   */
  const token = getAuthToken();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  let url = 'http://localhost:8080/events';

  if (method === 'PATCH') {
    const eventId = params.eventId;
    url = 'http://localhost:8080/events/' + eventId;
  }

  const response = await fetch(url, {
    method: method,
    /**
     * ========================================================================
     * ADDING AUTHORIZATION HEADER (Lesson 394)
     * ========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "And then I'll add an authorization header to this headers object."
     *
     * NOTE: We already have a Content-Type header, so we're adding the
     * Authorization header to the existing headers object.
     *
     * INSTRUCTOR QUOTE:
     * "I'll then add authorization header, so the name of the header should
     * be 'Authorization'. And then again, Bearer and then the token."
     *
     * The headers object now contains two headers:
     * 1. Content-Type: 'application/json' - tells backend the body format
     * 2. Authorization: 'Bearer <token>' - authenticates the request
     */
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }

  return redirect('/events');
}

