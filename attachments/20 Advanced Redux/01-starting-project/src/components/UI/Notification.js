/**
 * ============================================================================
 * NOTIFICATION COMPONENT - Status Notifications (Lesson 337)
 * ============================================================================
 *
 * COMPONENT PURPOSE (Lesson 337):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "It's a simple component that displays a title and the message and that can
 * assume different CSS classes based on a status prop. And then it's simply a
 * little bar at the top which will show up, which can either say something like
 * sending request, or once it's done it can tell us if it was a success or if
 * we have an error."
 *
 * WHAT THIS COMPONENT DISPLAYS:
 * =============================
 * - A notification bar at the top of the page
 * - Title (e.g., "Sending...", "Success!", "Error!")
 * - Message (e.g., "Sending cart data", "Sent cart data successfully")
 * - Different colors based on status (pending=blue, success=teal, error=red)
 *
 * PROPS:
 * ======
 * @param {string} props.status - "pending" | "success" | "error"
 * @param {string} props.title - The notification title
 * @param {string} props.message - The notification message
 *
 * HOW IT'S USED (Lesson 337):
 * ===========================
 * The notification state is managed by Redux (ui-slice):
 * - status: "pending" → blue background (sending)
 * - status: "success" → teal background (done!)
 * - status: "error" → red background (failed)
 *
 * In App.js:
 * <Notification
 *   status={notification.status}
 *   title={notification.title}
 *   message={notification.message}
 * />
 */
import classes from './Notification.module.css';

const Notification = (props) => {
  /**
   * DYNAMIC CSS CLASSES (Lesson 337):
   * ==================================
   * INSTRUCTOR QUOTE:
   * "It's a simple component that displays a title and the message and that
   * can assume different CSS classes based on a status prop."
   *
   * The status prop determines the background color:
   * - "pending": default blue (no special class)
   * - "error": red background (classes.error)
   * - "success": teal background (classes.success)
   */
  let specialClasses = '';

  if (props.status === 'error') {
    specialClasses = classes.error;
  }
  if (props.status === 'success') {
    specialClasses = classes.success;
  }

  /**
   * Combine base notification class with status-specific class
   */
  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </section>
  );
};

export default Notification;
