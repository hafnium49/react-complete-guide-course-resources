/**
 * ============================================================================
 * NEW EVENT PAGE COMPONENT (Lesson 360 - Task 1 Solution)
 * ============================================================================
 *
 * TASK 1 SOLUTION (Lesson 360):
 * =============================
 * INSTRUCTOR QUOTE:
 * "And then also my EventsPage, EventDetailPage, NewEventPage, and EditEventPage."
 *
 * INSTRUCTOR QUOTE:
 * "And the same will be done for NewEvent. It's the NewEventPage, like this."
 *
 * ============================================================================
 * ROUTE SPECIFICITY - IMPORTANT NOTE (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now one small side note here. If you watch closely, you might actually see
 * and think that if we have a path of /events/new and we have a path of
 * /events something, this route here might actually never get activated
 * because new could also be treated or seen as a value for the eventId here."
 *
 * INSTRUCTOR QUOTE:
 * "So whenever we enter /events/new in the URL bar, React Router could
 * actually load this route instead of this route because it treats new as
 * a value for eventId."
 *
 * REACT ROUTER'S SMART MATCHING (Lesson 360):
 * ===========================================
 * INSTRUCTOR QUOTE:
 * "And therefore, this route would never get activated. This could happen in
 * theory, but actually React Router is smart and understands that this route
 * path is more specific than this route path."
 *
 * INSTRUCTOR QUOTE:
 * "So indeed, if you would visit /events/new, it would prefer this route
 * definition over this route definition."
 *
 * INSTRUCTOR QUOTE:
 * "And that's just something to be aware of that you don't need to worry
 * about accidentally overriding this route definition and that you don't
 * need to worry about the order of route definitions. This route here,
 * /events/new, will win over this route."
 *
 * ============================================================================
 * WHY /events/new WINS OVER /events/:eventId
 * ============================================================================
 *
 * Route definitions:
 *   { path: ':eventId', element: <EventDetailPage /> }
 *   { path: 'new', element: <NewEventPage /> }
 *
 * When visiting /events/new:
 *   - :eventId is DYNAMIC (matches anything)
 *   - 'new' is STATIC (exact match)
 *
 * React Router prefers STATIC over DYNAMIC matches.
 * This is called "route specificity" or "route ranking".
 *
 * So order doesn't matter - 'new' will always win over ':eventId'
 * when the URL segment is literally "new".
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
 *     { path: 'new', element: <NewEventPage /> },  // ← This page (wins over :eventId)
 *     ...
 *   ]
 * }
 *
 * URL: http://localhost:3000/events/new
 *
 * ============================================================================
 */

/**
 * NEW EVENT PAGE COMPONENT:
 * =========================
 * Form page for creating a new event.
 *
 * Currently displays placeholder content.
 * Will be enhanced with EventForm component in later lessons.
 */
function NewEventPage() {
  return <h1>NewEventPage</h1>;
}

export default NewEventPage;
