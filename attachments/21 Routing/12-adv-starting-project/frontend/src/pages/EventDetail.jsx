/**
 * ============================================================================
 * EVENT DETAIL PAGE COMPONENT (Lessons 360, 372, 373, 383 - Params + Deferred)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 360: Basic page with useParams to display event ID
 * Lesson 372: Added loader to fetch event details using params argument
 * Lesson 373: Changed to useRouteLoaderData with route ID
 * Lesson 383: Added defer with multiple requests of different speeds (CURRENT)
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
 *
 * ============================================================================
 * LESSON 383: IMPORTS FOR DEFERRED LOADING WITH MULTIPLE REQUESTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now we also need suspense, and every await block must be wrapped with its
 * own suspense component. Otherwise, suspense will wait for both awaits to
 * complete before showing anything, which is not what we want."
 *
 * NEW IMPORTS FOR LESSON 383:
 * ===========================
 * - Await: Component to wait for deferred promises
 * - Suspense: Component to show fallback while waiting (from React)
 *
 * NOTE: In React Router v6, you would also import defer:
 * import { defer } from 'react-router-dom';
 *
 * But in React Router v7, defer is no longer needed - just return
 * an object with promises directly (see Lesson 382).
 */
import { useRouteLoaderData, redirect, Await } from 'react-router-dom';
import { Suspense } from 'react';

import EventItem from '../components/EventItem';
/**
 * ============================================================================
 * LESSON 383: IMPORTING EventsList FOR DEFERRED LOADING DEMO
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Besides the event item, I also wanna output my events list here. So
 * therefore, we of course must fetch the events on this page here as well."
 *
 * We import EventsList to demonstrate:
 * - Loading multiple data sources with different speeds
 * - Event details (fast) + All events list (slow with 2s backend timeout)
 * - Progressive loading with separate Suspense boundaries
 */
import EventsList from '../components/EventsList';

/**
 * ============================================================================
 * EVENT DETAIL PAGE COMPONENT (Lessons 372, 373, 383)
 * ============================================================================
 *
 * LESSON 383 UPDATE - DEFERRED LOADING WITH MULTIPLE REQUESTS:
 * ============================================================
 * INSTRUCTOR QUOTE:
 * "So, how does this defer feature shine if you have multiple requests with
 * different speeds? Well, for that, let's go to the event detail page."
 *
 * INSTRUCTOR QUOTE:
 * "Besides the event item, I also wanna output my events list here. So
 * therefore, we of course must fetch the events on this page here as well."
 *
 * The component now displays:
 * 1. EventItem - Single event details (fast to load)
 * 2. EventsList - All events list (slow due to 2s backend timeout)
 *
 * Each has its own Suspense/Await block for independent loading.
 */
function EventDetailPage() {
  /**
   * ============================================================================
   * useRouteLoaderData WITH DEFERRED DATA (Lesson 383)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now with that done, we're using useRouteLoaderData here, but that works
   * with defer just as useLoaderData did."
   *
   * INSTRUCTOR QUOTE:
   * "And we know that here we'll get an object that has an event and an
   * events key. These are these two deferred requests so to say."
   *
   * The data object now contains:
   * - event: Promise for single event details (awaited - blocks navigation)
   * - events: Promise for all events (deferred - loads after navigation)
   */
  const { event, events } = useRouteLoaderData('event-detail');

  /**
   * ============================================================================
   * LESSON 383: TWO SEPARATE SUSPENSE BOUNDARIES
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now we also need suspense, and every await block must be wrapped with its
   * own suspense component. Otherwise, suspense will wait for both awaits to
   * complete before showing anything, which is not what we want."
   *
   * WHY SEPARATE SUSPENSE BLOCKS ARE CRITICAL:
   * ==========================================
   * If we wrapped BOTH Await components in ONE Suspense:
   * - Suspense would wait for BOTH promises to resolve
   * - Nothing would show until the slow request (events) completes
   * - We'd lose the benefit of deferred loading!
   *
   * With SEPARATE Suspense blocks:
   * - Each Await can resolve independently
   * - Fast data (event) shows immediately
   * - Slow data (events) shows "Loading..." until ready
   *
   * VISUAL COMPARISON:
   * ==================
   * ONE Suspense (BAD):      TWO Suspenses (GOOD):
   * ─────────────────────    ─────────────────────
   * [        Loading...  ]   [Event Details Here ]
   * [                    ]   [      Loading...   ]
   * (waits 2s for both)      (shows event, waits for list)
   */
  return (
    <>
      {/**
       * FIRST SUSPENSE BLOCK - EVENT DETAILS (Lesson 383):
       * ==================================================
       * INSTRUCTOR QUOTE:
       * "So here I pass event to the resolve prop... where I then wanna output
       * the event item once that data is there."
       *
       * INSTRUCTOR QUOTE:
       * "So here I pass loadedEvent to the event prop, like this."
       *
       * WHY EVENT DETAILS LOAD INSTANTLY:
       * =================================
       * In the loader, we use `await loadEvent(id)` which means:
       * - Navigation waits until event details are loaded
       * - By the time this component renders, event data is ready
       * - User never sees "Loading..." for event details
       *
       * INSTRUCTOR QUOTE:
       * "If you have an async loader with the async function, you can simply
       * add the await keyword here, and that will make sure that defer waits
       * for this data to be loaded before loading this page component at all."
       */}
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      {/**
       * SECOND SUSPENSE BLOCK - ALL EVENTS LIST (Lesson 383):
       * =====================================================
       * INSTRUCTOR QUOTE:
       * "Then I pass events plural to the resolve prop."
       *
       * INSTRUCTOR QUOTE:
       * "Then here, for the second await block, I got my loaded events, and I
       * will output those here."
       *
       * WHY EVENTS LIST SHOWS "LOADING..." INITIALLY:
       * =============================================
       * In the loader, we DON'T await loadEvents():
       * - Navigation happens before events list is loaded
       * - Promise is still pending when component renders
       * - Suspense shows fallback until promise resolves
       * - After 2 seconds (backend delay), list appears
       *
       * INSTRUCTOR QUOTE:
       * "If I go to my events, and I click on a single event, the details are
       * there immediately, and the other list of events is still loading."
       */}
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

/**
 * ============================================================================
 * LESSON 383: HELPER FUNCTION TO LOAD ALL EVENTS (COPIED FROM Events.jsx)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "To do that, I'll quickly copy that load events function from events.js."
 *
 * INSTRUCTOR QUOTE:
 * "We could also store it in another shared file, and export it, but here
 * I'll quickly copy it, and paste it here above my loader in the
 * EventDetail.js file."
 *
 * WHY COPY INSTEAD OF IMPORT:
 * ===========================
 * The instructor acknowledges this could be refactored:
 * - Option 1: Copy the function (what we're doing for simplicity)
 * - Option 2: Move to a shared utility file and export/import
 *
 * For a production app, Option 2 (shared file) would be better to avoid
 * code duplication. But for learning purposes, copying is clearer.
 *
 * THIS FUNCTION DEMONSTRATES:
 * ===========================
 * - The "slow" request (has 2s delay on backend)
 * - Will be DEFERRED (not awaited) in the loader
 * - Shows "Loading..." in UI while fetching
 */
async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw Response.json(
      { message: 'Could not fetch events.' },
      { status: 500 }
    );
  }

  const resData = await response.json();
  return resData.events;
}

/**
 * ============================================================================
 * LESSON 383: HELPER FUNCTION TO LOAD SINGLE EVENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "I will also add another function in this EventDetail.js file, which I'll
 * name loadEvent, where I expect to get the ID of an event, and I'll put that
 * code here, which is responsible for loading a single event into this
 * loadEvent helper function here."
 *
 * INSTRUCTOR QUOTE:
 * "Now, just as before, I will also change this return value here of loadEvent
 * to manually extract the data. So just as in load events, I'll use the JSON
 * method, and await it, and then return resData.event here in the end."
 *
 * WHY A SEPARATE FUNCTION:
 * ========================
 * Just like loadEvents in Events.jsx, we need a function that RETURNS A PROMISE
 * so we can control whether to await it or defer it in the loader.
 *
 * THIS FUNCTION DEMONSTRATES:
 * ===========================
 * - The "fast" request (no artificial delay on backend)
 * - Will be AWAITED in the loader (blocks navigation until loaded)
 * - User never sees "Loading..." for event details
 *
 * @param {string} id - The event ID to load
 */
async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);

  if (!response.ok) {
    throw Response.json(
      { message: 'Could not fetch details for selected event.' },
      { status: 500 }
    );
  }

  /**
   * MANUAL DATA EXTRACTION (Lesson 383):
   * ====================================
   * INSTRUCTOR QUOTE:
   * "Now, just as before, I will also change this return value here of loadEvent
   * to manually extract the data. So just as in load events, I'll use the JSON
   * method, and await it, and then return resData.event here in the end."
   *
   * WHY NOT RETURN response DIRECTLY:
   * =================================
   * When using defer, we need to return the actual data (not a Response).
   * The Await component expects resolved data, not a Response object.
   *
   * Returns: { id, title, image, date, description }
   */
  const resData = await response.json();
  return resData.event;
}

/**
 * ============================================================================
 * LESSON 383: LOADER WITH DEFERRED AND AWAITED DATA
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And I will defer here because we know that load events will take a while
 * because we have this two second timeout on the backend, whereas load event
 * should be rather fast."
 *
 * INSTRUCTOR QUOTE:
 * "And I wanna show you how defer can help you load some data whilst still
 * waiting for other data."
 *
 * ============================================================================
 * KEY CONCEPT: CONTROLLING WHAT TO AWAIT vs DEFER
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So await is your lever, your switch for controlling which data should be
 * awaited before moving to this page, and which data should be deferred, so
 * where you wanna load the data after moving to the page."
 *
 * | Data Type    | Await? | Behavior                                     |
 * |--------------|--------|----------------------------------------------|
 * | event        | YES    | Navigation waits, data ready on render       |
 * | events       | NO     | Navigation proceeds, shows loading fallback  |
 *
 * INSTRUCTOR QUOTE:
 * "And with this setup here, we would wait for the event details to be loaded
 * before loading this page component at all, but we would load the list of
 * events after rendering this page."
 *
 * ============================================================================
 * REACT ROUTER v6 vs v7 SYNTAX
 * ============================================================================
 *
 * v6 (what instructor shows):
 * ---------------------------
 * import { defer } from 'react-router-dom';
 *
 * export async function loader({ params }) {
 *   const id = params.eventId;
 *   return defer({
 *     event: await loadEvent(id),  // Awaited - blocks navigation
 *     events: loadEvents(),        // Not awaited - deferred
 *   });
 * }
 *
 * v7 (what we use - defer() not needed):
 * --------------------------------------
 * export async function loader({ params }) {
 *   const id = params.eventId;
 *   return {
 *     event: await loadEvent(id),  // Awaited - blocks navigation
 *     events: loadEvents(),        // Not awaited - deferred
 *   };
 * }
 *
 * The behavior is IDENTICAL - v7 just simplified the syntax.
 */
export async function loader({ request, params }) {
  /**
   * ACCESSING ROUTE PARAMETERS (Lesson 372):
   * ========================================
   * INSTRUCTOR QUOTE:
   * "So here, we have the event ID route parameter. We have this dynamic
   * segment. Then from here, we can access params dot event ID."
   */
  const id = params.eventId;

  /**
   * ============================================================================
   * LESSON 383: RETURNING DEFERRED DATA WITH MIXED AWAIT/NO-AWAIT
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "So here, when calling defer, I pass an object to it, and I have my single
   * event where I will call loadEvent and pass this ID, which I'm extracting
   * from my params, to load event, and I have events where I call loadEvents,
   * like that."
   *
   * INSTRUCTOR QUOTE:
   * "So now this is looking similar to what we had before in the events.js
   * file, but we have two requests that are bundled in this defer object."
   *
   * THE CRITICAL DIFFERENCE - await vs no-await:
   * =============================================
   * - event: await loadEvent(id)  → AWAITED (navigation waits for this)
   * - events: loadEvents()        → NOT awaited (loads after navigation)
   *
   * INSTRUCTOR QUOTE:
   * "If you have an async loader with the async function, you can simply add
   * the await keyword here, and that will make sure that defer waits for this
   * data to be loaded before loading this page component at all, so before
   * moving and navigating to this page component, but will load this data,
   * the loadEvents data, after the page was loaded."
   *
   * WHY THIS PATTERN IS POWERFUL:
   * =============================
   * - Critical data (event details) blocks navigation = always visible
   * - Non-critical data (events list) is deferred = faster navigation
   * - User sees page immediately with main content
   * - Secondary content loads progressively
   *
   * INSTRUCTOR QUOTE:
   * "Here, you won't see a big difference, but it will actually ensure that
   * we never see a loading text here for the event details."
   *
   * INSTRUCTOR QUOTE:
   * "And that's how you can use defer to control when which data is loaded."
   */
  return {
    event: await loadEvent(id),
    events: loadEvents(),
  };
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
