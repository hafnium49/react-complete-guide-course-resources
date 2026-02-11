/**
 * ============================================================================
 * src/App.js - LESSON 552
 * ============================================================================
 *
 * SECTION OVERVIEW: REPLACING REDUX WITH CONTEXT API + HOOKS
 *
 * This section explores replacing Redux — a third-party state management
 * library — with React's built-in Context API and Hooks. The goal is NOT
 * to say Redux is bad (it works well and is widely used), but rather to
 * demonstrate that React's own features can handle application-wide state
 * management without an external dependency.
 *
 * WHY CONSIDER REPLACING REDUX:
 *
 *   - Eliminates a third-party dependency from the project
 *   - Uses only built-in React features (Context API, useReducer, custom
 *     hooks, etc.)
 *   - Provides a deeper understanding of what React's hooks and context
 *     can accomplish when used creatively
 *
 * THE STARTING PROJECT:
 *
 * This app is a simple product/favorites application already wired with
 * Redux. It has:
 *   - A Products page listing available items
 *   - A Favorites page showing items the user has favorited
 *   - Redux store with actions and reducers managing the product state
 *   - React Router for navigation between the two pages
 *
 * Over the upcoming lessons, the Redux store, actions, reducers, and
 * connect() calls will be incrementally replaced with Context providers,
 * custom hooks, and React's useReducer — achieving the same global state
 * management without Redux.
 *
 * ============================================================================
 */

import React from 'react';
import { Route } from 'react-router-dom';

import Navigation from './components/Nav/Navigation';
import ProductsPage from './containers/Products';
import FavoritesPage from './containers/Favorites';

const App = props => {
  return (
    <React.Fragment>
      <Navigation />
      <main>
        <Route path="/" component={ProductsPage} exact />
        <Route path="/favorites" component={FavoritesPage} />
      </main>
    </React.Fragment>
  );
};

export default App;
