/**
 * ============================================================================
 * ENTRY POINT - React Application with Routing (Lesson 345)
 * ============================================================================
 *
 * SECTION 21: REACT ROUTER
 * ========================
 * This file is the entry point for the React application.
 * In later lessons, this file will be modified to set up routing.
 *
 * ============================================================================
 * PROJECT SETUP (Lesson 345)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 345):
 * "It is a very simple project created with create-react-app, and it doesn't
 * contain a lot of content, just some basic styles with which we can work and
 * an empty root component, the app component."
 *
 * CREATE REACT APP SETUP:
 * =======================
 * This project was created with create-react-app, which provides:
 * - React and ReactDOM installed
 * - Webpack configuration (hidden)
 * - Development server with hot reload
 * - Build scripts for production
 *
 * TO RUN THIS PROJECT:
 * ====================
 * npm start    <- Starts development server on http://localhost:3000
 * npm build    <- Creates production build
 * npm test     <- Runs tests
 *
 * ============================================================================
 * WHAT WILL CHANGE IN LATER LESSONS
 * ============================================================================
 *
 * STEP 2: ACTIVATE THE ROUTER (from Lesson 345's three steps)
 * ===========================================================
 * INSTRUCTOR QUOTE:
 * "The second step is to activate our router and load the route definitions
 * that we defined in the first step."
 *
 * In later lessons, this file will likely be updated to:
 *
 * OPTION A: Use RouterProvider (Modern approach)
 * -----------------------------------------------
 * import { RouterProvider } from 'react-router-dom';
 * import router from './router';  // Route definitions
 *
 * root.render(
 *   <React.StrictMode>
 *     <RouterProvider router={router} />
 *   </React.StrictMode>
 * );
 *
 * OPTION B: Use BrowserRouter (Classic approach)
 * -----------------------------------------------
 * import { BrowserRouter } from 'react-router-dom';
 *
 * root.render(
 *   <React.StrictMode>
 *     <BrowserRouter>
 *       <App />
 *     </BrowserRouter>
 *   </React.StrictMode>
 * );
 *
 * ============================================================================
 * REACT 18+ CREATEROOT API
 * ============================================================================
 *
 * This project uses React 18+'s createRoot API:
 *
 * const root = ReactDOM.createRoot(document.getElementById('root'));
 *
 * This replaced the older ReactDOM.render() method and enables:
 * - Concurrent rendering features
 * - Automatic batching of state updates
 * - Better Suspense support (useful for routing!)
 *
 * ============================================================================
 * REACT STRICT MODE
 * ============================================================================
 *
 * <React.StrictMode> wraps the app for development checks:
 * - Detects potential problems in components
 * - Warns about deprecated APIs
 * - Double-invokes certain functions to detect side effects
 *
 * Note: This may cause effects to run twice in development mode.
 * This is intentional and helps catch bugs early!
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * STYLES:
 * =======
 * Global CSS styles for the application.
 * Contains basic styling to work with during routing lessons.
 */
import './index.css';

/**
 * APP COMPONENT:
 * ==============
 * The root component of the application.
 * Currently empty - will be built up in subsequent lessons.
 */
import App from './App';

/**
 * CREATE ROOT AND RENDER:
 * =======================
 * React 18+ way of rendering the application.
 *
 * getElementById('root') finds the <div id="root"> in public/index.html
 * This is where our entire React application will be mounted.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * INITIAL RENDER:
 * ===============
 * Renders the App component wrapped in StrictMode.
 *
 * In later lessons, this will be modified to include routing:
 * - Either wrap with BrowserRouter
 * - Or replace App with RouterProvider
 */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
