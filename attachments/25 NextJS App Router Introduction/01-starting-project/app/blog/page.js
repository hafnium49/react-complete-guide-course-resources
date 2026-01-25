/**
 * ============================================================================
 * BLOG INDEX PAGE - LESSON 437: Dynamic Routes in Next.js
 * ============================================================================
 *
 * LESSON 437 - THE PROBLEM WITH STATIC ROUTES
 *
 * INSTRUCTOR QUOTE:
 * "Let's say we also wanna have a blog route in here. So of course we could
 * add a blog folder in the app directory and add a page.js file in there.
 * But let's then say, we also wanna have different blog posts."
 *
 * THE SCALABILITY PROBLEM:
 *
 * INSTRUCTOR QUOTE:
 * "So that nested in that blog folder, we have a post-1 folder, a post-2
 * folder, and so on. And of course, this then doesn't lead anywhere because
 * this would mean that we need to add a new folder whenever a new blog post
 * is added to the database or wherever we're storing them, and that is not
 * scalable and not maintainable."
 *
 * STATIC APPROACH (NOT SCALABLE):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/                                                                   │
 * │  └── blog/                                                              │
 * │      ├── page.js       → /blog                                          │
 * │      ├── post-1/                                                        │
 * │      │   └── page.js   → /blog/post-1 (manually created)                │
 * │      ├── post-2/                                                        │
 * │      │   └── page.js   → /blog/post-2 (manually created)                │
 * │      ├── post-3/                                                        │
 * │      │   └── page.js   → /blog/post-3 (manually created)                │
 * │      └── ...100 more?  → NOT SCALABLE!                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * DYNAMIC APPROACH (SCALABLE - What we're using):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/                                                                   │
 * │  └── blog/                                                              │
 * │      ├── page.js       → /blog (THIS FILE)                              │
 * │      └── [slug]/                                                        │
 * │          └── page.js   → /blog/post-1, /blog/post-2, /blog/anything!    │
 * │                          (ONE file handles ALL blog posts!)             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * THIS FILE: app/blog/page.js - THE BLOG INDEX PAGE
 * ============================================================================
 *
 * This page serves as the entry point to the blog section.
 * It provides links to individual blog posts using dynamic routes.
 *
 * URL: http://localhost:3000/blog
 *
 * ============================================================================
 */

/**
 * Import Link component for client-side navigation
 * (Lesson 433 - stays in SPA, no full page reload)
 */
import Link from 'next/link';

/**
 * BLOG PAGE COMPONENT
 *
 * This is a static page that lists links to individual blog posts.
 * The blog posts themselves are handled by a dynamic route.
 *
 * INSTRUCTOR QUOTE:
 * "Now let's start with the page.js file directly in the blog folder though.
 * There we could of course export a component called BlogPage where we then
 * return this main element maybe and say, 'The Blog'."
 */
export default function BlogPage() {
  return (
    <main>
      <h1>The Blog</h1>

      {/**
       * ====================================================================
       * LINKING TO DYNAMIC ROUTES
       * ====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "And then here I want to have, let's say, two paragraphs with links
       * to different blog posts. So I'll use that link component and import
       * that from next/link. And then here, let's say we wanna have one blog
       * post under '/blog/post-1' like this, but then we also wanna have a
       * second one that leads to Post 2 here in that path. So almost the
       * same path, but different segments here at the end."
       *
       * These links point to:
       *   /blog/post-1 → Handled by app/blog/[slug]/page.js (slug = "post-1")
       *   /blog/post-2 → Handled by app/blog/[slug]/page.js (slug = "post-2")
       *
       * The [slug] folder is a DYNAMIC ROUTE that handles BOTH URLs
       * with the SAME page.js file!
       */}
      <p>
        <Link href="/blog/post-1">Post 1</Link>
      </p>
      <p>
        <Link href="/blog/post-2">Post 2</Link>
      </p>

      {/**
       * You can link to ANY path - the dynamic route will handle it!
       * Try adding more links:
       *   /blog/my-first-article
       *   /blog/how-to-learn-react
       *   /blog/anything-you-want
       *
       * All of these will be caught by the [slug] dynamic route.
       */}
    </main>
  );
}

/**
 * ============================================================================
 * LESSON 437 KEY CONCEPT: WHY DYNAMIC ROUTES?
 * ============================================================================
 *
 * PROBLEM: You can't create a new folder for every blog post
 *          (or product, or user profile, etc.)
 *
 * SOLUTION: Dynamic routes - define the pattern ONCE, handle MANY URLs
 *
 * COMPARISON WITH REACT ROUTER:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  REACT ROUTER:                      NEXT.JS:                            │
 * │  ─────────────────────────────────  ─────────────────────────────────── │
 * │  <Route path="/blog/:slug" />       app/blog/[slug]/page.js             │
 * │                                                                          │
 * │  :slug (colon syntax)               [slug] (square bracket syntax)      │
 * │                                                                          │
 * │  useParams() hook                   params prop (passed by Next.js)     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
