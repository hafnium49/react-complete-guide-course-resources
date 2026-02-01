/**
 * ============================================================================
 * pages/index.js - LESSON 486 & 487: THE STARTING PAGE (HOME PAGE)
 * ============================================================================
 *
 * LESSON 486: Created this page file
 * LESSON 487: Filled this page with actual content (MeetupList + dummy data)
 *
 * ============================================================================
 * 🎓 LESSON 487: FILLING THE PAGE WITH LIFE
 * ============================================================================
 *
 * From the instructor:
 * "So for filling those pages with life, I will start with that starting page.
 * So with index.js in the pages folder with this index.js file."
 *
 * In this lesson we:
 * 1. Import and use the MeetupList component
 * 2. Create dummy meetup data
 * 3. Pass the data to MeetupList via the meetups prop
 *
 * ============================================================================
 * 📁 PAGE COMPONENTS vs REGULAR COMPONENTS
 * ============================================================================
 *
 * From the instructor:
 * "It's also worth noting that meetup list like meetup item and so on,
 * is a regular React component. It is however stored in a components' folder,
 * not in a pages folder."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  KEY DIFFERENCE: /pages/ vs /components/                                 │
 * │                                                                          │
 * │  /pages/ folder:                                                        │
 * │  ├── Files here are AUTOMATICALLY loaded as pages                       │
 * │  ├── Each file creates a route                                          │
 * │  ├── Special NextJS behavior                                            │
 * │  └── Reserved folder name                                               │
 * │                                                                          │
 * │  /components/ folder (or any other name):                               │
 * │  ├── Files here are REGULAR React components                            │
 * │  ├── NOT automatically loaded as pages                                  │
 * │  ├── Must be imported and used in other components                      │
 * │  └── Folder name is NOT reserved - you can name it anything             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "Now that folder name is up to you. The only reserved name in the end is
 * the pages folder name. You can name your other folders however you want.
 * I named it components though, because I do store React components in there."
 *
 * ============================================================================
 * ⚛️ WHAT'S NEXTJS-SPECIFIC HERE?
 * ============================================================================
 *
 * From the instructor:
 * "And that's all standard React. There's nothing NextJS specific about that.
 * The only NextJS specific part here is that we're in a special component
 * which is special because it's in such a page file.
 * Other than that, it's a regular React component."
 *
 * STANDARD REACT:
 * • Importing components
 * • Creating arrays of data
 * • Passing props to components
 * • JSX syntax
 *
 * NEXTJS-SPECIFIC:
 * • This file being in /pages/ makes it automatically a routable page
 * • The route "/" is determined by the filename (index.js)
 *
 * ============================================================================
 * 📊 THE MEETUPS DATA STRUCTURE
 * ============================================================================
 *
 * From the instructor:
 * "And that's a component that wants a meetups prop here which holds a list
 * of meetups, which we then map into a list of JSX elements. Where every
 * meetup needs to have an ID, an image, a title, and an address."
 *
 * Each meetup object must have:
 * {
 *   id: string,          // Unique identifier (used as React key)
 *   title: string,       // Name of the meetup
 *   image: string,       // URL to an image
 *   address: string,     // Physical location
 *   description: string  // Details about the meetup (for detail page)
 * }
 *
 * ============================================================================
 * 🖼️ IMAGE CREDITS
 * ============================================================================
 *
 * From the instructor:
 * "And for this here, I'm using an image from Wikipedia which is not taken
 * by me but which instead was taken by Tomas Wolf to whom I therefore wanna
 * give due credits. So this image is taken by him."
 *
 * ============================================================================
 * 🔜 UPCOMING IMPROVEMENTS
 * ============================================================================
 *
 * From the instructor:
 * "For the moment we can then construct some dummy meetups here, later we'll
 * be able to create and store our own meetups in a database."
 *
 * In future lessons:
 * • Replace DUMMY_MEETUPS with data from MongoDB
 * • Use getStaticProps to fetch data at build time
 * • Add data fetching and pre-rendering
 *
 * ============================================================================
 */

import MeetupList from '../components/meetups/MeetupList';

/**
 * DUMMY_MEETUPS - Temporary Mock Data
 *
 * This array simulates data that would normally come from a database.
 * We use this for development and testing until we implement real
 * data fetching in later lessons.
 *
 * From the instructor:
 * "For the moment let's use some dummy meetups. And that actually should
 * be an array, an array of meetup items where every item has an ID."
 *
 * DATA STRUCTURE REQUIREMENTS:
 * The MeetupList component (and its child MeetupItem) expects each meetup
 * to have these properties:
 * - id: Used as the React key for efficient list rendering
 * - title: Displayed as the meetup name
 * - image: URL shown in the card
 * - address: Physical location displayed on the card
 * - description: Used on the detail page (not shown in list)
 */
const DUMMY_MEETUPS = [
  {
    // Unique identifier - used as React key in MeetupList
    id: 'm1',
    // The name/title of this meetup
    title: 'A First Meetup',
    /**
     * Image URL - Using a Wikipedia image
     *
     * Image Credit: Tomas Wolf (as mentioned by the instructor)
     *
     * Note: In a real application, you might:
     * - Upload images to your own server
     * - Use a cloud storage service (AWS S3, Cloudinary)
     * - Implement file upload functionality
     *
     * For this demo, we're using an external URL
     */
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    // Physical address of the meetup location
    address: 'Some address 5, 12345 Some City',
    /**
     * Description for the detail page
     *
     * From the instructor:
     * "And we can also add a description even though we don't need that yet,
     * but I will add it here."
     *
     * This will be displayed on the individual meetup detail page
     * when the user clicks "Show Details"
     */
    description: 'This is a first meetup!',
  },
  {
    /**
     * Second Meetup - Duplicate structure
     *
     * From the instructor:
     * "And now we can of course replicate this. So duplicate this meetup
     * and give the second one an ID of M2 and then name it as second meetup."
     */
    id: 'm2',
    title: 'A Second Meetup',
    // Using the same image for simplicity (you can use different images)
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!',
  },
];

/**
 * HomePage Component - The Main Landing Page
 *
 * This page component displays a list of all available meetups.
 *
 * URL: http://localhost:3000/
 *
 * From the instructor:
 * "In there, we can add our component, for example, the homepage component.
 * And of course also export that, that's always important. And then we wanna
 * return the JSX code that defines this component, and that therefore defines
 * what should show up on the page."
 *
 * COMPONENT USAGE:
 * We're using MeetupList, which is a regular React component stored in
 * /components/meetups/MeetupList.js. It's NOT a page component.
 *
 * From the instructor:
 * "And we're using another React component in that page, a component which
 * is not a page component, that is also worth pointing out."
 */
function HomePage() {
  /**
   * RENDERING THE MEETUP LIST
   *
   * From the instructor:
   * "And here, what should show up in the end is our meetup list component.
   * And hence here we can, for example, output meetup lists like this
   * and then set this meetups prop which this component expects."
   *
   * The MeetupList component:
   * 1. Receives the meetups array via props
   * 2. Maps over the array
   * 3. Renders a MeetupItem for each meetup
   *
   * From the instructor:
   * "And hence, when we use meetup lists in our page component we need to
   * make sure that we do provide that meetups prop to it."
   */
  return <MeetupList meetups={DUMMY_MEETUPS} />;
}

/**
 * EXPORT THE PAGE COMPONENT
 *
 * This export is essential for NextJS to recognize this as a page.
 * NextJS will:
 * 1. Find this file in /pages/
 * 2. See the default export
 * 3. Use it as the component to render for the "/" route
 *
 * From the instructor:
 * "And of course also export that, that's always important."
 */
export default HomePage;
