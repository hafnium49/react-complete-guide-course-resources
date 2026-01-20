/**
 * ============================================================================
 * HTTP UTILITY FUNCTIONS - Lessons 412-419
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "I'll start by selecting this code here, this async fetch events function
 * and I'll cut it here, and add it in a new file in my source folder
 * in a sub folder named util for utility."
 *
 * ============================================================================
 * LESSON 419: WHY queryClient IS EXPORTED FROM THIS FILE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Therefore we should cut this from this file and remove this import and
 * instead add it to some other file from which we can then import it into
 * multiple files. In my case here, I'll just add it to this HTTP JS file.
 * There at the very top I'll export this Query client."
 *
 * WHY MOVE queryClient HERE?
 * - We need access to queryClient in multiple files (App.jsx, NewEvent.jsx)
 * - To call invalidateQueries() after mutations, we need the same queryClient
 *   instance that's used by QueryClientProvider
 * - Centralizing it here makes it importable anywhere
 *
 * ============================================================================
 * WHY OUTSOURCE FETCH FUNCTIONS TO A SEPARATE FILE?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And the idea here simply is to have all that code that controls how to
 * fetch the data. So how to send that HTTP request with the fetch function
 * and how to extract the response data, that all that code, all these
 * functions that take care of that, live in that separate file."
 *
 * Benefits of this pattern:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. SEPARATION OF CONCERNS                                              │
 * │     - HTTP logic is separate from component logic                       │
 * │     - Components focus on UI, this file focuses on data fetching       │
 * │                                                                          │
 * │  2. REUSABILITY                                                          │
 * │     - Same fetch function can be used by multiple components            │
 * │     - Can be imported by Tanstack Query's useQuery or useMutation       │
 * │                                                                          │
 * │  3. TESTABILITY                                                          │
 * │     - HTTP functions can be unit tested independently                   │
 * │     - Easier to mock in component tests                                 │
 * │                                                                          │
 * │  4. FLEXIBILITY                                                          │
 * │     - Can switch from fetch to axios without changing components        │
 * │     - API endpoint changes only affect this file                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * IMPORTANT: TANSTACK QUERY DOESN'T SEND REQUESTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Tanstack Query does not come with some built-in logic to send HTTP requests.
 * Instead it comes with logic for managing those requests, for keeping track
 * of the data and the possible errors that are yielded by these requests
 * and so on. The code for sending the requests must come from your side."
 *
 * INSTRUCTOR QUOTE:
 * "You define that code and you can define the code however you want.
 * Here I'm using the builtin fetch function to send a request.
 * I could also be using axios, another third party library here.
 * I can do whatever I want."
 *
 * INSTRUCTOR QUOTE:
 * "Technically, I don't even have to send a request here because all
 * useQuery wants is a function that returns a promise.
 * That is its requirement here."
 *
 * ============================================================================
 */

import { QueryClient } from '@tanstack/react-query';

/**
 * ============================================================================
 * LESSON 419: SHARED QueryClient INSTANCE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And of course for that we have to import this QueryClient class that's
 * being instantiated here."
 *
 * This queryClient instance is used by:
 * 1. App.jsx - Passed to QueryClientProvider
 * 2. NewEvent.jsx - To call invalidateQueries() after creating an event
 * 3. Any other component that needs to manually interact with the cache
 *
 * IMPORTANT: This must be the SAME instance used by QueryClientProvider!
 * If you create a different instance, invalidateQueries() won't work because
 * it would be operating on a different cache.
 */
export const queryClient = new QueryClient();

/**
 * ============================================================================
 * LESSONS 414-415: MAKING fetchEvents FLEXIBLE WITH SEARCH TERM & SIGNAL
 * ============================================================================
 *
 * LESSON 414 - Adding search term support:
 *
 * INSTRUCTOR QUOTE:
 * "Now for the function, I still want to use this fetchEvents function here,
 * but we now must be able to pass some extra data to this function, and we
 * must tweak this code here a little bit because now we must include this
 * search term which is entered here into this input field, into this request
 * to the backend."
 *
 * ============================================================================
 * LESSON 415: FIXING THE BUG - REACT QUERY'S DEFAULT OBJECT
 * ============================================================================
 *
 * THE BUG (from Lesson 414):
 * When we passed `fetchEvents` directly to `queryFn`, React Query passed
 * an object to it (not undefined), causing "[object Object]" to be sent
 * as the search parameter!
 *
 * INSTRUCTOR QUOTE:
 * "React Query and the useQuery hook actually passes some default data
 * to this Query function you're defining here."
 *
 * INSTRUCTOR QUOTE:
 * "The data it passes in is an object that gives us information about the
 * Query key that was used for that Query and a signal."
 *
 * WHAT REACT QUERY PASSES TO queryFn:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  {                                                                       │
 * │    queryKey: ['events', { search: 'city' }],  // The queryKey used      │
 * │    signal: AbortSignal { ... },                // For aborting requests │
 * │    meta: undefined                             // Optional metadata     │
 * │  }                                                                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And that signal is required for aborting that request. If you, for example,
 * navigate away from this page before the request was finished because React
 * Query thankfully can do that for you, it can abort requests and it does
 * that with help of that signal."
 *
 * THE FIX:
 * Accept an object with destructuring to get { signal, searchTerm }
 *
 * @param {Object} options - Options object
 * @param {AbortSignal} [options.signal] - AbortSignal for cancelling requests
 * @param {string} [options.searchTerm] - Optional search term to filter events
 * @returns {Promise<Array>} Array of event objects
 * @throws {Error} If the response is not ok (4xx or 5xx status)
 */
export async function fetchEvents({ signal, searchTerm } = {}) {
  /**
   * DYNAMIC URL CONSTRUCTION (Lesson 414)
   *
   * How the URL changes:
   * ┌─────────────────────────────────────────────────────────────────────────┐
   * │  No searchTerm:  http://localhost:3000/events                           │
   * │  searchTerm:     http://localhost:3000/events?search=city               │
   * └─────────────────────────────────────────────────────────────────────────┘
   */
  let url = 'http://localhost:3000/events';

  if (searchTerm) {
    url += '?search=' + searchTerm;
  }

  /**
   * PASSING THE ABORT SIGNAL TO FETCH (Lesson 415)
   *
   * INSTRUCTOR QUOTE:
   * "For that we can use this signal and pass it to the built-in fetch
   * function by adding a second argument to fetch, a configuration object,
   * which takes a signal property and wants a signal of that shape as React
   * Query gives it to us so that the browser then can use that abort signal
   * internally to stop this request if it receives that signal."
   *
   * Why this is important:
   * - If user navigates away before request completes, React Query aborts it
   * - Prevents memory leaks and unnecessary network traffic
   * - Keeps the app responsive and efficient
   */
  const response = await fetch(url, { signal });

  /**
   * ERROR HANDLING IS CRITICAL FOR TANSTACK QUERY
   *
   * INSTRUCTOR QUOTE:
   * "Now to make sure that isError is true, in such a case your code
   * that sends the request also must make sure that an error is thrown
   * if you got an invalid response."
   *
   * INSTRUCTOR QUOTE:
   * "This code checks if we got a 400 or 500-ish response code,
   * in which case it generates and throws an error and that would
   * then lead to isError being true."
   *
   * Why we must throw errors manually:
   * - fetch() only rejects on network errors, NOT on 4xx/5xx responses
   * - We must check response.ok and throw our own error
   * - This error will be caught by Tanstack Query and stored in the
   *   'error' property returned by useQuery
   */
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    /**
     * INSTRUCTOR QUOTE:
     * "And in that case, we also get back an error property which contains
     * information about that error that occurred. For example, the error message."
     *
     * We attach the response JSON to error.info so we can display
     * server-provided error messages in the UI.
     */
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

/**
 * ============================================================================
 * LESSON 417: createNewEvent - MUTATION FUNCTION FOR CREATING EVENTS
 * ============================================================================
 *
 * WHY SEPARATE FUNCTIONS FOR MUTATIONS?
 * INSTRUCTOR QUOTE:
 * "I'll add a new function to this HTTP JS file for that. Now to save you
 * some time and make sure that you don't have to write all that code on your
 * own, attached to this lecture you find an updated HTTP.JS file which
 * contains this createNewEvent function that's being exported, which will in
 * the end send this post request to the backend that will create that event."
 *
 * MUTATION FUNCTIONS vs QUERY FUNCTIONS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Query Functions (fetchEvents):                                         │
 * │    - GET requests                                                        │
 * │    - Retrieve data from backend                                          │
 * │    - Used with useQuery                                                  │
 * │    - Response data is cached                                             │
 * │                                                                          │
 * │  Mutation Functions (createNewEvent):                                    │
 * │    - POST/PUT/PATCH/DELETE requests                                      │
 * │    - Change data on the backend                                          │
 * │    - Used with useMutation                                               │
 * │    - Response typically not cached (data changes, not retrieves)        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {Object} eventData - The event data to create
 * @param {string} eventData.event.title - Event title
 * @param {string} eventData.event.description - Event description
 * @param {string} eventData.event.date - Event date
 * @param {string} eventData.event.time - Event time
 * @param {string} eventData.event.location - Event location
 * @param {string} eventData.event.image - Event image filename
 * @returns {Promise<Object>} The created event object
 * @throws {Error} If the response is not ok (4xx or 5xx status)
 */
export async function createNewEvent(eventData) {
  /**
   * SENDING A POST REQUEST
   *
   * INSTRUCTOR QUOTE:
   * "This function wants the event data as an input and it's now function
   * which we can use in the new event JSX file."
   *
   * Key differences from GET requests:
   * - method: 'POST' - tells the server we're creating data
   * - body: JSON.stringify(eventData) - the data to create
   * - headers: Content-Type - tells server we're sending JSON
   */
  const response = await fetch(`http://localhost:3000/events`, {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * ERROR HANDLING FOR MUTATIONS
   *
   * INSTRUCTOR QUOTE:
   * "If I open the network tab and I try sending this again, I again get an
   * error here, a bad request error. And in my preview tab here where I see
   * the response data I got back, I see this message 'invalid data provided'."
   *
   * The backend validates the data and returns error responses if:
   * - Required fields are missing (title, description, date, time, location)
   * - Image is not selected
   * - Data format is invalid
   */
  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  /**
   * RETURNING THE CREATED EVENT
   *
   * The backend returns the newly created event with its generated ID.
   * This can be useful for navigating to the new event's detail page
   * or updating the UI optimistically.
   */
  const { event } = await response.json();

  return event;
}

/**
 * ============================================================================
 * LESSON 418: fetchSelectableImages - FETCHING IMAGE OPTIONS FOR EventForm
 * ============================================================================
 *
 * WHY FETCH IMAGES FROM THE BACKEND?
 *
 * INSTRUCTOR QUOTE:
 * "The way this app and this backend here works is that this backend code in
 * this app.js file in the backend folder actually has a route, this events/images
 * route, to which a GET request can be sent to get back a list of images from
 * which the user can choose."
 *
 * INSTRUCTOR QUOTE:
 * "Because those actual images that will be displayed are stored on the backend
 * in that public folder there, they're not part of the frontend project.
 * Therefore I can't just include them in my frontend code. Instead, a request
 * must be sent to this backend route here so that we get that list of images
 * that we can display and we can then render that list on the frontend."
 *
 * WHY useQuery (NOT useMutation)?
 *
 * INSTRUCTOR QUOTE:
 * "And of course, this is a job for React Query again and here it's the Query
 * hook we need because I don't want change any data on the backend. I don't
 * wanna perform a data mutation. Therefore, instead I just wanna Query for data.
 * I want to get some data so we can and should use useQuery."
 *
 * How this function is used:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  EventForm.jsx:                                                         │
 * │    const { data } = useQuery({                                          │
 * │      queryKey: ['events-images'],                                       │
 * │      queryFn: fetchSelectableImages,  ← This function                   │
 * │    });                                                                   │
 * │                                                                          │
 * │    <ImagePicker images={data} ... />                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {Object} options - Options object from React Query
 * @param {AbortSignal} options.signal - AbortSignal for cancelling requests
 * @returns {Promise<string[]>} Array of image filenames
 * @throws {Error} If the response is not ok (4xx or 5xx status)
 */
export async function fetchSelectableImages({ signal }) {
  /**
   * INSTRUCTOR QUOTE:
   * "Attached you find another updated version of the http.js file, which now
   * also includes this fetchSelectableImages function which sends a request to
   * that backend URL, I just explained to you, where we get that list of
   * selectable images."
   *
   * Backend route: GET /events/images
   * Returns: { images: ['image1.jpg', 'image2.jpg', ...] }
   */
  const response = await fetch(`http://localhost:3000/events/images`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the images');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}
