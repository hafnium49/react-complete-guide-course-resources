/**
 * ============================================================================
 * src/index.js - LESSON 553
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
 */

import React from 'react';
// LESSON 553: React 18 uses 'react-dom/client' (not 'react-dom') for the
// createRoot API, which enables concurrent rendering features.
import ReactDOM from 'react-dom/client';
// LESSON 553: Provider is the Redux wrapper that injects the store into the
// component tree. This will be replaced by a custom Context provider later.
import { Provider } from 'react-redux';
// LESSON 553: combineReducers and createStore are core Redux functions.
// combineReducers merges multiple reducer slices; createStore creates
// the central store object. Both will be removed when Redux is replaced.
import { combineReducers, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
// LESSON 553: The product reducer manages the products list and favorites.
// It will be replaced by useReducer or useState within a Context provider.
import productReducer from './store/reducers/products';

// LESSON 553: "shop" is the key under which productReducer's state lives.
// Connected components access it as state.shop.products, state.shop.favorites, etc.
const rootReducer = combineReducers({
  shop: productReducer,
});

// LESSON 553: The single source of truth for the entire app's state.
const store = createStore(rootReducer);

// LESSON 553: React 18's createRoot replaces the legacy ReactDOM.render().
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // LESSON 553: Provider makes the Redux store accessible to all descendants.
  // Any component wrapped with connect() (or using useSelector) can read from
  // and dispatch actions to this store.
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
