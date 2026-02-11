/**
 * ============================================================================
 * src/App.js - LESSONS 552 & 554
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
 * LESSON 554: PROJECT WALKTHROUGH
 * ============================================================================
 *
 * This lesson walks through the existing Redux-based project to understand
 * what will be replaced. The app is intentionally simple so the focus stays
 * on the migration, not the business logic. Key points:
 *
 * WHY REDUX IS USED HERE:
 *
 *   - The favorite status of products is needed on TWO different pages
 *     (Products and Favorites). Passing this state through props alone
 *     would be cumbersome, especially with deeper component trees.
 *   - Redux provides a global store that any component can read from
 *     or dispatch to, avoiding manual prop drilling.
 *
 * WHY YOU MIGHT REPLACE REDUX:
 *
 *   - Stay in the "React-only" world — no extra libraries to learn
 *   - Smaller bundle size — removing redux + react-redux reduces the
 *     amount of code shipped to users in production
 *   - Explore what React's built-in tools (Context, Hooks) can do
 *
 * IMPORTANT: There is nothing wrong with keeping Redux. It is a mature,
 * well-tested solution. Replacing it is optional, not recommended.
 *
 * WHAT COMES NEXT:
 *
 * Two different React-only approaches will be demonstrated:
 *   1. One that works well for this use case
 *   2. One that has limitations for certain scenarios
 * Both will be shown so you understand which to use and when.
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
