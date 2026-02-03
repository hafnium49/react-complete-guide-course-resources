/**
 * ============================================================================
 * pages/api/new-meetup.js - LESSONS 498 & 499: API ROUTES WITH MONGODB
 * ============================================================================
 *
 * LESSON 498: Introduction to API Routes - Building a Backend API
 * LESSON 499: Connecting to MongoDB Atlas and Storing Data
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
 * 🎓 LESSON 499: MONGODB ATLAS SETUP
 * ============================================================================
 *
 * From the instructor:
 * "Now, as a database, I will use MongoDB here and to be precise, I'll use
 * their cloud offering, MongoDB Atlas, which is a fully managed cloud-based
 * MongoDB database with which we can get started for free."
 *
 * MONGODB ATLAS SETUP STEPS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  1. GO TO mongodb.com → Click "Try Free"                                │
 * │                                                                          │
 * │  2. CREATE AN ACCOUNT (it's free)                                       │
 * │                                                                          │
 * │  3. CREATE A CLUSTER                                                     │
 * │     From the instructor:                                                 │
 * │     "And here you can generally leave all the settings as they are.     │
 * │     Just make sure that you always pick the free tier settings unless   │
 * │     you wanna pay."                                                      │
 * │                                                                          │
 * │     • Pick AWS (or any provider)                                         │
 * │     • Choose default region                                              │
 * │     • ⚠️ SELECT M0 SANDBOX (FREE TIER!)                                 │
 * │                                                                          │
 * │  4. CONFIGURE NETWORK ACCESS                                             │
 * │     From the instructor:                                                 │
 * │     "Under Network Access, you have to add your local IP here by        │
 * │     clicking on Add IP Address and then selecting current IP so that    │
 * │     your local computer is able to send requests to MongoDB"             │
 * │                                                                          │
 * │  5. CREATE DATABASE USER                                                 │
 * │     From the instructor:                                                 │
 * │     "Under Database Access, you need to create at least one user with   │
 * │     any username of your choice who has to have read and write access   │
 * │     to the database"                                                     │
 * │                                                                          │
 * │  6. GET CONNECTION STRING                                                │
 * │     • Click "Connect" on your cluster                                    │
 * │     • Select "Connect your application"                                  │
 * │     • Copy the connection string                                         │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📦 INSTALLING THE MONGODB DRIVER
 * ============================================================================
 *
 * From the instructor:
 * "For this, we need to quit the development server and install an extra
 * package with npm install. The mongodb package. This is the official MongoDB
 * driver, which makes sending queries to MongoDB easy."
 *
 * INSTALLATION:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  # Stop the dev server first (Ctrl+C)                                   │
 * │  npm install mongodb                                                     │
 * │                                                                          │
 * │  # Then restart the dev server                                           │
 * │  npm run dev                                                             │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "Once you install it, you can start the development server again. And now
 * this MongoDB driver allows us to connect to this cluster and then insert
 * data or fetch data from there."
 *
 * ============================================================================
 * 🔗 MONGODB CONNECTION STRING
 * ============================================================================
 *
 * The connection string format from MongoDB Atlas:
 *
 * mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
 *
 * From the instructor:
 * "Now, there, you need to plug in the username and password of your user.
 * So that user who has read and write access, which you created."
 *
 * From the instructor:
 * "You also should replace myFirstDatabase with any database name of your
 * choice, for example, meetups, but that is up to you."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  EXAMPLE CONNECTION STRING:                                             │
 * │                                                                          │
 * │  mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/meetups    │
 * │              ──────  ──────────  ─────────────────────────── ───────    │
 * │              username password   cluster URL                  database  │
 * │                                                                          │
 * │  ⚠️ IMPORTANT: Replace with YOUR credentials!                           │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔒 WHY CREDENTIALS ARE SAFE HERE
 * ============================================================================
 *
 * From the instructor:
 * "Now, this is code which you never, never want to run on the client side
 * because you would expose your credentials to your visitors, which is a
 * security problem. But here in this API route, it's no problem because as
 * I mentioned before, the code defined in here will never end up on the
 * client side so this is a secure place to store credentials."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  ❌ DANGEROUS - Client-Side Code (React component):                     │
 * │     const client = await MongoClient.connect('mongodb+srv://...')       │
 * │     → Credentials visible in browser DevTools!                          │
 * │     → Anyone can see your username/password!                            │
 * │                                                                          │
 * │  ✅ SAFE - API Route (this file):                                       │
 * │     const client = await MongoClient.connect('mongodb+srv://...')       │
 * │     → Code runs ONLY on server                                          │
 * │     → Credentials never sent to browser                                 │
 * │     → Users only see the JSON response                                  │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🗄️ MONGODB NOSQL CONCEPTS
 * ============================================================================
 *
 * From the instructor:
 * "Now, MongoDB is a NoSQL database that works with collections full of
 * documents. Collections would be kind of your tables in a SQL database
 * and documents would be your entries in those tables."
 *
 * From the instructor:
 * "So you have collections, which hold multiple documents. And a single meetup
 * would be a single document, the overall collection then holds multiple
 * meetups, multiple meetup documents."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  SQL DATABASE              vs          MONGODB (NoSQL)                  │
 * │  ────────────────────────────────────────────────────────────────       │
 * │                                                                          │
 * │  Database                  =           Database                          │
 * │  Table                     =           Collection                        │
 * │  Row                       =           Document                          │
 * │  Column                    =           Field                             │
 * │                                                                          │
 * │  EXAMPLE:                                                                │
 * │                                                                          │
 * │  Database: "meetups"                                                     │
 * │    └── Collection: "meetups"                                             │
 * │          ├── Document: { title: "First Meetup", ... }                   │
 * │          ├── Document: { title: "Second Meetup", ... }                  │
 * │          └── Document: { title: "Third Meetup", ... }                   │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📄 DOCUMENTS ARE JAVASCRIPT OBJECTS
 * ============================================================================
 *
 * From the instructor:
 * "And now the great thing about MongoDB is that a document is just a object
 * in the end, a JavaScript object."
 *
 * From the instructor:
 * "And that now could be an object with title, image, address and description.
 * And since that's the case, since that would make a lot of sense, we can also
 * just directly insert data, so this full data object into our database."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  A MongoDB document is just a JavaScript object:                        │
 * │                                                                          │
 * │  {                                                                       │
 * │    _id: ObjectId("..."),     ← Auto-generated by MongoDB                │
 * │    title: "My Meetup",                                                   │
 * │    image: "https://...",                                                 │
 * │    address: "123 Street",                                                │
 * │    description: "A great meetup"                                        │
 * │  }                                                                       │
 * │                                                                          │
 * │  No schema definition required!                                          │
 * │  Just insert objects directly!                                           │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔄 AUTO-CREATION OF DATABASES AND COLLECTIONS
 * ============================================================================
 *
 * From the instructor:
 * "By the way, if that database doesn't exist yet, it will be created on
 * the fly."
 *
 * From the instructor:
 * "Just as the database if it doesn't exist yet, it will be generated on
 * the fly. And it could be named meetups as well. So it can have the same
 * name as the database but you can also use different names here."
 *
 * No need to create databases or collections manually!
 * MongoDB creates them automatically when you first insert data.
 *
 * ============================================================================
 * 📥 REQUEST AND RESPONSE OBJECTS (Lesson 498)
 * ============================================================================
 *
 * From the instructor:
 * "And this function will receive a request and a response object. You might
 * notice from node.js and express.js."
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
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📤 SENDING THE RESPONSE
 * ============================================================================
 *
 * From the instructor:
 * "And we do this with this response object. Now, this works similar to what
 * you might be used to from Node Express. You have a status method, which you
 * can call on response to set a HTTP status code of the response which will
 * be returned."
 *
 * From the instructor:
 * "For example, a 201 status code to indicate that something was inserted
 * successfully. You can then chain a JSON call here to prepare the JSON data
 * that will be added to the outgoing response."
 *
 * ============================================================================
 */

/**
 * IMPORT MONGOCLIENT FROM MONGODB DRIVER
 *
 * From the instructor:
 * "For this in this api route file, we can import something from mongodb
 * and that something is the MongoClient object. This is our object which
 * allows us to connect."
 *
 * MongoClient is the main entry point for connecting to MongoDB.
 */
import { MongoClient } from 'mongodb';

/**
 * API Route Handler for Creating New Meetups
 *
 * This function is triggered when a request is sent to /api/new-meetup
 *
 * From the instructor:
 * "Now often these function named handler but the name is up to you,
 * the important thing is that it's exported."
 *
 * From the instructor:
 * "connect does return a promise and hence, we can turn our handler function
 * into a async function to use await. This is possible and supported by NextJS."
 *
 * @param {Object} req - The incoming request object
 * @param {Object} res - The response object for sending data back
 */
async function handler(req, res) {
  /**
   * CHECK IF THIS IS A POST REQUEST
   *
   * From the instructor (Lesson 498):
   * "And we could, for example, check if we are receiving having a post request
   * here. So if the request method is POST, and we only execute the code in
   * this if check, if it is a incoming post request."
   *
   * RESTful Convention:
   * • POST = Create new resource
   * • GET = Read/retrieve resource
   * • PUT/PATCH = Update resource
   * • DELETE = Delete resource
   */
  if (req.method === 'POST') {
    /**
     * EXTRACT DATA FROM REQUEST BODY
     *
     * From the instructor:
     * "Then here, we can get our data by accessing req.body. The body field
     * is another built-in field which contains the body of the incoming
     * request, the data of the incoming request."
     *
     * The data object contains: { title, image, address, description }
     */
    const data = req.body;

    /**
     * =========================================================================
     * CONNECT TO MONGODB ATLAS
     * =========================================================================
     *
     * From the instructor:
     * "We can use MongoClient and call the connect method here. Now, the
     * connect method wants this connection string, which we have here."
     *
     * IMPORTANT: Replace the connection string below with YOUR MongoDB Atlas
     * connection string! The format is:
     *
     * mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
     *
     * From the instructor:
     * "Now, I will have changed my password when you're viewing this so you
     * don't need to try to connect to my cluster."
     */
    const client = await MongoClient.connect(
      process.env.MONGODB_URI
    );

    /**
     * GET THE DATABASE
     *
     * From the instructor:
     * "Now, on that client object, we can all the db method to get hold of
     * that database to which we're connecting here. By the way, if that
     * database doesn't exist yet, it will be created on the fly."
     *
     * The database name should match what's in your connection string.
     * If the database doesn't exist, MongoDB creates it automatically!
     */
    const db = client.db();

    /**
     * GET THE COLLECTION
     *
     * From the instructor:
     * "And then on this database, we can get access to our meetupsCollection."
     *
     * From the instructor:
     * "And you get hold of a collection by using your database and then the
     * collection method. And the collection can have any name of your choice.
     * Just as the database if it doesn't exist yet, it will be generated on
     * the fly. And it could be named meetups as well."
     *
     * A collection is like a "table" in SQL databases.
     * If it doesn't exist, MongoDB creates it automatically!
     */
    const meetupsCollection = db.collection('meetups');

    /**
     * INSERT THE MEETUP DOCUMENT
     *
     * From the instructor:
     * "And now that we got hold of the meetupsCollection, on that collection
     * here, we can call insertOne, which is one of the built-in query commands
     * for inserting one new document into this collection."
     *
     * From the instructor:
     * "And now the great thing about MongoDB is that a document is just a
     * object in the end, a JavaScript object."
     *
     * From the instructor:
     * "And hence, of course, we don't even need to use destructuring here.
     * Now we would insert this data object into the database."
     *
     * COMMON MONGODB OPERATIONS:
     * • insertOne(doc)     - Insert single document
     * • insertMany(docs)   - Insert multiple documents
     * • find(query)        - Find documents matching query
     * • findOne(query)     - Find single document
     * • updateOne(...)     - Update single document
     * • deleteOne(...)     - Delete single document
     *
     * From the instructor:
     * "Now, this also is an async operation. insertOne returns a promise
     * and hence, we can await this here as well to get back the result of
     * this operation."
     */
    const result = await meetupsCollection.insertOne(data);

    /**
     * LOG THE RESULT (for debugging)
     *
     * From the instructor:
     * "Result will be an object with, for example, the automatically generated
     * ID. We can console.log result here if we want to."
     *
     * The result object contains:
     * • acknowledged: true if write was successful
     * • insertedId: the auto-generated MongoDB ObjectId
     */
    console.log(result);

    /**
     * CLOSE THE DATABASE CONNECTION
     *
     * From the instructor:
     * "Now, I wanna call client.close then to close the database connection
     * once we're done"
     *
     * Always close the connection when you're done to free up resources!
     */
    client.close();

    /**
     * SEND RESPONSE BACK TO CLIENT
     *
     * From the instructor:
     * "And then we need to use this response object to send back a response
     * because we're getting a request, we're then storing data in the
     * database, ultimately, we also need to send back a response then."
     *
     * From the instructor:
     * "You have a status method, which you can call on response to set a
     * HTTP status code of the response which will be returned. For example,
     * a 201 status code to indicate that something was inserted successfully."
     *
     * From the instructor:
     * "You can then chain a JSON call here to prepare the JSON data that
     * will be added to the outgoing response. And here we could, for example,
     * add a message key where we say Meetup inserted!"
     *
     * HTTP Status Codes:
     * • 200 - OK (general success)
     * • 201 - Created (resource created successfully) ← We use this!
     * • 400 - Bad Request (client error)
     * • 404 - Not Found
     * • 500 - Internal Server Error
     */
    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

/**
 * ============================================================================
 * ⚠️ ERROR HANDLING (OPTIONAL)
 * ============================================================================
 *
 * From the instructor:
 * "Now, we can also add error handling here to handle the case that connecting
 * failed or inserting failed. And I do this in the full course but here, let's
 * keep this focused and concise and let's simply assume that it will work."
 *
 * From the instructor:
 * "You can simply use try catch to wrap this to add error handling if you want to."
 *
 * EXAMPLE WITH ERROR HANDLING:
 * ```javascript
 * async function handler(req, res) {
 *   if (req.method === 'POST') {
 *     const data = req.body;
 *
 *     let client;
 *
 *     try {
 *       client = await MongoClient.connect('mongodb+srv://...');
 *     } catch (error) {
 *       res.status(500).json({ message: 'Could not connect to database.' });
 *       return;
 *     }
 *
 *     const db = client.db();
 *     const meetupsCollection = db.collection('meetups');
 *
 *     try {
 *       const result = await meetupsCollection.insertOne(data);
 *     } catch (error) {
 *       client.close();
 *       res.status(500).json({ message: 'Inserting data failed!' });
 *       return;
 *     }
 *
 *     client.close();
 *     res.status(201).json({ message: 'Meetup inserted!' });
 *   }
 * }
 * ```
 *
 * ============================================================================
 * 🚀 NEXT STEP: SEND REQUEST FROM FRONTEND
 * ============================================================================
 *
 * From the instructor:
 * "With that, however, we have a basic API route, which will insert meetups
 * into our database and therefore, in the next step, we can now send a request
 * to this API route from the front end when this form here is submitted so
 * that we actually do trigger this API route and we use that code here."
 *
 * The next lesson will cover:
 * • Using fetch() in the frontend to call this API route
 * • Submitting form data to /api/new-meetup
 * • Handling the response
 *
 * ============================================================================
 */

/**
 * EXPORT THE HANDLER
 *
 * The default export is what NextJS uses when routing
 * requests to this API endpoint (/api/new-meetup).
 */
export default handler;
