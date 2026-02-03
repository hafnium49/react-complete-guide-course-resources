/**
 * ============================================================================
 * pages/new-meetup/index.js - LESSONS 486, 488 & 500: NEW MEETUP PAGE WITH API
 * ============================================================================
 *
 * LESSON 486: Created this page file using the folder approach
 * LESSON 488: Filled this page with the NewMeetupForm component
 * LESSON 500: Added API request to save meetup data and navigation after success
 * LESSON 503: Added Head metadata (title + description) for SEO
 *
 * ============================================================================
 * 🎓 LESSON 500: SENDING REQUESTS TO API ROUTES
 * ============================================================================
 *
 * This lesson demonstrates how to connect the frontend form to our backend
 * API route. Key concepts covered:
 *
 * 1. Using the fetch() API to send HTTP requests
 * 2. Configuring POST requests with method, body, and headers
 * 3. Converting JavaScript objects to JSON with JSON.stringify()
 * 4. Using useRouter hook for programmatic navigation
 * 5. Redirecting users after successful form submission
 *
 * ============================================================================
 * 🔄 DATA FLOW: FRONTEND → API ROUTE → DATABASE
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  [User]                                                                  │
 * │    │                                                                     │
 * │    │ fills form and clicks "Add Meetup"                                 │
 * │    ▼                                                                     │
 * │  [NewMeetupForm Component]                                              │
 * │    │                                                                     │
 * │    │ calls props.onAddMeetup(meetupData)                                │
 * │    ▼                                                                     │
 * │  [NewMeetupPage - addMeetupHandler]                                     │
 * │    │                                                                     │
 * │    │ sends POST request via fetch()                                     │
 * │    ▼                                                                     │
 * │  [/api/new-meetup - API Route]                                          │
 * │    │                                                                     │
 * │    │ receives request, extracts data from req.body                      │
 * │    │ connects to MongoDB                                                 │
 * │    │ inserts document into collection                                   │
 * │    ▼                                                                     │
 * │  [MongoDB Atlas - Database]                                             │
 * │    │                                                                     │
 * │    │ stores the meetup data                                             │
 * │    ▼                                                                     │
 * │  [API Route Response]                                                   │
 * │    │                                                                     │
 * │    │ returns { message: 'Meetup inserted!' }                            │
 * │    ▼                                                                     │
 * │  [NewMeetupPage - after await]                                          │
 * │    │                                                                     │
 * │    │ receives response, navigates to home page                          │
 * │    ▼                                                                     │
 * │  [Home Page /]                                                          │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🌐 INTERNAL VS EXTERNAL API REQUESTS
 * ============================================================================
 *
 * When making API requests, you typically need a full URL like:
 *   https://someapi.com/endpoint
 *
 * However, since our API route is part of the SAME NextJS application,
 * we can use a relative/absolute path instead:
 *   /api/new-meetup
 *
 * This works because:
 * - Both the page and API route are served by the same server
 * - NextJS handles routing internally
 * - No need to specify domain or port
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  EXTERNAL API:                                                          │
 * │  fetch('https://api.example.com/users')                                 │
 * │                                                                          │
 * │  INTERNAL API (same NextJS app):                                        │
 * │  fetch('/api/new-meetup')    ← We use this!                             │
 * │                                                                          │
 * │  The path matches the file structure:                                   │
 * │  /api/new-meetup  →  pages/api/new-meetup.js                            │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📤 CONFIGURING THE FETCH REQUEST
 * ============================================================================
 *
 * The fetch() function accepts two arguments:
 * 1. URL - where to send the request
 * 2. Options object - how to configure the request
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  fetch('/api/new-meetup', {                                             │
 * │                                                                          │
 * │    method: 'POST',                                                       │
 * │    // ↑ HTTP method - must match what API route expects                 │
 * │    //   Our API checks: if (req.method === 'POST')                      │
 * │                                                                          │
 * │    body: JSON.stringify(data),                                          │
 * │    // ↑ The data payload - MUST be a string, not an object!             │
 * │    //   JSON.stringify() converts { title: 'x' } to '{"title":"x"}'     │
 * │                                                                          │
 * │    headers: {                                                            │
 * │      'Content-Type': 'application/json'                                 │
 * │    }                                                                     │
 * │    // ↑ Tells the server what format the body is in                     │
 * │    //   Without this, server might not parse JSON correctly             │
 * │                                                                          │
 * │  })                                                                      │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🧭 PROGRAMMATIC NAVIGATION WITH useRouter
 * ============================================================================
 *
 * After successfully submitting data, we want to redirect the user.
 * NextJS provides the useRouter hook for programmatic navigation.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  import { useRouter } from 'next/router';                               │
 * │                                                                          │
 * │  function MyComponent() {                                                │
 * │    const router = useRouter();                                          │
 * │                                                                          │
 * │    // Navigate methods:                                                  │
 * │    router.push('/path')     // Navigate, add to history                 │
 * │    router.replace('/path')  // Navigate, replace current history entry │
 * │    router.back()            // Go back to previous page                 │
 * │                                                                          │
 * │    // push vs replace:                                                   │
 * │    // push: User CAN go back with browser back button                   │
 * │    // replace: User CANNOT go back (history entry replaced)             │
 * │  }                                                                       │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ⚡ ASYNC/AWAIT WITH FETCH
 * ============================================================================
 *
 * fetch() returns a Promise, so we can use async/await for cleaner code:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  // Without async/await (callback style):                               │
 * │  function handler(data) {                                               │
 * │    fetch('/api/...')                                                    │
 * │      .then(response => response.json())                                 │
 * │      .then(data => console.log(data));                                  │
 * │  }                                                                       │
 * │                                                                          │
 * │  // With async/await (cleaner):                                         │
 * │  async function handler(data) {                                         │
 * │    const response = await fetch('/api/...');                            │
 * │    const result = await response.json();                                │
 * │    console.log(result);                                                 │
 * │  }                                                                       │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📁 LESSON 486 RECAP: FOLDER APPROACH
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  OPTION 1: FILE APPROACH                                                 │
 * │  pages/new-meetup.js    →  Route: /new-meetup                           │
 * │                                                                          │
 * │  OPTION 2: FOLDER APPROACH (USED HERE)                                   │
 * │  pages/new-meetup/index.js  →  Route: /new-meetup                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔗 PROPS AND CALLBACKS (COMMUNICATION PATTERN)
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  DATA FLOW: CHILD → PARENT COMMUNICATION                                 │
 * │                                                                          │
 * │  [NewMeetupPage]                                                        │
 * │       │                                                                  │
 * │       │  passes: onAddMeetup={addMeetupHandler}                         │
 * │       ▼                                                                  │
 * │  [NewMeetupForm]                                                        │
 * │       │                                                                  │
 * │       │  User fills form and clicks submit                              │
 * │       │  calls: props.onAddMeetup(meetupData)                           │
 * │       ▼                                                                  │
 * │  [NewMeetupPage.addMeetupHandler]                                       │
 * │       │                                                                  │
 * │       │  receives: enteredMeetupData                                    │
 * │       │  sends to API route                                              │
 * │       │  navigates to home page                                          │
 * │       ▼                                                                  │
 * │  [Database stored, User redirected]                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * Import the NewMeetupForm component
 *
 * This pre-built component handles the form UI and data collection.
 * It expects an onAddMeetup prop (callback function).
 *
 * Path breakdown:
 * - We're in: /pages/new-meetup/index.js
 * - Go up 2 levels: ../../ (to project root)
 * - Then: components/meetups/NewMeetupForm
 */
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

/**
 * IMPORT useRouter FOR PROGRAMMATIC NAVIGATION
 *
 * The useRouter hook from next/router provides access to the router object,
 * which allows us to navigate programmatically (without clicking links).
 *
 * This is useful when you need to redirect after an action completes,
 * like after successfully submitting a form or logging in.
 *
 * IMPORTANT: Import from 'next/router', NOT 'react-router-dom'!
 * NextJS has its own routing system separate from React Router.
 */
import { useRouter } from 'next/router';

/**
 * LESSON 503: IMPORT Head AND Fragment FOR PAGE METADATA
 *
 * Head: NextJS component for injecting elements into the HTML <head> section
 * Fragment: React wrapper for returning multiple adjacent JSX elements
 *
 * Every page in a NextJS application should have appropriate metadata
 * to ensure good SEO and a professional user experience.
 */
import Head from 'next/head';
import { Fragment } from 'react';

/**
 * NewMeetupPage Component - Page for Adding New Meetups
 *
 * This page component:
 * 1. Renders the NewMeetupForm for user input
 * 2. Handles form submission by sending data to our API route
 * 3. Redirects to the home page after successful submission
 *
 * LESSON 503: Now also includes Head metadata for SEO.
 *
 * URL: http://localhost:3000/new-meetup
 */
function NewMeetupPage() {
  /**
   * GET THE ROUTER OBJECT
   *
   * useRouter() returns a router object with methods for navigation:
   * - router.push(url) - Navigate to url, adds to browser history
   * - router.replace(url) - Navigate to url, replaces current history entry
   * - router.back() - Go back to the previous page
   * - router.query - Access URL query parameters
   * - router.pathname - Current route pathname
   *
   * We use this to redirect the user after successful form submission.
   */
  const router = useRouter();

  /**
   * FORM SUBMISSION HANDLER - SENDS DATA TO API ROUTE
   *
   * This async function is called when the user submits the form.
   * It sends the collected meetup data to our API endpoint.
   *
   * Steps performed:
   * 1. Send POST request to /api/new-meetup with the form data
   * 2. Wait for the response
   * 3. Log the response data (for debugging)
   * 4. Navigate to the home page
   *
   * @param {Object} enteredMeetupData - Data collected from the form
   * @param {string} enteredMeetupData.title - Meetup title
   * @param {string} enteredMeetupData.image - Image URL
   * @param {string} enteredMeetupData.address - Physical address
   * @param {string} enteredMeetupData.description - Meetup description
   */
  async function addMeetupHandler(enteredMeetupData) {
    /**
     * SEND POST REQUEST TO API ROUTE
     *
     * We use the built-in fetch() function to send HTTP requests.
     * This works the same way as in regular React applications.
     *
     * URL: '/api/new-meetup'
     * - Starts with '/' making it an absolute path on the same server
     * - Matches file path: pages/api/new-meetup.js
     * - NextJS routes this to our API handler function
     *
     * The second argument configures the request:
     */
    const response = await fetch('/api/new-meetup', {
      /**
       * HTTP METHOD
       *
       * Set to 'POST' because we're creating a new resource.
       * This matches the check in our API route: if (req.method === 'POST')
       *
       * Common HTTP methods:
       * - GET: Retrieve data (default for fetch)
       * - POST: Create new data
       * - PUT: Update existing data (full replacement)
       * - PATCH: Update existing data (partial)
       * - DELETE: Remove data
       */
      method: 'POST',

      /**
       * REQUEST BODY
       *
       * The data we want to send to the server.
       *
       * IMPORTANT: The body must be a STRING, not an object!
       * JSON.stringify() converts a JavaScript object to a JSON string.
       *
       * Input:  { title: 'My Meetup', image: 'https://...' }
       * Output: '{"title":"My Meetup","image":"https://..."}'
       *
       * Since enteredMeetupData already has the exact structure our API
       * expects (title, image, address, description), we can pass it directly.
       */
      body: JSON.stringify(enteredMeetupData),

      /**
       * REQUEST HEADERS
       *
       * Headers provide metadata about the request.
       *
       * 'Content-Type': 'application/json' tells the server:
       * "The body of this request contains JSON-formatted data"
       *
       * This helps NextJS/the server parse req.body correctly.
       * Without this header, the server might not understand the format.
       */
      headers: {
        'Content-Type': 'application/json',
      },
    });

    /**
     * PARSE THE RESPONSE
     *
     * The response object from fetch contains the server's response.
     * To get the actual data, we need to parse it.
     *
     * response.json() parses the JSON response body into a JavaScript object.
     * This also returns a Promise, so we await it.
     *
     * Our API returns: { message: 'Meetup inserted!' }
     * So data will be: { message: 'Meetup inserted!' }
     */
    const data = await response.json();

    /**
     * LOG THE RESPONSE (for debugging)
     *
     * Check the browser console to see the server's response.
     * This helps verify that the API call was successful.
     *
     * Expected output: { message: 'Meetup inserted!' }
     */
    console.log(data);

    /**
     * NAVIGATE TO HOME PAGE
     *
     * After successfully adding the meetup, redirect the user.
     *
     * router.push('/') navigates to the home page and adds an entry
     * to the browser history (user can click back to return).
     *
     * Alternative: router.replace('/')
     * - Navigates to home but REPLACES the current history entry
     * - User cannot navigate back to this page with the back button
     * - Use this if you don't want users returning to the form after submit
     *
     * We use push() here to allow users to go back if needed.
     */
    router.push('/');
  }

  /**
   * RENDER THE FORM COMPONENT WITH HEAD METADATA
   *
   * LESSON 503: Wrapped in Fragment to include both Head and form.
   *
   * The Head component adds a static title and description for this page.
   * Unlike the detail page (where metadata is dynamic based on the meetup),
   * here the title and description are hardcoded since this form page
   * always serves the same purpose.
   *
   * Pass addMeetupHandler as the onAddMeetup prop.
   * When the form is submitted, NewMeetupForm will call this function
   * with the collected data.
   *
   * IMPORTANT: Pass the function reference (addMeetupHandler), NOT the result
   * of calling it (addMeetupHandler()). No parentheses!
   */
  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

/**
 * EXPORT THE PAGE COMPONENT
 *
 * Default export is required for NextJS page components.
 * NextJS uses this to render the page when users visit /new-meetup.
 */
export default NewMeetupPage;
