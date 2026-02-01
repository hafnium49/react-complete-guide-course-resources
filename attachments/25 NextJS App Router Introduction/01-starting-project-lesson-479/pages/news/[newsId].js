/**
 * ============================================================================
 * DYNAMIC ROUTE PAGE - LESSONS 482-483: Dynamic Routes & useRouter Hook
 * ============================================================================
 *
 * This file demonstrates DYNAMIC ROUTING in NextJS and how to extract
 * the dynamic URL segment value using the useRouter hook.
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
 * 🎓 LESSON 483: EXTRACTING THE DYNAMIC PATH VALUE
 * ============================================================================
 *
 * From the instructor:
 * "To extract the concrete value entered in the URL when this page is loaded
 * Next.js gives us a special hook which we can use. A special react hook
 * which we can use in functional components."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  THE useRouter HOOK                                                      │
 * │                                                                          │
 * │  import { useRouter } from 'next/router';                               │
 * │                              ───────────                                │
 * │                                  │                                       │
 * │                                  └── Sub-package of next                │
 * │                                      Exposes routing functionality      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "Here, instead we import from next to be precise from next/router which is
 * a sub package of the next package which exposes routing specific
 * functionality. And here we got the useRouter hook. It's a regular react
 * hook, just not one built into react but a custom hook built by the next team."
 *
 * ============================================================================
 * 🎓 LESSON 483: THE ROUTER OBJECT
 * ============================================================================
 *
 * From the instructor:
 * "And we can now call this hook inside of the detailed page, simply like this.
 * If we do that, we get access to a router object and on that router object
 * we then got certain pieces of data and certain methods which we can call."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHAT THE ROUTER OBJECT PROVIDES                                         │
 * │                                                                          │
 * │  const router = useRouter();                                             │
 * │                                                                          │
 * │  router.query     → Object with dynamic segment values                  │
 * │  router.pathname  → The route pattern (e.g., '/news/[newsId]')          │
 * │  router.asPath    → Actual URL path (e.g., '/news/my-article')          │
 * │  router.push()    → Navigate programmatically                           │
 * │  router.replace() → Navigate without adding to history                  │
 * │  router.back()    → Go back in history                                  │
 * │                                                                          │
 * │  We focus on router.query for accessing URL values.                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "Now, for example, we get methods for programmatic navigation but we don't
 * need this here so we can ignore this for now but we also get access to
 * the values encoded in the URL so, to the concrete values of these dynamic
 * path segments."
 *
 * ============================================================================
 * 🎓 LESSON 483: ACCESSING DYNAMIC VALUES WITH router.query
 * ============================================================================
 *
 * From the instructor:
 * "And getting access is easy on this router object we've got this query
 * property which gives us access to a nested object and on that query object
 * we then have the identifier which we chose between the square brackets
 * as a property name."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  HOW router.query MAPS TO THE FILE NAME                                  │
 * │                                                                          │
 * │  FILE NAME: [newsId].js                                                 │
 * │              ──────                                                     │
 * │                 │                                                        │
 * │                 ▼                                                        │
 * │  ACCESS VIA: router.query.newsId                                        │
 * │                           ──────                                        │
 * │                                                                          │
 * │  The identifier in brackets becomes the property name!                  │
 * │                                                                          │
 * │  EXAMPLES:                                                               │
 * │  ─────────────────────────────────────────────────────                  │
 * │  [slug].js      → router.query.slug                                     │
 * │  [productId].js → router.query.productId                                │
 * │  [username].js  → router.query.username                                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "So, in my case newsId because that's what I entered here as a file name
 * between the square brackets. And that will then hold the concrete value
 * in the URL for this dynamic segment for which this page was visited."
 *
 * ============================================================================
 * 🎓 LESSON 483: THE TWO-RENDER BEHAVIOR (IMPORTANT!)
 * ============================================================================
 *
 * From the instructor:
 * "If we reload we see undefined first and then something else. Now, we see
 * two logs here because that's how useRouter works. It runs immediately when
 * the page is first rendered and at this point it doesn't yet know what's
 * in the URL but then once we have that information the component renders
 * again and we got that concrete value that is just how that hook works."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  useRouter TWO-PHASE RENDERING                                           │
 * │                                                                          │
 * │  FIRST RENDER (during hydration):                                        │
 * │  ─────────────────────────────────                                       │
 * │  router.query.newsId = undefined                                         │
 * │  (Next.js hasn't parsed the URL yet)                                    │
 * │                                                                          │
 * │  SECOND RENDER (after hydration):                                        │
 * │  ──────────────────────────────────                                      │
 * │  router.query.newsId = "this-course-is-great"                           │
 * │  (Now the actual URL value is available)                                │
 * │                                                                          │
 * │  ⚠️  IMPORTANT: Always handle the undefined case!                       │
 * │      Use: if (!router.query.newsId) return <Loading />;                 │
 * │      Or:  const newsId = router.query.newsId ?? 'default';              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "So, the second time it executes the second time this component is evaluated
 * we got something else which is the concrete URL value I entered here.
 * And if I have this-course-is-great then we would see this here being logged."
 *
 * ============================================================================
 * 🎓 LESSON 483: PRACTICAL USE - FETCHING DATA
 * ============================================================================
 *
 * From the instructor:
 * "Now, why is this helpful? Well, we could, for example use this now to get
 * our newsId like this and then if we had a database, if we had some backend
 * API from which we can fetch our news we could send a request to the backend
 * API here to fetch the news item with newsId. That's what we could do here."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  REAL-WORLD DATA FETCHING PATTERN                                        │
 * │                                                                          │
 * │  function DetailPage() {                                                 │
 * │    const router = useRouter();                                           │
 * │    const newsId = router.query.newsId;                                   │
 * │                                                                          │
 * │    // In a real app, you would:                                          │
 * │    // 1. Use newsId to fetch data from your API                         │
 * │    // 2. Display loading state while fetching                           │
 * │    // 3. Show error state if fetch fails                                │
 * │    // 4. Render the fetched content                                     │
 * │                                                                          │
 * │    // Example (conceptual):                                              │
 * │    // useEffect(() => {                                                  │
 * │    //   fetch(`/api/news/${newsId}`)                                    │
 * │    //     .then(res => res.json())                                       │
 * │    //     .then(data => setNewsItem(data));                              │
 * │    // }, [newsId]);                                                      │
 * │  }                                                                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "I will not do it here because we'll soon dive into data fetching and data
 * storage and we'll see different approaches we can use there with Next.js
 * so we are going to take a look at that in detail in a couple of minutes
 * but we could do this here if we had such a backend API."
 *
 * ============================================================================
 * 🎓 LESSON 483: CLASS COMPONENTS ALTERNATIVE
 * ============================================================================
 *
 * From the instructor:
 * "It also has an alternative for class-based components a higher order
 * component you can wrap around your component and I do discuss this in
 * my full Next.js course but we can ignore that here."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FOR CLASS COMPONENTS (if needed)                                        │
 * │                                                                          │
 * │  import { withRouter } from 'next/router';                              │
 * │                                                                          │
 * │  class DetailPage extends React.Component {                              │
 * │    render() {                                                            │
 * │      const { router } = this.props;                                      │
 * │      const newsId = router.query.newsId;                                │
 * │      // ...                                                              │
 * │    }                                                                     │
 * │  }                                                                       │
 * │                                                                          │
 * │  export default withRouter(DetailPage);                                 │
 * │                                                                          │
 * │  Note: Functional components with hooks are the modern approach.        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎓 LESSON 483: BUILDING TRULY DYNAMIC PAGES
 * ============================================================================
 *
 * From the instructor:
 * "And that's how we can build dynamic pages which work for different pieces
 * of data and then can do different things based on different pieces of data.
 * Here, we could fetch different news items from a database based on the
 * different Ids for which we visit this page."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  DYNAMIC PAGES WORKFLOW                                                  │
 * │                                                                          │
 * │  1. User visits: /news/breaking-news-2024                               │
 * │                         ──────────────────                              │
 * │                               │                                          │
 * │  2. [newsId].js loads        │                                          │
 * │                               │                                          │
 * │  3. useRouter() extracts:    │                                          │
 * │     newsId = "breaking-news-2024"                                       │
 * │                               │                                          │
 * │  4. Fetch from database:     │                                          │
 * │     GET /api/news/breaking-news-2024                                    │
 * │                               │                                          │
 * │  5. Render article content   ▼                                          │
 * │     "Breaking News: Major Event in 2024..."                             │
 * │                                                                          │
 * │  Same component, different data based on URL!                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎓 LESSON 483: TESTING IN BROWSER CONSOLE
 * ============================================================================
 *
 * To see the useRouter behavior:
 *
 * 1. Run: npm run dev
 * 2. Visit: http://localhost:3000/news/this-course-is-great
 * 3. Open Developer Tools (F12) → Console tab
 * 4. You'll see two console.log outputs:
 *    - First:  undefined (initial render)
 *    - Second: "this-course-is-great" (after hydration)
 *
 * Try different URLs and watch the console output change:
 * - /news/hello-world      → logs "hello-world"
 * - /news/my-first-article → logs "my-first-article"
 *
 * ============================================================================
 * UPDATED ROUTE MAPPING (LESSONS 482-483)
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
 * ============================================================================
 * IMPORT: useRouter from next/router
 * ============================================================================
 *
 * From the instructor:
 * "Here, instead we import from next to be precise from next/router which is
 * a sub package of the next package which exposes routing specific
 * functionality."
 *
 * This is a CUSTOM React hook provided by the Next.js team, not built into
 * React itself. It gives access to the router object with URL information.
 */
import { useRouter } from 'next/router';

/**
 * DetailPage Component - Dynamic Version with useRouter
 *
 * This is the SAME component loaded for INFINITE different URLs.
 * The path segment after /news/ can be anything, and this component handles it.
 *
 * From the instructor:
 * "So, it's the same component technically but with different content."
 *
 * Now using useRouter to extract the dynamic segment value from the URL.
 */
function DetailPage() {
  /**
   * STEP 1: Call the useRouter hook to get the router object
   *
   * From the instructor:
   * "And we can now call this hook inside of the detailed page, simply like
   * this. If we do that, we get access to a router object."
   */
  const router = useRouter();

  /**
   * STEP 2: Extract the dynamic segment value from router.query
   *
   * From the instructor:
   * "On this router object we've got this query property which gives us access
   * to a nested object and on that query object we then have the identifier
   * which we chose between the square brackets as a property name."
   *
   * The property name "newsId" matches the file name: [newsId].js
   * If file was [slug].js, we'd use router.query.slug instead.
   */
  const newsId = router.query.newsId;

  /**
   * STEP 3: Console.log to observe the two-render behavior
   *
   * From the instructor:
   * "So, if we now just console log this for the moment to see what's in there.
   * If I save that and go back and open the developer tools if we reload we
   * see undefined first and then something else."
   *
   * Open your browser's Developer Tools (F12) → Console tab to see this!
   */
  console.log(newsId);

  /**
   * OPTIONAL: In a real application, you would use newsId to fetch data
   *
   * From the instructor:
   * "Well, we could, for example use this now to get our newsId like this and
   * then if we had a database, if we had some backend API from which we can
   * fetch our news we could send a request to the backend API here to fetch
   * the news item with newsId."
   *
   * Example (not implemented - just for illustration):
   *
   * useEffect(() => {
   *   if (newsId) {
   *     fetch(`/api/news/${newsId}`)
   *       .then(res => res.json())
   *       .then(data => setNewsItem(data));
   *   }
   * }, [newsId]);
   */

  return <h1>The Detail Page</h1>;
}

export default DetailPage;
