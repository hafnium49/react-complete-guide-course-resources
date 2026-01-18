/**
 * ============================================================================
 * BLOG PAGE COMPONENT (Lazy Loaded - Lesson 405)
 * ============================================================================
 *
 * This component is now LAZY LOADED via React.lazy() in App.js.
 *
 * INSTRUCTOR QUOTE:
 * "So, in order to load this blog page lazily we first of all have to remove
 * this import. Otherwise, it's always loaded."
 *
 * ============================================================================
 * HOW THIS FILE IS LOADED
 * ============================================================================
 *
 * In App.js:
 * ```javascript
 * const BlogPage = lazy(() => import('./pages/Blog'));
 * ```
 *
 * This means:
 * 1. This file is NOT included in the main bundle
 * 2. It's downloaded ONLY when user navigates to /posts
 * 3. A separate "chunk" file is created for this component
 *
 * ============================================================================
 * WHAT GETS INCLUDED IN THE CHUNK
 * ============================================================================
 *
 * When this file is dynamically imported, the chunk includes:
 * - This BlogPage component
 * - The loader function (also lazy loaded)
 * - PostList component (imported below)
 * - PostItem component (imported by PostList)
 * - All CSS modules used by these components
 *
 * INSTRUCTOR QUOTE:
 * "The code for the blog page, and all the code referenced by that blog page,
 * so for example, the code for the post list component should only be loaded
 * when we need it."
 *
 * ============================================================================
 * THE LOADER IS ALSO LAZY LOADED
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "It's actually worth noting that with this import we're not just importing
 * the blog page but also the loader. So we're actually importing two things
 * which we should now load lazily."
 *
 * In App.js, the loader is accessed via dynamic import:
 * ```javascript
 * loader: () => import('./pages/Blog').then(module => module.loader())
 * ```
 *
 * INSTRUCTOR QUOTE:
 * "So now this import function here will only be executed once the loader
 * here, for the blog page is executed. So only once we try to visit the
 * blog page. Only then the blog file will be imported and this loader
 * function from that file will be executed."
 *
 * ============================================================================
 */

import { useLoaderData } from 'react-router-dom';

import PostList from '../components/PostList';

/**
 * BlogPage Component
 *
 * Displays a list of blog posts fetched from JSONPlaceholder API.
 *
 * NOTE: This component is wrapped in <Suspense> in App.js:
 * ```javascript
 * <Suspense fallback={<p>Loading...</p>}>
 *   <BlogPage />
 * </Suspense>
 * ```
 *
 * While this component's code is being downloaded, the fallback is shown.
 */
function BlogPage() {
  const posts = useLoaderData();
  return <PostList posts={posts} />;
}

export default BlogPage;

/**
 * Route Loader Function (Lazy Loaded)
 *
 * This loader is accessed dynamically in App.js:
 * ```javascript
 * loader: () => import('./pages/Blog').then(module => module.loader())
 * ```
 *
 * INSTRUCTOR QUOTE:
 * "And then what we get here is the loaded module so the loaded file in the
 * end. And on that module I now wanna return the loader function. And of
 * course that loader function should be executed."
 *
 * The loader function:
 * 1. Gets called when user navigates to /posts
 * 2. Fetches posts from the API
 * 3. Returns the data for useLoaderData() to consume
 */
export function loader() {
  return fetch('https://jsonplaceholder.typicode.com/posts');
}
