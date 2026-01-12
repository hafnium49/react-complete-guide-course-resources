/**
 * ============================================================================
 * EDIT EVENT PAGE COMPONENT (Lesson 360 - Task 1 Solution)
 * ============================================================================
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
 * ADVANCED ROUTE PATH - STATIC AFTER DYNAMIC (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So now the last route definition which I want to add is this definition
 * where we wanna load the EditEventPage if we are on /events, then,
 * some-id/edit."
 *
 * INSTRUCTOR QUOTE:
 * "The path therefore is /events. Then, again, my dynamic segment and then
 * edit. This is something we didn't do before, but it is absolutely a path
 * you can add to your route definitions."
 *
 * INSTRUCTOR QUOTE:
 * "You can have another hard-coded segment after a dynamic segment, that is
 * allowed and possible."
 *
 * ============================================================================
 * PATH STRUCTURE EXPLAINED
 * ============================================================================
 *
 * Route path: ':eventId/edit'
 *
 * This path has:
 * 1. Dynamic segment: :eventId (matches any value)
 * 2. Static segment: edit (must be literally "edit")
 *
 * URL Examples:
 * - /events/e1/edit → eventId = "e1"
 * - /events/abc123/edit → eventId = "abc123"
 * - /events/e1 → Does NOT match (no /edit suffix)
 * - /events/edit → Does NOT match (edit would be treated as eventId,
 *                                  and there's no second segment)
 *
 * This pattern is common for edit pages in CRUD applications:
 * - /resources/:id → View resource
 * - /resources/:id/edit → Edit resource
 * - /resources/new → Create new resource
 *
 * ============================================================================
 * ROUTE CONFIGURATION
 * ============================================================================
 *
 * {
 *   path: 'events',
 *   element: <EventsRootLayout />,
 *   children: [
 *     { index: true, element: <EventsPage /> },
 *     { path: ':eventId', element: <EventDetailPage /> },
 *     { path: 'new', element: <NewEventPage /> },
 *     { path: ':eventId/edit', element: <EditEventPage /> },  // ← This page
 *   ]
 * }
 *
 * URL: http://localhost:3000/events/e1/edit
 *
 * ============================================================================
 */

/**
 * EDIT EVENT PAGE COMPONENT:
 * ==========================
 * Form page for editing an existing event.
 *
 * Currently displays placeholder content.
 * Will be enhanced with EventForm component in later lessons.
 *
 * Note: This page can access the eventId via useParams() to:
 * - Fetch the existing event data
 * - Pre-populate the form fields
 * - Send updates to the correct event
 */
function EditEventPage() {
  return <h1>EditEventPage</h1>;
}

export default EditEventPage;
