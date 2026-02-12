/**
 * ============================================================================
 * src/index.js - LESSON 564 (BONUS: MULTIPLE STATE SLICES)
 * ============================================================================
 *
 * INITIALIZING MULTIPLE STORE SLICES BEFORE RENDERING:
 *
 * This is the entry point where all store slices are configured. Each
 * configureXxxStore function is imported and called BEFORE ReactDOM.render.
 * This ensures that globalState and actions in store.js are fully populated
 * before any component mounts and calls useStore().
 *
 * TWO CONFIGURE CALLS — TWO SLICES:
 *
 *   configureProductsStore() → adds { products: [...] } to globalState
 *                                adds { TOGGLE_FAV: fn } to actions
 *
 *   configureCounterStore()  → adds { counter: 0 } to globalState
 *                                adds { ADD: fn, SUB: fn } to actions
 *
 * The order of these calls does not matter functionally — each call merges
 * its data additively into the shared objects. After both calls complete,
 * globalState = { products: [...], counter: 0 } and all three actions are
 * available.
 *
 * SCALING TO MORE SLICES:
 *
 * Adding a third slice (e.g., authentication, cart, UI preferences) would
 * simply mean creating a new hooks-store/xxx-store.js file following the
 * same pattern, importing its configureXxxStore here, and calling it.
 * No changes to store.js or existing slices are needed. This is the same
 * extensibility pattern as adding a new reducer to Redux's combineReducers.
 *
 * NO PROVIDER WRAPPER:
 *
 * Unlike both Redux (<Provider>) and Context (<ProductsProvider>), the
 * custom hook store requires no wrapping component. The function calls
 * below are the entire setup. Components access the store by importing
 * and calling useStore() — the module-level variables in store.js handle
 * the sharing automatically through JavaScript's module system.
 *
 * ============================================================================
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
// Import the configuration function for each store slice.
import configureProductsStore from './hooks-store/products-store';
import configureCounterStore from './hooks-store/counter-store';

// Call each slice's configuration function to register its state and actions.
// Both calls merge into the same globalState and actions objects in store.js.
configureProductsStore();
configureCounterStore();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
