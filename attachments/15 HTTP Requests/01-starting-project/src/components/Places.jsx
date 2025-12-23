// =============================================================================
// PLACES COMPONENT - Displaying Data from Backend
// =============================================================================
// This component renders a list of places (either user's selected places
// or available places to choose from).
//
// KEY LEARNING: How to handle images served from a backend server.
// =============================================================================

// =============================================================================
// THE IMAGE PROBLEM
// =============================================================================
//
// When we fetch place data from the backend, we get something like:
//
//   {
//     "id": "p1",
//     "title": "Forest Waterfall",
//     "image": {
//       "src": "forest-waterfall.jpg",    <-- Just the filename!
//       "alt": "A tranquil forest..."
//     }
//   }
//
// Notice: image.src is JUST the filename, not a full URL!
//
// If we used this directly:
//   <img src={place.image.src} />  // src="forest-waterfall.jpg"
//
// The browser would look for the image at:
//   http://localhost:5173/forest-waterfall.jpg  (frontend server)
//
// But the images are stored in the BACKEND project (backend/images/)!
// They're NOT in our React app's public folder.
//
// =============================================================================

// =============================================================================
// BACKEND vs FRONTEND FILE ACCESS
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │                     WHERE ARE THE FILES?                                │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │                                                                         │
//   │   FRONTEND (React/Vite)              BACKEND (Node/Express)            │
//   │   ────────────────────               ──────────────────────            │
//   │   src/                               backend/                          │
//   │   public/                            ├── images/  <-- Images here!     │
//   │   ├── logo.png (accessible)         │   ├── forest-waterfall.jpg      │
//   │                                      │   ├── grand-canyon.jpg          │
//   │   No place images here!             │   └── ...                        │
//   │                                      └── data/                          │
//   │                                          └── places.json               │
//   │                                                                         │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// IMPORTANT: Backend files are NOT automatically accessible!
// By default, ALL backend code and files are HIDDEN from users.
// The backend must EXPLICITLY expose files/routes to make them accessible.
//
// In our backend (app.js), there's special code that serves the images:
//   app.use(express.static('images'));
//
// This makes files in the images/ folder accessible at:
//   http://localhost:3000/forest-waterfall.jpg
//   http://localhost:3000/grand-canyon.jpg
//   etc.
//
// =============================================================================

// =============================================================================
// THE SOLUTION: Construct Full Backend URL
// =============================================================================
//
// We need to build a complete URL pointing to the backend server.
//
// BEFORE (broken):
//   <img src={place.image.src} />
//   // Results in: src="forest-waterfall.jpg"
//   // Browser looks at: http://localhost:5173/forest-waterfall.jpg (404!)
//
// AFTER (working):
//   <img src={`http://localhost:3000/${place.image.src}`} />
//   // Results in: src="http://localhost:3000/forest-waterfall.jpg"
//   // Browser fetches from: backend server (success!)
//
// We use a TEMPLATE LITERAL (backticks ``) to construct the URL:
//   `http://localhost:3000/${place.image.src}`
//
// Template literals allow embedding expressions with ${...}
//
// =============================================================================

// =============================================================================
// TEMPLATE LITERALS - Quick Refresher
// =============================================================================
//
// Template literals use backticks (`) instead of quotes:
//
//   // Regular string concatenation:
//   'http://localhost:3000/' + place.image.src
//
//   // Template literal (cleaner!):
//   `http://localhost:3000/${place.image.src}`
//
// Inside ${...} you can put any JavaScript expression:
//   `Hello, ${user.name}!`
//   `Total: ${price * quantity}`
//   `${isLoggedIn ? 'Welcome' : 'Please login'}`
//
// =============================================================================

export default function Places({ title, places, fallbackText, onSelectPlace }) {
  // ---------------------------------------------------------------------------
  // DEBUG: Log places data to see what we're receiving from the backend
  // ---------------------------------------------------------------------------
  // This helps us understand the structure of the data.
  // You can see in the console:
  //   - places is an array
  //   - Each place has: id, title, image: { src, alt }, lat, lon
  // ---------------------------------------------------------------------------
  console.log(places);

  return (
    <section className="places-category">
      <h2>{title}</h2>

      {/* ---------------------------------------------------------------------
          CONDITIONAL RENDERING: Show fallback if no places
          --------------------------------------------------------------------- */}
      {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}

      {/* ---------------------------------------------------------------------
          RENDER LIST OF PLACES
          --------------------------------------------------------------------- */}
      {places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                {/* -------------------------------------------------------------
                    IMAGE SOURCE: Constructing the Backend URL
                    -------------------------------------------------------------
                    The image source needs to point to the backend server!

                    place.image.src = "forest-waterfall.jpg" (just filename)

                    We construct the full URL:
                      `http://localhost:3000/${place.image.src}`
                      = "http://localhost:3000/forest-waterfall.jpg"

                    This tells the browser to fetch the image from the
                    backend server, where the images are actually stored.

                    NOTE: In production, you'd use an environment variable
                    or configuration for the backend URL instead of hardcoding
                    "localhost:3000".
                ------------------------------------------------------------- */}
                <img
                  src={`http://localhost:3000/${place.image.src}`}
                  alt={place.image.alt}
                />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// =============================================================================
// SUMMARY: Loading Images from a Backend
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │  1. Backend stores images in a folder (backend/images/)                │
//   │  2. Backend explicitly exposes that folder via static serving          │
//   │  3. API returns just the filename in the data (not full URL)           │
//   │  4. Frontend constructs full URL: `${backendUrl}/${filename}`          │
//   │  5. Browser fetches image directly from backend server                 │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// This is a common pattern in web development where:
//   - Data (JSON) comes from an API endpoint
//   - Static assets (images) are served from a different path
//   - Frontend combines base URL + filename to create full image URL
//
// =============================================================================

// =============================================================================
// PRODUCTION CONSIDERATIONS
// =============================================================================
//
// In a real production app, you would NOT hardcode "localhost:3000".
// Instead, you'd use:
//
//   1. Environment variables:
//      const API_URL = import.meta.env.VITE_API_URL;
//      src={`${API_URL}/${place.image.src}`}
//
//   2. Or a configuration file:
//      import { API_BASE_URL } from '../config';
//      src={`${API_BASE_URL}/${place.image.src}`}
//
// This allows different URLs for development vs production environments.
//
// =============================================================================
