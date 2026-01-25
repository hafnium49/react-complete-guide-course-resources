/**
 * ============================================================================
 * DYNAMIC BLOG POST PAGE - LESSON 437: Dynamic Routes in Next.js
 * ============================================================================
 *
 * LESSON 437 - WHAT IS A DYNAMIC ROUTE?
 *
 * INSTRUCTOR QUOTE:
 * "So what we need here for these posts is a so-called dynamic route, a route
 * which we only define once, but which is then capable of rendering different
 * pages for different blog posts."
 *
 * ============================================================================
 * THE SQUARE BRACKET SYNTAX: [slug]
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And in NextJS, we can create such a dynamic route by adding a nested folder
 * where we use square brackets. This is a special syntax supported by NextJS,
 * where you then put any placeholder, any identifier of your choice between
 * those square brackets, for example, slug, or whatever you want. And this
 * placeholder will become important later."
 *
 * THE FOLDER NAME [slug] IS SPECIAL:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  [slug]  =  "I don't know the exact value yet, but there will be one"   │
 * │                                                                          │
 * │  The square brackets tell Next.js:                                       │
 * │  - This is a DYNAMIC segment (not a literal folder name)                 │
 * │  - The actual value will come from the URL                               │
 * │  - Use "slug" as the key to access that value                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * YOU CAN NAME IT ANYTHING:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  [slug]       → params.slug       (common for blog posts)               │
 * │  [id]         → params.id         (common for database IDs)             │
 * │  [productId]  → params.productId  (for products)                        │
 * │  [username]   → params.username   (for user profiles)                   │
 * │  [anything]   → params.anything   (whatever you choose!)                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * HOW DYNAMIC ROUTES WORK
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "This square bracket thing here simply tells NextJS that we want to have
 * some path segment after blog in this case, but that we don't know the exact
 * value of the segment yet."
 *
 * URL MATCHING EXAMPLES:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  URL                     │  Handled by        │  params.slug value      │
 * │  ────────────────────────│────────────────────│─────────────────────────│
 * │  /blog/post-1            │  This file         │  "post-1"               │
 * │  /blog/post-2            │  This file         │  "post-2"               │
 * │  /blog/my-first-article  │  This file         │  "my-first-article"     │
 * │  /blog/anything-else     │  This file         │  "anything-else"        │
 * │  /blog/123               │  This file         │  "123"                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And as you can tell, if you take a look at this URL, it changes. We have
 * post-2 here as a segment after /blog and post-1 for that other link. But
 * it's the same page.js file becoming active for different segment values,
 * so for different path segment values."
 *
 * ============================================================================
 * FILE STRUCTURE FOR THIS DYNAMIC ROUTE
 * ============================================================================
 *
 * app/
 * └── blog/
 *     ├── page.js           → /blog (blog index)
 *     └── [slug]/           ← DYNAMIC ROUTE FOLDER (square brackets!)
 *         └── page.js       → /blog/* (THIS FILE - handles all blog posts)
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * THE PARAMS PROP: ACCESSING DYNAMIC VALUES
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Because NextJS actually passes a props object to all those page components.
 * And all these page components get one special prop, which you can pull out
 * with help of destructuring, and that's a params prop, which again, is set
 * by NextJS."
 *
 * IMPORTANT: You don't pass this prop manually!
 *
 * INSTRUCTOR QUOTE:
 * "You don't have to pass it manually because you're not rendering these
 * components manually. Instead, NextJS is doing that for you, and it is
 * setting this prop for you."
 *
 * WHAT'S INSIDE params:
 *
 * INSTRUCTOR QUOTE:
 * "And what's inside of this params prop? Well, this will be an object where
 * every placeholder you had in such a dynamic route here will be a key. And
 * the value stored under that key will be the concrete value encoded in the
 * URL. So post-1, for example."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FOLDER NAME    │  URL             │  params object                     │
 * │  ───────────────│──────────────────│────────────────────────────────────│
 * │  [slug]         │  /blog/post-1    │  { slug: "post-1" }                │
 * │  [id]           │  /users/123      │  { id: "123" }                     │
 * │  [category]     │  /shop/clothing  │  { category: "clothing" }          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * COMPARISON WITH REACT ROUTER:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  REACT ROUTER:                                                          │
 * │    const { slug } = useParams();                                        │
 * │                                                                          │
 * │  NEXT.JS (App Router):                                                  │
 * │    export default function Page({ params }) {                           │
 * │      const { slug } = params;  // Or just params.slug                   │
 * │    }                                                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * BLOG POST PAGE COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "Now we need to go to that page.js file in that slug folder, in that square
 * brackets slug folder. And here of course, we also should export a component
 * function, the blog post page, for example."
 *
 * @param {Object} props - Props passed by Next.js
 * @param {Object} props.params - Dynamic route parameters
 * @param {string} props.params.slug - The blog post slug from the URL
 */
export default function BlogPostPage({ params }) {
  /**
   * ACCESSING THE DYNAMIC VALUE
   *
   * INSTRUCTOR QUOTE:
   * "And it's then this placeholder, this identifier slug that will give us
   * access to the concrete value that we do get when that route is loaded."
   *
   * INSTRUCTOR QUOTE:
   * "And you can see that if you output it by accessing params.slug here in
   * this case, in this page here. If you do that, you see post-1 here. If I
   * enter anything-else here, you see anything-else here."
   *
   * Try visiting:
   *   /blog/post-1       → Shows "post-1"
   *   /blog/post-2       → Shows "post-2"
   *   /blog/hello-world  → Shows "hello-world"
   *   /blog/anything     → Shows "anything"
   */

  return (
    <main>
      <h1>Blog Post</h1>

      {/**
       * Display the dynamic slug value from the URL
       *
       * PRACTICAL USE CASE (from instructor):
       * "And this is a great feature because this would now allow you to,
       * for example, reach out to a database where your blog posts might
       * be stored and fetch the blog post with that slug so that you can
       * then show its content on this page instead."
       *
       * In a real application, you would:
       * 1. Use params.slug to query a database
       * 2. Fetch the blog post content
       * 3. Display the actual blog post
       *
       * Example (pseudo-code):
       *   const post = await fetchBlogPost(params.slug);
       *   return <article>{post.content}</article>;
       */}
      <p>Slug: {params.slug}</p>
    </main>
  );
}

/**
 * ============================================================================
 * LESSON 437 SUMMARY: DYNAMIC ROUTES IN NEXT.JS
 * ============================================================================
 *
 * KEY TAKEAWAYS:
 *
 * 1. PROBLEM: Static routes don't scale
 *    - Can't create a folder for every blog post, product, user, etc.
 *
 * 2. SOLUTION: Dynamic routes with square brackets [placeholder]
 *    - Define once, handle many URLs
 *    - The placeholder name becomes the key in params
 *
 * 3. SYNTAX: [slug] folder name
 *    - Square brackets = dynamic segment
 *    - "slug" = your chosen identifier (can be anything)
 *
 * 4. ACCESSING VALUES: params prop
 *    - Next.js automatically passes params to page components
 *    - params.slug contains the actual URL value
 *    - No useParams() hook needed (unlike React Router)
 *
 * 5. REAL-WORLD USE:
 *    - Use params.slug to fetch data from a database
 *    - Display dynamic content based on the URL
 *
 * INSTRUCTOR QUOTE:
 * "And that's how you can set up such dynamic routes."
 *
 * INSTRUCTOR QUOTE:
 * "Now, NextJS has way more to offer. You can also set up custom not found
 * pages, deal with errors, add more pages, fetch data, change data, and we'll
 * do all that, but not in this demo project. Instead by working on that Meals
 * app I showed you before."
 *
 * ============================================================================
 * ADVANCED: MORE DYNAMIC ROUTE PATTERNS
 * ============================================================================
 *
 * Next.js supports even more dynamic route patterns:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PATTERN              │  EXAMPLE URL              │  params             │
 * │  ─────────────────────│───────────────────────────│─────────────────────│
 * │  [slug]               │  /blog/hello              │  { slug: "hello" }  │
 * │                       │                           │                     │
 * │  [...slug]            │  /blog/a/b/c              │  { slug: ["a","b",  │
 * │  (Catch-all)          │                           │    "c"] }           │
 * │                       │                           │                     │
 * │  [[...slug]]          │  /blog OR /blog/a/b       │  { slug: undefined }│
 * │  (Optional catch-all) │                           │  OR { slug: ["a",   │
 * │                       │                           │    "b"] }           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
