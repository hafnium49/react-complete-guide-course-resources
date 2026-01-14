/**
 * ============================================================================
 * PAGE CONTENT COMPONENT (Lesson 370 - Improved Error Page Styling)
 * ============================================================================
 *
 * PURPOSE (Lesson 370):
 * =====================
 * INSTRUCTOR QUOTE:
 * "Now of course this error page here isn't too beautiful and too helpful.
 * And they offer to improve it a little bit."
 *
 * INSTRUCTOR QUOTE:
 * "As a first step, you find a new component attached to this lecture. And
 * that's the page content .js file. It's a little helper component that
 * provides us some styling which I'll use to render it here, on this error
 * page."
 *
 * ============================================================================
 * WHAT THIS COMPONENT DOES (Lesson 370)
 * ============================================================================
 *
 * This is a reusable wrapper component that provides:
 * 1. Centered content styling (via CSS module)
 * 2. A title prop that renders as an <h1>
 * 3. A children slot for additional content
 *
 * USAGE PATTERN (Lesson 370):
 * ===========================
 * INSTRUCTOR QUOTE:
 * "For that we must import page content from and then components page content.
 * And here we can set a title property and set it to an error occurred. And
 * we can then also pass some content between the opening and closing tags of
 * page content."
 *
 * Example usage:
 * <PageContent title="An error occurred!">
 *   <p>Something went wrong.</p>
 * </PageContent>
 *
 * ============================================================================
 * COMPONENT STRUCTURE
 * ============================================================================
 *
 * Renders:
 * ┌─────────────────────────────────────┐
 * │ <div className={classes.content}>   │
 * │ ┌─────────────────────────────────┐ │
 * │ │ <h1>{title}</h1>                │ │
 * │ │ "An error occurred!"            │ │
 * │ └─────────────────────────────────┘ │
 * │ ┌─────────────────────────────────┐ │
 * │ │ {children}                      │ │
 * │ │ <p>Something went wrong.</p>    │ │
 * │ └─────────────────────────────────┘ │
 * └─────────────────────────────────────┘
 *
 * ============================================================================
 * WHY USE CSS MODULES (Lesson 370)
 * ============================================================================
 *
 * CSS Modules provide scoped styling:
 * - classes.content is transformed to a unique class name
 * - Avoids CSS class name conflicts
 * - Common pattern in React applications
 *
 * The .content class applies text-align: center for centered content.
 *
 * ============================================================================
 */
import classes from './PageContent.module.css';

/**
 * PAGE CONTENT COMPONENT (Lesson 370):
 * ====================================
 * A helper component for displaying page content with consistent styling.
 *
 * PROPS:
 * ======
 * @param {string} title - The page title to display as an <h1>
 * @param {ReactNode} children - Additional content to render below the title
 *
 * INSTRUCTOR QUOTE:
 * "It's a little helper component that provides us some styling which I'll
 * use to render it here, on this error page."
 */
function PageContent({ title, children }) {
  return (
    /**
     * CONTENT WRAPPER (Lesson 370):
     * =============================
     * The div with classes.content provides centered text styling.
     * See PageContent.module.css for the actual styles.
     */
    <div className={classes.content}>
      {/**
       * TITLE (Lesson 370):
       * ===================
       * INSTRUCTOR QUOTE:
       * "And here we can set a title property and set it to an error occurred."
       *
       * The title is rendered as an <h1> for semantic HTML.
       */}
      <h1>{title}</h1>
      {/**
       * CHILDREN (Lesson 370):
       * ======================
       * INSTRUCTOR QUOTE:
       * "And we can then also pass some content between the opening and
       * closing tags of page content. And for example, add a paragraph
       * where we say something went wrong."
       *
       * Any JSX passed between <PageContent>...</PageContent> tags
       * will be rendered here.
       */}
      {children}
    </div>
  );
}

export default PageContent;
