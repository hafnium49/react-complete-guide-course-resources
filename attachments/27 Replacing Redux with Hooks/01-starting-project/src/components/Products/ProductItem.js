/**
 * ============================================================================
 * src/components/Products/ProductItem.js - LESSONS 554 & 555
 * ============================================================================
 *
 * PRODUCT ITEM — DISPATCHING ACTIONS TO THE REDUX STORE:
 *
 * This component renders a single product card with a "Favorite" /
 * "Un-Favorite" toggle button. It demonstrates the WRITE side of Redux:
 * while Products.js and Favorites.js READ from the store (useSelector),
 * this component WRITES to it by dispatching actions (useDispatch).
 *
 * useDispatch returns the store's dispatch function. When the user
 * clicks the favorite button, toggleFavHandler calls dispatch with
 * the toggleFav action creator, passing the product's id. This sends
 * the action to the reducer, which flips the isFavorite flag.
 *
 * The product data (id, title, description, isFav) arrives via props
 * from the parent Products page. Only the dispatch mechanism comes
 * from Redux — the component doesn't directly read store state.
 *
 * When Redux is replaced, this useDispatch + action creator pattern
 * will be swapped for a Context-based function or custom hook that
 * achieves the same toggle behavior.
 *
 * ============================================================================
 * LESSON 555: TEMPORARILY REMOVING REDUX DISPATCH
 * ============================================================================
 *
 * Since we've removed the Redux store from the app, we must also remove
 * the useDispatch and toggleFav imports from this component. Without a
 * Redux store, calling useDispatch would throw an error.
 *
 * The favorite button still renders but the toggle handler is temporarily
 * a no-op. The Context provider doesn't yet expose a function for
 * modifying the products list — that will be added in the next lesson.
 *
 * ============================================================================
 */

import React from 'react';

import Card from '../UI/Card';
import './ProductItem.css';

const ProductItem = props => {
  // LESSON 555: Temporary no-op handler. The Redux dispatch and toggleFav
  // action have been removed, but the Context doesn't provide a toggle
  // function yet. This will be wired up in the next lesson.
  const toggleFavHandler = () => {};

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
};

export default ProductItem;
