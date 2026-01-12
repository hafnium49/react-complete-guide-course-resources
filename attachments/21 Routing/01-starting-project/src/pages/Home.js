/**
 * ============================================================================
 * HOME PAGE COMPONENT (Lessons 346, 349, 350, 353)
 * ============================================================================
 *
 * ============================================================================
 * IMPERATIVE/PROGRAMMATIC NAVIGATION (Lesson 353)
 * ============================================================================
 *
 * TWO WAYS TO NAVIGATE (Lesson 353):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "Right now, we allow users to navigate between our pages by providing links
 * which can be clicked, and I will say right away that this is the default
 * way of providing navigation to users, but it's not the only way."
 *
 * | Method               | Component/Hook | When to Use                      |
 * |----------------------|----------------|----------------------------------|
 * | Declarative (Links)  | Link, NavLink  | User clicks to navigate (DEFAULT)|
 * | Imperative (Code)    | useNavigate    | Navigate from code (special cases)|
 *
 * WHEN TO USE PROGRAMMATIC NAVIGATION (Lesson 353):
 * =================================================
 * INSTRUCTOR QUOTE:
 * "In some situations, for example, maybe because some forum was submitted,
 * or because some timer expired, you might want to trigger a navigation
 * action from inside Code."
 *
 * USE CASES FOR useNavigate:
 * - After form submission (redirect to success page)
 * - After timer expires (session timeout redirect)
 * - After authentication (redirect to dashboard)
 * - After API call completes (navigate to result page)
 * - Conditional navigation based on state
 *
 * IMPORTANT WARNING (Lesson 353):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "Of course, you should not create buttons and then navigate programmatically.
 * Simply use a link instead."
 *
 * INSTRUCTOR QUOTE:
 * "Again, you should use a link instead of this approach but this is how you
 * would navigate programmatically, if you would need to do so, for example,
 * because some timer expired or anything like that."
 *
 * RULE OF THUMB:
 * ==============
 * - If user clicks to navigate → Use Link or NavLink
 * - If code triggers navigation → Use useNavigate
 *
 * ============================================================================
 * NAVIGATION NOW HANDLED BY LAYOUT (Lesson 350)
 * ============================================================================
 *
 * BEFORE LESSON 350:
 * ==================
 * We had to add Link components directly in each page component.
 * This was repetitive - every page needed navigation links.
 *
 * AFTER LESSON 350:
 * =================
 * INSTRUCTOR QUOTE (Lesson 350):
 * "The advantage of this approach is that this root layout now, indeed, does
 * act as a wrapper for these page components."
 *
 * Navigation is now in MainNavigation component, rendered by RootLayout.
 * All pages automatically get navigation without any code duplication!
 *
 * HOW THIS PAGE IS RENDERED (Lesson 350):
 * =======================================
 * 1. User visits localhost:3000/
 * 2. Router matches the parent route (path: '/')
 * 3. RootLayout renders (includes MainNavigation)
 * 4. Router matches child route (path: '/')
 * 5. HomePage renders at <Outlet /> in RootLayout
 *
 * VISUALIZATION:
 * ==============
 * ┌─────────────────────────────────┐
 * │        RootLayout               │
 * │  ┌───────────────────────────┐  │
 * │  │    MainNavigation         │  │
 * │  │  [Home]  [Products]       │  │
 * │  └───────────────────────────┘  │
 * │  ┌───────────────────────────┐  │
 * │  │  <main className=content> │  │
 * │  │  ┌─────────────────────┐  │  │
 * │  │  │  <Outlet /> renders │  │  │
 * │  │  │  THIS HomePage!     │  │  │
 * │  │  └─────────────────────┘  │  │
 * │  └───────────────────────────┘  │
 * └─────────────────────────────────┘
 */

/**
 * useNavigate HOOK IMPORT (Lesson 353):
 * =====================================
 * INSTRUCTOR QUOTE (Lesson 353):
 * "You can import the useNavigate hook and call that in your functional
 * components to get access to a navigate function."
 *
 * useNavigate is a React Hook provided by react-router-dom that:
 * - Returns a navigate function
 * - Allows programmatic/imperative navigation
 * - Works inside functional components only (it's a Hook!)
 */
import { useNavigate } from 'react-router-dom';

/**
 * HOME PAGE COMPONENT:
 * ====================
 * INSTRUCTOR QUOTE (Lesson 346):
 * "Here we could then add a Home.js file that contains our homepage component."
 *
 * This component is now simpler - just the page content.
 * Navigation and layout are handled by RootLayout.
 */
function HomePage() {
  /**
   * =========================================================================
   * useNavigate HOOK (Lesson 353)
   * =========================================================================
   *
   * INSTRUCTOR QUOTE (Lesson 353):
   * "You can import the useNavigate hook and call that in your functional
   * components to get access to a navigate function, like this, and this
   * navigate function can be called to trigger a navigation action."
   *
   * HOW IT WORKS:
   * =============
   * 1. Call useNavigate() hook at the top of your component
   * 2. It returns a navigate function
   * 3. Call navigate('/path') to programmatically change routes
   *
   * INSTRUCTOR QUOTE:
   * "So, to switch to a different route from inside your code. So,
   * programmatically."
   */
  const navigate = useNavigate();

  /**
   * NAVIGATION HANDLER FUNCTION (Lesson 353):
   * =========================================
   * INSTRUCTOR QUOTE (Lesson 353):
   * "For example, here I could add my navigateHandler function, and connect
   * that to a button."
   *
   * This function demonstrates programmatic navigation.
   * When called, it uses the navigate function to change routes.
   *
   * REAL-WORLD SCENARIOS WHERE YOU'D USE THIS:
   * ===========================================
   * - After form submission: navigate('/success')
   * - After login: navigate('/dashboard')
   * - After timer expires: navigate('/session-expired')
   * - After creating a resource: navigate(`/items/${newItemId}`)
   */
  function navigateHandler() {
    /**
     * CALLING THE NAVIGATE FUNCTION (Lesson 353):
     * ============================================
     * INSTRUCTOR QUOTE:
     * "And then in here we can call the navigate function, and then for
     * example, navigate to /products or any other path."
     *
     * The navigate function accepts:
     * - A path string: navigate('/products')
     * - A relative path: navigate('products') (relative to current route)
     * - A number: navigate(-1) (go back), navigate(1) (go forward)
     *
     * INSTRUCTOR QUOTE:
     * "If we add this code, we get this button, and if I click this button,
     * we navigate. This time programmatically, even though it's upon a
     * button click, but the button click only triggered a function, and
     * inside that function, we then had the actual code, the programmatic
     * imperative navigation code for moving to a different page."
     */
    navigate('/products');
  }

  return (
    <>
      <h1>My Home Page</h1>
      <p>Welcome to our website!</p>

      {/**
       * DEMO BUTTON FOR PROGRAMMATIC NAVIGATION (Lesson 353):
       * ======================================================
       * INSTRUCTOR QUOTE:
       * "And this, by the way, is something I'm only doing for this example
       * here. Of course, you should not create buttons and then navigate
       * programmatically. Simply use a link instead, but a button is a great
       * way for me to show you how this generally works here."
       *
       * WARNING: This is for DEMONSTRATION ONLY!
       * ========================================
       * INSTRUCTOR QUOTE:
       * "Again, not something you wanna do but good enough for this demo here."
       *
       * In real applications:
       * - For user-initiated navigation → Use <Link> or <NavLink>
       * - For code-triggered navigation → Use useNavigate()
       *   (e.g., after form submit, timer, API response, etc.)
       */}
      <p>
        <button onClick={navigateHandler}>Navigate to Products</button>
      </p>
    </>
  );
}

export default HomePage;

/**
 * ============================================================================
 * SUMMARY: DECLARATIVE vs IMPERATIVE NAVIGATION (Lesson 353)
 * ============================================================================
 *
 * DECLARATIVE (Link/NavLink):
 * ===========================
 * <Link to="/products">Go to Products</Link>
 *
 * - User clicks, React Router handles navigation
 * - The "what" (destination) is declared in JSX
 * - Preferred for user-initiated navigation
 *
 * IMPERATIVE (useNavigate):
 * =========================
 * const navigate = useNavigate();
 * navigate('/products');
 *
 * - Code explicitly commands navigation
 * - Useful when navigation depends on logic/events
 * - Use for: form submissions, timers, API responses, conditions
 *
 * INSTRUCTOR QUOTE (Lesson 353):
 * "It is something which I also wanted to mention here for completeness sake,
 * even though we don't need it on this page, but you might need it in other
 * applications, and now you know how you can navigate programmatically."
 */
