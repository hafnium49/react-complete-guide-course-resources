/**
 * ============================================================================
 * EVENT ITEM COMPONENT (Updated in Lesson 396)
 * ============================================================================
 *
 * This component displays a single event's details.
 * The Edit and Delete buttons are now conditionally shown based on auth state.
 *
 * ============================================================================
 * CONDITIONAL EDIT/DELETE MENU (Lesson 396)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And the same is true for the event item. There, I also will use the
 * useRouteLoaderData hook to get data from my root route, and that data
 * is the token."
 *
 * WHY HIDE EDIT/DELETE WHEN NOT LOGGED IN?
 * - Both operations require authentication (protected backend routes)
 * - Showing these options to unauthenticated users would lead to errors
 * - Better UX to hide options that won't work anyway
 *
 * INSTRUCTOR QUOTE:
 * "Here I only wanna show it if we have a token, because otherwise we can't
 * edit or delete this anyways."
 *
 * ============================================================================
 */

/**
 * IMPORT CHANGES (Lesson 396):
 * - ADDED: useRouteLoaderData (for reactive token access)
 *
 * INSTRUCTOR QUOTE:
 * "There, I also will use the useRouteLoaderData hook to get data from my
 * root route, and that data is the token."
 */
import { Link, useSubmit, useRouteLoaderData } from 'react-router-dom';

import classes from './EventItem.module.css';

function EventItem({ event }) {
  /**
   * ============================================================================
   * GETTING TOKEN FROM ROOT ROUTE LOADER (Lesson 396)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "There, I also will use the useRouteLoaderData hook to get data from my
   * root route, and that data is the token."
   *
   * Same pattern as MainNavigation and EventsNavigation - access the token
   * from the root route's loader to determine if we should show Edit/Delete.
   */
  const token = useRouteLoaderData('root');
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      {/*
       * ====================================================================
       * EDIT/DELETE MENU - CONDITIONAL (Lesson 396)
       * ====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "And that information can now be used to conditionally show that menu.
       * Here I only wanna show it if we have a token, because otherwise we
       * can't edit or delete this anyways."
       *
       * INSTRUCTOR QUOTE:
       * "So with that, if we save this, I see all these items because I am
       * logged in, but if I log out and I then go back to events, you see the
       * new event button is gone and also edit and delete are gone."
       *
       * LOGIC: token means "show when logged in"
       * - token exists (truthy) → DO show Edit/Delete menu
       * - token is null (falsy) → DON'T show Edit/Delete menu
       *
       * NOTE: The entire <menu> element is conditionally rendered, not just
       * the individual buttons. This keeps the UI cleaner when logged out.
       */}
      {token && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default EventItem;
