/**
 * ============================================================================
 * HOME PAGE COMPONENT (Lessons 346, 349)
 * ============================================================================
 *
 * ============================================================================
 * NAVIGATION BETWEEN PAGES (Lesson 349)
 * ============================================================================
 *
 * THE PROBLEM (Lesson 349):
 * =========================
 * INSTRUCTOR QUOTE (Lesson 349):
 * "At the moment, we always have to manually edit the URL if we wanna navigate
 * from the starting page to the products page and vice versa. And it's, of
 * course, not very realistic that we want our users to use this website like
 * this because how would users know which kind of paths are supported here?"
 *
 * Users need clickable links to navigate - they can't be expected to type URLs!
 *
 * THE NAIVE APPROACH - USING <a> TAGS (Lesson 349):
 * =================================================
 * INSTRUCTOR QUOTE:
 * "We could, for example, go to the HomePage and there we could add some text
 * below the title with a paragraph. And for example, say Go to and then add
 * a link with the default anchor element."
 *
 * You COULD use a regular HTML anchor tag:
 * <a href="/products">the list of products</a>
 *
 * This would work... but there's a PROBLEM!
 *
 * WHY <a> TAGS ARE BAD FOR SPA ROUTING (Lesson 349):
 * ==================================================
 * INSTRUCTOR QUOTE:
 * "If you watch this refresh icon here, as I click on the link, you will see
 * that it briefly flashes and turns to a cross and back to a refresh icon.
 * The reason for that is that technically, we're sending a new request to
 * the server that's serving this website."
 *
 * INSTRUCTOR QUOTE:
 * "What happens under the hood is that we, of course, load all the JavaScript
 * code again, load the entire React application again and restart the React
 * application. That's a lot of unnecessary work under the hood that can also
 * impact the site performance."
 *
 * PROBLEMS WITH <a href="...">:
 * ============================
 * 1. Sends new HTTP request to server
 * 2. Re-downloads all JavaScript
 * 3. Restarts the entire React application
 * 4. Loses all context and application-wide state
 * 5. Poor performance (unnecessary network traffic)
 * 6. Defeats the purpose of Single Page Applications!
 *
 * INSTRUCTOR QUOTE:
 * "With that, we lose all the benefits of single page applications after all."
 *
 * THE SOLUTION - LINK COMPONENT (Lesson 349):
 * ===========================================
 * INSTRUCTOR QUOTE:
 * "Instead, we wanna have a link like this but under the hood, it should just
 * change the URL and set it to the URL we're trying to navigate to but it
 * should then prevent the default of sending a request and instead let React
 * Router know about the new URL and ensure that React Router loads the
 * appropriate element for that new URL."
 *
 * INSTRUCTOR QUOTE:
 * "And that can be implemented with another special component that can be
 * imported from react-router-dom... called Link."
 */

import { Link } from 'react-router-dom';

/**
 * HOME PAGE COMPONENT:
 * ====================
 * This component demonstrates proper navigation using the Link component.
 */
function HomePage() {
  return (
    <>
      <h1>My Home Page</h1>

      {/**
       * LINK COMPONENT USAGE (Lesson 349):
       * ==================================
       * INSTRUCTOR QUOTE:
       * "The new component we wanna import from react-router-dom is called Link.
       * And as the name suggests, we can use it to construct a link. We use it
       * instead of the default anchor element."
       *
       * KEY DIFFERENCE - 'to' vs 'href' (Lesson 349):
       * =============================================
       * INSTRUCTOR QUOTE:
       * "And it doesn't have a ref attribute. Instead, we use the to attribute.
       * But there we then still specify the path we wanna go to."
       *
       * | Regular Anchor     | Link Component       |
       * |--------------------|----------------------|
       * | <a href="/path">   | <Link to="/path">    |
       * | Sends HTTP request | No HTTP request      |
       * | Full page reload   | Client-side routing  |
       * | Loses state        | Preserves state      |
       *
       * HOW LINK WORKS UNDER THE HOOD (Lesson 349):
       * ===========================================
       * INSTRUCTOR QUOTE:
       * "Now, what the link component does under the hood is it does render an
       * anchor element but it basically listens for clicks on that element,
       * prevents the browser default of sending a HTTP request if the link is
       * clicked, and instead simply takes a look at the route definitions to
       * update the page accordingly and load the appropriate content."
       *
       * INSTRUCTOR QUOTE:
       * "It will also change the URL but without sending a new HTTP request."
       *
       * What Link does:
       * 1. Renders an <a> tag (for accessibility and SEO)
       * 2. Attaches click event listener
       * 3. Calls event.preventDefault() on click
       * 4. Updates the browser URL using History API
       * 5. Tells React Router to render the matching route element
       * 6. No network request sent!
       *
       * THE RESULT (Lesson 349):
       * ========================
       * INSTRUCTOR QUOTE:
       * "So if we create this link here, we still see the link here on this page,
       * but if I now click it, and you watch this refresh icon, you see that it
       * doesn't flash and we don't send a new HTTP request."
       *
       * INSTRUCTOR QUOTE:
       * "Instead, here, we can now use this link, which is provided by
       * react-router-dom and that is how we should navigate between pages
       * with react-router-dom."
       */}
      <p>
        Go to <Link to="/products">the list of products</Link>.
      </p>

      {/**
       * WHY THIS IS IMPORTANT FOR SPAs:
       * ===============================
       * Single Page Applications (SPAs) work by:
       * 1. Loading the app once
       * 2. Handling all navigation on the client side
       * 3. Only fetching data when needed (not entire pages)
       *
       * Using <a> tags breaks this model.
       * Using <Link> preserves it.
       *
       * BEST PRACTICE:
       * ==============
       * - Use <Link> for internal navigation (within your app)
       * - Use <a> only for external links (to other websites)
       */}
    </>
  );
}

export default HomePage;
