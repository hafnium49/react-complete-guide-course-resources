/**
 * ============================================================================
 * SECTION 23: DEPLOYING REACT APPS
 * ============================================================================
 *
 * This section covers the complete process of taking a React application
 * from development to production and deploying it to a real server.
 *
 * ============================================================================
 * LESSON 405 - IMPLEMENTING LAZY LOADING
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So, how do we now add lazy loading? Well, let's say we wanna load that blog
 * page lazily. So, only when we need it."
 *
 * INSTRUCTOR QUOTE:
 * "The code for the blog page, and all the code referenced by that blog page,
 * so for example, the code for the post list component should only be loaded
 * when we need it."
 *
 * ============================================================================
 * STEP 1: REMOVE EAGER IMPORTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "In order to load this blog page lazily we first of all have to remove this
 * import. Otherwise, it's always loaded. It's loaded eagerly, as it's called.
 * So, we must get rid of that."
 *
 * BEFORE (Eager Loading - loads immediately):
 * ```javascript
 * import BlogPage, { loader as postsLoader } from './pages/Blog';
 * import PostPage, { loader as postLoader } from './pages/Post';
 * ```
 *
 * AFTER (these imports are REMOVED - we'll load dynamically instead)
 *
 * ============================================================================
 * STEP 2: USE React.lazy() FOR COMPONENTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "To solve this problem React gives us a special function which we have to
 * wrap around this function and that's the lazy function which is imported
 * from React."
 *
 * WHY WE NEED React.lazy():
 *
 * INSTRUCTOR QUOTE:
 * "This function here however, returns a promise because as I mentioned before,
 * import actually yields a promise. And that's not a valid React component
 * function."
 *
 * Dynamic import() returns a Promise, not JSX.
 * React.lazy() converts that Promise into a usable React component.
 *
 * SYNTAX:
 * ```javascript
 * const BlogPage = lazy(() => import('./pages/Blog'));
 * ```
 *
 * ============================================================================
 * STEP 3: USE DYNAMIC import() FOR LOADERS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "It's actually worth noting that with this import we're not just importing
 * the blog page but also the loader. So we're actually importing two things
 * which we should now load lazily."
 *
 * INSTRUCTOR QUOTE:
 * "Now this import keyword, is a keyword we of course saw plenty of times
 * already. We use it to import files, but it turns out that you can actually
 * also call import as a function and in that case it will import something
 * dynamically, only when it's needed."
 *
 * DYNAMIC IMPORT SYNTAX:
 * ```javascript
 * loader: () => import('./pages/Blog').then(module => module.loader())
 * ```
 *
 * HOW IT WORKS:
 * 1. import() is called as a FUNCTION (not a statement)
 * 2. It returns a PROMISE (async operation - must download the file)
 * 3. When resolved, you get the MODULE (the file's exports)
 * 4. Access the loader function from the module and execute it
 *
 * INSTRUCTOR QUOTE:
 * "So import gives you a promise. Because this is an asynchronous process,
 * which can take a bit longer because it must download the code after all.
 * And, downloading that code can take a short while."
 *
 * ============================================================================
 * STEP 4: WRAP WITH <Suspense> FOR LOADING STATE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "It will still take some time to load the code for this component because
 * that code has to be downloaded after all, and the effort you must wrap this
 * with another component provided by React, the suspense component."
 *
 * INSTRUCTOR QUOTE:
 * "Suspense is basically a component provided by React that can be used by
 * other things, other components, to wait for content to be loaded before
 * actually rendering the content."
 *
 * INSTRUCTOR QUOTE:
 * "And here suspense is used to wrap it around this lazily loaded component
 * so that we can show a fallback which is specified with help of the fallback
 * prop on suspense until that component code is there."
 *
 * ============================================================================
 * STEP 5: FORWARD ROUTE PARAMETERS TO LAZY LOADERS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "However, now we're getting an error here and we're getting this error
 * because this params object is now missing in that loader."
 *
 * INSTRUCTOR QUOTE:
 * "We simply take that overall meta object which we get from React router
 * which contains this params key and we forward this meta object here to
 * this loader."
 *
 * For loaders that need params (like PostPage's loader needs the :id):
 * ```javascript
 * loader: (meta) => import('./pages/Post').then(m => m.loader(meta))
 * ```
 *
 * ============================================================================
 * VERIFYING LAZY LOADING IN DEVTOOLS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "You can see how lazy loading works by opening your developer tools and
 * there go to the network tab. Make sure you clear the tab so that you have
 * no requests in there, and then if you click on blog, you will see that
 * actually here it's downloaded this JavaScript file here."
 *
 * INSTRUCTOR QUOTE:
 * "This JavaScript file was downloaded dynamically. That was downloaded
 * dynamically because we added lazy loading."
 *
 * HOW TO TEST:
 * 1. Open DevTools → Network tab
 * 2. Clear all requests
 * 3. Navigate to /posts
 * 4. See the NEW .js file downloaded (the Blog chunk)
 * 5. Navigate to /posts/1
 * 6. See ANOTHER .js file downloaded (the Post chunk)
 *
 * ============================================================================
 * LESSON 404 - UNDERSTANDING LAZY LOADING (Conceptual Introduction)
 * ============================================================================
 *
 * THE PROBLEM: ALL CODE LOADS UPFRONT
 *
 * INSTRUCTOR QUOTE:
 * "It's important to understand that we have all these import statements in
 * our various files where we import code from other files into the file where
 * the import statement was added."
 *
 * HOW IMPORTS WORK:
 *
 *   App.js
 *      ├── imports BlogPage      → Blog.js
 *      │       └── imports PostList   → PostList.js
 *      │               └── imports PostItem → PostItem.js
 *      ├── imports HomePage      → Home.js
 *      ├── imports PostPage      → Post.js
 *      │       └── imports PostItem   → PostItem.js
 *      └── imports RootLayout    → Root.js
 *              └── imports MainNavigation → MainNavigation.js
 *
 * WITHOUT LAZY LOADING:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                         SINGLE BUNDLE (main.js)                         │
 * │  All code downloaded before ANYTHING shows on screen                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WITH LAZY LOADING (implemented below):
 *
 * Initial Load (user visits "/"):
 * ┌───────────────────────────────────┐
 * │  Main Bundle: App + Home + Root   │  ← Only essential code
 * └───────────────────────────────────┘
 *
 * User navigates to "/posts":
 * ┌───────────────────────────────────┐
 * │  Chunk: Blog + PostList           │  ← Downloaded on demand!
 * └───────────────────────────────────┘
 *
 * User navigates to "/posts/1":
 * ┌───────────────────────────────────┐
 * │  Chunk: Post + PostItem           │  ← Downloaded on demand!
 * └───────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "Again, for this simple app, it's not really required but it is a technique
 * you should be aware of because it can be very useful when you're building
 * more complex applications."
 *
 * ============================================================================
 */

import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**
 * ============================================================================
 * EAGER IMPORTS (Always loaded immediately)
 * ============================================================================
 *
 * These components are NOT lazy loaded because:
 * - HomePage: It's the landing page, users will almost always see it
 * - RootLayout: It's needed for ALL routes (contains navigation)
 *
 * Only lazy load components that:
 * - Are not needed on initial page load
 * - Have significant code size
 * - Are accessed less frequently
 */
import HomePage from './pages/Home';
import RootLayout from './pages/Root';

/**
 * ============================================================================
 * LAZY LOADED COMPONENTS (Lesson 405)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "In order to load this blog page lazily we first of all have to remove this
 * import. Otherwise, it's always loaded."
 *
 * BEFORE (Eager - always downloaded):
 * import BlogPage, { loader as postsLoader } from './pages/Blog';
 * import PostPage, { loader as postLoader } from './pages/Post';
 *
 * AFTER (Lazy - downloaded only when needed):
 */

/**
 * LAZY LOADING BlogPage COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "Lazy is executed and takes this function with the dynamic import as an
 * argument. And now blog page can indeed be used as a component."
 *
 * React.lazy() takes a function that:
 * 1. Calls import() dynamically
 * 2. Returns a Promise that resolves to a module
 * 3. The module must have a default export (the component)
 *
 * The arrow function is important - it defers the import until the
 * component is actually needed (when user navigates to /posts).
 */
const BlogPage = lazy(() => import('./pages/Blog'));

/**
 * LAZY LOADING PostPage COMPONENT
 *
 * Same pattern as BlogPage - this component and its dependencies
 * (PostItem, PostItem.module.css) will only be downloaded when
 * the user navigates to /posts/:id.
 */
const PostPage = lazy(() => import('./pages/Post'));

/**
 * ============================================================================
 * ROUTER CONFIGURATION WITH LAZY LOADING (Lesson 405)
 * ============================================================================
 *
 * Key changes from eager loading:
 *
 * 1. LAZY COMPONENTS wrapped in <Suspense>:
 *    <Suspense fallback={<p>Loading...</p>}>
 *      <BlogPage />
 *    </Suspense>
 *
 * 2. LAZY LOADERS use dynamic import():
 *    loader: () => import('./pages/Blog').then(module => module.loader())
 *
 * 3. LOADERS WITH PARAMS forward the meta object:
 *    loader: (meta) => import('./pages/Post').then(m => m.loader(meta))
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        /**
         * HomePage - NOT lazy loaded
         * As the most common landing page, it should be in the main bundle.
         */
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          {
            /**
             * BlogPage - LAZY LOADED (Lesson 405)
             *
             * INSTRUCTOR QUOTE:
             * "So here we could say loading. With that, we're now loading this
             * blog page component only when it's needed. And we show a fallback
             * until the code is there."
             *
             * SUSPENSE WRAPPER:
             * Required because lazy-loaded components take time to download.
             * The fallback is shown while the code is being fetched.
             *
             * INSTRUCTOR QUOTE:
             * "It will still take some time to load the code for this component
             * because that code has to be downloaded after all."
             */
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            /**
             * LAZY LOADER FOR BlogPage
             *
             * INSTRUCTOR QUOTE:
             * "Here to load it lazily, we can pass a function to the loader here.
             * So replace the loader from before with a different loader function."
             *
             * INSTRUCTOR QUOTE:
             * "And then import gives you a promise... And we can use the then
             * keyword here... And then what we get here is the loaded module so
             * the loaded file in the end. And on that module I now wanna return
             * the loader function. And of course that loader function should be
             * executed."
             *
             * HOW THIS WORKS:
             * 1. User navigates to /posts
             * 2. This loader function is called
             * 3. import('./pages/Blog') downloads the Blog.js file
             * 4. .then(module => ...) receives the module (Blog.js exports)
             * 5. module.loader() calls and executes the loader function
             * 6. The loader returns data (fetched posts)
             *
             * INSTRUCTOR QUOTE:
             * "So now this import function here will only be executed once the
             * loader here, for the blog page is executed. So only once we try to
             * visit the blog page."
             */
            loader: () =>
              import('./pages/Blog').then((module) => module.loader()),
          },
          {
            /**
             * PostPage - LAZY LOADED (Lesson 405)
             *
             * INSTRUCTOR QUOTE:
             * "We should also wrap suspense around the post page here as we did
             * it for the blog page. So that we can await the code for the
             * component itself without issues."
             */
            path: ':id',
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            /**
             * LAZY LOADER FOR PostPage (with params)
             *
             * INSTRUCTOR QUOTE:
             * "Of course, we get params by React router in this loader function,
             * and here we should simply forward that under a params key to this
             * loader. Or we simply take that overall meta object which we get
             * from React router which contains this params key and we forward
             * this meta object here to this loader."
             *
             * The PostPage loader needs the `params` object to get the post ID.
             * React Router passes a "meta" object containing { params, request }.
             * We forward this entire meta object to the lazy-loaded loader.
             *
             * WITHOUT forwarding meta:
             * loader: () => import('./pages/Post').then(m => m.loader())
             * ❌ ERROR: params is undefined in the loader
             *
             * WITH forwarding meta:
             * loader: (meta) => import('./pages/Post').then(m => m.loader(meta))
             * ✅ Works: params.id is available in the loader
             */
            loader: (meta) =>
              import('./pages/Post').then((module) => module.loader(meta)),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
