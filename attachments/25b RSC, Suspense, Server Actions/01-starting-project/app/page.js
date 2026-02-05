/**
 * ============================================================================
 * app/page.js - LESSON 508: SECTION INTRODUCTION
 * ============================================================================
 *
 * LESSON 508: Overview of the "RSC, Suspense & Server Actions" section
 *
 * ============================================================================
 * WHAT THIS SECTION COVERS
 * ============================================================================
 *
 * This section revisits and summarizes several key React features that were
 * introduced during the NextJS course section. These features are part of
 * React itself, but they are NOT available in every React project. This
 * section explains why that limitation exists and dives deeper into each one.
 *
 * The three main topics covered in this section are:
 *
 * 1. REACT SERVER COMPONENTS (RSC) & CLIENT COMPONENTS
 *
 *    Server components run exclusively on the server and never ship their
 *    JavaScript to the browser. Client components are the traditional React
 *    components that run in the browser. Understanding when and why to use
 *    each type is essential for modern React development with frameworks
 *    like NextJS.
 *
 * 2. SERVER ACTIONS (vs. FORM ACTIONS)
 *
 *    Server actions are functions that execute on the server but can be
 *    triggered from client-side code (e.g., form submissions). This section
 *    compares server actions with form actions, which were covered in an
 *    earlier section of the course. While form actions run in the browser,
 *    server actions run on the server, giving them access to databases,
 *    file systems, and other server-only resources.
 *
 * 3. SUSPENSE & THE use() HOOK
 *
 *    React's Suspense component allows you to show fallback UI while
 *    waiting for asynchronous operations to complete. The use() hook,
 *    added in React 19, was previously introduced in the context section
 *    as a way to consume React context. Here we learn its second purpose:
 *    unwrapping promises to access asynchronously resolved data, which
 *    works in combination with Suspense in certain project setups.
 *
 * ============================================================================
 * WHY THESE FEATURES AREN'T AVAILABLE IN EVERY PROJECT
 * ============================================================================
 *
 * These features -- server components, server actions, and promise-based
 * use() -- require a framework that supports server-side rendering and
 * server-side execution. A plain client-side React app (e.g., one created
 * with Vite alone) has no server runtime, so these features simply cannot
 * work there.
 *
 * Frameworks like NextJS provide the server infrastructure needed to run
 * components on the server, handle server actions, and stream Suspense
 * boundaries. That's why this section uses a NextJS project as its
 * starting point.
 *
 * ============================================================================
 * THIS STARTING PROJECT
 * ============================================================================
 *
 * This is a minimal NextJS 15 app with React 19, using the App Router.
 * It contains just a root layout, this home page, and some global CSS.
 * Throughout this section, we will build on this foundation to demonstrate
 * each of the features described above.
 *
 * Project stack:
 *   - Next.js 15 (App Router)
 *   - React 19
 *   - No additional dependencies (just next, react, react-dom)
 *
 * ============================================================================
 * PREREQUISITE NOTE
 * ============================================================================
 *
 * The previous NextJS section (Section 25) is recommended before starting
 * this section, as it introduces many of these concepts in practice. However,
 * it is not a hard requirement -- this section can serve as a standalone
 * summary of these advanced React features.
 *
 * ============================================================================
 */

export default function Home() {
  return (
    <main>
      <p>Let's go!</p>
    </main>
  );
}
