/**
 * ============================================================================
 * EVENT DETAIL PAGE COMPONENT (Lessons 360, 372, 373 - Dynamic Params + Loader)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 360: Basic page with useParams to display event ID
 * Lesson 372: Added loader to fetch event details using params argument
 * Lesson 373: Changed to useRouteLoaderData with route ID (CURRENT)
 *
 * ============================================================================
 * LESSON 372: DYNAMIC ROUTE PARAMETERS IN LOADERS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Okay, let's proceed with this demo website here. We got our list of events.
 * Now if we click on an event, we might wanna load the data for that event,
 * and we wanna make sure that we go to a valid page to begin with."
 *
 * INSTRUCTOR QUOTE:
 * "On this event detail page here, I want to output the event item here.
 * A component which I predefined for you, and for which I already added some
 * styling."
 *
 * ============================================================================
 * WHY NOT USE useEffect? (Lesson 372)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, we could do this here in the component by using the params and using
 * useEffect to send the HTTP request, but I won't do this here. Instead, I
 * will add another loader function here and export it."
 *
 * Using loaders instead of useEffect:
 * - Data is fetched BEFORE component renders
 * - No loading state needed in component
 * - Cleaner separation of concerns
 * - Error handling via errorElement
 *
 * ============================================================================
 * ACCESSING ROUTE PARAMETERS IN LOADERS (Lesson 372)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "In the event detail page, we could use the use params hook, but we can't
 * use this in the loader. As mentioned before, hooks can't be accessed there."
 *
 * INSTRUCTOR QUOTE:
 * "But you still can get access to the route parameters that you need because
 * react router, which calls this loader function for you, actually passes an
 * object to this loader function when executing it for you."
 *
 * THE LOADER ARGUMENT OBJECT (Lesson 372):
 * ========================================
 * INSTRUCTOR QUOTE:
 * "And that object contains two important pieces of data: A request property,
 * which contains a request object, and a params property, which contains an
 * object with all your route parameters."
 *
 * loader({ request, params }) receives:
 * =====================================
 * | Property | Type    | Contains                                            |
 * |----------|---------|-----------------------------------------------------|
 * | request  | Request | Request object (URL, query params, etc.)            |
 * | params   | Object  | All route parameters (e.g., { eventId: 'e1' })      |
 *
 * REQUEST OBJECT USE CASES (Lesson 372):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "Now the request object here in a loader could be used to access the URL
 * to, for example, extract query parameters or anything like that."
 *
 * Examples of request usage:
 * - new URL(request.url).searchParams.get('sort')
 * - request.url to get the full URL
 *
 * PARAMS OBJECT USE CASES (Lesson 372):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "Instead it's the params object, which is interesting for us here. Because
 * with that, we can get access to all the route parameter values as we could
 * do it with help of use params."
 *
 * ============================================================================
 * IMPORTANT: REGISTERING THE LOADER (Lesson 372)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now we must register the loader in our route definitions. And that's super
 * easy to forget, but it's super important."
 *
 * INSTRUCTOR QUOTE:
 * "Just adding a loader function to your component file like this won't do
 * anything. React router will not look for loaders automatically. Instead,
 * you have to register it here when defining your routes."
 *
 * See App.jsx for the loader registration:
 * { path: ':eventId', element: <EventDetailPage />, loader: eventDetailLoader }
 *
 * ============================================================================
 * ROUTE CONFIGURATION
 * ============================================================================
 *
 * This page is loaded by the dynamic event route:
 *
 * {
 *   path: 'events',
 *   element: <EventsRootLayout />,
 *   children: [
 *     { index: true, element: <EventsPage />, loader: eventsLoader },
 *     { path: ':eventId', element: <EventDetailPage />, loader: eventDetailLoader },
 *     ...
 *   ]
 * }
 *
 * URL Examples:
 * - http://localhost:3000/events/e1 → params.eventId = "e1"
 * - http://localhost:3000/events/e2 → params.eventId = "e2"
 *
 * ============================================================================
 */
/**
 * ============================================================================
 * LESSON 373: useRouteLoaderData vs useLoaderData
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And with such an ID defined, we can use a special hook called use route
 * loader data to get access to a higher level loader from a child route."
 *
 * CHANGE FROM Lesson 372:
 * =======================
 * Before: import { useLoaderData, json } from 'react-router-dom';
 * After:  import { useRouteLoaderData, json } from 'react-router-dom';
 *
 * WHY THE CHANGE:
 * ===============
 * - useLoaderData: Gets data from the CURRENT route's loader
 * - useRouteLoaderData: Gets data from a SPECIFIC route's loader (by ID)
 *
 * Since the loader is now on a parent wrapper route (with id: 'event-detail'),
 * we need useRouteLoaderData to access it from child routes.
 *
 * INSTRUCTOR QUOTE:
 * "We then can use this ID in use route loader data to tell React router that
 * we wanna use the data from the loader that belongs to a route with this
 * specific ID."
 *
 * ============================================================================
 * LESSON 376: ADDING redirect FOR ACTION FUNCTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now we should also redirect after successfully deleting. And that should
 * be a redirect to slash events. So to the starting page which shows all
 * events."
 *
 * The redirect function is used after successful deletion to navigate
 * the user away from the deleted event's page.
 */
import { useRouteLoaderData, redirect } from 'react-router-dom';

import EventItem from '../components/EventItem';

/**
 * EVENT DETAIL PAGE COMPONENT (Lesson 372):
 * =========================================
 * Displays details for a specific event using data from the loader.
 *
 * INSTRUCTOR QUOTE:
 * "So in event detail, instead of showing this dummy content here, we want
 * to output the event item component."
 *
 * INSTRUCTOR QUOTE:
 * "And here we must set the event prop and pass the event data for the event
 * for which we wanna view the details to this event prop."
 */
function EventDetailPage() {
  /**
   * ============================================================================
   * useRouteLoaderData HOOK (Lesson 373)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And with such an ID defined, we can use a special hook called use route
   * loader data to get access to a higher level loader from a child route."
   *
   * INSTRUCTOR QUOTE:
   * "We then can use this ID in use route loader data to tell React router
   * that we wanna use the data from the loader that belongs to a route with
   * this specific ID."
   *
   * ============================================================================
   * CHANGE FROM LESSON 372:
   * ============================================================================
   *
   * BEFORE (Lesson 372 - loader on same route):
   * ===========================================
   * const data = useLoaderData();
   *
   * AFTER (Lesson 373 - loader on parent route with ID):
   * ====================================================
   * const data = useRouteLoaderData('event-detail');
   *
   * ============================================================================
   * WHY THIS CHANGE? (Lesson 373)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "So I need access to this loader here, not just in the event detail page,
   * but also in the edit event page because the edit event page should also
   * display the event data, but we got one loader which we wanna use for
   * both pages."
   *
   * PROBLEM: Both EventDetailPage and EditEventPage need the same event data
   * SOLUTION: Move loader to a parent route with an ID, then access via ID
   *
   * ROUTE STRUCTURE:
   * ================
   * {
   *   path: ':eventId',
   *   id: 'event-detail',         // ← The ID we pass to useRouteLoaderData
   *   loader: eventDetailLoader,  // ← The shared loader
   *   children: [
   *     { index: true, element: <EventDetailPage /> },  // ← We are here
   *     { path: 'edit', element: <EditEventPage /> },
   *   ]
   * }
   *
   * ============================================================================
   * HOW useRouteLoaderData DIFFERS FROM useLoaderData (Lesson 373)
   * ============================================================================
   *
   * | Hook              | Parameter | Gets data from                          |
   * |-------------------|-----------|----------------------------------------|
   * | useLoaderData     | None      | Current route's loader                  |
   * | useRouteLoaderData| Route ID  | Any route's loader (identified by ID)  |
   *
   * useRouteLoaderData is more flexible because:
   * - Can access parent route loaders
   * - Can be used by multiple child routes to share data
   * - Requires the route to have an 'id' property defined
   */
  const data = useRouteLoaderData('event-detail');

  /**
   * EXTRACTING EVENT DATA (Lesson 372):
   * ===================================
   * INSTRUCTOR QUOTE:
   * "And with that, we can then use this data object to access the event
   * property, because I know that my backend API will include the actual
   * event data for the loaded event in an event property on that overall
   * response data object."
   *
   * Backend response structure:
   * {
   *   event: {
   *     id: "e1",
   *     title: "Event Title",
   *     image: "...",
   *     date: "2024-01-01",
   *     description: "..."
   *   }
   * }
   *
   * INSTRUCTOR QUOTE:
   * "So with data dot event, I access that event data, and I pass that as
   * a value to the event prop on event item."
   */
  return <EventItem event={data.event} />;
}

export default EventDetailPage;

/**
 * ============================================================================
 * LESSON 372: LOADER FUNCTION FOR EVENT DETAILS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Instead, I will add another loader function here and export it. Now this
 * time, a loader function for my event details."
 *
 * INSTRUCTOR QUOTE:
 * "So I export this, I will convert it to an async function because I want
 * to use the await keyword in here."
 *
 * ============================================================================
 * THE LOADER ARGUMENT OBJECT
 * ============================================================================
 *
 * React Router passes an object with { request, params } to every loader:
 *
 * INSTRUCTOR QUOTE:
 * "But you still can get access to the route parameters that you need because
 * react router, which calls this loader function for you, actually passes an
 * object to this loader function when executing it for you."
 *
 * DESTRUCTURING THE PARAMS (Lesson 372):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "So here, we have the event ID route parameter. We have this dynamic segment.
 * Then from here, we can access params dot event ID."
 *
 * For route path: ':eventId'
 * And URL: /events/e1
 *
 * { params } will contain: { eventId: 'e1' }
 *
 * ============================================================================
 */
export async function loader({ request, params }) {
  /**
   * ACCESSING ROUTE PARAMETERS (Lesson 372):
   * ========================================
   * INSTRUCTOR QUOTE:
   * "So here, we have the event ID route parameter. We have this dynamic
   * segment. Then from here, we can access params dot event ID."
   *
   * INSTRUCTOR QUOTE:
   * "And that gives us this ID, which we wanna add here at the end of this
   * URL. To send a request to local host 8080 slash events slash the ID of
   * the event for which we wanna fetch the details."
   *
   * The params object mirrors the dynamic segments in the route path:
   * - Route: { path: ':eventId', ... }
   * - params: { eventId: 'e1' }
   *
   * IMPORTANT: The property name must match the route parameter name!
   */
  const id = params.eventId;

  /**
   * FETCH EVENT DETAILS (Lesson 372):
   * =================================
   * INSTRUCTOR QUOTE:
   * "And now to fetch the data for a single event, we can use the built in
   * fetch function and send a request to our dummy backend API server, which
   * we can reach under HTTP, local host 8080, and then slash events. And then
   * the ID of the event for which we wanna load data."
   *
   * API endpoint: GET /events/:id
   * Returns: { event: { id, title, image, date, description } }
   */
  const response = await fetch('http://localhost:8080/events/' + id);

  /**
   * ERROR HANDLING (Lesson 372):
   * ============================
   * INSTRUCTOR QUOTE:
   * "Here, however, I will, first of all, await this because I still want
   * to check if not response okay. So if we have a 400-ish or 500-ish error
   * code. And only if that's not the case, so if we have a successful response,
   * only in that case I wanna return the response."
   *
   * INSTRUCTOR QUOTE:
   * "Otherwise, just as before, I wanna throw an error by using the builtin
   * JSON function, which is provided by react router."
   *
   * INSTRUCTOR QUOTE:
   * "Now, you could have more granular error handling, but that's good enough
   * for this demo."
   */
  if (!response.ok) {
    /**
     * THROW ERROR RESPONSE (Lesson 372):
     * ==================================
     * INSTRUCTOR QUOTE:
     * "And I will throw an error response where I say, 'Could not fetch
     * details for selected event.' And I will add this metadata object
     * here and set the status to 500 again."
     *
     * Using json() helper from Lesson 371:
     * - Automatically stringifies the data
     * - Automatically parses when reading in ErrorPage
     * - Status code enables differentiated error handling
     */
    throw Response.json(
      { message: 'Could not fetch details for selected event.' },
      { status: 500 }
    );
  }

  /**
   * RETURN RESPONSE (Lesson 372):
   * =============================
   * INSTRUCTOR QUOTE:
   * "We then get a response by awaiting this fetch call here. And now we
   * could again return this response here as we learned before. We can
   * return such a response object in our loader."
   *
   * INSTRUCTOR QUOTE:
   * "And if that's all we want to do, we could, therefore, even return it
   * like this. And, as mentioned, react router would automatically wait
   * for the promise and give us access to the data to which it resolves."
   *
   * React Router will:
   * 1. Detect this is a Response object
   * 2. Automatically call .json() to extract data
   * 3. Provide that data via useLoaderData()
   */
  return response;
}

/**
 * ============================================================================
 * SUMMARY: LOADER vs useEffect + useParams (Lesson 372)
 * ============================================================================
 *
 * Traditional approach (useEffect + useParams):
 * ============================================
 * function EventDetailPage() {
 *   const { eventId } = useParams();
 *   const [event, setEvent] = useState(null);
 *   const [loading, setLoading] = useState(true);
 *
 *   useEffect(() => {
 *     fetch(`http://localhost:8080/events/${eventId}`)
 *       .then(res => res.json())
 *       .then(data => {
 *         setEvent(data.event);
 *         setLoading(false);
 *       });
 *   }, [eventId]);
 *
 *   if (loading) return <p>Loading...</p>;
 *   return <EventItem event={event} />;
 * }
 *
 * Loader approach (React Router):
 * ===============================
 * function EventDetailPage() {
 *   const data = useLoaderData();
 *   return <EventItem event={data.event} />;
 * }
 *
 * export async function loader({ params }) {
 *   const response = await fetch(`http://localhost:8080/events/${params.eventId}`);
 *   return response;
 * }
 *
 * BENEFITS OF LOADER APPROACH:
 * ============================
 * 1. Data fetched BEFORE render (no loading state in component)
 * 2. Cleaner component code (just uses data)
 * 3. Error handling via errorElement (no error state in component)
 * 4. Separation of concerns (fetching logic outside component)
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * LESSON 376: ACTION FUNCTION FOR DELETING EVENTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, we now also need an action though. And that action should be triggered
 * from inside the event item component when that delete button is clicked."
 *
 * INSTRUCTOR QUOTE:
 * "We can add an action here in the event detail page. You can export an async
 * function, which I'll name action."
 *
 * ============================================================================
 * WHY ACTION IS IN THIS FILE (Lesson 376):
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Because this action will ultimately be registered on the event detail
 * route, on that wrapper route where we also have the loader. So where we
 * also need this event ID."
 *
 * The action is placed here because:
 * 1. It needs access to params.eventId (same as the loader)
 * 2. It will be registered on the 'event-detail' wrapper route
 * 3. Keeps loader and action for the same resource together
 *
 * ============================================================================
 * ACCESSING THE HTTP METHOD (Lesson 376):
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, of course, you could also define the method in another way. For
 * example, by getting the method that was set on the form. You can get
 * this method from the request object by accessing request.method."
 *
 * INSTRUCTOR QUOTE:
 * "And that can be helpful if you have one action that handles different
 * kinds of requests. For example, put requests and delete requests on the
 * same route."
 *
 * WHY USE request.method DYNAMICALLY:
 * ===================================
 * | Approach               | When to Use                                |
 * |------------------------|--------------------------------------------|
 * | Hardcoded method       | Action handles only one type of request    |
 * | request.method         | Action handles multiple request types      |
 *
 * INSTRUCTOR QUOTE:
 * "So I'll actually use request.method here to get the method dynamically
 * from that submit function call or from a form."
 *
 * ============================================================================
 */
export async function action({ request, params }) {
  /**
   * GET EVENT ID FROM ROUTE PARAMETERS (Lesson 376):
   * ================================================
   * Same pattern as in the loader - extract the eventId from params.
   * This tells the backend which event to delete.
   */
  const eventId = params.eventId;

  /**
   * ============================================================================
   * SEND DELETE REQUEST TO BACKEND (Lesson 376):
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And then down here, we send our request, we send a fetch request to
   * HTTP localhost 8080 events, and then event ID which we get from params
   * event ID."
   *
   * INSTRUCTOR QUOTE:
   * "And of course we configure this request by setting the method to delete."
   *
   * ============================================================================
   * USING request.method DYNAMICALLY (Lesson 376):
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now, of course, you could also define the method in another way. For
   * example, by getting the method that was set on the form. You can get
   * this method from the request object by accessing request.method."
   *
   * INSTRUCTOR QUOTE:
   * "So I'll actually use request.method here to get the method dynamically
   * from that submit function call or from a form."
   *
   * HOW request.method WORKS:
   * =========================
   * When submit(null, { method: 'delete' }) is called in EventItem.jsx,
   * React Router creates a Request object with that method.
   * Here, request.method will be 'DELETE' (uppercase).
   *
   * This pattern is useful when:
   * - One action handles multiple HTTP methods (PUT, DELETE, PATCH)
   * - You want flexibility in how the action is triggered
   * - You want the action to be reusable across different forms
   */
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  });

  /**
   * ERROR HANDLING (Lesson 376):
   * ============================
   * INSTRUCTOR QUOTE:
   * "We should handle potential errors. So if not response okay, we can throw
   * a new error response."
   *
   * Using Response.json() (native browser API) instead of json() helper
   * due to React Router v7 changes.
   */
  if (!response.ok) {
    throw Response.json(
      { message: 'Could not delete event.' },
      { status: 500 }
    );
  }

  /**
   * REDIRECT AFTER SUCCESSFUL DELETION (Lesson 376):
   * ================================================
   * INSTRUCTOR QUOTE:
   * "Now we should also redirect after successfully deleting. And that should
   * be a redirect to slash events. So to the starting page which shows all
   * events."
   *
   * WHY REDIRECT TO /events:
   * ========================
   * - The current event no longer exists after deletion
   * - User needs to be taken to a valid page
   * - /events shows the updated list without the deleted event
   *
   * INSTRUCTOR QUOTE:
   * "And therefore we don't need to return anything. Instead, we just return
   * redirect to slash events."
   */
  return redirect('/events');
}

/**
 * ============================================================================
 * LESSON 376: REGISTERING THE ACTION IN App.jsx
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now we gotta register this action here in App JS. And in App JS, I'll
 * import this action here from event detail."
 *
 * INSTRUCTOR QUOTE:
 * "I'll give it an alias of delete event action. And this must be added to
 * this wrapper route because that's the route where we can get access to
 * this event ID in params."
 *
 * In App.jsx, the action is registered like this:
 *
 * import EventDetailPage, {
 *   loader as eventDetailLoader,
 *   action as deleteEventAction
 * } from './pages/EventDetail';
 *
 * {
 *   path: ':eventId',
 *   id: 'event-detail',
 *   loader: eventDetailLoader,
 *   action: deleteEventAction,  // ← Added in Lesson 376
 *   children: [...]
 * }
 *
 * ============================================================================
 * COMPLETE FLOW FOR DELETE OPERATION (Lesson 376):
 * ============================================================================
 *
 * 1. User clicks "Delete" button in EventItem component
 * 2. startDeleteHandler() is called
 * 3. window.confirm() shows confirmation dialog
 * 4. If user confirms, submit(null, { method: 'delete' }) is called
 * 5. React Router finds the action on the current route (event-detail)
 * 6. action() function is executed with request and params
 * 7. DELETE request is sent to backend: DELETE /events/:eventId
 * 8. If successful, redirect('/events') navigates user to events list
 * 9. Events list reloads showing the event has been deleted
 *
 * ============================================================================
 */
