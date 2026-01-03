/**
 * ============================================================================
 * ERROR COMPONENT - REUSABLE ERROR DISPLAY
 * ============================================================================
 *
 * This is a simple, reusable component for displaying error messages
 * throughout the application.
 *
 * KEY LEARNING OBJECTIVES:
 * ========================
 * 1. Creating simple, focused components
 * 2. Component reusability through props
 * 3. Separation of concerns (display vs logic)
 *
 * DESIGN PHILOSOPHY:
 * ==================
 * This component follows the "Single Responsibility Principle":
 * - It does ONE thing: display an error message
 * - It doesn't know WHERE the error came from
 * - It doesn't know HOW to fix the error
 * - It just receives data and renders it
 *
 * USAGE EXAMPLES:
 * ===============
 * <Error title="Failed to fetch meals" message={error} />
 * <Error title="Network Error" message="Please check your connection" />
 * <Error title="Order Failed" message="Server returned an error" />
 *
 * USED BY:
 * ========
 * - Meals.jsx: When fetching meals fails
 * - Checkout.jsx: When submitting an order fails
 */

/**
 * ERROR COMPONENT
 * ===============
 * A simple presentational component that displays error information.
 *
 * PROPS:
 * ------
 * @param {Object} props
 * @param {string} props.title - The error heading/title
 * @param {string} props.message - The detailed error message
 *
 * WHY DESTRUCTURE PROPS?
 * ----------------------
 * Instead of: function Error(props) { ... props.title ... }
 * We use: function Error({ title, message }) { ... title ... }
 *
 * Benefits:
 * - Clearer about what props the component expects
 * - Shorter code (no props. prefix)
 * - Easier to read
 * - Acts as documentation
 */
export default function Error({ title, message }) {
  /**
   * RENDER ERROR UI
   * ===============
   * Simple structure:
   * - Container div with "error" class
   * - h2 for the title (prominent, attention-grabbing)
   * - p for the message (detailed info)
   *
   * CSS STYLING (from index.css):
   * -----------------------------
   * The "error" class provides:
   * - background-color: #fde2e4 (light red/pink)
   * - color: #680a0a (dark red)
   * - padding: 1rem
   * - border-radius: 4px
   * - text-align: center
   *
   * This creates a visually distinct "danger" appearance
   * that clearly communicates something went wrong.
   */
  return (
    <div className="error">
      {/*
        ERROR TITLE
        ===========
        The title provides a quick summary of what went wrong.
        Using h2 makes it prominent and attention-grabbing.

        Examples:
        - "Failed to fetch meals"
        - "Failed to submit order"
        - "Network Error"
      */}
      <h2>{title}</h2>

      {/*
        ERROR MESSAGE
        =============
        The message provides more detail about the error.
        This might be:
        - A technical error message from the server
        - A user-friendly explanation
        - Instructions on how to resolve the issue

        Examples:
        - "Could not connect to the server"
        - "Please check your internet connection"
        - "The server returned status 500"
      */}
      <p>{message}</p>
    </div>
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS
 * ============================================================================
 *
 * PRESENTATIONAL COMPONENTS:
 * ==========================
 * Error is a "presentational" or "dumb" component:
 * - No state
 * - No side effects
 * - No business logic
 * - Just receives props and renders UI
 *
 * These components are:
 * - Easy to test
 * - Easy to reuse
 * - Easy to understand
 * - Easy to maintain
 *
 * COMPONENT COMPOSITION:
 * ======================
 * Instead of duplicating error display code in Meals and Checkout,
 * we extract it into a reusable component.
 *
 * Without Error component:
 * // In Meals.jsx
 * if (error) {
 *   return (
 *     <div className="error">
 *       <h2>Failed to fetch meals</h2>
 *       <p>{error}</p>
 *     </div>
 *   );
 * }
 *
 * // In Checkout.jsx (same code duplicated)
 * if (error) {
 *   return (
 *     <div className="error">
 *       <h2>Failed to submit order</h2>
 *       <p>{error}</p>
 *     </div>
 *   );
 * }
 *
 * With Error component:
 * // In Meals.jsx
 * if (error) {
 *   return <Error title="Failed to fetch meals" message={error} />;
 * }
 *
 * // In Checkout.jsx
 * {error && <Error title="Failed to submit order" message={error} />}
 *
 * BENEFITS OF EXTRACTION:
 * =======================
 * 1. DRY (Don't Repeat Yourself) - Error styling in one place
 * 2. Consistency - All errors look the same
 * 3. Maintainability - Change error styling once, applies everywhere
 * 4. Testability - Can test Error component in isolation
 *
 * SEMANTIC HTML:
 * ==============
 * - <div> for container (no semantic meaning needed)
 * - <h2> for heading (important information)
 * - <p> for paragraph (descriptive text)
 *
 * ACCESSIBILITY:
 * ==============
 * For better accessibility, you could enhance this with:
 * - role="alert" on the container (announces to screen readers)
 * - aria-live="polite" for dynamic error messages
 *
 * Example:
 * <div className="error" role="alert" aria-live="polite">
 *   ...
 * </div>
 *
 * However, for this learning project, the basic version is sufficient.
 */
