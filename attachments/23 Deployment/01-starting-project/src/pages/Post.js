/**
 * ============================================================================
 * POST PAGE COMPONENT (Lesson 404 - Another Import Chain)
 * ============================================================================
 *
 * This component displays a single blog post's details.
 * Like Blog.js, it demonstrates the import dependency chain concept.
 *
 * ============================================================================
 * IMPORT CHAIN FOR THIS FILE
 * ============================================================================
 *
 * App.js
 *    │
 *    └── import PostPage from './pages/Post'
 *              │
 *              ├── import { useLoaderData } from 'react-router-dom'
 *              │
 *              └── import PostItem from '../components/PostItem'
 *                        └── import PostItem.module.css
 *
 * ============================================================================
 * WHY THIS MATTERS FOR LAZY LOADING
 * ============================================================================
 *
 * CURRENT BEHAVIOR (without lazy loading):
 * - PostPage code is downloaded even if user only visits "/"
 * - PostItem component code is included in initial bundle
 * - User pays the "cost" of downloading code they may never use
 *
 * AFTER LAZY LOADING (next lesson):
 * - PostPage will be a separate chunk
 * - Only downloaded when user navigates to /posts/:id
 * - Initial bundle stays smaller and loads faster
 *
 * ============================================================================
 */

import { useLoaderData } from 'react-router-dom';

import PostItem from '../components/PostItem';

/**
 * PostPage Component
 *
 * Renders a single post's details using data from the loader.
 * The post ID comes from the URL parameter (:id).
 */
function PostPage() {
  const post = useLoaderData();

  return <PostItem post={post} />;
}

export default PostPage;

/**
 * Route Loader Function
 *
 * Fetches a single post by ID from the JSONPlaceholder API.
 * The params object contains URL parameters (params.id = the post ID).
 *
 * NOTE: With lazy loading, this loader will be loaded on-demand
 * along with the PostPage component.
 */
export function loader({ params }) {
  const postId = params.id;
  return fetch('https://jsonplaceholder.typicode.com/posts/' + postId);
}
