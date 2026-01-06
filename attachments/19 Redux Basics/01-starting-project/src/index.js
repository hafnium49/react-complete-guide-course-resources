/**
 * ============================================================================
 * MAIN APPLICATION ENTRY POINT (Lesson 312)
 * ============================================================================
 *
 * This file is the entry point for our React application. Here we provide
 * our Redux store to the entire React app using the Provider component.
 *
 * LESSON 312 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Understanding where to provide the Redux store (highest level)
 * 2. Importing Provider from 'react-redux' (not 'redux')
 * 3. Wrapping the root component with Provider
 * 4. Setting the store prop on Provider
 * 5. Understanding which components get access to Redux
 *
 * WHY THIS FILE? (Lesson 312)
 * ===========================
 * INSTRUCTOR QUOTE:
 * "To provide our Redux store to the React app, we typically go into this
 * index JS file, where we rendered the entire app. So to the highest level
 * we can go, in our react application, to the top of our component tree,
 * where we render this root component."
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * IMPORTING PROVIDER FROM REACT-REDUX (Lesson 312)
 * =================================================
 * INSTRUCTOR QUOTE:
 * "And now here, we can import from react Redux. So not from Redux,
 * but from react Redux. And what we import here, is now the provider component.
 * This is actually a component."
 *
 * IMPORTANT: Import from 'react-redux', NOT 'redux'!
 * - 'redux': Core Redux library (createStore, etc.)
 * - 'react-redux': React bindings for Redux (Provider, useSelector, useDispatch)
 *
 * Provider is a React component that makes the Redux store available
 * to any nested components that need access to the Redux state.
 */
import { Provider } from 'react-redux';

/**
 * IMPORTING THE STORE (Lesson 312)
 * =================================
 * INSTRUCTOR QUOTE:
 * "Instead we have to import our store from, store index in this case.
 * So that store, which we're exporting in there, we're importing this
 * into index JS."
 *
 * We import the store we created and exported in store/index.js.
 * Since we used 'export default store', we can import it with any name,
 * but 'store' is the most descriptive.
 */
import store from './store';

import './index.css';
import App from './App';

/**
 * RENDERING THE APP WITH REDUX PROVIDER (Lesson 312)
 * ===================================================
 * We wrap our entire App component with the Provider component.
 *
 * SIMILARITY TO REACT CONTEXT (Lesson 312):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "We wrap all our root component, with provider, a little bit, as we used
 * our own context provider components. If you recall that from earlier in
 * the course. We also build our own context, provider components, using
 * react context, and we wrapped our app or a part of our app with that as well.
 * We're basically doing the same here."
 *
 * Just like React Context's Provider pattern:
 * - Context: <MyContext.Provider value={...}><App /></MyContext.Provider>
 * - Redux:   <Provider store={...}><App /></Provider>
 *
 * PROVIDER PLACEMENT FLEXIBILITY (Lesson 312):
 * ============================================
 * INSTRUCTOR QUOTE:
 * "And you don't have to use provider on this highest component level.
 * You could also wrap nested components with provider, but only wrapped
 * components and their child components, and the child components of the
 * child components, and so on. Only those components will have access
 * to Redux thereafter."
 *
 * WHEN TO PROVIDE AT THE HIGHEST LEVEL (Lesson 312):
 * ==================================================
 * INSTRUCTOR QUOTE:
 * "And if the vast majority of your components need access to the store,
 * if maybe your entire app, needs access to the store, you should typically
 * provide, on this highest level."
 *
 * THE STORE PROP (Lesson 312):
 * ============================
 * INSTRUCTOR QUOTE:
 * "Now just by wrapping Provider around app, we're not telling react Redux
 * and react therefore, which store we wanna provide. Sure. We only have one
 * store, but that's stored in this index JS file, react Redux of course
 * doesn't know that data file holds our store."
 *
 * "We have a store prop, which we have to set. And this one's a value,
 * a value which is our Redux store. So this store, which we're importing here,
 * we're setting this as a value, for the store prop on this provider component."
 *
 * WHAT THIS ENABLES (Lesson 312):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "And that now provides our Redux store, to this react app. Now on its own,
 * that doesn't do much. Now the store is provided, but that doesn't change
 * anything at the moment. But now our components in this app, the app component,
 * and any other child components, can tap into that store. They can get data
 * out of the store. They can set up a subscription to that data to be precise,
 * and they also can dispatch actions."
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /**
   * PROVIDER COMPONENT
   * ==================
   * The Provider component from react-redux:
   * - Makes the Redux store available to all nested components
   * - Uses React Context internally to pass the store down
   * - Components use useSelector() to read state
   * - Components use useDispatch() to dispatch actions
   *
   * Props:
   * - store: The Redux store created with createStore()
   */
  <Provider store={store}>
    <App />
  </Provider>
);

/**
 * ============================================================================
 * SUMMARY - LESSON 312 WORKFLOW
 * ============================================================================
 *
 * 1. IMPORT PROVIDER:
 *    import { Provider } from 'react-redux';
 *    (Note: from 'react-redux', NOT 'redux')
 *
 * 2. IMPORT YOUR STORE:
 *    import store from './store';
 *
 * 3. WRAP YOUR APP:
 *    <Provider store={store}>
 *      <App />
 *    </Provider>
 *
 * COMPONENT ACCESS TO REDUX:
 * ==========================
 * | Component Position      | Has Redux Access? |
 * |-------------------------|-------------------|
 * | Inside Provider         | Yes               |
 * | Outside Provider        | No                |
 * | Child of wrapped comp   | Yes               |
 * | Sibling outside         | No                |
 *
 * AFTER PROVIDING THE STORE:
 * ==========================
 * Components can now:
 * - Read state using useSelector() hook
 * - Dispatch actions using useDispatch() hook
 * - React to state changes automatically
 *
 * NEXT STEPS (Upcoming Lessons):
 * ==============================
 * - Use useSelector() to read counter value in Counter component
 * - Use useDispatch() to dispatch increment/decrement actions
 */
