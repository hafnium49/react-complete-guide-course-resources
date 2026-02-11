/**
 * ============================================================================
 * src/components/Products/ProductItem.js - LESSON 554
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
 */

import React from 'react';
// LESSON 554: useDispatch gives access to the Redux store's dispatch function.
// It will be replaced by a Context-based dispatch or custom hook function.
import { useDispatch } from 'react-redux';

import Card from '../UI/Card';
import './ProductItem.css';
// LESSON 554: The toggleFav action creator produces the action object that
// the reducer uses to flip a product's isFavorite status.
import { toggleFav } from '../../store/actions/products';

const ProductItem = props => {
  // LESSON 554: Get the dispatch function from the Redux store.
  const dispatch = useDispatch();

  // LESSON 554: On button click, dispatch the TOGGLE_FAV action with
  // this product's id. The reducer handles the state update immutably.
  const toggleFavHandler = () => {
    dispatch(toggleFav(props.id));
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
};

export default ProductItem;
