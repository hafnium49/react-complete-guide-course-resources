/**
 * ============================================================================
 * src/context/products-context.js - LESSON 555
 * ============================================================================
 *
 * APPROACH 1: REPLACING REDUX WITH THE CONTEXT API
 *
 * This file creates a React Context that serves the same purpose as the
 * Redux store — providing application-wide state to any component that
 * needs it, without prop drilling.
 *
 * TWO EXPORTS FROM THIS FILE:
 *
 *   1. ProductsContext (named export): The context object created by
 *      React.createContext(). Components use this with useContext() to
 *      READ the current context value (the products list).
 *
 *   2. ProductsProvider (default export): A wrapper component that:
 *      - Manages the products array as local state via useState
 *      - Wraps its children in <ProductsContext.Provider>
 *      - Passes the products state as the context value
 *
 * HOW THIS REPLACES REDUX:
 *
 *   Redux:   createStore(reducer) → <Provider store={store}>
 *   Context: useState(initialData) → <ProductsContext.Provider value={...}>
 *
 *   Redux:   useSelector(state => state.shop.products)
 *   Context: useContext(ProductsContext).products
 *
 * The product data (id, title, description, isFavorite) that was
 * previously hardcoded in the Redux reducer's initialState is now
 * managed directly in this component's useState.
 *
 * WHY A WRAPPER COMPONENT:
 *
 * Rather than exporting just the context object and having consumers
 * set up the Provider themselves, we export a ready-to-use component
 * (ProductsProvider) that encapsulates the state logic. This keeps the
 * state management in one place and makes the Provider easy to drop
 * into index.js — just like Redux's <Provider> was.
 *
 * WHY useState FOR THE PRODUCTS LIST:
 *
 * The products array needs to be reactive — when a product's favorite
 * status changes, all consuming components must re-render. useState
 * gives us exactly this: updating the state via setProductsList triggers
 * a re-render of ProductsProvider, which passes a new value to the
 * context Provider, which in turn re-renders all consumers.
 *
 * CONTEXT VALUE SHAPE:
 *
 * The value passed to the Provider is an object { products: productsList }
 * rather than the raw array. This allows adding more fields to the context
 * later (e.g., a toggleFavorite function) without changing every consumer.
 *
 * CURRENT LIMITATION:
 *
 * At this stage, the context only provides READ access to the products.
 * There is no way to modify the list yet (no toggleFavorite function).
 * That will be added in the next lesson.
 *
 * ============================================================================
 */

import React, { useState } from 'react';

// LESSON 555: Create the context object with a default shape. The default
// value (products: []) is only used if a component reads the context without
// a Provider ancestor — mainly useful for IDE autocompletion and type hints.
export const ProductsContext = React.createContext({
  products: [],
});

// LESSON 555: The Provider component manages the products state and makes it
// available to the entire component tree via context. This replaces Redux's
// createStore + <Provider store={store}>.
const ProductsProvider = props => {
  // LESSON 555: The same product data that was in the Redux reducer's
  // initialState is now managed here with useState. The state is the single
  // source of truth for products — updating it re-renders all consumers.
  const [productsList, setProductsList] = useState([
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
  ]);

  return (
    // LESSON 555: The value prop is an object with a products key. Whenever
    // productsList changes (via setProductsList), a new object is passed here,
    // causing all useContext(ProductsContext) consumers to re-render.
    <ProductsContext.Provider value={{ products: productsList }}>
      {/* LESSON 555: props.children renders whatever is nested inside
          <ProductsProvider> in index.js — the entire app tree. */}
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
