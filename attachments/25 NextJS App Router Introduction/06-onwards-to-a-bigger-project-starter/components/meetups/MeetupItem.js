/**
 * ============================================================================
 * MeetupItem.js - LESSON 485 & 490: SINGLE MEETUP CARD COMPONENT
 * ============================================================================
 *
 * LESSON 485: Created as standard React component
 * LESSON 490: Added programmatic navigation with useRouter
 *
 * ============================================================================
 * 🎓 LESSON 490: PROGRAMMATIC NAVIGATION
 * ============================================================================
 *
 * From the instructor:
 * "Now, we've got that layout in place, before we work on the actual data
 * fetching and sending data to a backend, let's work on that detail page.
 * We've got that Show Details button here but it's not doing anything right now."
 *
 * In this lesson we implement:
 * 1. Import useRouter hook from 'next/router'
 * 2. Create a showDetailsHandler function
 * 3. Use router.push() to navigate programmatically
 * 4. Construct dynamic path using props.id
 *
 * ============================================================================
 * 🔗 LINK vs PROGRAMMATIC NAVIGATION
 * ============================================================================
 *
 * From the instructor:
 * "And of course, we could do this with the link component and this would be
 * the correct way of doing that since this would render an anchor tag, but to
 * show you how you could navigate programmatically - something we will also
 * need later again when we submit a form and navigate away - to show you this
 * alternative, I will stick to a button here even though I will say that a
 * link would technically be a bit better."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  TWO WAYS TO NAVIGATE IN NEXTJS                                          │
 * │                                                                          │
 * │  1. DECLARATIVE (Link Component) - Preferred for links                  │
 * │     import Link from 'next/link';                                       │
 * │     <Link href="/meetupId">Show Details</Link>                          │
 * │     → Renders an <a> tag                                                │
 * │     → Better for SEO and accessibility                                  │
 * │     → Users can right-click, open in new tab                            │
 * │                                                                          │
 * │  2. IMPERATIVE (router.push) - For programmatic navigation              │
 * │     import { useRouter } from 'next/router';                            │
 * │     const router = useRouter();                                         │
 * │     router.push('/meetupId');                                           │
 * │     → Navigate after some action (form submit, button click)            │
 * │     → Useful when you need to do something BEFORE navigating            │
 * │     → Used in onClick handlers                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎯 THE useRouter HOOK
 * ============================================================================
 *
 * From the instructor:
 * "And we can navigate programmatically by using this useRouter hook, which
 * we saw earlier already. So we can import useRouter from next/router."
 *
 * The useRouter hook provides:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ROUTER OBJECT PROPERTIES & METHODS                                      │
 * │                                                                          │
 * │  router.query    - URL parameters (for dynamic routes)                  │
 * │  router.pathname - Current route path                                   │
 * │  router.asPath   - Actual URL in browser                                │
 * │                                                                          │
 * │  router.push()   - Navigate to new page (adds to history)               │
 * │  router.replace() - Navigate without adding to history                  │
 * │  router.back()   - Go back to previous page                             │
 * │  router.reload() - Reload current page                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ⚠️ RULES OF HOOKS
 * ============================================================================
 *
 * From the instructor:
 * "We can then call useRouter here in the component - not in the show details
 * handler - it's a React hook and therefore the rules of hooks apply and we
 * should only use React hooks directly at the root level of a component function."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  RULES OF HOOKS                                                          │
 * │                                                                          │
 * │  ✅ CORRECT - Call at the TOP of component function:                    │
 * │  function MeetupItem(props) {                                           │
 * │    const router = useRouter();  // ← Called at root level               │
 * │    ...                                                                   │
 * │  }                                                                       │
 * │                                                                          │
 * │  ❌ WRONG - Call inside handler/condition:                              │
 * │  function showDetailsHandler() {                                        │
 * │    const router = useRouter();  // ← NEVER do this!                     │
 * │  }                                                                       │
 * │                                                                          │
 * │  Hooks must be called:                                                   │
 * │  • At the top level (not inside loops, conditions, or nested functions) │
 * │  • Only in React function components or custom hooks                    │
 * │  • In the same order every time the component renders                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🚀 THE router.push() METHOD
 * ============================================================================
 *
 * From the instructor:
 * "Because this router object does not just have the query property which
 * gives us access to all that data that might be part of the URL, for a
 * dynamic page for example, but here we also have methods for navigating
 * programmatically. For example, the push method."
 *
 * From the instructor:
 * "This pushes a new page onto the stack of pages and it's the equivalent
 * of using the link component if you don't want a link but instead navigate
 * programmatically. Push, therefore, also takes a path to which you want
 * to navigate."
 *
 * ============================================================================
 * 🛤️ CONSTRUCTING DYNAMIC PATHS
 * ============================================================================
 *
 * From the instructor:
 * "And here, that should be our meetup ID because we have this meetup ID page
 * here. Now the meetup ID is something we get via props because when we
 * rendered that meetup list, we passed the ID prop into the meetup item
 * and therefore, inside of this meetup item, we can now construct a dynamic
 * path here by using props.id. So this will lead us to slash, and then the
 * specific ID of this meetup item."
 *
 * Example: If props.id = "m1", router.push(`/${props.id}`) navigates to "/m1"
 *
 * ============================================================================
 * 📋 PROPS THIS COMPONENT RECEIVES
 * ============================================================================
 *
 * ┌─────────────┬─────────────────────────────────────────────────────────┐
 * │ Prop        │ Description                                              │
 * ├─────────────┼─────────────────────────────────────────────────────────┤
 * │ id          │ Unique identifier - USED FOR NAVIGATION                 │
 * │ image       │ URL of the meetup image                                 │
 * │ title       │ Name/title of the meetup                                │
 * │ address     │ Physical location of the meetup                         │
 * └─────────────┴─────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * Import useRouter hook for programmatic navigation
 *
 * From the instructor:
 * "So we can import useRouter from next/router."
 *
 * This hook gives us access to the router object which has:
 * - query property (URL parameters)
 * - push() method (navigate to new page)
 * - replace() method (navigate without history)
 * - back() method (go to previous page)
 */
import { useRouter } from 'next/router';

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

/**
 * MeetupItem Component - Displays a Single Meetup Card
 *
 * Renders one meetup with image, title, address, and action button.
 * Clicking "Show Details" navigates to the meetup detail page.
 *
 * @param {Object} props
 * @param {string} props.id - Unique meetup identifier (used for navigation)
 * @param {string} props.image - URL of the meetup image
 * @param {string} props.title - Title/name of the meetup
 * @param {string} props.address - Physical address of the meetup
 */
function MeetupItem(props) {
  /**
   * GET THE ROUTER OBJECT
   *
   * From the instructor:
   * "We can then call useRouter here in the component, not in the show
   * details handler, it's a React hook and therefore the rules of hooks
   * apply and we should only use React hooks directly at the root level
   * of a component function. And hence here we call useRouter, get access
   * to that router object."
   *
   * IMPORTANT: Call useRouter at the TOP level of the component,
   * never inside conditions, loops, or nested functions!
   */
  const router = useRouter();

  /**
   * SHOW DETAILS HANDLER - Programmatic Navigation
   *
   * From the instructor:
   * "And instead, I want to create a function here, a function which will
   * then navigate us away. The showDetailsHandler, that could be the function
   * name, and now we connect this button with an onClick prop."
   *
   * This function is called when the "Show Details" button is clicked.
   * It uses router.push() to navigate to the detail page for this meetup.
   */
  function showDetailsHandler() {
    /**
     * NAVIGATE TO MEETUP DETAIL PAGE
     *
     * From the instructor:
     * "We can now construct a dynamic path here by using props.id.
     * So this will lead us to slash, and then the specific ID of this
     * meetup item."
     *
     * Example paths:
     * - props.id = "m1" → navigates to "/m1"
     * - props.id = "m2" → navigates to "/m2"
     *
     * This URL will be handled by pages/[meetupId]/index.js
     * where meetupId will equal props.id
     *
     * From the instructor:
     * "This pushes a new page onto the stack of pages and it's the equivalent
     * of using the link component if you don't want a link but instead
     * navigate programmatically."
     */
    router.push('/' + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        {/* Image Section */}
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>

        {/* Content Section */}
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>

        {/*
         * Actions Section - Button with Programmatic Navigation
         *
         * From the instructor:
         * "And now we connect this button with an onClick prop to this function."
         *
         * When clicked, showDetailsHandler() is called which uses
         * router.push() to navigate to the meetup detail page.
         *
         * ALTERNATIVE: Could use Link component instead
         * <Link href={`/${props.id}`}>
         *   <button>Show Details</button>
         * </Link>
         *
         * From the instructor:
         * "A link would technically be a bit better" (for accessibility/SEO)
         * but programmatic navigation is useful for form submissions etc.
         */}
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
