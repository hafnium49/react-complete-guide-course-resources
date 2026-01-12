/**
 * ============================================================================
 * EVENTS PAGE COMPONENT (Lesson 360 - Tasks 1 & 6 Solution)
 * ============================================================================
 *
 * TASK 1 SOLUTION (Lesson 360):
 * =============================
 * INSTRUCTOR QUOTE:
 * "And then also my EventsPage, EventDetailPage, NewEventPage, and EditEventPage.
 * So here I'll add EventsPage..."
 *
 * INSTRUCTOR QUOTE:
 * "I'll then copy that and add that to the Events.js file and rename this to
 * EventsPage, also here for the export and for the h1 tag."
 *
 * ============================================================================
 * TASK 6 SOLUTION - DISPLAYING EVENTS LIST (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now for step number six, we should now output a list of dummy events on
 * the EventsPage and every list item should include a link to the
 * EventDetailPage, of course, with a different ID."
 *
 * INSTRUCTOR QUOTE:
 * "That's important because we do have that dynamic ID in our path that leads
 * to the EventDetailPage."
 *
 * DUMMY DATA (Lesson 360):
 * ========================
 * INSTRUCTOR QUOTE:
 * "So to do that, I'll go to the EventsPage here and simply add some
 * DUMMY_EVENTS. Later in this module, we'll have more realistic data, but
 * here I'll just have this local dummy array."
 *
 * INSTRUCTOR QUOTE:
 * "And every event has an ID, let's say, e1, and maybe a title of Some event.
 * Again, we'll have slightly different data later. For the moment, this will do."
 *
 * MAPPING TO LIST ITEMS (Lesson 360):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "And for that, we can add a unordered list. And then again, map through the
 * DUMMY_EVENTS. And every event should then be turned into a list item where
 * we set the key to event.id and where inside the list item, we then have a
 * link, which must be imported from react-router-dom, of course."
 *
 * RELATIVE LINKS (Lesson 360):
 * ============================
 * INSTRUCTOR QUOTE:
 * "And then that link should actually lead to /events/ the ID of the event
 * for which we're creating this list item. So therefore we could construct
 * the link like this, /events and then inject event.id, or we convert it to
 * a relative link by just navigating to event.id."
 *
 * INSTRUCTOR QUOTE:
 * "And this will be appended after the currently active routes path. That is
 * what I wanna do here for these links on this page."
 *
 * ============================================================================
 * ROUTE CONFIGURATION
 * ============================================================================
 *
 * This page is loaded by the events index route:
 *
 * {
 *   path: 'events',
 *   element: <EventsRootLayout />,
 *   children: [
 *     { index: true, element: <EventsPage /> },  // ← This page at /events
 *     { path: ':eventId', element: <EventDetailPage /> },
 *     ...
 *   ]
 * }
 *
 * URL: http://localhost:3000/events
 *
 * ============================================================================
 */
import { Link } from 'react-router-dom';

/**
 * DUMMY EVENTS DATA (Lesson 360):
 * ===============================
 * Temporary placeholder data for development.
 *
 * INSTRUCTOR QUOTE:
 * "Later in this module, we'll have more realistic data, but here I'll just
 * have this local dummy array."
 *
 * Each event object contains:
 * - id: Unique identifier (used in URL and as React key)
 * - title: Display name for the event
 *
 * Later lessons will:
 * - Fetch real data from the backend API
 * - Include more properties (image, date, description)
 */
const DUMMY_EVENTS = [
  { id: 'e1', title: 'Some event' },
  { id: 'e2', title: 'Another event' },
];

/**
 * EVENTS PAGE COMPONENT:
 * ======================
 * Displays a list of all events with links to their detail pages.
 *
 * KEY CONCEPTS DEMONSTRATED:
 * - Mapping data to list items
 * - Using Link component for navigation
 * - Relative paths (event.id appends to current path)
 * - Using unique key prop for list items
 */
function EventsPage() {
  return (
    <>
      <h1>EventsPage</h1>
      {/**
       * EVENTS LIST (Lesson 360):
       * =========================
       * Maps through DUMMY_EVENTS to create clickable list items.
       *
       * Each list item:
       * - Has a unique key (event.id) for React's reconciliation
       * - Contains a Link to the event's detail page
       * - Uses relative path navigation
       */}
      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            {/**
             * RELATIVE LINK (Lesson 360):
             * ===========================
             * Using just event.id as the path makes this a RELATIVE link.
             *
             * From /events:
             *   to="e1" → navigates to /events/e1
             *   to="e2" → navigates to /events/e2
             *
             * Alternative (absolute path):
             *   to={`/events/${event.id}`}
             *
             * The relative approach is cleaner and more maintainable.
             */}
            <Link to={event.id}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;
