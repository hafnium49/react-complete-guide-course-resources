/**
 * ============================================================================
 * pages/api/new-meetup.js - LESSON 498: API ROUTES IN NEXTJS
 * ============================================================================
 *
 * LESSON 498: Introduction to API Routes - Building a Backend API
 *
 * ============================================================================
 * 🎓 LESSON 498: API ROUTES - A MAJOR NEXTJS FEATURE
 * ============================================================================
 *
 * From the instructor:
 * "And this then also allows me to show you the last major NextJS feature,
 * which is added by Next to your React apps."
 *
 * From the instructor:
 * "NextJS makes it easy for us to build an API, a backend API, together with
 * our front-end React app in the same project."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHAT ARE API ROUTES?                                                   │
 * │                                                                          │
 * │  From the instructor:                                                    │
 * │  "API routes are a special routes, special pages, if you wanna call it  │
 * │  like this which don't return HTML code, but which are instead about    │
 * │  accepting incoming HTTP requests, also post patch, put delete requests,│
 * │  whatever you need with JSON data attached to them and which then might │
 * │  do whatever you need to do."                                            │
 * │                                                                          │
 * │  REGULAR PAGES:                                                          │
 * │  • Return HTML/React components                                          │
 * │  • Rendered in browser                                                   │
 * │  • User-facing UI                                                        │
 * │                                                                          │
 * │  API ROUTES:                                                             │
 * │  • Return JSON data                                                      │
 * │  • Handle HTTP requests (GET, POST, PUT, DELETE, etc.)                  │
 * │  • Server-side only (never exposed to client)                           │
 * │  • Can interact with databases, external APIs, etc.                     │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📁 THE SPECIAL /api FOLDER
 * ============================================================================
 *
 * From the instructor:
 * "Now to add API routes, you add a special folder in your pages folder,
 * and that's a folder named API."
 *
 * From the instructor:
 * "And just as the pages folder has to be named pages, this folder has to be
 * named API and it has to be in the pages folder. Then the NextJS will pick
 * up any JavaScript files stored in there and turn those files into API routes."
 *
 * FOLDER STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  /pages/                                                                 │
 * │  ├── index.js              ← Regular page (returns HTML)                │
 * │  ├── new-meetup/                                                         │
 * │  │   └── index.js          ← Regular page (returns HTML)                │
 * │  ├── [meetupId]/                                                         │
 * │  │   └── index.js          ← Regular page (returns HTML)                │
 * │  │                                                                       │
 * │  └── api/                  ← SPECIAL FOLDER (must be named "api")       │
 * │      └── new-meetup.js     ← API ROUTE (returns JSON)                   │
 * │                              URL: /api/new-meetup                        │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔗 FILE NAMES = URL PATHS
 * ============================================================================
 *
 * From the instructor:
 * "In this API folder, you can then again add JavaScript files where the file
 * names will act as path segments in the URL. For example, a new-meetup.js
 * file again, now here in the API folder."
 *
 * FILE NAME → URL MAPPING:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  FILE                           URL                                      │
 * │  ────────────────────────────────────────────────                       │
 * │  pages/api/new-meetup.js   →   /api/new-meetup                          │
 * │  pages/api/meetups.js      →   /api/meetups                             │
 * │  pages/api/users/index.js  →   /api/users                               │
 * │  pages/api/users/[id].js   →   /api/users/:id (dynamic)                 │
 * │                                                                          │
 * │  Same routing rules as pages, but prefixed with /api/                   │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ⚠️ API ROUTES ARE NOT REACT COMPONENTS
 * ============================================================================
 *
 * From the instructor:
 * "Now, in those JavaScript files here, you then don't create a React
 * component function. These API routes are not about defining, rendering
 * or returning React components."
 *
 * From the instructor:
 * "Instead in there, we will define functions which contains server-side code
 * because API routes will only run on the server never on the client."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  REGULAR PAGE FILE                 API ROUTE FILE                       │
 * │  ─────────────────────             ───────────────                      │
 * │                                                                          │
 * │  function HomePage() {             function handler(req, res) {         │
 * │    return (                          // Server-side code                │
 * │      <div>Hello</div>                res.json({ data: '...' });         │
 * │    );                              }                                     │
 * │  }                                                                       │
 * │  export default HomePage;          export default handler;              │
 * │                                                                          │
 * │  ✅ Returns React JSX              ✅ Returns JSON response             │
 * │  ✅ Runs in browser                ✅ Runs ONLY on server               │
 * │  ❌ No direct DB access            ✅ Can access databases              │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔒 SERVER-SIDE ONLY - SECURITY BENEFIT
 * ============================================================================
 *
 * From the instructor:
 * "Decoding them will never be exposed to the client. So we can also use
 * credentials in API routes without compromising them."
 *
 * This is HUGE for security:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  SAFE IN API ROUTES:                                                    │
 * │  • Database connection strings                                           │
 * │  • API keys for external services                                        │
 * │  • Secret tokens                                                         │
 * │  • Passwords                                                             │
 * │                                                                          │
 * │  The code NEVER gets sent to the browser!                               │
 * │  Users cannot see your credentials in browser DevTools                  │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔄 THE HANDLER FUNCTION PATTERN
 * ============================================================================
 *
 * From the instructor:
 * "And those functions are then simply triggered whenever a request is sent
 * to this route, so to /api/new-meetup here. This would be the URL of this
 * file and if a request is sent to this URL, it will trigger the function
 * which we have to define in this file."
 *
 * From the instructor:
 * "Now often these function named handler but the name is up to you, the
 * important thing is that it's exported."
 *
 * THE PATTERN:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  // The function name can be anything, but "handler" is conventional    │
 * │  function handler(req, res) {                                           │
 * │    // Your server-side logic here                                       │
 * │  }                                                                       │
 * │                                                                          │
 * │  // MUST be exported (default export)                                   │
 * │  export default handler;                                                │
 * │                                                                          │
 * │  // Or combined:                                                         │
 * │  export default function handler(req, res) { ... }                      │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📥 REQUEST AND RESPONSE OBJECTS
 * ============================================================================
 *
 * From the instructor:
 * "And this function will receive a request and a response object. You might
 * notice from node.js and express.js."
 *
 * From the instructor:
 * "The request object contains data about the incoming request. The response
 * object will be needed for sending back a response."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  REQUEST OBJECT (req)                                                   │
 * │  ────────────────────                                                   │
 * │                                                                          │
 * │  req.method      →  HTTP method ('GET', 'POST', 'PUT', 'DELETE', etc.) │
 * │  req.body        →  Request body (parsed JSON)                          │
 * │  req.query       →  Query parameters (?key=value)                       │
 * │  req.cookies     →  Cookies sent with request                           │
 * │  req.headers     →  Request headers                                     │
 * │                                                                          │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │  RESPONSE OBJECT (res)                                                  │
 * │  ─────────────────────                                                  │
 * │                                                                          │
 * │  res.status(code)     →  Set HTTP status code                           │
 * │  res.json(data)       →  Send JSON response                             │
 * │  res.send(body)       →  Send response body                             │
 * │  res.redirect(url)    →  Redirect to URL                                │
 * │  res.setHeader(k, v)  →  Set response header                            │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * Similar to Express.js if you've used it before!
 *
 * ============================================================================
 * 🔍 CHECKING THE REQUEST METHOD
 * ============================================================================
 *
 * From the instructor:
 * "Now, from that request object, we can get things like the headers or the
 * request body and also the request method, route a method property here.
 * This allows us to find out which kind of request was sent."
 *
 * From the instructor:
 * "And we could, for example, check if we are receiving having a post request
 * here. So if the request method is POST, and we only execute the code in
 * this if check, if it is a incoming post request."
 *
 * WHY CHECK THE METHOD?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  This endpoint is for CREATING new meetups                              │
 * │  → Creating data = POST request (RESTful convention)                    │
 * │                                                                          │
 * │  We ONLY want to accept POST requests:                                  │
 * │  • POST /api/new-meetup  →  Create new meetup ✅                        │
 * │  • GET /api/new-meetup   →  Should be ignored/rejected ❌               │
 * │  • PUT /api/new-meetup   →  Should be ignored/rejected ❌               │
 * │                                                                          │
 * │  From the instructor:                                                    │
 * │  "So that would ensure that only post requests to this route would      │
 * │  actually trigger this code in here."                                    │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📦 ACCESSING THE REQUEST BODY
 * ============================================================================
 *
 * From the instructor:
 * "Then here, we can get our data by accessing req.body. The body field is
 * another built-in field which contains the body of the incoming request,
 * the data of the incoming request."
 *
 * NextJS automatically parses JSON request bodies!
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  CLIENT SENDS:                                                          │
 * │  fetch('/api/new-meetup', {                                             │
 * │    method: 'POST',                                                       │
 * │    body: JSON.stringify({                                                │
 * │      title: 'My Meetup',                                                 │
 * │      image: 'https://...',                                               │
 * │      address: '123 Street',                                              │
 * │      description: 'A great meetup'                                      │
 * │    }),                                                                   │
 * │    headers: { 'Content-Type': 'application/json' }                      │
 * │  });                                                                     │
 * │                                                                          │
 * │  SERVER RECEIVES:                                                        │
 * │  req.body = {                                                            │
 * │    title: 'My Meetup',           ← Already parsed!                      │
 * │    image: 'https://...',                                                 │
 * │    address: '123 Street',                                                │
 * │    description: 'A great meetup'                                        │
 * │  }                                                                       │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📋 EXPECTED DATA STRUCTURE
 * ============================================================================
 *
 * From the instructor:
 * "Now this year will be the end point for creating a new meetup. And therefore
 * it's probably fair to expect that this data which we get contains a title,
 * a meetup image, an address and a description field."
 *
 * From the instructor:
 * "After all, it's our page, our project, and our API. So we can expect
 * whichever data we need."
 *
 * From the instructor:
 * "We will then just have to make sure that we send the correct data when
 * we do send a request to this API route later."
 *
 * EXPECTED FIELDS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  {                                                                       │
 * │    title: string,        // Name of the meetup                          │
 * │    image: string,        // URL to meetup image                         │
 * │    address: string,      // Physical location                           │
 * │    description: string   // What the meetup is about                    │
 * │  }                                                                       │
 * │                                                                          │
 * │  These match the fields in our NewMeetupForm component!                 │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔓 OBJECT DESTRUCTURING FOR CLEANER CODE
 * ============================================================================
 *
 * From the instructor:
 * "And I'll use object de-structuring here and I expect to get a title, a
 * image field, an address field and a description field. So these are the
 * four fields which I expect to get on the incoming request body."
 *
 * Instead of:
 *   const title = data.title;
 *   const image = data.image;
 *   const address = data.address;
 *   const description = data.description;
 *
 * We use destructuring:
 *   const { title, image, address, description } = data;
 *
 * ============================================================================
 * 🗄️ NEXT STEP: STORE IN DATABASE
 * ============================================================================
 *
 * From the instructor:
 * "And then we can store them in a database, for example, and that's what
 * we're going to do now."
 *
 * The next lesson will cover connecting to MongoDB to actually store
 * the meetup data. For now, we have the API endpoint structure ready!
 *
 * ============================================================================
 */

/**
 * API Route Handler for Creating New Meetups
 *
 * This function is triggered when a request is sent to /api/new-meetup
 *
 * From the instructor:
 * "Now often these function named handler but the name is up to you,
 * the important thing is that it's exported."
 *
 * @param {Object} req - The incoming request object (similar to Express.js)
 * @param {string} req.method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {Object} req.body - Parsed request body (JSON)
 * @param {Object} req.query - Query string parameters
 * @param {Object} req.headers - Request headers
 *
 * @param {Object} res - The response object for sending data back
 * @param {Function} res.status - Set HTTP status code
 * @param {Function} res.json - Send JSON response
 */
async function handler(req, res) {
  /**
   * CHECK IF THIS IS A POST REQUEST
   *
   * From the instructor:
   * "And we could, for example, check if we are receiving having a post request
   * here. So if the request method is POST, and we only execute the code in
   * this if check, if it is a incoming post request."
   *
   * From the instructor:
   * "For other kinds of requests, we don't do anything. So that would ensure
   * that only post requests to this route would actually trigger this code
   * in here."
   *
   * RESTful Convention:
   * • POST = Create new resource
   * • GET = Read/retrieve resource
   * • PUT/PATCH = Update resource
   * • DELETE = Delete resource
   *
   * Since we're CREATING a new meetup, we expect POST requests only.
   */
  if (req.method === 'POST') {
    /**
     * EXTRACT DATA FROM REQUEST BODY
     *
     * From the instructor:
     * "Then here, we can get our data by accessing req.body. The body field
     * is another built-in field which contains the body of the incoming
     * request, the data of the incoming request."
     */
    const data = req.body;

    /**
     * DESTRUCTURE THE EXPECTED FIELDS
     *
     * From the instructor:
     * "And I'll use object de-structuring here and I expect to get a title,
     * a image field, an address field and a description field. So these are
     * the four fields which I expect to get on the incoming request body."
     *
     * These fields match what our NewMeetupForm component collects:
     * - title: The name of the meetup
     * - image: URL to an image representing the meetup
     * - address: Physical location where the meetup takes place
     * - description: Details about what the meetup is about
     */
    const { title, image, address, description } = data;

    /**
     * TODO: STORE DATA IN DATABASE (Next Lesson)
     *
     * From the instructor:
     * "And then we can store them in a database, for example, and that's
     * what we're going to do now."
     *
     * In the next lesson, we'll:
     * 1. Connect to MongoDB
     * 2. Insert the meetup data into a collection
     * 3. Return a success response
     *
     * For now, we'll just log the data and return a placeholder response.
     */
    console.log('Received new meetup data:');
    console.log({ title, image, address, description });

    /**
     * SEND RESPONSE BACK TO CLIENT
     *
     * res.status(201) - 201 = "Created" (successful resource creation)
     * res.json({...}) - Send JSON response body
     *
     * Common HTTP Status Codes:
     * • 200 - OK (general success)
     * • 201 - Created (resource created successfully)
     * • 400 - Bad Request (client error, invalid data)
     * • 401 - Unauthorized (authentication required)
     * • 404 - Not Found (resource doesn't exist)
     * • 500 - Internal Server Error (server-side error)
     */
    res.status(201).json({ message: 'Meetup created!' });
  }
}

/**
 * EXPORT THE HANDLER
 *
 * From the instructor:
 * "Now often these function named handler but the name is up to you,
 * the important thing is that it's exported."
 *
 * The default export is what NextJS looks for when routing
 * requests to this API endpoint.
 */
export default handler;
