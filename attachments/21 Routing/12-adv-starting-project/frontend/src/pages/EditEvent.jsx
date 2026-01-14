/**
 * ============================================================================
 * EDIT EVENT PAGE COMPONENT (Lessons 360, 373, 379 - Shared Loader + Action)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 360: Basic page with placeholder content (Task 1 solution)
 * Lesson 373: Added EventForm with useRouteLoaderData for prepopulation
 * Lesson 379: Added method="patch" prop for shared action (CURRENT)
 *
 * TASK 1 SOLUTION (Lesson 360):
 * =============================
 * INSTRUCTOR QUOTE:
 * "And then also my EventsPage, EventDetailPage, NewEventPage, and EditEventPage."
 *
 * INSTRUCTOR QUOTE:
 * "And then here, I got the EditEventPage, And of course, that's then also
 * replaced in all these places."
 *
 * ============================================================================
 * LESSON 373: SHARING LOADER DATA BETWEEN ROUTES
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So I need access to this loader here, not just in the event detail page,
 * but also in the edit event page because the edit event page should also
 * display the event data, but we got one loader which we wanna use for
 * both pages."
 *
 * INSTRUCTOR QUOTE:
 * "So in the Edit Event page, I wanna output my event form component."
 *
 * ============================================================================
 * ACCESSING PARENT LOADER DATA WITH useRouteLoaderData (Lesson 373)
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
 * ROUTE STRUCTURE (Lesson 373)
 * ============================================================================
 *
 * {
 *   path: ':eventId',
 *   id: 'event-detail',           // ← The ID we use in useRouteLoaderData
 *   loader: eventDetailLoader,    // ← The shared loader
 *   children: [
 *     { index: true, element: <EventDetailPage /> },
 *     { path: 'edit', element: <EditEventPage /> },  // ← This page
 *   ]
 * }
 *
 * URL: http://localhost:3000/events/e1/edit
 *
 * ============================================================================
 * PASSING EVENT DATA TO EVENTFORM (Lesson 373)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "But now in the event form, we need to get access to the event data to
 * prepopulate these input fields here."
 *
 * INSTRUCTOR QUOTE:
 * "And for that, we simply have to pass the event as props to event form."
 *
 * Usage: <EventForm event={data.event} />
 *
 * The event prop is used by EventForm to set defaultValue on inputs.
 *
 * ============================================================================
 */
import { useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';

/**
 * EDIT EVENT PAGE COMPONENT (Lesson 373):
 * =======================================
 * Form page for editing an existing event.
 *
 * INSTRUCTOR QUOTE:
 * "So in the Edit Event page, I wanna output my event form component."
 *
 * This page:
 * 1. Uses useRouteLoaderData to get event data from parent route's loader
 * 2. Passes the event data to EventForm for prepopulation
 * 3. No separate data fetching needed - shares loader with EventDetailPage
 *
 * BENEFITS OF SHARED LOADER (Lesson 373):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "So I need access to this loader here, not just in the event detail page,
 * but also in the edit event page because the edit event page should also
 * display the event data, but we got one loader which we wanna use for
 * both pages."
 *
 * - Single source of truth for event data
 * - No duplicate fetch requests
 * - Data is already loaded when navigating from detail to edit
 */
function EditEventPage() {
  /**
   * useRouteLoaderData WITH ROUTE ID (Lesson 373):
   * ==============================================
   * INSTRUCTOR QUOTE:
   * "And with such an ID defined, we can use a special hook called use route
   * loader data to get access to a higher level loader from a child route."
   *
   * INSTRUCTOR QUOTE:
   * "We then can use this ID in use route loader data to tell React router
   * that we wanna use the data from the loader that belongs to a route with
   * this specific ID."
   *
   * The 'event-detail' ID matches the id property on the parent route.
   * This returns the same data that EventDetailPage receives.
   *
   * Data structure from loader:
   * {
   *   event: {
   *     id: "e1",
   *     title: "Event Title",
   *     image: "https://...",
   *     date: "2024-01-01",
   *     description: "..."
   *   }
   * }
   */
  const data = useRouteLoaderData('event-detail');

  /**
   * RENDERING EVENTFORM WITH EVENT DATA (Lessons 373, 379):
   * =======================================================
   * INSTRUCTOR QUOTE (Lesson 373):
   * "And for that, we simply have to pass the event as props to event form."
   *
   * INSTRUCTOR QUOTE (Lesson 373):
   * "So in the Edit Event page, I wanna output my event form component."
   *
   * ================================================================
   * LESSON 379: PASSING method="patch" FOR EDIT
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "In NewEvent, I could set method to post and in EditEvent, I could set it
   * to patch."
   *
   * INSTRUCTOR QUOTE:
   * "We can use post for creating new events and patch for editing an event."
   *
   * HOW method="patch" WORKS:
   * =========================
   * 1. EditEventPage passes method="patch" to EventForm
   * 2. EventForm forwards it: <Form method="patch">
   * 3. When submitted, React Router creates Request with method='PATCH'
   * 4. Action checks request.method === 'PATCH'
   * 5. Action builds URL with params.eventId: http://localhost:8080/events/{eventId}
   * 6. PATCH request updates the existing event
   *
   * WHY PATCH NOT PUT? (HTTP Semantics):
   * ====================================
   * - PATCH: Partial update (only changes specified fields)
   * - PUT: Full replacement (replaces entire resource)
   *
   * In this case, PATCH is appropriate because we're updating
   * specific fields of an existing event.
   *
   * PROPS PASSED TO EventForm:
   * ==========================
   * | Prop   | Value          | Purpose                               |
   * |--------|----------------|---------------------------------------|
   * | method | "patch"        | Sets HTTP method to PATCH for updates |
   * | event  | data.event     | Prepopulates form with existing data  |
   */
  return <EventForm method="patch" event={data.event} />;
}

export default EditEventPage;

/**
 * ============================================================================
 * LESSON 379: HOW THIS PAGE USES THE SHARED ACTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "We use the same action on different routes but this action is written such
 * that it will do slightly different things depending on the method it gets."
 *
 * COMPLETE EDIT FLOW:
 * ===================
 * 1. User navigates to /events/e1/edit
 * 2. Parent loader (on :eventId wrapper route) fetches event data
 * 3. EditEventPage uses useRouteLoaderData('event-detail') to get data
 * 4. Renders: <EventForm method="patch" event={data.event} />
 * 5. EventForm displays: <Form method="patch"> with prepopulated fields
 * 6. User edits fields and clicks Save
 * 7. React Router calls the action registered on the edit route
 * 8. Action (from EventForm.jsx) receives { request, params }
 * 9. request.method === 'PATCH' (uppercase!)
 * 10. params.eventId === 'e1' (from URL)
 * 11. Action builds URL: http://localhost:8080/events/e1
 * 12. PATCH request updates the event
 * 13. redirect('/events') shows updated events list
 *
 * INSTRUCTOR QUOTE:
 * "The URL should differ though, because for editing an event we must target
 * events/eventId. And for creating, we just target events."
 *
 * ============================================================================
 */
