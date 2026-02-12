/**
 * ============================================================================
 * src/components/Products/ProductItem.js - LESSON 564 (BONUS: MULTIPLE SLICES)
 * ============================================================================
 *
 * PRODUCT ITEM — DISPATCH-ONLY CONSUMER WITH OPTIMIZATION:
 *
 * This component demonstrates the shouldListen optimization (lesson 563)
 * in the context of a multi-slice store. It calls useStore(false) to opt
 * out of listener registration, meaning it will NOT re-render when the
 * global state changes — whether from the products slice OR the counter
 * slice.
 *
 * Without this optimization, every counter button click would trigger a
 * re-render of every ProductItem, even though counter changes have nothing
 * to do with products. useStore(false) + React.memo ensures ProductItem
 * only re-renders when its parent (Products.js) passes new props.
 *
 * The console.log('RENDERING') is a debugging aid to verify the
 * optimization: after toggling a single favorite, only ONE "RENDERING"
 * message should appear in the console (for the toggled item), not four.
 *
 * ============================================================================
 */

import React from 'react';

import Card from '../UI/Card';
// Named import of useStore. This component uses dispatch only — it does
// not read state from the store. Product data arrives via props from
// the parent Products.js component.
import { useStore } from '../../hooks-store/store';
import './ProductItem.css';

// React.memo prevents re-renders when props haven't changed. Combined with
// useStore(false) (no listener registration), this component is shielded
// from both products-slice and counter-slice state changes.
const ProductItem = React.memo(props => {
  console.log('RENDERING');
  // useStore(false)[1] extracts only the dispatch function (second element).
  // Passing false means this component is NOT registered as a listener —
  // it can dispatch actions but won't re-render on state changes.
  const dispatch = useStore(false)[1];

  // Dispatch the TOGGLE_FAV action (from products-store.js) with the
  // product id as payload. The same dispatch function could also send
  // 'ADD' or 'SUB' actions to the counter slice if needed — all actions
  // from all slices are available through the same dispatch.
  const toggleFavHandler = () => {
    dispatch('TOGGLE_FAV', props.id);
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
