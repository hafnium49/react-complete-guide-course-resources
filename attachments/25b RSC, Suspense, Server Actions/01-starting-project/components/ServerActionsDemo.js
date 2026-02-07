/**
 * ============================================================================
 * components/ServerActionsDemo.js - LESSON 514: SERVER ACTIONS
 * ============================================================================
 *
 * This component demonstrates how server actions work with forms in React.
 * It is a CLIENT component ('use client') that imports a server action
 * from a separate file and uses it as a form action.
 *
 * ============================================================================
 * 🎓 LESSON 514: WHY THIS IS A CLIENT COMPONENT
 * ============================================================================
 *
 * During the lesson, this component went through two stages:
 *
 * STAGE 1 - SERVER COMPONENT (initial):
 *   The component started as a server component (no 'use client') with
 *   the saveUserAction function defined INLINE, containing 'use server'
 *   inside the function body. This worked because you CAN define server
 *   actions inline inside server components.
 *
 * STAGE 2 - CLIENT COMPONENT (final, current state):
 *   The component was converted to a client component to demonstrate that
 *   server actions can also be called from client components. However,
 *   you CANNOT define a server action inline in a client component --
 *   having 'use client' at the file level and 'use server' inside a
 *   function in the same file is a contradiction. React will throw an
 *   error if you try this.
 *
 *   The solution: move the server action to a SEPARATE file
 *   (actions/users.js) with 'use server' at the top of that file,
 *   and then import it here. The framework's build process can split
 *   the code when actions are in separate files: the component code
 *   goes to the client bundle, and the imported server action stays
 *   on the server. Behind the scenes, the import is replaced with
 *   an automatic network call that sends the FormData to the server.
 *
 * ============================================================================
 * RULES FOR SERVER ACTIONS IN CLIENT vs. SERVER COMPONENTS
 * ============================================================================
 *
 *   IN A SERVER COMPONENT FILE:
 *   ✓ Can define server actions inline (with 'use server' inside function)
 *   ✓ Can import server actions from separate files
 *
 *   IN A CLIENT COMPONENT FILE ('use client'):
 *   ✗ CANNOT define server actions inline ('use client' + 'use server'
 *     in same file is not allowed)
 *   ✓ CAN import server actions from separate files (like this component
 *     does with saveUserAction from actions/users.js)
 *
 * ============================================================================
 * WHY async IS REMOVED FROM THE COMPONENT FUNCTION
 * ============================================================================
 *
 * Since this is now a client component, the component function itself
 * cannot be async (as discussed in Lesson 512 -- only server components
 * can be async functions). The saveUserAction is still async, but it
 * lives in the separate actions/users.js file which runs on the server.
 *
 * ============================================================================
 * HOW THE FORM SUBMISSION WORKS
 * ============================================================================
 *
 * The <form action={saveUserAction}> setup uses React's form action
 * pattern. When the user clicks "Save User":
 *
 *   1. React collects the FormData from the form inputs
 *   2. Since saveUserAction is a server action (imported from a
 *      'use server' file), React sends the FormData to the server
 *      via an automatic network request
 *   3. The server executes saveUserAction with the FormData
 *   4. The action reads dummy-db.json, adds the new user, and writes
 *      the updated data back to the file
 *   5. The console.log('Executed') appears in the terminal, not in
 *      the browser -- proving server-side execution
 *
 * ============================================================================
 */

'use client';

// The server action is imported from a separate file. This import
// is what makes it possible to use server actions in client components.
// The build tool replaces this import with an automatic RPC mechanism
// that sends form data to the server when the action is invoked.
import { saveUserAction } from '@/actions/users';

export default function ServerActionsDemo() {
  return (
    <div className='rsc'>
      <h2>Server Actions</h2>
      <p>
        A "Form Action" converted to a "Server Action" via{' '}
        <strong>"use server"</strong>.
      </p>
      <p>Can be defined in a server component or a separate file.</p>
      <p>Can be called from inside server component or client component.</p>
      {/* The action prop receives the imported server action. When the
          form is submitted, React automatically sends the FormData to
          the server where saveUserAction executes. The form input names
          ('name' and 'title') become keys in the FormData object that
          the server action reads with formData.get(). */}
      <form action={saveUserAction}>
        <p>
          <label htmlFor='name'>User name</label>
          <input type='text' id='name' name='name' required />
        </p>
        <p>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' name='title' required />
        </p>
        <p>
          <button>Save User</button>
        </p>
      </form>
    </div>
  );
}
