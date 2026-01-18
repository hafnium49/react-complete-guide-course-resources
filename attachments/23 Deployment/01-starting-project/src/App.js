/**
 * ============================================================================
 * SECTION 23: DEPLOYING REACT APPS
 * ============================================================================
 *
 * This section covers the complete process of taking a React application
 * from development to production and deploying it to a real server.
 *
 * ============================================================================
 * LESSON 407 - DEPLOYMENT EXAMPLE (Firebase Hosting)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So let's now deploy this app and let's therefore have a look at this entire
 * deployment process from a high level to understand the steps that are involved
 * and let's then see this in action for a concrete hosting provider."
 *
 * ============================================================================
 * WHAT KIND OF HOST DO WE NEED?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "What we deploy here is in the end just some static content. It's some HTML
 * files and JavaScript files and CSS files. That's all we need to upload."
 *
 * A React SPA is NOT a server-side rendered application.
 * We're uploading static files that run entirely in the browser.
 *
 * WHAT WE NEED:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STATIC SITE HOST                                                       │
 * │  ✓ Serves HTML, CSS, JavaScript files                                   │
 * │  ✓ No server-side code execution needed                                 │
 * │  ✓ No database on the host (our app uses external APIs)                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "We don't need any server side code execution. Our React code that runs
 * in the browser might reach out to some remote backend API but that backend
 * API is running on a separate server and therefore for the React app all
 * we need is such a static website host."
 *
 * WHAT WE DON'T NEED:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✗ Node.js server runtime                                               │
 * │  ✗ PHP, Python, or other server languages                               │
 * │  ✗ Database hosting                                                     │
 * │  ✗ Server-side rendering capabilities                                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * POPULAR STATIC HOSTING OPTIONS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And there are various static website hosts out there... There is Firebase
 * Hosting which I'm going to use here because it has a generous free plan..."
 *
 * Free Static Hosting Services:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • Firebase Hosting      - Used in this lesson                          │
 * │  • Netlify               - Great free tier, Git integration             │
 * │  • Vercel                - Great for Next.js, works for React too       │
 * │  • GitHub Pages          - Free with GitHub repository                  │
 * │  • AWS Amplify           - AWS ecosystem                                │
 * │  • Cloudflare Pages      - Fast CDN, generous free tier                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * FIREBASE HOSTING SETUP (Step-by-Step)
 * ============================================================================
 *
 * STEP 1: INSTALL FIREBASE CLI
 * ─────────────────────────────
 *
 * INSTRUCTOR QUOTE:
 * "For this we can use the Firebase CLI, the Firebase Command Line Interface
 * which we can install globally with npm."
 *
 * IMPORTANT: This requires MANUAL installation in your terminal:
 *
 *   npm install -g firebase-tools
 *
 * The -g flag installs it globally (available everywhere on your system).
 *
 * ─────────────────────────────
 * STEP 2: LOGIN TO FIREBASE
 * ─────────────────────────────
 *
 * INSTRUCTOR QUOTE:
 * "You now need to log in with your Firebase account... You can do this
 * simply by running Firebase login in the terminal."
 *
 *   firebase login
 *
 * This opens a browser window to authenticate with your Google account.
 *
 * ─────────────────────────────
 * STEP 3: INITIALIZE FIREBASE IN YOUR PROJECT
 * ─────────────────────────────
 *
 * INSTRUCTOR QUOTE:
 * "And now in this project folder, in a terminal navigation to that folder,
 * we wanna execute Firebase init."
 *
 *   firebase init
 *
 * This starts an interactive setup process:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ FIREBASE INIT WIZARD                                                    │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │ 1. "Which Firebase features?" → Select HOSTING                          │
 * │    Use arrow keys and space to select                                   │
 * │                                                                          │
 * │ 2. "Use an existing project or create a new project?"                   │
 * │    → Select existing or create new                                       │
 * │                                                                          │
 * │ 3. "What do you want to use as your public directory?"                  │
 * │    → Type: build                                                         │
 * │    (This is where CRA outputs the production build)                     │
 * │                                                                          │
 * │ 4. "Configure as a single-page app (rewrite all URLs to /index.html)?"  │
 * │    → Type: yes   ← CRITICAL for React Router!                           │
 * │                                                                          │
 * │ 5. "Set up automatic builds with GitHub?"                               │
 * │    → Your choice (no for manual deploys)                                │
 * │                                                                          │
 * │ 6. "Overwrite build/index.html?"                                        │
 * │    → Type: no   ← Keep your build output!                               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * CRITICAL: SINGLE PAGE APP CONFIGURATION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "You should enter yes here because as you might recall all the routing
 * and all the logic for displaying different pages is done on the client
 * side, in the browser, by JavaScript. And in order to make this work, we
 * need to make sure that in the end always just one HTML file is loaded,
 * the index HTML file."
 *
 * WHY THIS MATTERS:
 *
 * WITHOUT SPA Rewrite (BROKEN):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ User visits: yoursite.com/posts                                         │
 * │ Server looks for: /build/posts/index.html                               │
 * │ Result: 404 NOT FOUND ❌                                                 │
 * │ (Because there IS no posts folder - it's a React Router path!)          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WITH SPA Rewrite (WORKING):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ User visits: yoursite.com/posts                                         │
 * │ Server rewrites to: /build/index.html                                   │
 * │ React loads, React Router sees /posts, renders BlogPage ✅              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And React router, our client side router then takes over and based on
 * the URL that was entered renders the appropriate component."
 *
 * ─────────────────────────────
 * STEP 4: DEPLOY
 * ─────────────────────────────
 *
 * INSTRUCTOR QUOTE:
 * "Now to deploy you would run firebase deploy."
 *
 *   firebase deploy
 *
 * This uploads the /build folder contents to Firebase Hosting.
 *
 * OUTPUT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ ✔ Deploy complete!                                                      │
 * │ Project Console: https://console.firebase.google.com/...                │
 * │ Hosting URL: https://your-project-id.web.app                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * FILES CREATED BY FIREBASE INIT
 * ============================================================================
 *
 * After running `firebase init`, these files are created in your project:
 *
 * firebase.json:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ {                                                                        │
 * │   "hosting": {                                                           │
 * │     "public": "build",           ← Directory to deploy                  │
 * │     "ignore": ["firebase.json", "**\/.*", "**\/node_modules/**"],       │
 * │     "rewrites": [                                                        │
 * │       {                                                                  │
 * │         "source": "**",          ← All routes                           │
 * │         "destination": "/index.html"  ← Go to index.html (SPA!)        │
 * │       }                                                                  │
 * │     ]                                                                    │
 * │   }                                                                      │
 * │ }                                                                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * .firebaserc:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ {                                                                        │
 * │   "projects": {                                                          │
 * │     "default": "your-project-id"                                         │
 * │   }                                                                      │
 * │ }                                                                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * RE-DEPLOYING AFTER CHANGES
 * ============================================================================
 *
 * Whenever you make changes:
 *
 * 1. npm run build          ← Create new production build
 * 2. firebase deploy        ← Upload the new build
 *
 * The previous deployment is automatically replaced.
 *
 * ============================================================================
 * LESSON 406 - BUILDING THE APP FOR PRODUCTION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now that we learned about lazy loading and we optimized our code. Therefore
 * we can move forward towards deploying this and we can start building our app
 * for production."
 *
 * ============================================================================
 * WHY WE NEED A BUILD STEP
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "This build step here is required because the application we're building is
 * not the application we're going to upload at least not like this. This is
 * not the code we're going to upload."
 *
 * INSTRUCTOR QUOTE:
 * "This is the code which we use during development. It's very readable and it
 * sometimes even uses features which aren't supported like that in the browser.
 * Like this JSX code that's not supported in browsers. It must be transformed
 * before we can upload this on a server that serves it to end users."
 *
 * DEVELOPMENT CODE (what we write):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • JSX syntax (<div>, <Component />)     → NOT valid browser JS!       │
 * │  • Modern JS features (optional chaining, nullish coalescing)          │
 * │  • Import statements                     → Need bundling               │
 * │  • Readable variable names               → Can be minified             │
 * │  • Comments and whitespace               → Unnecessary in production   │
 * │  • Multiple files                        → Should be bundled           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * DEVELOPMENT SERVER VS PRODUCTION BUILD
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "By the way, here during development when we preview this page we also get a
 * transformed version of that code. This development server, which we started
 * with NPM start is transforming the code as we're writing it. So it's a live
 * transformation process, so to say."
 *
 * DEVELOPMENT (npm start):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • Live transformation as you code                                      │
 * │  • Hot Module Replacement (HMR) - instant updates                       │
 * │  • Source maps for debugging                                            │
 * │  • NOT optimized for size                                               │
 * │  • Includes development warnings and checks                             │
 * │  • Fast rebuilds (focused on developer experience)                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * PRODUCTION (npm run build):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • One-time transformation                                              │
 * │  • Fully optimized for size and performance                             │
 * │  • Minified code (smaller file sizes)                                   │
 * │  • Tree shaking (removes unused code)                                   │
 * │  • No development warnings                                              │
 * │  • Ready for deployment                                                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * RUNNING THE BUILD COMMAND
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, for uploading the code, we also wanna optimize it and we do this by
 * quitting the development server and executing a different script."
 *
 * INSTRUCTOR QUOTE:
 * "Here in this default project which we get from create React app, it's this
 * build script. When we run NPM run build, we execute that script."
 *
 * Command: npm run build
 *
 * This runs the "build" script from package.json:
 * "scripts": {
 *   "build": "react-scripts build"
 * }
 *
 * INSTRUCTOR QUOTE:
 * "And under the hood, this will produce a code bundle with highly optimized
 * and transformed code which is ready to be uploaded."
 *
 * ============================================================================
 * THE BUILD OUTPUT (/build folder)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "As you see, this now creates an optimized production build. And once it
 * finished, it created that build folder here. And it's the content of that
 * build folder that should be deployed to a server."
 *
 * BUILD FOLDER STRUCTURE:
 *
 * /build
 *   ├── index.html                     ← Main HTML file (entry point)
 *   ├── asset-manifest.json            ← Maps files to their hashed names
 *   ├── favicon.ico                    ← Site icon
 *   ├── manifest.json                  ← PWA manifest
 *   ├── robots.txt                     ← Search engine instructions
 *   └── static/
 *       ├── css/
 *       │   ├── main.[hash].css        ← Main styles (minified)
 *       │   ├── 345.[hash].chunk.css   ← Lazy-loaded Blog styles
 *       │   └── 793.[hash].chunk.css   ← Lazy-loaded Post styles
 *       └── js/
 *           ├── main.[hash].js         ← Main bundle (App + React + Router)
 *           ├── 345.[hash].chunk.js    ← Lazy-loaded Blog chunk
 *           └── 793.[hash].chunk.js    ← Lazy-loaded Post chunk
 *
 * INSTRUCTOR QUOTE:
 * "In there in that static folder you have your optimized JavaScript file with
 * those different dynamically loaded chunks for the lazy loading, but also with
 * that main chunk that's downloaded initially."
 *
 * ============================================================================
 * WHAT'S IN THE MAIN BUNDLE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And that file contains all the code you wrote plus all the third party
 * package code you're using including the React library itself."
 *
 * main.[hash].js contains:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • React library code                                                   │
 * │  • React DOM                                                            │
 * │  • React Router                                                         │
 * │  • Your App.js code                                                     │
 * │  • HomePage component (not lazy loaded)                                 │
 * │  • RootLayout component (not lazy loaded)                               │
 * │  • MainNavigation component                                             │
 * │  • All eagerly-loaded dependencies                                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "It's of course not very readable but it's a valid code that can be executed."
 *
 * ============================================================================
 * LAZY-LOADED CHUNKS
 * ============================================================================
 *
 * These chunks are created because of our React.lazy() implementations:
 *
 * 345.[hash].chunk.js (Blog chunk):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • BlogPage component                                                   │
 * │  • PostList component                                                   │
 * │  • Blog loader function                                                 │
 * │  • Related CSS module                                                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * 793.[hash].chunk.js (Post chunk):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  • PostPage component                                                   │
 * │  • PostItem component                                                   │
 * │  • Post loader function                                                 │
 * │  • Related CSS module                                                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * NEXT STEP: DEPLOYMENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So it's the content of the build folder that now must be uploaded. And that
 * is indeed the next step because in the next step we will now upload that code
 * and deploy it as website."
 *
 * The /build folder is what you upload to:
 * • Firebase Hosting
 * • Netlify
 * • Vercel
 * • AWS S3
 * • Any static file hosting service
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
