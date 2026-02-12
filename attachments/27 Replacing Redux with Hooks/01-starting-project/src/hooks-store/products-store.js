/**
 * ============================================================================
 * src/hooks-store/products-store.js - LESSON 560
 * ============================================================================
 *
 * CONCRETE PRODUCTS STORE SLICE — USING THE GENERIC HOOK STORE
 *
 * While store.js provides the abstract infrastructure (shared state,
 * listeners, dispatch), this file is the CONCRETE configuration for the
 * products domain. It defines what the products state looks like and
 * what actions can be performed on it.
 *
 * This separation mirrors the Redux pattern of having a generic store
 * mechanism (createStore) and domain-specific reducers (productsReducer).
 * The difference is that here, actions are standalone functions rather
 * than cases inside a switch statement.
 *
 * THE configureStore FUNCTION:
 *
 * This function sets up the products slice by calling initStore with
 * two arguments:
 *
 *   1. actions: An object mapping action identifier strings to handler
 *      functions. Each handler receives (currentState, payload) and
 *      returns a partial state object containing only the keys that
 *      changed. The store's dispatch function merges this partial state
 *      into the full globalState.
 *
 *   2. initialState: An object with a "products" key holding the array
 *      of product objects. This seeds the globalState with the starting
 *      product data — the same data that was previously in the Redux
 *      reducer's initialState and later in the Context provider's
 *      useState.
 *
 * THE TOGGLE_FAV ACTION:
 *
 * The action function receives the full globalState (as curState) and
 * a productId payload. It performs the same immutable update as the
 * Context version and the Redux reducer before it:
 *
 *   1. Find the target product's index by id
 *   2. Read and flip its isFavorite boolean
 *   3. Create a shallow copy of the products array
 *   4. Replace the target element with a new object containing the
 *      flipped isFavorite
 *   5. Return { products: updatedProducts } — only the changed slice
 *
 * The returned object is merged into globalState by the dispatch
 * function in store.js, preserving any other state slices that may
 * exist (e.g., if a separate "auth-store.js" also registered state).
 *
 * WHY curState.products:
 *
 * Because globalState is a flat object shared by all slices, the
 * products array lives at globalState.products. The action reads from
 * curState.products (the current global state's products key) rather
 * than from a separate isolated state — unlike Redux where each
 * reducer only sees its own slice via combineReducers.
 *
 * EXPORTING configureStore:
 *
 * The function is exported so that the app's entry point (e.g.,
 * index.js) can call it at startup to register the products actions
 * and initial state before any component renders.
 *
 * ============================================================================
 */

import { initStore } from './store';

// LESSON 560: configureStore sets up the products slice of the global store.
// It defines the available actions and the initial product data, then calls
// initStore to register both with the shared store infrastructure.
const configureStore = () => {
  // LESSON 560: The actions object maps string identifiers to handler
  // functions. Each handler receives the full globalState (curState) and
  // an optional payload, and returns a partial state object containing
  // only the properties that changed.
  const actions = {
    // LESSON 560: TOGGLE_FAV mirrors the same immutable update logic from
    // the Redux reducer and Context provider. The second parameter (productId)
    // is the payload passed through dispatch — it identifies which product's
    // favorite status to flip.
    TOGGLE_FAV: (curState, productId) => {
      const prodIndex = curState.products.findIndex(p => p.id === productId);
      const newFavStatus = !curState.products[prodIndex].isFavorite;
      const updatedProducts = [...curState.products];
      updatedProducts[prodIndex] = {
        ...curState.products[prodIndex],
        isFavorite: newFavStatus
      };
      // LESSON 560: Return only the changed slice — { products: ... }.
      // The dispatch function in store.js will merge this into globalState
      // via spread, preserving state from other slices.
      return { products: updatedProducts };
    }
  };

  // LESSON 560: The initial products data — the same array that was in
  // the Redux reducer's initialState and later in the Context provider's
  // useState. This seeds globalState.products when the app starts.
  initStore(actions, {
    products: [
      {
        id: 'p1',
        title: 'Red Scarf',
        description: 'A pretty red scarf.',
        isFavorite: false
      },
      {
        id: 'p2',
        title: 'Blue T-Shirt',
        description: 'A pretty blue t-shirt.',
        isFavorite: false
      },
      {
        id: 'p3',
        title: 'Green Trousers',
        description: 'A pair of lightly green trousers.',
        isFavorite: false
      },
      {
        id: 'p4',
        title: 'Orange Hat',
        description: 'Street style! An orange hat.',
        isFavorite: false
      }
    ]
  });
};

export default configureStore;
