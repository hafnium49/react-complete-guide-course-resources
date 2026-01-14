/**
 * ============================================================================
 * EVENT ITEM COMPONENT (Lessons 358, 373, 376 - Pre-built + Link + Delete)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 358: Pre-built component with basic anchor tag for Edit
 * Lesson 373: Updated Edit anchor to Link component
 * Lesson 376: Added useSubmit for delete functionality (CURRENT)
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
 * LESSON 376: PROGRAMMATIC ACTION TRIGGERING WITH useSubmit
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Sometimes you don't wanna work with such a form though, but instead, you
 * wanna trigger the action programmatically. For example, here for the Delete
 * button on the Event Item component."
 *
 * INSTRUCTOR QUOTE:
 * "Because we might not wanna send a delete request right away when this button
 * is clicked. Instead, we wanna show a confirmation prompt first."
 *
 * WHY useSubmit INSTEAD OF <Form>:
 * ================================
 * INSTRUCTOR QUOTE:
 * "In order to trigger that action here programmatically, we can import another
 * special hook from React Router Dom, and that's the useSubmit hook."
 *
 * | Approach          | Use Case                                    |
 * |-------------------|---------------------------------------------|
 * | <Form>            | Simple form submission (auto-collects data) |
 * | useSubmit         | Programmatic triggering (with conditions)   |
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
 */
import { Link, useSubmit } from 'react-router-dom';

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
   * ============================================================================
   * LESSON 376: useSubmit HOOK FOR PROGRAMMATIC ACTION TRIGGERING
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "In order to trigger that action here programmatically, we can import
   * another special hook from React Router Dom, and that's the useSubmit hook."
   *
   * INSTRUCTOR QUOTE:
   * "You can also call useSubmit outside of the function where you need it,
   * but, and that's important, it must be called in the component function,
   * not inside any nested functions or event handlers."
   *
   * WHAT useSubmit RETURNS:
   * ======================
   * INSTRUCTOR QUOTE:
   * "And that gives you a submit function which you can use whenever you want
   * to submit a form or trigger an action programmatically."
   *
   * COMPARISON WITH <Form> COMPONENT:
   * =================================
   * | <Form>              | useSubmit                                 |
   * |---------------------|-------------------------------------------|
   * | Declarative         | Imperative/Programmatic                   |
   * | Auto-collects data  | You provide data manually                 |
   * | Submits on form     | Submits when you call submit()            |
   * | submit event        |                                           |
   */
  const submit = useSubmit();

  /**
   * ============================================================================
   * LESSON 376: DELETE HANDLER WITH CONFIRMATION
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Because we might not wanna send a delete request right away when this
   * button is clicked. Instead, we wanna show a confirmation prompt first."
   *
   * INSTRUCTOR QUOTE:
   * "For that we could use the built in window.confirm method, which returns
   * true or false depending on which button was clicked by the user."
   *
   * WHY USE confirm() BEFORE DELETING:
   * ==================================
   * - Prevents accidental deletions
   * - Gives user a chance to cancel
   * - Standard UX pattern for destructive actions
   */
  function startDeleteHandler() {
    /**
     * CONFIRMATION DIALOG (Lesson 376):
     * =================================
     * INSTRUCTOR QUOTE:
     * "For that we could use the built in window.confirm method, which returns
     * true or false depending on which button was clicked by the user."
     *
     * INSTRUCTOR QUOTE:
     * "We could also use a modal, of course, but I'll use this simple built-in
     * browser dialog."
     *
     * window.confirm():
     * - Shows a native browser dialog with OK/Cancel buttons
     * - Returns true if user clicks OK
     * - Returns false if user clicks Cancel
     */
    const proceed = window.confirm('Are you sure you want to delete this event?');

    /**
     * CONDITIONAL SUBMISSION (Lesson 376):
     * ====================================
     * INSTRUCTOR QUOTE:
     * "And if the user clicks OK, I wanna trigger the deletion, if the user
     * cancels, I don't wanna do anything."
     *
     * Only proceed with deletion if user confirmed.
     */
    if (proceed) {
      /**
       * ======================================================================
       * LESSON 376: submit() FUNCTION PARAMETERS
       * ======================================================================
       *
       * INSTRUCTOR QUOTE:
       * "Now, to submit, you must pass two things. The first argument is the
       * data you wanna submit. That can be null if you have no data."
       *
       * INSTRUCTOR QUOTE:
       * "But then you also pass a second argument, which is an object where you
       * can configure this submission."
       *
       * SUBMIT FUNCTION SIGNATURE:
       * =========================
       * submit(data, options)
       *
       * | Parameter | Type   | Description                               |
       * |-----------|--------|-------------------------------------------|
       * | data      | any    | Form data to submit (can be null)         |
       * | options   | Object | Configuration: method, action, etc.       |
       *
       * ======================================================================
       * OPTIONS OBJECT (Lesson 376):
       * ======================================================================
       *
       * INSTRUCTOR QUOTE:
       * "For example, you can set the method that should be used for this
       * request. And I'll set it to delete here."
       *
       * METHOD OPTION:
       * ==============
       * INSTRUCTOR QUOTE:
       * "And I'll set it to delete here. And that's a method that's also
       * supported by the Form component. It's just that here, I wanna trigger
       * this programmatically, so I'm configuring it like this."
       *
       * AVAILABLE METHODS:
       * ==================
       * | Method   | HTTP Verb | Use Case                          |
       * |----------|-----------|-----------------------------------|
       * | 'post'   | POST      | Create new resource               |
       * | 'put'    | PUT       | Update entire resource            |
       * | 'patch'  | PATCH     | Partial update                    |
       * | 'delete' | DELETE    | Remove resource                   |
       *
       * ACTION OPTION (Lesson 376):
       * ===========================
       * INSTRUCTOR QUOTE:
       * "You can also set an action, though we could emit that if we wanna
       * target the currently active route. And we don't need to target a
       * different route here, so I will not set the action property."
       *
       * Since we're on /events/:eventId and the action is registered on that
       * same route (via the wrapper route with id: 'event-detail'), we don't
       * need to specify the action path. It will automatically target the
       * current route's action.
       */
      submit(null, { method: 'delete' });
    }
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
