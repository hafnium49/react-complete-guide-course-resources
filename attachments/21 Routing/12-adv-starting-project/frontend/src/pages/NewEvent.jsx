/**
 * ============================================================================
 * NEW EVENT PAGE COMPONENT (Lessons 360, 374, 375, 378, 379 - Shared Action)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 360: Basic page with placeholder content (Task 1 solution)
 * Lesson 374: Added EventForm and introduced action concept
 * Lesson 375: Implemented action function with redirect
 * Lesson 378: Added validation error handling (return instead of throw)
 * Lesson 379: MOVED action to EventForm.jsx for reuse (CURRENT)
 *
 * ============================================================================
 * LESSON 375: IMPLEMENTING THE ACTION FUNCTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So to add an action to this new route here we add the special action
 * property here. And just like loader, action wants a function an arrow
 * function, or a regular function that does not matter."
 *
 * INSTRUCTOR QUOTE:
 * "Now just as with loaders, we typically don't wanna add our action functions
 * here in our route definitions file but instead we want to keep that code
 * close to the components to which it belongs."
 *
 * INSTRUCTOR QUOTE:
 * "So here in this case, we might want to add the action function in the new
 * event JS file."
 *
 * ============================================================================
 * ACTION FUNCTION BASICS (Lesson 375)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So here we can export a function called action. The name is up to you again,
 * we can add the async keyword here if we want to use async await in here."
 *
 * INSTRUCTOR QUOTE:
 * "And now in this action function we can send requests to the backend."
 *
 * ============================================================================
 * IMPORTANT: ACTIONS RUN ON THE CLIENT (Lesson 375)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now what's again important to understand and keep in mind is that we're
 * still on the client side here. Just as with the loader, this is code that
 * executes in the browser, this is not backend code."
 *
 * INSTRUCTOR QUOTE:
 * "You can access any browser API here like for example, local storage."
 *
 * This is the same concept as loaders:
 * - Runs in the browser (client-side)
 * - NOT server-side/backend code
 * - Can use browser APIs (localStorage, fetch, etc.)
 *
 * ============================================================================
 * THE ACTION RECEIVES { request, params } (Lesson 375)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And to get hold of that request that is captured by react-router and
 * forwarded to that action we have to use the data that's passed to this
 * action function because just as a loader function the action function is
 * executed by react-router and it receives an object that includes a couple
 * of helpful properties."
 *
 * INSTRUCTOR QUOTE:
 * "To be precise again, the request and params properties."
 *
 * INSTRUCTOR QUOTE:
 * "Now this time, we're not interested in the params because I have no params
 * here when creating a new event but I am interested in the request object
 * because that request object contains the form data."
 *
 * | Property | Purpose in Actions                                      |
 * |----------|--------------------------------------------------------|
 * | request  | Contains form data from <Form> submission               |
 * | params   | Route parameters (e.g., :eventId) - not used here      |
 *
 * ============================================================================
 * EXTRACTING FORM DATA (Lesson 375)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "To get hold of that forum data, we have to call the special forum data
 * method on the request object and awaited. That will give us a data object
 * that includes this form data."
 *
 * INSTRUCTOR QUOTE:
 * "And on this data object we can call the get method to get access to the
 * different input field values that were submitted."
 *
 * INSTRUCTOR QUOTE:
 * "To get we pass a string with the different identifiers of our input fields.
 * So that would be the values we chose as names for the input fields like
 * title or image in my case."
 *
 * CODE EXAMPLE:
 * =============
 * const data = await request.formData();
 * const title = data.get('title');      // Gets input name="title"
 * const image = data.get('image');      // Gets input name="image"
 *
 * ============================================================================
 * SENDING DATA TO BACKEND (Lesson 375)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "But very often, you might wanna send a request with the good old fetch
 * function again. And here indeed, I wanna send a request to local host 8080.
 * So to my dummy backend API which listens on port 8080 and their slash events."
 *
 * INSTRUCTOR QUOTE:
 * "And I actually wanna send a post request which we can do like that, and add
 * some data to the request."
 *
 * INSTRUCTOR QUOTE:
 * "And here the data I wanna send is that data that was submitted with the form."
 *
 * ============================================================================
 * ERROR HANDLING IN ACTIONS (Lesson 375)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "We can, for example, again, check if it's maybe not okay and in that case
 * throw an error response with that built-in JSON function which we can get
 * from react-router-dom."
 *
 * INSTRUCTOR QUOTE:
 * "And that would then display our error page if we throw an error response
 * like this. So this works for actions just as it worked for loaders."
 *
 * INSTRUCTOR QUOTE:
 * "So here we could then have a message where we say could not save event
 * and set the status code maybe to 500 again."
 *
 * ============================================================================
 * REDIRECTING AFTER SUCCESS (Lesson 375)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And typically when submitting a forum what you want to happen is that you
 * navigate the user away to a different page after successfully submitting
 * the form."
 *
 * INSTRUCTOR QUOTE:
 * "To do that, we can go back to our action in new event JS and then return
 * the result of calling Redirect."
 *
 * INSTRUCTOR QUOTE:
 * "Redirect, like JSON is a special function you can import from react-router-dom
 * and like JSON, Redirect creates a response object. However, it's a special
 * response object that simply redirects the user to a different page."
 *
 * INSTRUCTOR QUOTE:
 * "Now, the heavy lifting is handled behind the scenes by react-router. Here
 * you just specify the path to which you wanna redirect the user and react-router
 * will take care about the rest."
 *
 * ============================================================================
 * LOADERS VS ACTIONS COMPARISON
 * ============================================================================
 *
 * | Feature  | Purpose         | When triggered           | Data flow        |
 * |----------|-----------------|--------------------------|------------------|
 * | loader   | Load/GET data   | Before route renders     | Backend → Client |
 * | action   | Send/POST data  | On <Form> submission     | Client → Backend |
 *
 * SIMILARITIES:
 * =============
 * - Both are functions exported from component files
 * - Both are registered in route definitions
 * - Both receive { request, params } from React Router
 * - Both can throw json() for error handling
 * - Both run on the client (browser), not server
 *
 * DIFFERENCES:
 * ============
 * - Loaders run BEFORE render, actions run ON form submit
 * - Loaders GET data, actions POST/PATCH/DELETE data
 * - Actions use request.formData(), loaders typically don't
 * - Actions typically redirect(), loaders return data
 *
 * ============================================================================
 * ROUTE CONFIGURATION WITH ACTION (Lesson 375)
 * ============================================================================
 *
 * {
 *   path: 'events',
 *   element: <EventsRootLayout />,
 *   children: [
 *     { index: true, element: <EventsPage />, loader: eventsLoader },
 *     { path: 'new', element: <NewEventPage />, action: newEventAction },  // ← Action added here
 *     {
 *       path: ':eventId',
 *       id: 'event-detail',
 *       loader: eventDetailLoader,
 *       children: [...]
 *     }
 *   ]
 * }
 *
 * URL: http://localhost:3000/events/new
 *
 * ============================================================================
 */
/**
 * ============================================================================
 * LESSON 379: ACTION MOVED TO EventForm.jsx
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now before we're done with this module, I actually wanna reuse this action
 * here that currently lives in new event for editing events as well."
 *
 * INSTRUCTOR QUOTE:
 * "And that's why I will now move this action function to the event form
 * component so that we can use it both for creating and for editing events."
 *
 * WHAT CHANGED IN LESSON 379:
 * ===========================
 * BEFORE: This file had its own action function
 * AFTER: Action moved to EventForm.jsx for reuse
 *
 * WHY MOVE THE ACTION? (Lesson 379):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "Because EventForm is used both by the new event page and by the edit event
 * page. And therefore, we can register the same action on both routes."
 *
 * The redirect import was removed because the action (which uses redirect)
 * is now in EventForm.jsx.
 *
 * ============================================================================
 */
import EventForm from '../components/EventForm';

/**
 * NEW EVENT PAGE COMPONENT (Lessons 374-375, 379):
 * ================================================
 * Form page for creating a new event.
 *
 * INSTRUCTOR QUOTE:
 * "Now, I'll start by displaying the form. For that I'll use that same event
 * form component, here in my new event JS file."
 *
 * This page:
 * 1. Renders the EventForm component (same form used in EditEventPage)
 * 2. No event prop passed → form fields are empty (not pre-populated)
 * 3. When form is submitted, action function handles the request
 *
 * DIFFERENCE FROM EditEventPage:
 * ==============================
 * - EditEventPage: <EventForm method="patch" event={data.event} /> (pre-populated, PATCH)
 * - NewEventPage: <EventForm method="post" /> (empty fields, POST)
 *
 * ============================================================================
 * LESSON 379: PASSING method PROP
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "In NewEvent, I could set method to post and in EditEvent, I could set it
 * to patch."
 *
 * INSTRUCTOR QUOTE:
 * "We can use post for creating new events and patch for editing an event."
 *
 * HOW method="post" WORKS:
 * ========================
 * 1. NewEventPage passes method="post" to EventForm
 * 2. EventForm forwards it: <Form method="post">
 * 3. When submitted, React Router creates Request with method='POST'
 * 4. Action checks request.method === 'POST'
 * 5. Action sends POST to http://localhost:8080/events (creates new event)
 */
function NewEventPage() {
  return <EventForm method="post" />;
}

export default NewEventPage;

/**
 * ============================================================================
 * LESSON 379: ACTION MOVED TO EventForm.jsx
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "I'll grab this code here where I define and export my action in NewEvent JS.
 * And I'm adding it to EventForm JS."
 *
 * The action function that was previously defined here has been moved to
 * EventForm.jsx for reuse between NewEventPage and EditEventPage.
 *
 * ============================================================================
 * WHERE THE ACTION IS NOW (Lesson 379)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And that's why I will now move this action function to the event form
 * component so that we can use it both for creating and for editing events."
 *
 * The action is now exported from:
 * /src/components/EventForm.jsx
 *
 * And imported in App.jsx as:
 * import { action as manipulateEventAction } from './components/EventForm';
 *
 * INSTRUCTOR QUOTE:
 * "Import my action as manipulateEventAction... from components EventForm."
 *
 * ============================================================================
 * HOW THIS PAGE USES THE SHARED ACTION (Lesson 379)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "We use the same action on different routes but this action is written such
 * that it will do slightly different things depending on the method it gets."
 *
 * 1. This page passes method="post" to EventForm
 * 2. EventForm forwards it to <Form method="post">
 * 3. When submitted, request.method will be 'POST'
 * 4. The shared action in EventForm.jsx checks for method
 * 5. Since method is 'POST', it sends to http://localhost:8080/events (create)
 *
 * PREVIOUS LESSONS REFERENCE:
 * ===========================
 * For historical context about how the action was originally implemented:
 * - Lesson 375: Action basics, redirect(), error handling
 * - Lesson 378: Validation error handling (return vs throw for 422)
 *
 * See EventForm.jsx for the current action implementation with full comments.
 *
 * ============================================================================
 */
