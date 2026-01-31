/**
 * ============================================================================
 * API ROUTE: /api/hello - LESSON 478: Pages Router API Routes
 * ============================================================================
 *
 * This file demonstrates API ROUTES in the Pages Router approach.
 * API routes let you build your backend API within your Next.js app.
 *
 * ============================================================================
 * HOW API ROUTES WORK IN PAGES ROUTER
 * ============================================================================
 *
 * Any file in the /pages/api folder becomes an API endpoint:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE LOCATION              │  API ENDPOINT                            │
 * │─────────────────────────────┼──────────────────────────────────────────│
 * │  pages/api/hello.js         │  GET/POST/etc. /api/hello                │
 * │  pages/api/users/index.js   │  /api/users                              │
 * │  pages/api/users/[id].js    │  /api/users/:id (dynamic)                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * API ROUTE FUNCTION SIGNATURE
 * ============================================================================
 *
 * Every API route exports a default function that receives:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  req (NextApiRequest):                                                  │
 * │  ────────────────────                                                   │
 * │  • req.method - HTTP method (GET, POST, PUT, DELETE, etc.)             │
 * │  • req.body - Request body (for POST/PUT)                              │
 * │  • req.query - URL query parameters                                    │
 * │  • req.cookies - Cookies sent with the request                         │
 * │  • req.headers - Request headers                                       │
 * │                                                                          │
 * │  res (NextApiResponse):                                                 │
 * │  ─────────────────────                                                  │
 * │  • res.status(code) - Set HTTP status code                             │
 * │  • res.json(data) - Send JSON response                                 │
 * │  • res.send(data) - Send response                                      │
 * │  • res.redirect(url) - Redirect to URL                                 │
 * │  • res.setHeader(name, value) - Set response header                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * COMPARISON: API Routes vs Server Actions (App Router)
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  API ROUTES (Pages Router - THIS FILE)                                  │
 * │  ─────────────────────────────────────                                  │
 * │  • Files in /pages/api                                                  │
 * │  • Export a handler function (req, res)                                │
 * │  • Access via fetch('/api/hello')                                       │
 * │  • Standard REST API pattern                                            │
 * │                                                                          │
 * │  SERVER ACTIONS (App Router)                                            │
 * │  ────────────────────────────                                           │
 * │  • Functions with 'use server' directive                                │
 * │  • Can be called directly from forms                                    │
 * │  • No need for fetch() or API endpoints                                 │
 * │  • Tighter integration with React                                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * WHEN TO USE API ROUTES
 * ============================================================================
 *
 * API routes are useful for:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ Building REST APIs                                                   │
 * │  ✓ Handling webhooks from external services                            │
 * │  ✓ Form submissions from client components                             │
 * │  ✓ Authentication endpoints                                            │
 * │  ✓ Proxying requests to external APIs                                  │
 * │  ✓ Any server-side logic accessed via HTTP                             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * EXAMPLE: Handling Different HTTP Methods
 * ============================================================================
 *
 * export default function handler(req, res) {
 *   if (req.method === 'GET') {
 *     // Handle GET request
 *     res.status(200).json({ users: [...] });
 *   } else if (req.method === 'POST') {
 *     // Handle POST request
 *     const { name, email } = req.body;
 *     res.status(201).json({ message: 'User created' });
 *   } else {
 *     res.setHeader('Allow', ['GET', 'POST']);
 *     res.status(405).end(`Method ${req.method} Not Allowed`);
 *   }
 * }
 *
 * ============================================================================
 * SECURITY NOTE
 * ============================================================================
 *
 * API routes run on the server, so they are safe for:
 * • Database queries
 * • API key usage
 * • Secret handling
 *
 * These secrets are NEVER exposed to the client.
 *
 * ============================================================================
 * DOCS REFERENCE:
 * https://nextjs.org/docs/api-routes/introduction
 * ============================================================================
 */

/**
 * API Handler for /api/hello
 *
 * This is a simple example that returns a JSON response.
 * Access this endpoint by visiting: http://localhost:3000/api/hello
 *
 * @param {import('next').NextApiRequest} req - The incoming request
 * @param {import('next').NextApiResponse} res - The response object
 */
export default (req, res) => {
  /**
   * res.status(200) sets the HTTP status code to 200 (OK)
   * res.json({...}) sends a JSON response and sets Content-Type header
   */
  res.status(200).json({ name: 'John Doe' })
}
