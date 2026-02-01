/**
 * ============================================================================
 * MeetupItem.js - LESSON 485: SINGLE MEETUP CARD COMPONENT
 * ============================================================================
 *
 * This component renders a single meetup as a card in the list.
 * It's pure React - no NextJS-specific code here!
 *
 * From the instructor:
 * "These are mostly just React components and standard React code.
 * There's nothing NextJS specific about those files... We get components
 * for showing meetups as a list, for showing details about a meetup."
 *
 * ============================================================================
 * 🎓 COMPONENT PURPOSE
 * ============================================================================
 *
 * MeetupItem displays a single meetup with:
 * • Image
 * • Title
 * • Address
 * • "Show Details" button
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  VISUAL STRUCTURE                                                        │
 * │                                                                          │
 * │  ┌────────────────────────────────────────────────┐                     │
 * │  │  <Card>                                         │                     │
 * │  │  ┌──────────────────────────────────────────┐  │                     │
 * │  │  │                                          │  │                     │
 * │  │  │           [Image]                        │  │                     │
 * │  │  │                                          │  │                     │
 * │  │  └──────────────────────────────────────────┘  │                     │
 * │  │                                                 │                     │
 * │  │  Meetup Title                                   │                     │
 * │  │  123 Meetup Street, City                        │                     │
 * │  │                                                 │                     │
 * │  │  ┌────────────────┐                            │                     │
 * │  │  │ Show Details   │                            │                     │
 * │  │  └────────────────┘                            │                     │
 * │  └────────────────────────────────────────────────┘                     │
 * │  </Card>                                                                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📋 PROPS THIS COMPONENT RECEIVES
 * ============================================================================
 *
 * Props are passed from MeetupList.js when mapping over meetups array:
 *
 * ┌─────────────┬─────────────────────────────────────────────────────────┐
 * │ Prop        │ Description                                              │
 * ├─────────────┼─────────────────────────────────────────────────────────┤
 * │ id          │ Unique identifier for the meetup                        │
 * │ image       │ URL of the meetup image                                 │
 * │ title       │ Name/title of the meetup                                │
 * │ address     │ Physical location of the meetup                         │
 * └─────────────┴─────────────────────────────────────────────────────────┘
 *
 * Example props object:
 * {
 *   id: 'm1',
 *   image: 'https://example.com/meetup.jpg',
 *   title: 'A First Meetup',
 *   address: 'Some Street 5, Some City'
 * }
 *
 * ============================================================================
 * 🔘 THE "SHOW DETAILS" BUTTON
 * ============================================================================
 *
 * Currently, the button does nothing! In upcoming lessons you'll:
 *
 * 1. Add an onClick handler
 * 2. Use NextJS router to navigate to the detail page
 *
 * OR (better approach):
 *
 * 1. Wrap the button in a NextJS Link component
 * 2. Link to dynamic route: /[meetupId]
 *
 * Future implementation example:
 * ```javascript
 * import Link from 'next/link';
 *
 * <Link href={`/${props.id}`}>
 *   <button>Show Details</button>
 * </Link>
 * ```
 *
 * ============================================================================
 * 🏗️ COMPONENT COMPOSITION
 * ============================================================================
 *
 * This component uses the Card wrapper component for consistent styling:
 *
 *   MeetupItem.js (this file)
 *   └── Card.js (imported wrapper)
 *       └── Provides rounded corners, shadow, etc.
 *
 * The Card component uses props.children to wrap our content.
 *
 * ============================================================================
 * 🎨 CSS MODULES STRUCTURE
 * ============================================================================
 *
 * Styles are imported from MeetupItem.module.css:
 *
 * • classes.item   - Styles the <li> wrapper
 * • classes.image  - Styles the image container (sizing, overflow, etc.)
 * • classes.content - Styles the text content area (title, address)
 * • classes.actions - Styles the button area (alignment, padding)
 *
 * ============================================================================
 * ⚛️ REACT PATTERNS USED
 * ============================================================================
 *
 * 1. PROPS FOR DATA
 *    Component receives data through props (functional pattern)
 *
 * 2. COMPONENT COMPOSITION
 *    Uses Card as a wrapper component
 *
 * 3. SEMANTIC HTML
 *    - <li> - List item (used within <ul> in MeetupList)
 *    - <address> - Semantic element for physical addresses
 *
 * ============================================================================
 * 📂 LOCATION IN PROJECT
 * ============================================================================
 *
 *   /components/
 *   └── /meetups/
 *       ├── MeetupDetail.js         (full meetup view)
 *       ├── MeetupDetail.module.css
 *       ├── MeetupItem.js           ← THIS FILE
 *       ├── MeetupItem.module.css
 *       ├── MeetupList.js           (renders multiple MeetupItems)
 *       ├── MeetupList.module.css
 *       ├── NewMeetupForm.js        (form to create meetups)
 *       └── NewMeetupForm.module.css
 *
 * ============================================================================
 */

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

/**
 * MeetupItem Component - Displays a Single Meetup Card
 *
 * Renders one meetup with image, title, address, and action button.
 * Used by MeetupList to display multiple meetups.
 *
 * @param {Object} props
 * @param {string} props.id - Unique meetup identifier
 * @param {string} props.image - URL of the meetup image
 * @param {string} props.title - Title/name of the meetup
 * @param {string} props.address - Physical address of the meetup
 *
 * @example
 * <MeetupItem
 *   id="m1"
 *   image="https://example.com/img.jpg"
 *   title="First Meetup"
 *   address="123 Main St, City"
 * />
 */
function MeetupItem(props) {
  return (
    // <li> because this is rendered inside <ul> in MeetupList
    <li className={classes.item}>
      {/*
       * Card Wrapper
       * Provides consistent styling (rounded corners, shadow, background)
       * All content inside becomes props.children in Card.js
       */}
      <Card>
        {/*
         * Image Section
         * The image container handles sizing and overflow
         * Image src and alt come from props
         */}
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>

        {/*
         * Content Section
         * Displays the meetup title and address
         * Uses semantic <address> element for the location
         */}
        <div className={classes.content}>
          <h3>{props.title}</h3>
          {/*
           * <address> is an HTML5 semantic element
           * Indicates this is a physical or contact address
           * Screen readers and search engines understand this context
           */}
          <address>{props.address}</address>
        </div>

        {/*
         * Actions Section
         * Contains the "Show Details" button
         *
         * TODO: In upcoming lessons, make this button navigate to
         * the meetup detail page using NextJS Link or router:
         *
         * Option 1 - Wrap with Link:
         * <Link href={`/${props.id}`}>
         *   <button>Show Details</button>
         * </Link>
         *
         * Option 2 - Use router.push in onClick:
         * import { useRouter } from 'next/router';
         * const router = useRouter();
         * onClick={() => router.push(`/${props.id}`)}
         */}
        <div className={classes.actions}>
          <button>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
