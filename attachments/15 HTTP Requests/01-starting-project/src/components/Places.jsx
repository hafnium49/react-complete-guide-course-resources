// =============================================================================
// PLACES COMPONENT - With Loading State Support
// =============================================================================
// This component renders a list of places (either user's selected places
// or available places to choose from).
//
// KEY LEARNINGS:
// 1. How to handle images served from a backend server
// 2. How to display a loading state while fetching data
// =============================================================================

// =============================================================================
// WHY DO WE NEED A LOADING STATE?
// =============================================================================
//
// When fetching data from a backend, there's a delay between:
//   1. The request being sent
//   2. The response arriving
//
// During this time, the user sees... what?
//
// WITHOUT loading state:
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │  Initial render: places = []                                           │
//   │  User sees: "No places available" (confusing! data isn't loaded yet)   │
//   │                                                                         │
//   │  After fetch: places = [...]                                           │
//   │  User sees: actual places (finally!)                                   │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// WITH loading state:
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │  Initial render: isLoading = true                                      │
//   │  User sees: "Fetching place data..." (clear feedback!)                 │
//   │                                                                         │
//   │  After fetch: isLoading = false, places = [...]                        │
//   │  User sees: actual places                                              │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// The loading state provides better UX by giving users feedback!
//
// =============================================================================

// =============================================================================
// TESTING LOADING STATES
// =============================================================================
//
// To see the loading state in action:
//
// 1. Open Developer Tools (F12 or right-click → Inspect)
// 2. Go to the "Network" tab
// 3. Find the throttling dropdown (usually says "No throttling")
// 4. Select "Slow 3G"
// 5. Reload the page
//
// Now you'll see:
//   - Page takes time to load (slow network)
//   - "Fetching place data..." appears while waiting
//   - Places appear once data arrives
//
// This simulates what users on slow connections experience!
// Don't forget to disable throttling when done testing.
//
// =============================================================================

// =============================================================================
// THE IMAGE PROBLEM (from previous lesson)
// =============================================================================
//
// Images are stored in the backend (backend/images/).
// API returns just the filename: "forest-waterfall.jpg"
// We construct the full URL: `http://localhost:3000/${filename}`
//
// =============================================================================

// =============================================================================
// PROPS OVERVIEW
// =============================================================================
//
// This component now accepts these props:
//
//   title        - The section heading (e.g., "Available Places")
//   places       - Array of place objects to display
//   fallbackText - Text to show when places array is empty
//   onSelectPlace - Function called when a place is clicked
//   isLoading    - Boolean: true while fetching, false when done
//   loadingText  - Text to show while isLoading is true
//
// The isLoading and loadingText props enable the loading state feature!
//
// =============================================================================

export default function Places({
  title,
  places,
  fallbackText,
  onSelectPlace,
  isLoading,      // NEW: Boolean to indicate loading state
  loadingText     // NEW: Text to display while loading
}) {
  // ---------------------------------------------------------------------------
  // DEBUG: Log places data (can remove in production)
  // ---------------------------------------------------------------------------
  console.log(places);

  return (
    <section className="places-category">
      <h2>{title}</h2>

      {/* =====================================================================
          LOADING STATE - Show loading text while fetching
          =====================================================================
          When isLoading is true, we show the loadingText instead of
          the places or fallback text.

          This provides immediate feedback to users that data is being fetched.

          The conditional rendering order matters:
          1. First check if loading → show loading text
          2. Then check if no places → show fallback text
          3. Finally, if we have places → show them

          This ensures we never show "No places available" while still loading!
      ===================================================================== */}
      {isLoading && (
        <p className="fallback-text">{loadingText}</p>
      )}

      {/* =====================================================================
          FALLBACK TEXT - Show when NOT loading AND no places
          =====================================================================
          Notice the condition: !isLoading && places.length === 0

          We ONLY show "No places available" when:
          - We're NOT currently loading (isLoading is false)
          - AND there are no places (places.length === 0)

          This prevents showing the fallback while data is still being fetched!

          BEFORE (without isLoading check):
            {places.length === 0 && <p>No places available</p>}
            // Shows "No places available" while loading! Bad UX.

          AFTER (with isLoading check):
            {!isLoading && places.length === 0 && <p>No places available</p>}
            // Only shows when we're done loading AND there's no data.
      ===================================================================== */}
      {!isLoading && places.length === 0 && (
        <p className="fallback-text">{fallbackText}</p>
      )}

      {/* =====================================================================
          PLACES LIST - Show when NOT loading AND we have places
          =====================================================================
          Similarly, we only render the places when:
          - We're NOT currently loading
          - AND there are places to show

          This ensures we don't try to render an empty list while loading.
      ===================================================================== */}
      {!isLoading && places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
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
// CONDITIONAL RENDERING SUMMARY
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │  STATE                │  WHAT'S SHOWN                                  │
//   ├───────────────────────┼────────────────────────────────────────────────┤
//   │  isLoading: true      │  Loading text ("Fetching place data...")      │
//   │  isLoading: false,    │  Fallback text ("No places available")        │
//   │    places: []         │                                                │
//   │  isLoading: false,    │  The actual places list                       │
//   │    places: [...]      │                                                │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// =============================================================================

// =============================================================================
// THE PATTERN: Multiple States for Async Operations
// =============================================================================
//
// When dealing with async operations (like fetching data), you often need
// to track MULTIPLE states:
//
//   1. DATA STATE       - The actual data (places array)
//   2. LOADING STATE    - Are we currently fetching? (boolean)
//   3. ERROR STATE      - Did something go wrong? (coming in next lessons!)
//
// This pattern is so common it has a name: "Loading/Error/Data" pattern
// or sometimes called the "fetch state machine":
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │                    ASYNC STATE MACHINE                                  │
//   │                                                                         │
//   │   IDLE ─────────> LOADING ─────────> SUCCESS                           │
//   │    │                 │                  │                               │
//   │    │                 │                  │ (has data)                    │
//   │    │                 ▼                  ▼                               │
//   │    │              ERROR            [show data]                          │
//   │    │                │                                                   │
//   │    │                ▼                                                   │
//   │    │           [show error]                                             │
//   │    │                                                                    │
//   │    └── (initial state, waiting for user action or mount)               │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// We'll add error handling in the next lessons!
//
// =============================================================================
