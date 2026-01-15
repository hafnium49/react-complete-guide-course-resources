/**
 * ============================================================================
 * EVENTS LIST COMPONENT (Lessons 358, 363, 372, 383 - Pre-built + Links Fix)
 * ============================================================================
 *
 * PRE-BUILT COMPONENT (Lesson 358):
 * =================================
 * INSTRUCTOR QUOTE:
 * "You will see that there I already added some components, which we'll use
 * throughout this section, in which you, of course, can explore. In the end,
 * these are all relatively straightforward components with some default
 * styling provided."
 *
 * This component displays a list of events with images and links.
 * Each event card links to its detail page.
 *
 * ============================================================================
 * LESSON 363: USING useLoaderData IN CHILD COMPONENTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now before we dive deeper into this entire loader thing, and also talk
 * about error handling and so on, let's see where else we could use this
 * useLoaderData hook."
 *
 * ALTERNATIVE APPROACH - Using useLoaderData Here (Lesson 363):
 * =============================================================
 * INSTRUCTOR QUOTE:
 * "We can use it in this page, which is rendered by the route on which we
 * added the loader, but where else can we use it? Well, we could also use
 * it directly inside the EventsList component."
 *
 * INSTRUCTOR QUOTE:
 * "So instead of using it here, and instead of importing it here, we could
 * go to this EventsList component and use this hook there."
 *
 * INSTRUCTOR QUOTE:
 * "Here we can also import useLoaderData from react-router-dom, and then
 * call this in this component, even though it's not a page component."
 *
 * NO DIFFERENCE BETWEEN PAGE AND REGULAR COMPONENTS (Lesson 363):
 * ================================================================
 * INSTRUCTOR QUOTE:
 * "But there technically is no difference between page components and other
 * components, so therefore we can use it here as well."
 *
 * ALTERNATIVE IMPLEMENTATION (If we used useLoaderData directly here):
 * ====================================================================
 * import { useLoaderData } from 'react-router-dom';
 *
 * function EventsList() {  // Note: No props needed!
 *   const events = useLoaderData();  // Gets data from parent route's loader
 *
 *   return (
 *     <div className={classes.events}>
 *       ...
 *     </div>
 *   );
 * }
 *
 * INSTRUCTOR QUOTE:
 * "And if we do that, you will see that this events object, which we're
 * getting here will be available and everything will work. I just need to
 * make sure that I'm no longer waiting for events props here, which I try
 * to destructure."
 *
 * ============================================================================
 * WHY WE USE THE PROPS APPROACH INSTEAD
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With that, I will actually change my code again, and useLoaderData in
 * the Events page component and bring back that events property on which
 * I pass my events queue EventsList, and I will get rid of my loader data
 * usage here in EventsList, and instead bring back this object destructure
 * here in my parameter list to extract the events from my props."
 *
 * CURRENT APPROACH (Props-based):
 * ===============================
 * - EventsPage uses useLoaderData() to get events
 * - EventsPage passes events to EventsList as props
 * - EventsList receives events via props destructuring
 *
 * BENEFITS OF PROPS APPROACH:
 * ===========================
 * 1. EventsList is more reusable (not tied to React Router)
 * 2. Easier to test (just pass mock data as props)
 * 3. Clear data flow (parent fetches, child receives)
 * 4. EventsList can be used with any data source
 *
 * INSTRUCTOR QUOTE:
 * "Ultimately, it's up to you."
 *
 * ============================================================================
 */
import { Link } from 'react-router-dom';

import classes from './EventsList.module.css';

/**
 * EVENTS LIST COMPONENT (Lesson 363):
 * ====================================
 * Renders a grid of event cards, each linking to event details.
 *
 * TWO WAYS TO GET DATA:
 * =====================
 * 1. Via props (current approach) - More flexible and reusable
 * 2. Via useLoaderData() - Works because this component is rendered
 *    by a child route that has a loader
 *
 * INSTRUCTOR QUOTE:
 * "You can access loaded data with help of useLoaderData in any component
 * on the same level or lower level than the component where you added the
 * loader, so the route on which you added the loader."
 *
 * @param {Object} props
 * @param {Array} props.events - Array of event objects to display
 */
function EventsList({ events }) {
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {/**
         * MAPPING EVENTS TO LIST ITEMS:
         * =============================
         * Each event gets its own list item with:
         * - key prop for React's reconciliation
         * - Link to the event's detail page
         * - Image and basic info display
         */}
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            {/**
             * ================================================================
             * DYNAMIC LINK TO EVENT DETAIL (Lessons 372, 383)
             * ================================================================
             *
             * INSTRUCTOR QUOTE (Lesson 372):
             * "Now, we wanna navigate to this event detail page. For that,
             * I'll start by going to events list, and there we first of all
             * wanna convert this anchor element to a link."
             *
             * ================================================================
             * LESSON 383: FIXING LINKS TO BE ABSOLUTE
             * ================================================================
             *
             * INSTRUCTOR QUOTE:
             * "By the way, those links in this nested list would now be broken.
             * To fix that, we would have to go to EventsList.js, and then
             * convert these links to absolute links here, since we can now
             * end up in situations where this component is rendered on a page
             * where adding this to the currently active path would lead to an
             * overall incorrect path."
             *
             * WHY ABSOLUTE PATHS ARE NOW NEEDED:
             * ==================================
             * BEFORE (component only rendered on /events):
             * - Relative path: event.id (e.g., "e1")
             * - Becomes: /events + e1 = /events/e1 ✓
             *
             * AFTER (component also rendered on /events/:eventId):
             * - Relative path: event.id (e.g., "e1")
             * - Becomes: /events/some-event + e1 = /events/some-event/e1 ✗
             *
             * WITH ABSOLUTE PATH:
             * - Absolute path: /events/e1
             * - Always navigates to: /events/e1 ✓ (works everywhere!)
             *
             * INSTRUCTOR QUOTE:
             * "But that's just a tiny side note not related to deferring
             * data loading."
             *
             * THE FIX:
             * ========
             * Changed from: <Link to={event.id}>
             * Changed to:   <Link to={`/events/${event.id}`}>
             *
             * This ensures the link works correctly regardless of which
             * page this EventsList component is rendered on.
             */}
            <Link to={`/events/${event.id}`}>
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
