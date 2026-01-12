/**
 * ============================================================================
 * EVENT ITEM COMPONENT (Lesson 358 - Pre-built Component)
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
 * This component displays the full details of a single event.
 * It's used on the EventDetailPage to show event information.
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
 * EDIT LINK - Relative Path (Lesson 356)
 * ============================================================================
 *
 * The "Edit" link uses a relative path: href="edit"
 *
 * From Lesson 356 (Relative vs Absolute Paths):
 * - Absolute: "/events/e1/edit" (starts with /)
 * - Relative: "edit" (appended to current path)
 *
 * If current URL is /events/e1:
 * - href="edit" → navigates to /events/e1/edit
 *
 * This should be updated to use <Link> for SPA navigation:
 * <Link to="edit">Edit</Link>
 *
 * ============================================================================
 * DELETE FUNCTIONALITY (To be implemented later)
 * ============================================================================
 *
 * The delete button has a placeholder handler.
 * This will be implemented in later lessons about data mutation.
 */
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
         * EDIT LINK:
         * ==========
         * Uses relative path "edit" which appends to current URL.
         *
         * TODO: Replace with Link for SPA navigation:
         * <Link to="edit">Edit</Link>
         *
         * From /events/e1, "edit" navigates to /events/e1/edit
         * This matches route: { path: ':eventId/edit', element: <EditEventPage /> }
         */}
        <a href="edit">Edit</a>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
