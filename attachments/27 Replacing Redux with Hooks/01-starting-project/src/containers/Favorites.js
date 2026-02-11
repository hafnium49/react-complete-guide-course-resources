/**
 * ============================================================================
 * src/containers/Favorites.js - LESSON 554
 * ============================================================================
 *
 * FAVORITES PAGE — DERIVED DATA FROM THE REDUX STORE:
 *
 * This page displays only the products marked as favorites. It uses
 * useSelector with a selector that FILTERS the products array inline,
 * returning only items where isFavorite is true.
 *
 * This is an example of deriving data from the store: the store holds
 * ALL products, and this component computes the favorites subset on
 * each render. There is no separate "favorites" array in the store —
 * the favorite status is a property of each product, and the filtering
 * happens at the point of consumption.
 *
 * This demonstrates why Redux (and later, Context) needs to be shared
 * across pages: the same product data with the same favorite statuses
 * must be accessible from both the Products page and this Favorites
 * page. Without global state, keeping them in sync would require
 * lifting state up to a common ancestor and passing it through props.
 *
 * ============================================================================
 */

import React from 'react';
// LESSON 554: useSelector extracts state from the Redux store. The inline
// filter derives the favorites subset from the full products array.
import { useSelector } from 'react-redux';

import FavoriteItem from '../components/Favorites/FavoriteItem';
import './Products.css';

const Favorites = props => {
  // LESSON 554: Derived state — filter inline to get only favorited products.
  // No separate "favorites" state exists; it's computed from the products array.
  const favoriteProducts = useSelector(state =>
    state.shop.products.filter(p => p.isFavorite)
  );
  let content = <p className="placeholder">Got no favorites yet!</p>;
  if (favoriteProducts.length > 0) {
    content = (
      <ul className="products-list">
        {favoriteProducts.map(prod => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
};

export default Favorites;
