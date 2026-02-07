/**
 * ============================================================================
 * components/DataFetchingDemo.js - LESSON 513: DATA FETCHING IN SERVER
 *                                              COMPONENTS
 * ============================================================================
 *
 * This component demonstrates one of the most powerful advantages of React
 * Server Components: the ability to fetch data directly inside the component
 * using server-side code -- including Node.js APIs.
 *
 * ============================================================================
 * 🎓 LESSON 513: SERVER-SIDE DATA FETCHING WITH async/await
 * ============================================================================
 *
 * WHY THIS IS ONLY POSSIBLE IN A SERVER COMPONENT
 *
 * This component uses Node.js's built-in `fs` (file system) module to read
 * a JSON file from disk. This would be impossible in a client component for
 * two reasons:
 *
 *   1. Node.js APIs like `fs` do not exist in the browser. The browser has
 *      no file system access via Node.js modules.
 *
 *   2. React does not allow client components to be async functions.
 *      Client components must render synchronously (they can use useEffect
 *      for async work, but the component function itself cannot be async).
 *
 * Because this is a server component (no 'use client' directive), it runs
 * entirely on the server in a Node.js environment. That means:
 *   - We CAN import Node.js built-in modules like 'node:fs/promises'
 *   - We CAN use the `async` keyword on the component function
 *   - We CAN use `await` to wait for asynchronous operations to complete
 *   - The code in this file is NEVER sent to or executed in the browser
 *
 * ============================================================================
 * HOW THIS CHANGES DATA FETCHING COMPARED TO CLIENT COMPONENTS
 * ============================================================================
 *
 * TRADITIONAL APPROACH (client components / Vite projects):
 *
 *   1. The browser loads the page (initially empty or with a loading spinner)
 *   2. The component mounts and useEffect fires
 *   3. useEffect sends a fetch() request to a separate backend API
 *   4. The backend queries a database or reads a file
 *   5. The response travels back to the browser over the network
 *   6. The component re-renders with the fetched data
 *
 *   → Requires a separate backend / API endpoint
 *   → Extra round trip between browser and server
 *   → User sees a loading state before data appears
 *
 * SERVER COMPONENT APPROACH (this component):
 *
 *   1. The server renders this component and awaits the data
 *   2. The finished HTML (with data already included) is sent to the browser
 *   3. The user sees the complete page immediately -- no loading spinner
 *
 *   → No separate backend API needed
 *   → No extra network round trip for data
 *   → No loading state visible to the user on initial load
 *   → Data fetching code lives right inside the component
 *
 * ============================================================================
 * THE dummy-db.json FILE
 * ============================================================================
 *
 * The data source here is a simple JSON file (dummy-db.json) placed in the
 * root project directory. It simulates a database containing user records.
 * In a real application, you could replace the fs.readFile() call with a
 * database query, an API call to an external service, or any other
 * server-side data source.
 *
 * ============================================================================
 * THE 'node:fs/promises' IMPORT
 * ============================================================================
 *
 * The 'node:' prefix is the modern way to import Node.js built-in modules.
 * 'node:fs/promises' gives us the promise-based version of the file system
 * API, which works naturally with async/await. The readFile() function
 * reads the entire file content as a string (when 'utf-8' encoding is
 * specified), which we then parse as JSON.
 *
 * ============================================================================
 */

import fs from 'node:fs/promises';

export default async function DataFetchingDemo() {
  // Read the dummy database file from the project root directory.
  // This is Node.js code -- it only works because this component executes
  // on the server. The browser will never see this import or this call.
  const data = await fs.readFile('dummy-db.json', 'utf-8');
  const users = JSON.parse(data);

  // By the time React renders this JSX, the data is already loaded.
  // The browser receives finished HTML with the user list included --
  // no useEffect, no loading state, no separate API call needed.
  return (
    <div className="rsc">
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
