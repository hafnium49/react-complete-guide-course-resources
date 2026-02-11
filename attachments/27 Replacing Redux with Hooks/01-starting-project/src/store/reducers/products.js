/**
 * ============================================================================
 * src/store/reducers/products.js - LESSON 554
 * ============================================================================
 *
 * THE PRODUCT REDUCER — REDUX STATE MANAGEMENT:
 *
 * This is a standard Redux reducer that manages the entire products state.
 * It holds an array of product objects, each with an id, title, description,
 * and isFavorite boolean.
 *
 * INITIAL STATE:
 *
 * The initialState object contains a hardcoded list of four products, all
 * starting with isFavorite: false. In a real app, this data might come
 * from an API, but hardcoding it keeps the focus on the Redux-to-hooks
 * migration rather than data fetching.
 *
 * TOGGLE_FAV ACTION HANDLING:
 *
 * When a TOGGLE_FAV action is dispatched, the reducer:
 *   1. Finds the target product by matching action.productId
 *   2. Inverts its isFavorite boolean
 *   3. Creates a NEW array with the updated product (immutable update)
 *   4. Returns a new state object (never mutates the existing state)
 *
 * This immutable update pattern — spreading the array and spreading the
 * individual product object — is fundamental to Redux. The reducer must
 * always return a brand-new state object so Redux can detect changes.
 *
 * This entire file will be replaced when we migrate away from Redux.
 *
 * ============================================================================
 */

import { TOGGLE_FAV } from '../actions/products';

// LESSON 554: Every product starts with isFavorite: false. The favorite
// status is toggled by dispatching TOGGLE_FAV with the product's id.
const initialState = {
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
};

// LESSON 554: The reducer receives the current state and an action, then
// returns a new state. The default parameter (initialState) is used on
// the very first call when Redux initializes the store.
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    // LESSON 554: Immutable update — find the product, flip its isFavorite,
    // and return a new state with a new products array. Never mutate in place.
    case TOGGLE_FAV:
      const prodIndex = state.products.findIndex(
        p => p.id === action.productId
      );
      const newFavStatus = !state.products[prodIndex].isFavorite;
      const updatedProducts = [...state.products];
      updatedProducts[prodIndex] = {
        ...state.products[prodIndex],
        isFavorite: newFavStatus
      };
      return {
        ...state,
        products: updatedProducts
      };
    default:
      return state;
  }
};

export default productReducer;
