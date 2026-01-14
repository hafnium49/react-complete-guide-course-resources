/**
 * ============================================================================
 * EDIT EVENT PAGE COMPONENT (Lessons 360, 373 - Task 1 + Shared Loader)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 360: Basic page with placeholder content (Task 1 solution)
 * Lesson 373: Added EventForm with useRouteLoaderData for prepopulation (CURRENT)
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
   * RENDERING EVENTFORM WITH EVENT DATA (Lesson 373):
   * =================================================
   * INSTRUCTOR QUOTE:
   * "And for that, we simply have to pass the event as props to event form."
   *
   * INSTRUCTOR QUOTE:
   * "So in the Edit Event page, I wanna output my event form component."
   *
   * The event prop allows EventForm to:
   * - Prepopulate input fields with existing values
   * - Know whether this is an edit operation (event exists) or create (event is undefined)
   */
  return <EventForm event={data.event} />;
}

export default EditEventPage;
