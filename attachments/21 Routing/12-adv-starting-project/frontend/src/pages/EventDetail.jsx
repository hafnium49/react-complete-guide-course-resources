/**
 * ============================================================================
 * EVENT DETAIL PAGE COMPONENT (Lesson 360 - Tasks 1 & 7 Solution)
 * ============================================================================
 *
 * TASK 1 SOLUTION (Lesson 360):
 * =============================
 * INSTRUCTOR QUOTE:
 * "And then also my EventsPage, EventDetailPage, NewEventPage, and EditEventPage."
 *
 * INSTRUCTOR QUOTE:
 * "And then here, I got the EditEventPage... And then repeat the same for all
 * the other page files. So here we got EventDetail."
 *
 * ============================================================================
 * TASK 7 SOLUTION - DISPLAYING EVENT ID (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And in task number seven, we now wanna output the ID of the selected event
 * on the EventDetailPage."
 *
 * useParams HOOK (Lesson 360):
 * ============================
 * INSTRUCTOR QUOTE:
 * "And that of course is also something we learned about before. We can use
 * another feature from react-router-dom and that other feature is a special
 * hook, the useParams hook."
 *
 * INSTRUCTOR QUOTE:
 * "This hook when called in a component function gives us access to the
 * currently active route parameters, so to the values that are encoded in
 * the URL for our dynamic path segments."
 *
 * INSTRUCTOR QUOTE:
 * "So for the value that's used here, for eventId, in this case."
 *
 * ACCESSING THE PARAMETER (Lesson 360):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "We can use this to output this eventId value on this page just as we did
 * it before by adding a paragraph where I say Event ID and then I output
 * params.eventId."
 *
 * INSTRUCTOR QUOTE:
 * "And it's .eventId here in my case because I used eventId as an identifier
 * after the colon. If you used another value here like ID or event or
 * whatever, you would have to use that other identifier for getting hold of
 * the value with that params object."
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
 *     { index: true, element: <EventsPage /> },
 *     { path: ':eventId', element: <EventDetailPage /> },  // ← This page
 *     ...
 *   ]
 * }
 *
 * URL Examples:
 * - http://localhost:3000/events/e1 → eventId = "e1"
 * - http://localhost:3000/events/e2 → eventId = "e2"
 * - http://localhost:3000/events/abc123 → eventId = "abc123"
 *
 * ============================================================================
 */
import { useParams } from 'react-router-dom';

/**
 * EVENT DETAIL PAGE COMPONENT:
 * ============================
 * Displays details for a specific event based on URL parameter.
 *
 * KEY CONCEPTS DEMONSTRATED:
 * - useParams hook for accessing URL parameters
 * - Dynamic routes with :paramName syntax
 * - The parameter name matches what's defined in route config
 */
function EventDetailPage() {
  /**
   * useParams HOOK (Lesson 360):
   * ============================
   * Returns an object containing all URL parameters.
   *
   * For route path: ':eventId'
   * And URL: /events/e1
   *
   * params will be: { eventId: 'e1' }
   *
   * IMPORTANT: The property name (eventId) must match
   * the parameter name in your route definition.
   *
   * Route: { path: ':eventId', element: <EventDetailPage /> }
   *                  ↑
   *                  This name determines params.eventId
   */
  const params = useParams();

  return (
    <>
      <h1>EventDetailPage</h1>
      {/**
       * DISPLAYING THE EVENT ID (Lesson 360):
       * =====================================
       * INSTRUCTOR QUOTE:
       * "With that, we can see that I see the Event ID e1 or e2, depending
       * on which event I click on."
       *
       * The params object gives us access to all dynamic segments
       * defined in the route path.
       */}
      <p>Event ID: {params.eventId}</p>
    </>
  );
}

export default EventDetailPage;
