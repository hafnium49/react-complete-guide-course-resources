/**
 * ============================================================================
 * SECTION 23: DEPLOYING REACT APPS
 * ============================================================================
 *
 * This section covers the complete process of taking a React application
 * from development to production and deploying it to a real server.
 *
 * ============================================================================
 * LESSON 403 - DEPLOYMENT OVERVIEW & STEPS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So how do you deploy our React application? How do you push it onto a real
 * server? There are a couple of steps involved, which you can go through
 * whenever you deploy or redeploy your application."
 *
 * ============================================================================
 * THE DEPLOYMENT WORKFLOW (5 Steps)
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STEP 1: WRITE YOUR CODE                                                │
 * │  ───────────────────────                                                │
 * │  This is the development phase - building features, components, etc.    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *                                    ↓
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STEP 2: TEST YOUR CODE                                                 │
 * │  ──────────────────────                                                 │
 * │  INSTRUCTOR QUOTE:                                                      │
 * │  "You wanna thoroughly test your application before you deploy it.      │
 * │  You wanna play around with it, test different things, see if you       │
 * │  handle errors correctly. Things like that. You wanna make sure that    │
 * │  you are shipping an application which is ready to be used."            │
 * │                                                                         │
 * │  Testing includes:                                                      │
 * │  • Manual testing (clicking through the app)                            │
 * │  • Unit tests (testing individual components)                           │
 * │  • Integration tests (testing how parts work together)                  │
 * │  • Error handling verification                                          │
 * │  • Edge case testing                                                    │
 * │                                                                         │
 * │  Command: npm test                                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *                                    ↓
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STEP 3: OPTIMIZE YOUR CODE                                             │
 * │  ─────────────────────────                                              │
 * │  INSTRUCTOR QUOTE:                                                      │
 * │  "You might wanna explore optimization opportunities. There are certain │
 * │  things in your code which you can optimize. Most importantly, you      │
 * │  might wanna look into a concept called lazy loading."                  │
 * │                                                                         │
 * │  Optimization techniques:                                               │
 * │  • LAZY LOADING - Load code only when needed (covered in later lessons) │
 * │  • Code splitting - Break bundle into smaller chunks                    │
 * │  • Memoization - Prevent unnecessary re-renders                         │
 * │  • Image optimization                                                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *                                    ↓
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STEP 4: BUILD FOR PRODUCTION                                           │
 * │  ────────────────────────────                                           │
 * │  INSTRUCTOR QUOTE:                                                      │
 * │  "Once you're happy with your code, it's optimized and it's working,    │
 * │  then it's time to build your app for production. And with build, I     │
 * │  don't mean that you need to write more code, but instead, we will      │
 * │  execute a script which was written for us already."                    │
 * │                                                                         │
 * │  INSTRUCTOR QUOTE:                                                      │
 * │  "A script which will then output a production ready bundle of our      │
 * │  code which is unified and automatically optimized to be as small as    │
 * │  possible."                                                             │
 * │                                                                         │
 * │  Command: npm run build                                                 │
 * │                                                                         │
 * │  What the build process does:                                           │
 * │  • Minifies JavaScript (removes whitespace, shortens variable names)    │
 * │  • Bundles all files together                                           │
 * │  • Optimizes assets (images, CSS)                                       │
 * │  • Creates a /build folder with deployment-ready files                  │
 * │                                                                         │
 * │  INSTRUCTOR QUOTE:                                                      │
 * │  "Shipping less code will load the app faster, and therefore is better, │
 * │  and we'll be able to automatically generate such an optimized,         │
 * │  minified code bundle with a certain script."                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *                                    ↓
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STEP 5: DEPLOY TO A SERVER                                             │
 * │  ─────────────────────────                                              │
 * │  INSTRUCTOR QUOTE:                                                      │
 * │  "Once we get this optimized code package, which is ready for           │
 * │  deployment, we need to deploy that package, and therefore the next     │
 * │  step is that we take that code, which is produced for us, which is     │
 * │  based on the code we wrote, of course, and upload it to a server."     │
 * │                                                                         │
 * │  Popular hosting options:                                               │
 * │  • Firebase Hosting (Google)                                            │
 * │  • Netlify                                                              │
 * │  • Vercel                                                               │
 * │  • AWS S3 + CloudFront                                                  │
 * │  • GitHub Pages                                                         │
 * │  • Heroku                                                               │
 * │                                                                         │
 * │  INSTRUCTOR QUOTE:                                                      │
 * │  "You will definitely need to configure your server or your hosting     │
 * │  provider's offering."                                                  │
 * │                                                                         │
 * │  Key configuration considerations:                                      │
 * │  • SPA routing (all routes should serve index.html)                     │
 * │  • HTTPS/SSL certificates                                               │
 * │  • Caching headers                                                      │
 * │  • Environment variables                                                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * WHY OPTIMIZATION MATTERS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "We wanna ship as little code as possible to our users because they will
 * only be able to interact with our website once it's fully loaded. So
 * shipping less code will load the app faster, and therefore is better."
 *
 * PERFORMANCE IMPACT:
 *
 * Unoptimized App:
 * ┌────────────────────────────────────────────────┐
 * │ main.js (2.5 MB)  →  Slow load  →  Poor UX    │
 * └────────────────────────────────────────────────┘
 *
 * Optimized App:
 * ┌────────────────────────────────────────────────┐
 * │ main.js (250 KB)  →  Fast load  →  Great UX   │
 * └────────────────────────────────────────────────┘
 *
 * The build process achieves this through:
 * 1. MINIFICATION - Removes comments, whitespace, shortens names
 *    Before: function calculateTotalPrice(items) { return items.reduce(...) }
 *    After:  function a(b){return b.reduce(...)}
 *
 * 2. TREE SHAKING - Removes unused code
 *    If you import { useState } from 'react', only useState is included,
 *    not the entire React library.
 *
 * 3. BUNDLING - Combines multiple files into fewer files
 *    100 source files → 1-3 optimized bundles
 *
 * ============================================================================
 * UPCOMING LESSONS IN THIS SECTION
 * ============================================================================
 *
 * • Lazy Loading - Load route components only when visited
 * • Building the App - Running npm run build
 * • Deploying - Uploading to a hosting provider
 * • Server Configuration - SPA routing configuration
 *
 * ============================================================================
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

/**
 * ============================================================================
 * ROUTER CONFIGURATION
 * ============================================================================
 *
 * This is a standard React Router setup with:
 * - RootLayout as the parent layout component
 * - HomePage as the index route
 * - Blog routes with data loaders
 *
 * NOTE: This current setup loads ALL route components upfront, even if the
 * user never visits them. In the next lesson, we'll optimize this with
 * LAZY LOADING to load components only when needed.
 *
 * CURRENT BEHAVIOR:
 * User visits "/" → HomePage, BlogPage, PostPage ALL loaded immediately
 *
 * AFTER LAZY LOADING (Lesson 404):
 * User visits "/" → Only HomePage loaded
 * User visits "/posts" → BlogPage loaded on demand
 * User visits "/posts/1" → PostPage loaded on demand
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          { index: true, element: <BlogPage />, loader: postsLoader },
          { path: ':id', element: <PostPage />, loader: postLoader },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
