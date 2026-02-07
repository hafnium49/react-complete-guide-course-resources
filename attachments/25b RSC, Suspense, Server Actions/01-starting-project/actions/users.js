/**
 * ============================================================================
 * actions/users.js - LESSON 514: SERVER ACTIONS IN A SEPARATE FILE
 * ============================================================================
 *
 * This file contains a "server action" -- a function that executes on the
 * server but can be triggered from client-side code (like a form submission).
 *
 * ============================================================================
 * 🎓 LESSON 514: WHAT IS A SERVER ACTION?
 * ============================================================================
 *
 * A server action starts as a regular "form action" (the kind you learned
 * about in the Form Actions section of the course). Form actions are a
 * standard React feature that work in any React project -- you pass a
 * function to a <form>'s action prop, and React calls that function with
 * the FormData when the form is submitted.
 *
 * A SERVER action is a form action that has been upgraded to run on the
 * server instead of in the browser. This upgrade is done with the
 * 'use server' directive, and it requires a project that supports
 * server-side execution (like NextJS).
 *
 * FORM ACTION (browser)           SERVER ACTION (server)
 * ─────────────────────           ──────────────────────
 * - Runs in the browser           - Runs on the server
 * - Works in any React project    - Needs framework support (NextJS, etc.)
 * - No directive needed           - Requires 'use server' directive
 * - Can access browser APIs       - Can access server resources (DB, FS)
 * - No network request            - Automatically sends data to server
 *
 * ============================================================================
 * THE 'use server' DIRECTIVE (FILE-LEVEL)
 * ============================================================================
 *
 * The 'use server' string at the top of this file marks ALL exported
 * functions in this file as server actions. This is different from placing
 * 'use server' inside an individual function body (which marks only that
 * one function).
 *
 * There are TWO ways to create server actions:
 *
 *   1. INLINE in a server component:
 *      Define the function inside a server component and put 'use server'
 *      inside the function body. This ONLY works in server components --
 *      you cannot do this in a file that has 'use client' at the top,
 *      because 'use client' and 'use server' in the same file is a
 *      contradiction.
 *
 *   2. IN A SEPARATE FILE (this approach):
 *      Put 'use server' at the top of a dedicated file (like this one).
 *      All exported functions become server actions. You can then import
 *      and use them from ANY component -- including client components.
 *      The build process handles the code splitting: the action stays
 *      on the server, while the import in the client component is
 *      replaced with an automatic network call.
 *
 * The separate-file approach is required when you want to call a server
 * action from a client component, since you cannot define server actions
 * inline in a 'use client' file.
 *
 * ============================================================================
 * WHY THE FUNCTION MUST BE async
 * ============================================================================
 *
 * Server actions must be async functions. This is because calling a server
 * action from the client involves a network request to the server, which
 * is inherently asynchronous. React needs the function to return a promise
 * so it can handle the request/response lifecycle properly.
 *
 * ============================================================================
 * HOW THIS ACTION WORKS
 * ============================================================================
 *
 * This function receives a FormData object (automatically provided by React
 * when the form is submitted). It:
 *   1. Reads the current data from dummy-db.json using Node.js fs
 *   2. Parses the JSON into an array of users
 *   3. Creates a new user object from the form fields (name, title)
 *   4. Appends the new user to the array
 *   5. Writes the updated array back to dummy-db.json
 *
 * The console.log proves server-side execution: the message appears in
 * the terminal (server), NOT in the browser console.
 *
 * ============================================================================
 */

'use server';

import fs from 'node:fs';

export async function saveUserAction(formData) {
  // This log appears in the terminal (server), never in the browser.
  // It proves that this function executes on the server even though
  // it was triggered by a form submission in the browser.
  console.log('Executed');

  // Node.js file system code -- only possible because this runs on
  // the server. Reading and writing files is a server-only operation.
  const data = fs.readFileSync('dummy-db.json', 'utf-8');
  const instructors = JSON.parse(data);
  const newInstructor = {
    id: new Date().getTime().toString(),
    name: formData.get('name'),
    title: formData.get('title'),
  };

  instructors.push(newInstructor);
  fs.writeFileSync('dummy-db.json', JSON.stringify(instructors));
}
