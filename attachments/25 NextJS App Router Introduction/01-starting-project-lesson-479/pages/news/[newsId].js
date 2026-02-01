/**
 * ============================================================================
 * DYNAMIC ROUTE PAGE - LESSON 482: Dynamic Routes with Square Brackets
 * ============================================================================
 *
 * This file demonstrates DYNAMIC ROUTING in NextJS.
 * Route: /news/[ANY-VALUE-HERE]
 *
 * ============================================================================
 * 🎓 LESSON 482: THE PROBLEM WITH STATIC ROUTES
 * ============================================================================
 *
 * From the instructor:
 * "Creating the detail page like this works, until we realize that we probably
 * would have more than one news item on our news site. It would be very
 * realistic that index.js and the news folder should output a list of news
 * items. And then we can click those individual items and then take into the
 * detailed pages with the concrete content for the news item we selected."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  THE PROBLEM                                                            │
 * │                                                                          │
 * │  With static routes like something-important.js:                        │
 * │                                                                          │
 * │  • You need a NEW FILE for EVERY news item                              │
 * │  • /news/article-1  → needs article-1.js                                │
 * │  • /news/article-2  → needs article-2.js                                │
 * │  • /news/article-3  → needs article-3.js                                │
 * │  • ...hundreds of files for hundreds of articles!                       │
 * │                                                                          │
 * │  This is NOT scalable or realistic for a real website.                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "So we use the same page over and over again for different news items for
 * different content. We would probably fetch the concrete content from some
 * database when a user visits this detail page and then display it on the
 * screen. So, it's the same component technically but with different content."
 *
 * ============================================================================
 * 🎓 LESSON 482: THE SOLUTION - DYNAMIC ROUTES
 * ============================================================================
 *
 * From the instructor:
 * "So hard coding, the identifier, like something dash important like this in
 * the file name is not very realistic. Instead, we wanna create a so-called
 * dynamic page where the path segment to concrete value in the path can be
 * dynamic, so that it's not just slash news, slash something important, but
 * also slash something else or slash this course is great, whatever."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  DYNAMIC ROUTES - ONE FILE HANDLES INFINITE URLS                        │
 * │                                                                          │
 * │  FILE: [newsId].js (THIS FILE)                                          │
 * │                                                                          │
 * │  MATCHES ALL OF THESE URLS:                                             │
 * │  ─────────────────────────────────────────────                          │
 * │  /news/something-important     ✓                                        │
 * │  /news/something-else          ✓                                        │
 * │  /news/this-course-is-great    ✓                                        │
 * │  /news/breaking-news-2024      ✓                                        │
 * │  /news/any-value-at-all        ✓                                        │
 * │                                                                          │
 * │  ONE component serves ALL these different URLs!                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎓 LESSON 482: SQUARE BRACKET SYNTAX
 * ============================================================================
 *
 * From the instructor:
 * "For that, we change the file name here to a different file name, and we
 * use a special syntax which will be understood by nextJS. We use square
 * brackets here in the file name in front of the extension."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  DYNAMIC FILE NAMING SYNTAX                                             │
 * │                                                                          │
 * │  STATIC ROUTE:                                                           │
 * │  something-important.js  →  Only matches /news/something-important      │
 * │                                                                          │
 * │  DYNAMIC ROUTE:                                                          │
 * │  [newsId].js            →  Matches /news/ANYTHING                       │
 * │   ├──────┤                                                              │
 * │   │      │                                                              │
 * │   │      └── Your chosen identifier (can be any name)                   │
 * │   └── Square brackets = "this is dynamic"                               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "If you have square brackets in your file name like this, this tells nextJS
 * that this will be a dynamic page so that it should be loaded for different
 * values in your path."
 *
 * ============================================================================
 * 🎓 LESSON 482: CHOOSING THE IDENTIFIER NAME
 * ============================================================================
 *
 * From the instructor:
 * "And then you can add an identifier between those square brackets where the
 * identifier name is totally up to you. Something like newsId, for example,
 * like this. But this again is up to you, but you need those square brackets."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  IDENTIFIER NAMING                                                       │
 * │                                                                          │
 * │  The name between [ ] is YOUR CHOICE:                                   │
 * │                                                                          │
 * │  [newsId].js     ← We chose "newsId" (used in this file)                │
 * │  [slug].js       ← Common alternative                                   │
 * │  [id].js         ← Simple and generic                                   │
 * │  [articleId].js  ← Another descriptive option                           │
 * │                                                                          │
 * │  The identifier becomes a VARIABLE you can access in your component.    │
 * │  Choose a name that describes what the value represents.                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎓 LESSON 482: HOW NEXTJS INTERPRETS DYNAMIC ROUTES
 * ============================================================================
 *
 * From the instructor:
 * "This then tells nextJS that this page will be loaded for different values.
 * So for example, for something important after slash news but also for any
 * other identifier."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  NEXTJS ROUTE MATCHING BEHAVIOR                                          │
 * │                                                                          │
 * │  When a user visits: /news/this-course-is-great                         │
 * │                                                                          │
 * │  1. NextJS looks in pages/news/ folder                                   │
 * │  2. No exact match (no "this-course-is-great.js" file)                  │
 * │  3. Finds [newsId].js - a dynamic route!                                │
 * │  4. Loads this component with newsId = "this-course-is-great"           │
 * │                                                                          │
 * │  The value "this-course-is-great" becomes accessible via:               │
 * │  • router.query.newsId (client-side)                                    │
 * │  • getServerSideProps context.params.newsId (server-side)               │
 * │                                                                          │
 * │  (Extracting this value will be covered in the NEXT lesson)             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎓 LESSON 482: TESTING DYNAMIC ROUTES
 * ============================================================================
 *
 * From the instructor:
 * "If we now saved as again, if I load this page for /news/thiscourseisgreat,
 * I see the detail page, but I also see for something else or anything else
 * we enter after slash news."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  TEST IT YOURSELF                                                        │
 * │                                                                          │
 * │  1. Run: npm run dev                                                     │
 * │  2. Visit ANY of these URLs - they ALL work with this ONE file:         │
 * │                                                                          │
 * │     http://localhost:3000/news/thiscourseisgreat                        │
 * │     http://localhost:3000/news/something-else                           │
 * │     http://localhost:3000/news/anything-you-want                        │
 * │     http://localhost:3000/news/my-first-article                         │
 * │     http://localhost:3000/news/breaking-news                            │
 * │                                                                          │
 * │  All show "The Detail Page" - same component, different URLs!           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎓 LESSON 482: WHY THIS IS A KEY FEATURE
 * ============================================================================
 *
 * From the instructor:
 * "So that is how we can add such a dynamic path here. And that is another
 * key feature of nextJS. It's a feature that allows us to build truly dynamic
 * and flexible websites with nextJS."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  REAL-WORLD APPLICATIONS                                                 │
 * │                                                                          │
 * │  Dynamic routes are essential for:                                       │
 * │                                                                          │
 * │  • Blog posts:     /blog/[slug].js                                      │
 * │  • Product pages:  /products/[productId].js                             │
 * │  • User profiles:  /users/[username].js                                 │
 * │  • News articles:  /news/[newsId].js  ← (this example)                  │
 * │                                                                          │
 * │  Without dynamic routes, you'd need to create a separate file           │
 * │  for every single item - completely impractical!                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎓 LESSON 482: WHAT'S NEXT - EXTRACTING THE PATH VALUE
 * ============================================================================
 *
 * From the instructor:
 * "But how can we now extract the entered path value inside of the component
 * so that we can, for example, then fetch the correct news item from a
 * database, let's say when a user visits this page?"
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  COMING IN THE NEXT LESSON                                               │
 * │                                                                          │
 * │  We'll learn how to ACCESS the dynamic value:                           │
 * │                                                                          │
 * │  URL: /news/my-first-article                                            │
 * │                  ────────────────                                       │
 * │                       │                                                  │
 * │                       ▼                                                  │
 * │  In component: router.query.newsId = "my-first-article"                 │
 * │                                                                          │
 * │  This allows us to:                                                      │
 * │  • Fetch specific data from a database                                   │
 * │  • Display the correct content for each news item                       │
 * │  • Build truly dynamic, data-driven pages                               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * UPDATED ROUTE MAPPING (LESSON 482)
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE                              │  URL                               │
 * │────────────────────────────────────┼────────────────────────────────────│
 * │  pages/index.js                    │  /                                 │
 * │  pages/news/index.js               │  /news                             │
 * │  pages/news/[newsId].js (THIS)     │  /news/:newsId (any value!)       │
 * │  pages/news/something-important.js │  /news/something-important (static)│
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * NOTE: Static routes (like something-important.js) take PRIORITY over
 * dynamic routes when both could match. /news/something-important will
 * load something-important.js, not [newsId].js.
 *
 * ============================================================================
 */

// pages/news/[newsId].js serves: /news/ANY-VALUE-HERE (dynamic)

/**
 * DetailPage Component - Dynamic Version
 *
 * This is the SAME component loaded for INFINITE different URLs.
 * The path segment after /news/ can be anything, and this component handles it.
 *
 * From the instructor:
 * "So, it's the same component technically but with different content."
 *
 * In the next lesson, we'll learn to extract the dynamic segment value
 * and use it to fetch/display the correct content.
 */
function DetailPage() {
  // Currently displays static text - next lesson will show how to
  // access the dynamic newsId value from the URL and use it
  return <h1>The Detail Page</h1>;
}

export default DetailPage;
