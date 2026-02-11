/**
 * ============================================================================
 * src/components/Products/ProductItem.js - LESSONS 554, 555 & 556
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
 * LESSON 556: WIRING UP THE CONTEXT'S TOGGLE FUNCTION
 * ============================================================================
 *
 * The no-op handler is replaced with a real toggle function from the
 * Context. useContext(ProductsContext) provides the toggleFav function
 * that the ProductsProvider now exposes.
 *
 * The pattern mirrors how useDispatch + action creator worked in Redux,
 * but simplified: instead of dispatch(toggleFav(id)), we call
 * toggleFav(id) directly. The function lives in the context Provider
 * and handles the state update internally via setProductsList.
 *
 * ============================================================================
 */

import React, { useContext } from 'react';

import Card from '../UI/Card';
import './ProductItem.css';
// LESSON 556: Import the context object to access the toggleFav function.
// This replaces the old Redux imports (useDispatch and the toggleFav action creator).
import { ProductsContext } from '../../context/products-context';

const ProductItem = props => {
  // LESSON 556: Pull the toggleFav function from the context. This is the
  // function defined in ProductsProvider that calls setProductsList to flip
  // a product's isFavorite status — the Context equivalent of Redux dispatch.
  const toggleFav = useContext(ProductsContext).toggleFav;

  // LESSON 556: The handler now calls the context's toggleFav with this
  // product's id. This replaces the old dispatch(toggleFav(props.id)) pattern.
  const toggleFavHandler = () => {
    toggleFav(props.id);
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
