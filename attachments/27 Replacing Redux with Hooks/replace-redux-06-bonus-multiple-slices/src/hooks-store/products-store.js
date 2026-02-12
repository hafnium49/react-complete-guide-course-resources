/**
 * ============================================================================
 * src/hooks-store/products-store.js - LESSON 564 (BONUS: MULTIPLE STATE SLICES)
 * ============================================================================
 *
 * THE PRODUCTS SLICE — ONE OF MULTIPLE CONCURRENT SLICES:
 *
 * This file is unchanged from the single-slice version (lesson 560). It
 * defines the TOGGLE_FAV action and seeds the products initial state by
 * calling initStore. What makes this a "slice" rather than "the whole store"
 * is that counter-store.js also calls initStore — both contributions merge
 * into the same globalState and actions objects inside store.js.
 *
 * After both configureProductsStore() and configureCounterStore() run:
 *   globalState = { products: [...4 items], counter: 0 }
 *   actions     = { TOGGLE_FAV: fn, ADD: fn, SUB: fn }
 *
 * This slice owns the "products" state key and the "TOGGLE_FAV" action
 * identifier. It has no awareness of the counter slice and vice versa —
 * each slice is self-contained. The store engine handles the merging.
 *
 * ============================================================================
 */

import { initStore } from './store';

const configureStore = () => {
  // The TOGGLE_FAV action receives the full globalState and a productId
  // payload. It only reads/modifies state.products — the counter key (from
  // the other slice) passes through untouched because the returned object
  // { products: updatedProducts } only overwrites the "products" key.
  const actions = {
    TOGGLE_FAV: (curState, productId) => {
      const prodIndex = curState.products.findIndex(p => p.id === productId);
      const newFavStatus = !curState.products[prodIndex].isFavorite;
      const updatedProducts = [...curState.products];
      updatedProducts[prodIndex] = {
        ...curState.products[prodIndex],
        isFavorite: newFavStatus
      };
      return { products: updatedProducts };
    }
  };
  // Register this slice's action and initial products array. initStore merges
  // these into the global store alongside any other slices already registered.
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
