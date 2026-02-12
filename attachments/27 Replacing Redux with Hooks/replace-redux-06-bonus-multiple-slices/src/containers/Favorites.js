/**
 * ============================================================================
 * src/containers/Favorites.js - LESSON 564 (BONUS: MULTIPLE STATE SLICES)
 * ============================================================================
 *
 * FAVORITES PAGE — DERIVED DATA FROM THE PRODUCTS SLICE:
 *
 * Like Products.js, this component reads state.products from the global
 * store. It then filters for items where isFavorite is true to derive
 * the favorites subset. The counter slice (state.counter) is irrelevant
 * here and is simply ignored.
 *
 * The filtering logic is the same across all three approaches used in
 * this course section (Redux, Context, custom hook store) — only the
 * source of the data changes.
 *
 * ============================================================================
 */

import React from 'react';

import FavoriteItem from '../components/Favorites/FavoriteItem';
// Named import of useStore — same hook, same global store, different slice
// accessed (state.products, not state.counter).
import { useStore } from '../hooks-store/store';
import './Products.css';

const Favorites = props => {
  // useStore()[0] extracts the global state. state.products contains the
  // full products array; .filter() derives the favorites subset.
  const state = useStore()[0];
  const favoriteProducts = state.products.filter(p => p.isFavorite);
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
