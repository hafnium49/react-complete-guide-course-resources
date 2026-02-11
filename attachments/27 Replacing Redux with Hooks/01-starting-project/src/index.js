/**
 * ============================================================================
 * src/index.js - LESSONS 553 & 555
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
 */

import React from 'react';
// LESSON 553: React 18 uses 'react-dom/client' (not 'react-dom') for the
// createRoot API, which enables concurrent rendering features.
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
// LESSON 555: ProductsProvider replaces Redux's <Provider store={store}>.
// It wraps the app tree and provides the products state via React Context.
// No Redux imports (Provider, combineReducers, createStore) are needed anymore.
import ProductsProvider from './context/products-context';

// LESSON 553: React 18's createRoot replaces the legacy ReactDOM.render().
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // LESSON 555: ProductsProvider replaces the Redux <Provider>. It manages
  // the products state internally via useState and makes it available to
  // all descendants through ProductsContext. No store prop needed.
  <ProductsProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ProductsProvider>
);
