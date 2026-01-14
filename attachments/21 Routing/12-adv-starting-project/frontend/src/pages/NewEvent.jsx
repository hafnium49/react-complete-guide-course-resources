/**
 * ============================================================================
 * NEW EVENT PAGE COMPONENT (Lessons 360, 374, 375, 378 - Action + Validation)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 360: Basic page with placeholder content (Task 1 solution)
 * Lesson 374: Added EventForm and introduced action concept
 * Lesson 375: Implemented action function with redirect
 * Lesson 378: Added validation error handling (return instead of throw) (CURRENT)
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
import { redirect } from 'react-router-dom';

import EventForm from '../components/EventForm';

/**
 * NEW EVENT PAGE COMPONENT (Lessons 374-375):
 * ===========================================
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
 * - EditEventPage: <EventForm event={data.event} /> (pre-populated)
 * - NewEventPage: <EventForm /> (empty fields)
 */
function NewEventPage() {
  return <EventForm />;
}

export default NewEventPage;

/**
 * ============================================================================
 * LESSON 375: ACTION FUNCTION FOR NEW EVENT
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
 * HOW THIS ACTION GETS TRIGGERED
 * ============================================================================
 *
 * 1. User fills out the form on NewEventPage
 * 2. User clicks "Save" button (submit)
 * 3. <Form method="post"> intercepts the submission
 * 4. React Router creates a Request object with form data
 * 5. React Router calls this action function
 * 6. This function receives { request, params }
 * 7. We extract data, send to backend, and redirect
 *
 * ============================================================================
 * REGISTERING THE ACTION (Lesson 375)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With that action defined, we can go back to app JS and there we can now
 * import this action from new event. Here, action as new event action."
 *
 * INSTRUCTOR QUOTE:
 * "We can import this and then use this new event action down here as a value
 * for this action property on this route definition."
 *
 * In App.jsx:
 * import NewEventPage, { action as newEventAction } from './pages/NewEvent';
 * ...
 * { path: 'new', element: <NewEventPage />, action: newEventAction }
 *
 * ============================================================================
 */
export async function action({ request, params }) {
  /**
   * EXTRACTING FORM DATA (Lesson 375):
   * ==================================
   * INSTRUCTOR QUOTE:
   * "To get hold of that forum data, we have to call the special forum data
   * method on the request object and awaited. That will give us a data object
   * that includes this form data."
   *
   * INSTRUCTOR QUOTE:
   * "And on this data object we can call the get method to get access to the
   * different input field values that were submitted."
   *
   * The request object comes from React Router's <Form> component.
   * request.formData() returns a FormData object with all form values.
   */
  const data = await request.formData();

  /**
   * BUILDING THE EVENT DATA OBJECT (Lesson 375):
   * ============================================
   * INSTRUCTOR QUOTE:
   * "So we could, for example, get the title like this the entered title could
   * be extracted like this. And of course that can be repeated for all the fields."
   *
   * INSTRUCTOR QUOTE:
   * "I will simply create an event data object here where I have my title which
   * is set equal to the extracted title like this where I then have my image
   * like this, where I then also have the date that was picked and submitted
   * like this and where I get my description like this."
   *
   * INSTRUCTOR QUOTE:
   * "To get we pass a string with the different identifiers of our input fields.
   * So that would be the values we chose as names for the input fields like
   * title or image in my case."
   *
   * The .get() method takes the 'name' attribute of the input field:
   * - <input name="title" />    → data.get('title')
   * - <input name="image" />    → data.get('image')
   * - <input name="date" />     → data.get('date')
   * - <textarea name="description" /> → data.get('description')
   */
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  /**
   * SENDING DATA TO THE BACKEND (Lesson 375):
   * =========================================
   * INSTRUCTOR QUOTE:
   * "But very often, you might wanna send a request with the good old fetch
   * function again. And here indeed, I wanna send a request to local host 8080.
   * So to my dummy backend API which listens on port 8080 and their slash events."
   *
   * INSTRUCTOR QUOTE:
   * "And I actually wanna send a post request which we can do like that, and
   * add some data to the request."
   *
   * INSTRUCTOR QUOTE:
   * "And here the data I wanna send is that data that was submitted with the form."
   *
   * INSTRUCTOR QUOTE:
   * "Now with that, it's this event data that should be sent to the backend,
   * and we have to convert it to JSON here by wrapping it with JSON stringify."
   *
   * INSTRUCTOR QUOTE:
   * "And I'll also add some extra headers where I set the content type to
   * application JSON so that the data is handled and extracted correctly on
   * the backend."
   *
   * REMEMBER: This is client-side code!
   * ===================================
   * INSTRUCTOR QUOTE:
   * "Now what's again important to understand and keep in mind is that we're
   * still on the client side here. Just as with the loader, this is code that
   * executes in the browser, this is not backend code."
   */
  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  /**
   * ============================================================================
   * LESSON 378: HANDLING VALIDATION ERRORS (STATUS 422)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "I wanna leverage the fact that on the back-end I'm sending back an error
   * response with status code 422 if I found some validation errors there."
   *
   * INSTRUCTOR QUOTE:
   * "On the front-end, in the new event page component file here, for example,
   * in this action where I do submit to the data, I wanna react to such
   * potential back-end validation errors."
   *
   * WHY RETURN INSTEAD OF THROW? (Lesson 378):
   * ==========================================
   * INSTRUCTOR QUOTE:
   * "And I wanna react by not showing my default error page so I don't want to
   * throw an error response, but instead I wanna show such validation errors
   * here right above this form because that makes more sense than showing an
   * error page because that would discard all the values entered by the user
   * and not really offer a good user experience."
   *
   * INSTRUCTOR QUOTE:
   * "Therefore, I wanna stay on this page, but I wanna output some data. And
   * you can easily do this in actions by returning the data you wanna output
   * above the forum or anywhere in your routes."
   *
   * | Action Response  | Behavior                                          |
   * |------------------|---------------------------------------------------|
   * | throw response   | Shows ErrorPage, discards user input              |
   * | return response  | Stays on page, data available via useActionData   |
   *
   * BACKEND VALIDATION STRUCTURE:
   * =============================
   * When validation fails, the backend returns status 422 with:
   * {
   *   message: "General validation error message",
   *   errors: {
   *     title: "Title validation error message",
   *     image: "Image validation error message",
   *     date: "Date validation error message",
   *     description: "Description validation error message"
   *   }
   * }
   */
  if (response.status === 422) {
    /**
     * RETURN RESPONSE FOR VALIDATION ERRORS (Lesson 378):
     * ===================================================
     * INSTRUCTOR QUOTE:
     * "For that, I will simply check if my response status code is equal to 422,
     * which is that validation status code I'm setting on the back-end in case
     * of validation errors. And if I have that status code, then I want to
     * return my response."
     *
     * INSTRUCTOR QUOTE:
     * "So I'm not returning and redirecting, and I'm not throwing an error
     * response, but I'm returning the response I got back from the back-end
     * if I have this 422 status code on the response."
     *
     * KEY DIFFERENCE:
     * ===============
     * - throw → Shows ErrorPage (bad UX for validation errors)
     * - return → Stays on form page, data accessible via useActionData
     *
     * Just like loaders can return responses that are automatically parsed
     * and made available via useLoaderData, actions can return responses
     * that are available via useActionData.
     */
    return response;
  }

  /**
   * ERROR HANDLING FOR OTHER ERRORS (Lesson 375):
   * =============================================
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
   * For non-422 errors (500, network errors, etc.), we still throw
   * to show the ErrorPage because these are unexpected server errors,
   * not user input validation errors.
   */
  if (!response.ok) {
    throw Response.json({ message: 'Could not save event.' }, { status: 500 });
  }

  /**
   * REDIRECTING AFTER SUCCESS (Lesson 375):
   * ======================================
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
   * WHY NOT useNavigate()?
   * ======================
   * - We're in an action function, not a component
   * - Hooks can only be used in components
   * - redirect() is the action equivalent of useNavigate()
   *
   * | Context      | Navigation method    |
   * |--------------|---------------------|
   * | Component    | useNavigate()       |
   * | Action       | redirect()          |
   * | Loader       | redirect()          |
   */
  return redirect('/events');
}

/**
 * ============================================================================
 * TESTING THE ACTION (Lesson 375)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With that, if we save everything we should be able to create a new event here.
 * For that I'm also picking some image here and enter this image address then
 * pick a date and add a description."
 *
 * INSTRUCTOR QUOTE:
 * "If you now click save, it looks like nothing happened. But actually, if you
 * click on events you should see that your event was added."
 *
 * BEFORE ADDING redirect():
 * ========================
 * - Form submits successfully
 * - Event is created in backend
 * - But user stays on the same page (confusing UX)
 *
 * INSTRUCTOR QUOTE:
 * "But why did nothing happen after clicking save? Well, because we didn't
 * specify what should happen thereafter."
 *
 * AFTER ADDING redirect():
 * ========================
 * - Form submits successfully
 * - Event is created in backend
 * - User is automatically redirected to /events
 * - New event appears in the list
 *
 * INSTRUCTOR QUOTE:
 * "So for example, here, if I add another event a never amazing event, now I'm
 * redirected. And that's how you can handle form submissions with help of
 * actions like this."
 *
 * ============================================================================
 * COMPLETE FLOW SUMMARY
 * ============================================================================
 *
 * 1. User visits /events/new
 * 2. NewEventPage renders with empty EventForm
 * 3. User fills in title, image, date, description
 * 4. User clicks "Save" (submit button)
 * 5. <Form method="post"> prevents browser default
 * 6. <Form> creates Request object with form data
 * 7. React Router calls action({ request, params })
 * 8. action() extracts data via request.formData()
 * 9. action() sends POST to http://localhost:8080/events
 * 10. If 422 validation error → return response → useActionData receives it
 * 11. If other error → throw json() → ErrorPage displays
 * 12. If success → return redirect('/events')
 * 13. User sees events list with new event included
 *
 * ============================================================================
 * LESSON 378: ACCESSING RETURNED ACTION DATA
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now what does returning a response in an action due though? Well, just as
 * we can return responses in loaders and then use the response data in our
 * components and pages, we can also use returned action data in our pages
 * and components."
 *
 * INSTRUCTOR QUOTE:
 * "It's just less common but it's very common for such validation error
 * responses where you don't wanna show an error page."
 *
 * HOW TO ACCESS RETURNED DATA:
 * ============================
 * In the EventForm component (or any component rendered by this route):
 *
 * import { useActionData } from 'react-router-dom';
 *
 * function EventForm() {
 *   const data = useActionData();  // Contains validation errors if any
 *   // data will be the parsed JSON from the 422 response
 * }
 *
 * INSTRUCTOR QUOTE:
 * "And if I return a response in an action this response is automatically
 * parsed by React router for me, just as it is the case for loaders."
 *
 * ============================================================================
 */
