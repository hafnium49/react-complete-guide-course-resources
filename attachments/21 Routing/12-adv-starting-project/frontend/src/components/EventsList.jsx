/**
 * ============================================================================
 * EVENTS LIST COMPONENT (Lesson 358 - Pre-built Component)
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
 * CHALLENGE TASK 6: Display Events with Links
 * ============================================================================
 *
 * CURRENT STATE:
 * ==============
 * - Uses <a href="..."> with a placeholder href
 * - Causes full page reloads (not SPA behavior)
 *
 * TARGET STATE:
 * =============
 * - Use <Link> from react-router-dom
 * - Build dynamic paths using template literals
 * - Navigate to event detail pages without reload
 *
 * IMPLEMENTATION (Lesson 355 - Building Links for Dynamic Routes):
 * ================================================================
 *
 * 1. Import Link:
 *    import { Link } from 'react-router-dom';
 *
 * 2. Replace <a href="..."> with dynamic Link:
 *    <Link to={`/events/${event.id}`}>
 *      ...
 *    </Link>
 *
 * Template Literal Explanation:
 * =============================
 * `/events/${event.id}` produces:
 * - For event.id = "e1" → "/events/e1"
 * - For event.id = "e2" → "/events/e2"
 *
 * These paths match the dynamic route: /events/:eventId
 *
 * PROPS:
 * ======
 * @param {Array} events - Array of event objects with:
 *   - id: string (unique identifier)
 *   - title: string
 *   - image: string (URL)
 *   - date: string (formatted date)
 *
 * USAGE IN EventsPage:
 * ====================
 * const DUMMY_EVENTS = [
 *   { id: 'e1', title: 'Event 1', image: '...', date: '2024-01-01' },
 *   { id: 'e2', title: 'Event 2', image: '...', date: '2024-02-01' },
 * ];
 *
 * <EventsList events={DUMMY_EVENTS} />
 */
import classes from './EventsList.module.css';

/**
 * EVENTS LIST COMPONENT:
 * ======================
 * Renders a grid of event cards, each linking to event details.
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
         * Similar to what we learned in Lesson 355 about building
         * links for dynamic routes.
         *
         * Each event gets its own list item with:
         * - key prop for React's reconciliation
         * - Link to the event's detail page
         * - Image and basic info display
         */}
        {events.map((event) => (
          <li key={event.id} className={classes.item}>
            {/**
             * TODO: Replace with Link
             *
             * <Link to={`/events/${event.id}`}>
             *   <img src={event.image} alt={event.title} />
             *   <div className={classes.content}>
             *     <h2>{event.title}</h2>
             *     <time>{event.date}</time>
             *   </div>
             * </Link>
             *
             * This creates links like:
             * - /events/e1
             * - /events/e2
             *
             * Which will be matched by route:
             * { path: ':eventId', element: <EventDetailPage /> }
             *
             * And the eventId parameter can be accessed via:
             * const { eventId } = useParams();
             */}
            <a href="...">
              <img src={event.image} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>{event.date}</time>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
