/**
 * ============================================================================
 * src/containers/Products.js - LESSONS 554 & 555
 * ============================================================================
 *
 * PRODUCTS PAGE — READING FROM THE REDUX STORE:
 *
 * This page component displays ALL products from the Redux store.
 *
 * useSelector is a React-Redux hook that extracts data from the Redux
 * store. The selector function receives the entire store state and
 * returns the specific slice needed — here, state.shop.products.
 *
 * The "shop" key comes from combineReducers in index.js, where the
 * product reducer was registered under that name. So state.shop gives
 * us everything the product reducer manages, and .products is the
 * array of product objects within that reducer's state.
 *
 * When the store updates (e.g., a product's isFavorite changes),
 * useSelector automatically re-renders this component with the new
 * data. No manual subscription management needed.
 *
 * This useSelector call will be replaced by a Context-based approach
 * when Redux is removed.
 *
 * ============================================================================
 * LESSON 555: READING FROM CONTEXT INSTEAD OF REDUX
 * ============================================================================
 *
 * useSelector is replaced by useContext. Instead of selecting from a
 * Redux store via state.shop.products, we now read from the
 * ProductsContext object, accessing its products property.
 *
 * The useContext hook subscribes this component to the context: whenever
 * the ProductsProvider updates its state (and therefore the context
 * value), this component automatically re-renders — the same behavior
 * useSelector provided with Redux.
 *
 * ============================================================================
 */

import React, { useContext } from 'react';

import ProductItem from '../components/Products/ProductItem';
import './Products.css';
// LESSON 555: Import the context object (named export) — not the Provider.
// useContext needs the context object to know which Provider to read from.
import { ProductsContext } from '../context/products-context';

const Products = props => {
  // LESSON 555: useContext replaces useSelector. It reads the current value
  // from ProductsContext (provided by ProductsProvider in index.js). The
  // .products key matches the shape of the value object in the Provider.
  const productList = useContext(ProductsContext).products;
  return (
    <ul className="products-list">
      {productList.map(prod => (
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
