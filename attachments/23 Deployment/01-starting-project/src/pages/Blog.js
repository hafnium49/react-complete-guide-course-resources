/**
 * ============================================================================
 * BLOG PAGE COMPONENT (Lesson 404 - Import Chain Example)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "For example, in this Blog.js file, I'm importing useLoaderData from
 * react-router-dom, and that simply means that when this component file here
 * is evaluated by the browser, this code for this hook will be imported
 * because this code is needed in order to handle this component, this
 * BlogPage component correctly."
 *
 * ============================================================================
 * HOW THIS FILE FITS IN THE IMPORT CHAIN
 * ============================================================================
 *
 * When App.js imports this file:
 *
 * App.js
 *    │
 *    └── import BlogPage from './pages/Blog'
 *              │
 *              ├── import { useLoaderData } from 'react-router-dom'
 *              │         └── (pulls in react-router-dom code)
 *              │
 *              └── import PostList from '../components/PostList'
 *                        │
 *                        └── import PostItem from './PostItem'
 *                                  └── (and its CSS module)
 *
 * INSTRUCTOR QUOTE:
 * "We, for example, must import the code for the PostList component before
 * we can use that component here in the BlogPage component."
 *
 * ============================================================================
 * THE BUNDLING IMPLICATION
 * ============================================================================
 *
 * WITHOUT LAZY LOADING:
 * - This entire chain is loaded when the app starts
 * - Even if user NEVER visits /posts, this code is downloaded
 * - PostList, PostItem, their styles - ALL included in initial bundle
 *
 * WITH LAZY LOADING (next lesson):
 * - This file will be in a separate "chunk"
 * - Only downloaded when user navigates to /posts
 * - Reduces initial bundle size
 *
 * ============================================================================
 */

/**
 * These imports create the DEPENDENCY CHAIN that the instructor discusses.
 *
 * When the browser evaluates this file:
 * 1. First, react-router-dom must be loaded (for useLoaderData)
 * 2. Then, PostList.js must be loaded (and its dependencies)
 * 3. Only then can BlogPage component work correctly
 *
 * All these dependencies must be resolved BEFORE the component renders.
 */
import { useLoaderData } from 'react-router-dom';

import PostList from '../components/PostList';

/**
 * BlogPage Component
 *
 * Displays a list of blog posts fetched from JSONPlaceholder API.
 * Uses React Router's data loading pattern with loader function.
 */
function BlogPage() {
  /**
   * useLoaderData retrieves data from the loader function defined below.
   * This hook is part of React Router's data loading pattern.
   */
  const posts = useLoaderData();
  return <PostList posts={posts} />;
}

export default BlogPage;

/**
 * Route Loader Function
 *
 * This function runs BEFORE the component renders.
 * React Router calls it automatically when navigating to /posts.
 *
 * NOTE: When we implement lazy loading, this loader will also be
 * loaded lazily along with the component.
 */
export function loader() {
  return fetch('https://jsonplaceholder.typicode.com/posts');
}
