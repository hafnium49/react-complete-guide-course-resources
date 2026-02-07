/**
 * ============================================================================
 * components/UsePromisesDemo.js - LESSON 515: SUSPENSE & DATA FETCHING
 * ============================================================================
 *
 * This component demonstrates how React's <Suspense> component integrates
 * with async server components to provide a loading fallback while data
 * is being fetched on the server.
 *
 * ============================================================================
 * 🎓 LESSON 515: THE PROBLEM WITH BLOCKING DATA FETCHING
 * ============================================================================
 *
 * This component went through several iterations during the lesson:
 *
 * ITERATION 1 - DATA FETCHED IN page.js, PASSED AS PROP:
 *
 *   Initially this component was a simple presentational component that
 *   received a `users` prop from page.js. The data fetching happened in
 *   page.js (which is also a server component), and the users were passed
 *   down. This worked, but had a major UX problem: if the data fetch was
 *   slow, the ENTIRE page was blocked. Nothing appeared on screen until
 *   the data arrived, because page.js couldn't finish rendering without it.
 *
 * ITERATION 2 - DATA FETCHED IN THIS COMPONENT (current):
 *
 *   The data fetching code was moved INTO this component, making it an
 *   async server component. This alone doesn't fix the blocking problem,
 *   but it makes the component self-contained -- the slow data fetch is
 *   now isolated to this one component rather than blocking the parent.
 *
 *   This isolation is what enables the use of <Suspense>.
 *
 * ============================================================================
 * HOW SUSPENSE SOLVES THE BLOCKING PROBLEM
 * ============================================================================
 *
 * In page.js, this component is wrapped with React's <Suspense> component:
 *
 *   <Suspense fallback={<p>Loading users...</p>}>
 *     <UsePromiseDemo />
 *   </Suspense>
 *
 * When Suspense wraps an async server component:
 *
 *   1. React begins rendering this component on the server
 *   2. When it hits the `await` (the 2-second delay here), React
 *      "suspends" -- it pauses rendering this component
 *   3. Instead of blocking the entire page, React sends the fallback
 *      content (<p>Loading users...</p>) to the browser immediately
 *   4. The rest of the page loads instantly -- only this component waits
 *   5. When the data finally resolves, React renders this component
 *      and streams the result to the browser, replacing the fallback
 *
 * WITHOUT Suspense: the entire page is blank for 2 seconds
 * WITH Suspense: the page loads instantly with "Loading users..." shown,
 *   then the actual data appears after 2 seconds
 *
 * ============================================================================
 * WHY SUSPENSE WORKS WITH SERVER COMPONENTS
 * ============================================================================
 *
 * Suspense does not work with just any component that fetches data.
 * It works with:
 *   - Async React server components (like this one)
 *   - Components using libraries that integrate with React's Suspense
 *     protocol (sending special signals to React behind the scenes)
 *   - Lazy-loaded components (React.lazy, which you saw earlier in
 *     the course for code splitting)
 *
 * A plain useEffect + fetch() call in a client component does NOT
 * integrate with Suspense. This is an important distinction.
 *
 * ============================================================================
 * THE SIMULATED DELAY
 * ============================================================================
 *
 * The 2-second delay below simulates a slow database query or network
 * request. In a real application, you would replace this with an actual
 * database call or API request. The delay makes it easy to observe the
 * difference between blocking (no Suspense) and streaming (with Suspense).
 *
 * ============================================================================
 * WHAT'S NEXT: THE use() HOOK
 * ============================================================================
 *
 * This lesson sets the stage for the use() hook, which is explored in
 * the next lesson. The use() hook allows CLIENT components to consume
 * promises in a Suspense-compatible way -- without needing async/await
 * (which isn't allowed in client components). This will enable a pattern
 * where the promise is created in a server component (page.js) and
 * passed as a prop to a client component that unwraps it with use().
 *
 * ============================================================================
 */

import fs from 'node:fs/promises';

export default async function UsePromiseDemo() {
  // Simulate a slow server / database query with a 2-second delay.
  // Without <Suspense> in page.js, this would block the entire page
  // from loading. With <Suspense>, the page loads immediately and
  // shows a fallback message until this data resolves.
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = await fs.readFile('dummy-db.json', 'utf-8');
  const users = JSON.parse(data);

  return (
    <div className='rsc'>
      <h2>RSC with Data Fetching</h2>
      <p>
        Uses <strong>async / await</strong> for data fetching.
      </p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.title})
          </li>
        ))}
      </ul>
    </div>
  );
}
