/**
 * ============================================================================
 * src/index.js - LESSONS 553, 555 & 561
 * ============================================================================
 *
 * REACT 18 UPGRADE NOTE:
 *
 * This project was originally built with React 17, which used
 * ReactDOM.render() to mount the app. It has been updated to React 18's
 * createRoot API. This is the ONLY change required for the upgrade —
 * all concepts taught in this section apply equally to both versions.
 *
 * The old React 17 pattern:
 *   ReactDOM.render(<App />, document.getElementById('root'));
 *
 * The new React 18 pattern:
 *   const root = ReactDOM.createRoot(document.getElementById('root'));
 *   root.render(<App />);
 *
 * THE CURRENT REDUX SETUP (WILL BE REPLACED):
 *
 * This file currently wires together a standard Redux architecture:
 *
 *   1. combineReducers merges individual reducers (here, productReducer)
 *      into a single rootReducer. The "shop" key means the products
 *      slice of state is accessed via state.shop in connected components.
 *
 *   2. createStore creates the Redux store from the combined reducer.
 *      This store holds the entire application state tree.
 *
 *   3. <Provider store={store}> wraps the entire app, making the Redux
 *      store available to any component that calls connect() or
 *      useSelector/useDispatch. Without Provider, no component can
 *      access the store.
 *
 *   4. <BrowserRouter> enables client-side routing via React Router.
 *
 * In the upcoming lessons, Provider, combineReducers, createStore, and
 * the entire Redux dependency will be replaced by React's Context API
 * and custom hooks — achieving the same global state management with
 * only built-in React features.
 *
 * ============================================================================
 * LESSON 555: REPLACING REDUX PROVIDER WITH CONTEXT PROVIDER
 * ============================================================================
 *
 * The Redux imports (Provider, combineReducers, createStore, productReducer)
 * are now removed. In their place, ProductsProvider is imported from
 * context/products-context.js.
 *
 * ProductsProvider wraps the app tree just like Redux's <Provider> did,
 * but instead of injecting a Redux store, it provides a React Context
 * that any descendant can consume via useContext(ProductsContext).
 *
 * Nothing else in this file changes — BrowserRouter and App remain the
 * same. The store folder is kept for reference but is no longer used.
 *
 * ============================================================================
 * LESSON 561: REPLACING CONTEXT PROVIDER WITH CUSTOM HOOK STORE
 * ============================================================================
 *
 * The ProductsProvider wrapper is removed entirely. In its place, we
 * simply import and call configureStore() from hooks-store/products-store.
 *
 * KEY DIFFERENCE FROM CONTEXT AND REDUX:
 *
 * Both Redux and Context required a Provider component wrapping the app
 * tree. The custom hook store needs NO wrapping component at all.
 * Calling configureStore() registers the initial state and actions in
 * the module-level variables (globalState, actions) inside store.js.
 * Any component that later calls useStore() automatically reads from
 * and writes to those shared variables.
 *
 * MULTIPLE STORE SLICES:
 *
 * If the app had additional store slices (e.g., an auth store, a cart
 * store), each would have its own configureXxxStore function. All of
 * them would be imported and called here — each call merges its state
 * and actions into the single shared global store, analogous to calling
 * combineReducers with multiple reducers in Redux.
 *
 * ============================================================================
 */

import React from 'react';
// LESSON 553: React 18 uses 'react-dom/client' (not 'react-dom') for the
// createRoot API, which enables concurrent rendering features.
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
// LESSON 561: Import and call configureStore to initialize the products slice.
// This registers the TOGGLE_FAV action and seeds globalState.products with
// the initial product data — no Provider component wrapping needed.
import configureProductsStore from './hooks-store/products-store';

// LESSON 561: Call the configuration function BEFORE rendering. This ensures
// that globalState and actions in store.js are populated before any component
// mounts and calls useStore(). For multiple slices, each configureXxxStore
// would be called here side by side.
configureProductsStore();

// LESSON 553: React 18's createRoot replaces the legacy ReactDOM.render().
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // LESSON 561: No wrapper component needed — unlike Redux's <Provider> or
  // the Context-based ProductsProvider, the custom hook store is initialized
  // by the function call above. The shared module-level variables in store.js
  // are accessible to any component that imports useStore.
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
