/**
 * ============================================================================
 * components/UsePromisesDemo.js - LESSONS 515 & 516
 * ============================================================================
 *
 * LESSON 515: This component started as an async server component that
 *             fetched data internally and worked with <Suspense>.
 * LESSON 516: Converted to a CLIENT component using the use() hook to
 *             unwrap a promise received as a prop from a server component.
 *
 * ============================================================================
 * 🎓 LESSON 515: THE PROBLEM WITH BLOCKING DATA FETCHING (recap)
 * ============================================================================
 *
 * In Lesson 515, this was an async server component that fetched data
 * directly (using Node.js fs.readFile) with a 2-second simulated delay.
 * When wrapped in <Suspense>, the page loaded instantly with a fallback
 * while this component awaited its data on the server. That worked well.
 *
 * ============================================================================
 * 🎓 LESSON 516: WHY CONVERT TO A CLIENT COMPONENT?
 * ============================================================================
 *
 * The problem arises when you need client-side features (like useState)
 * in the same component that displays fetched data. For example, if you
 * need an interactive counter alongside the user list, you need useState,
 * which requires 'use client'. But client components:
 *
 *   - Cannot be async functions
 *   - Cannot use Node.js APIs like fs.readFile
 *   - Cannot fetch data directly on the server
 *
 * So the data fetching must move back to the parent server component
 * (page.js), and we need a way to receive and wait for that data in
 * this client component. That's where the use() hook comes in.
 *
 * ============================================================================
 * THE use() HOOK WITH PROMISES
 * ============================================================================
 *
 * The use() hook is imported from 'react' (added in React 19). You may
 * have seen it earlier in the course for consuming context (as an
 * alternative to useContext). But it has a second purpose: it can
 * unwrap/resolve promises in a Suspense-compatible way.
 *
 * HOW IT WORKS:
 *
 *   1. A server component (page.js) creates a promise that will
 *      eventually resolve with data (e.g., fetchUsersPromise)
 *   2. That promise is passed as a prop to this client component
 *   3. This component calls use(usersPromise) to unwrap the promise
 *   4. While the promise is pending, React "suspends" this component
 *      and shows the <Suspense> fallback from the parent
 *   5. When the promise resolves, React re-renders this component
 *      with the resolved data (the users array)
 *
 * This gives us the best of both worlds:
 *   - The component is a client component (can use useState, onClick, etc.)
 *   - It still integrates with Suspense for loading fallbacks
 *   - The data fetching remains on the server (in page.js)
 *
 * ============================================================================
 * IMPORTANT LIMITATIONS OF use() WITH PROMISES
 * ============================================================================
 *
 * The use() hook does NOT work with any arbitrary promise you create in
 * client-side code. It only works with:
 *
 *   1. Promises created in a SERVER component and passed as props
 *      (like in this example -- the promise is created in page.js)
 *
 *   2. Promises created by libraries that integrate with React's
 *      Suspense protocol (e.g., frameworks like NextJS, data fetching
 *      libraries that implement Suspense-aware caching)
 *
 * This is because Suspense requires special coordination between the
 * promise and React's rendering lifecycle. Regular promises don't
 * provide this coordination, so use() would not work properly with them.
 *
 * ============================================================================
 * THE PATTERN: SERVER CREATES PROMISE → CLIENT UNWRAPS WITH use()
 * ============================================================================
 *
 *   page.js (SERVER)                    UsePromiseDemo (CLIENT)
 *   ─────────────────                   ────────────────────────
 *   1. Create promise                   4. Receive promise as prop
 *      (fetchUsersPromise)
 *   2. Pass promise as prop ──────────► 5. Call use(usersPromise)
 *   3. Render <Suspense>                6. Suspense shows fallback
 *      with fallback                       while pending
 *                                       7. When resolved, render
 *                                          data + interactive UI
 *
 * ============================================================================
 */

'use client';

import { useState, use } from 'react';

export default function UsePromiseDemo({ usersPromise }) {
  // use() unwraps the promise received from the server component.
  // While the promise is pending, React suspends this component and
  // the parent <Suspense> shows its fallback. Once resolved, `users`
  // contains the resolved value (the array of user objects).
  const users = use(usersPromise);

  // useState is why this MUST be a client component. Server components
  // cannot manage state. This counter demonstrates that the component
  // is fully interactive on the client side, alongside server-fetched data.
  const [count, setCount] = useState(0);

  return (
    <div className="rsc">
      <h2>RSC with Data Fetching</h2>
      <p>
        Uses <strong>async / await</strong> for data fetching.
      </p>
      {/* Interactive UI: this button and counter prove that this is a
          client component with full interactivity, while the user list
          below comes from a promise created on the server. */}
      <p>
        <button onClick={() => setCount((prevCount) => prevCount + 1)}>
          Increment
        </button>
        <span>{count}</span>
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
