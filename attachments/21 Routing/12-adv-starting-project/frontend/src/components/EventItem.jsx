/**
 * ============================================================================
 * EVENT ITEM COMPONENT (Lessons 358, 373 - Pre-built + Link Update)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 358: Pre-built component with basic anchor tag for Edit
 * Lesson 373: Updated Edit anchor to Link component (CURRENT)
 *
 * PRE-BUILT COMPONENT (Lesson 358):
 * =================================
 * INSTRUCTOR QUOTE:
 * "You will see that there I already added some components, which we'll use
 * throughout this section, in which you, of course, can explore. In the end,
 * these are all relatively straightforward components with some default
 * styling provided."
 *
 * This component displays the full details of a single event.
 * It's used on the EventDetailPage to show event information.
 *
 * ============================================================================
 * LESSON 373: CONVERTING ANCHOR TO LINK
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now for this to happen, I first of all have to go to the Event Item js file,
 * and here we wanna use the link component provided by React Router."
 *
 * INSTRUCTOR QUOTE:
 * "So here we can import link from React Router Dom."
 *
 * WHY CONVERT TO LINK? (Lesson 373):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "So we wanna make this edit button work. For this to work, we first of all
 * have to make sure that we don't use this anchor element here."
 *
 * Benefits of using Link instead of anchor:
 * - Enables SPA navigation (no full page reload)
 * - Works with React Router's routing system
 * - Preserves application state during navigation
 *
 * ============================================================================
 * USAGE WITH DYNAMIC ROUTES
 * ============================================================================
 *
 * This component is typically used on the EventDetailPage:
 *
 * function EventDetailPage() {
 *   const { eventId } = useParams();  // From Lesson 354
 *
 *   // Later: fetch event data using eventId
 *   // For now: use dummy data
 *
 *   return <EventItem event={eventData} />;
 * }
 *
 * PROPS:
 * ======
 * @param {Object} event - Event object containing:
 *   - title: string
 *   - image: string (URL)
 *   - date: string
 *   - description: string
 *
 * ============================================================================
 * EDIT LINK - RELATIVE PATH (Lessons 356, 373)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 373):
 * "And then instead of this anchor element, I want to render a link element
 * and I want to set up the same path, just as to property now instead of
 * href. So I will use edit as a relative path."
 *
 * RELATIVE PATH BEHAVIOR:
 * ======================
 * If current URL is /events/e1:
 * - to="edit" → navigates to /events/e1/edit
 *
 * INSTRUCTOR QUOTE (Lesson 373):
 * "And that means that edit will be appended to the currently active path.
 * And that is the event detail path. So events slash the ID of the event
 * on which we're currently on."
 *
 * ============================================================================
 * DELETE FUNCTIONALITY (To be implemented later)
 * ============================================================================
 *
 * The delete button has a placeholder handler.
 * This will be implemented in later lessons about data mutation.
 */
import { Link } from 'react-router-dom';

import classes from './EventItem.module.css';

/**
 * EVENT ITEM COMPONENT:
 * =====================
 * Displays detailed view of a single event.
 *
 * Used on EventDetailPage to show:
 * - Event image
 * - Title
 * - Date
 * - Full description
 * - Action buttons (Edit, Delete)
 *
 * @param {Object} props
 * @param {Object} props.event - Event data object
 */
function EventItem({ event }) {
  /**
   * DELETE HANDLER:
   * ===============
   * Placeholder for delete functionality.
   * Will be implemented in later lessons about form actions
   * and data mutation with React Router.
   */
  function startDeleteHandler() {
    // TODO: Implement delete functionality
    // This will be covered in later lessons about actions
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        {/**
         * ================================================================
         * EDIT LINK - RELATIVE PATH (Lesson 373)
         * ================================================================
         *
         * INSTRUCTOR QUOTE:
         * "And then instead of this anchor element, I want to render a link
         * element and I want to set up the same path, just as to property
         * now instead of href. So I will use edit as a relative path."
         *
         * INSTRUCTOR QUOTE:
         * "And that means that edit will be appended to the currently active
         * path. And that is the event detail path. So events slash the ID
         * of the event on which we're currently on."
         *
         * HOW THIS WORKS:
         * ===============
         * Current URL: /events/e1
         * Link to="edit" → Navigates to /events/e1/edit
         *
         * This matches route: { path: ':eventId/edit', element: <EditEventPage /> }
         *
         * WHY LINK INSTEAD OF ANCHOR:
         * ===========================
         * - <a href="edit"> causes full page reload (bad for SPA)
         * - <Link to="edit"> uses React Router's navigation (preserves state)
         */}
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
