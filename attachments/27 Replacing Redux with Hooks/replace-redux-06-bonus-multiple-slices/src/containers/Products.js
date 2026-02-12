/**
 * ============================================================================
 * src/containers/Products.js - LESSON 564 (BONUS: MULTIPLE STATE SLICES)
 * ============================================================================
 *
 * PRODUCTS PAGE — READING THE PRODUCTS SLICE:
 *
 * This component reads state.products from the global store via useStore().
 * Even though the globalState now also contains a "counter" key (from the
 * counter slice), this component ignores it entirely — it only accesses
 * state.products, the key registered by products-store.js.
 *
 * Each component is free to cherry-pick whichever state properties it
 * needs. There is no formal mechanism to "select" a slice (unlike Redux's
 * useSelector). The component simply accesses the property it wants from
 * the shared globalState object.
 *
 * ============================================================================
 */

import React from 'react';

import ProductItem from '../components/Products/ProductItem';
// Named import of useStore from the generic store module. The same hook
// is used by every consumer regardless of which slice they interact with.
import { useStore } from '../hooks-store/store';
import './Products.css';

const Products = props => {
  // useStore()[0] extracts just the state (first element). This component
  // only reads — it does not dispatch actions — so dispatch is not needed.
  // state.products is the array seeded by configureProductsStore().
  const state = useStore()[0];
  return (
    <ul className="products-list">
      {state.products.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
