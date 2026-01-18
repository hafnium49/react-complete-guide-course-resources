/**
 * ============================================================================
 * POST PAGE COMPONENT (Lazy Loaded - Lesson 405)
 * ============================================================================
 *
 * This component is LAZY LOADED via React.lazy() in App.js.
 *
 * In App.js:
 * ```javascript
 * const PostPage = lazy(() => import('./pages/Post'));
 * ```
 *
 * ============================================================================
 * HOW THIS FILE IS LOADED
 * ============================================================================
 *
 * 1. User visits /posts (Blog page)
 * 2. User clicks on a single post link
 * 3. ONLY THEN is this file downloaded
 * 4. A separate "chunk" file contains this code
 *
 * INSTRUCTOR QUOTE:
 * "If I now click on a single post, we just have a request that downloads that
 * post data from the backend but we have no request that would download the
 * code for this component."
 *
 * After implementing lazy loading:
 *
 * INSTRUCTOR QUOTE:
 * "Now you again see that the code was downloaded dynamically."
 *
 * ============================================================================
 * LOADER WITH PARAMS (Important!)
 * ============================================================================
 *
 * This loader needs `params` to get the post ID from the URL.
 *
 * INSTRUCTOR QUOTE:
 * "However, now we're getting an error here and we're getting this error
 * because this params object is now missing in that loader."
 *
 * SOLUTION: Forward the meta object from React Router:
 *
 * In App.js:
 * ```javascript
 * loader: (meta) => import('./pages/Post').then(m => m.loader(meta))
 * ```
 *
 * INSTRUCTOR QUOTE:
 * "Of course, we get params by React router in this loader function, and here
 * we should simply forward that under a params key to this loader. Or we
 * simply take that overall meta object which we get from React router which
 * contains this params key and we forward this meta object here to this
 * loader."
 *
 * The meta object contains:
 * - params: { id: "1" } - URL parameters
 * - request: Request object - the navigation request
 *
 * ============================================================================
 */

import { useLoaderData } from 'react-router-dom';

import PostItem from '../components/PostItem';

/**
 * PostPage Component
 *
 * Renders a single post's details.
 *
 * Wrapped in <Suspense> in App.js:
 * ```javascript
 * <Suspense fallback={<p>Loading...</p>}>
 *   <PostPage />
 * </Suspense>
 * ```
 *
 * INSTRUCTOR QUOTE:
 * "We should also wrap suspense around the post page here as we did it for
 * the blog page. So that we can await the code for the component itself
 * without issues."
 */
function PostPage() {
  const post = useLoaderData();

  return <PostItem post={post} />;
}

export default PostPage;

/**
 * Route Loader Function (Lazy Loaded with Params)
 *
 * This loader is accessed dynamically AND receives the meta object:
 * ```javascript
 * loader: (meta) => import('./pages/Post').then(m => m.loader(meta))
 * ```
 *
 * The { params } destructuring extracts the URL parameters.
 * params.id contains the post ID from the URL (/posts/:id).
 *
 * WHY meta IS FORWARDED:
 * - Without it: params would be undefined
 * - With it: params.id gives us "1", "2", etc.
 *
 * @param {Object} params - URL parameters from React Router
 * @param {string} params.id - The post ID from the URL
 */
export function loader({ params }) {
  const postId = params.id;
  return fetch('https://jsonplaceholder.typicode.com/posts/' + postId);
}
