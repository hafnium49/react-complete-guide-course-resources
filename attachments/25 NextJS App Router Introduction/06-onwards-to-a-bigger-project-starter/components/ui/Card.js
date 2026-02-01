/**
 * ============================================================================
 * Card.js - LESSON 485: REUSABLE CARD UI COMPONENT
 * ============================================================================
 *
 * This is a simple, reusable wrapper component that provides consistent
 * card-style UI. It's pure React - no NextJS-specific code here!
 *
 * From the instructor:
 * "These are mostly just React components and standard React code.
 * There's nothing NextJS specific about those files... We get components
 * for having a layout with a navigation, and some UI components."
 *
 * ============================================================================
 * 🎓 WHAT IS A "WRAPPER" COMPONENT?
 * ============================================================================
 *
 * A wrapper component is a simple component that:
 * • Wraps other content/components
 * • Provides consistent styling or layout
 * • Uses props.children to render whatever is placed inside it
 *
 * This pattern is sometimes called:
 * • "Wrapper Component"
 * • "Container Component"
 * • "Composition Pattern"
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  HOW IT WORKS                                                            │
 * │                                                                          │
 * │  <Card>                   ←  Card component starts                      │
 * │    <h1>Title</h1>         ←  These become props.children                │
 * │    <p>Some text</p>       ←  These become props.children                │
 * │  </Card>                  ←  Card component ends                        │
 * │                                                                          │
 * │  OUTPUT:                                                                 │
 * │  ┌──────────────────────────────────────────────────────────┐           │
 * │  │  <div class="card">                                       │           │
 * │  │    <h1>Title</h1>                                         │           │
 * │  │    <p>Some text</p>                                       │           │
 * │  │  </div>                                                   │           │
 * │  └──────────────────────────────────────────────────────────┘           │
 * │        ↑                                                                │
 * │        Card.module.css provides: rounded corners, shadow, etc.          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🎨 WHAT STYLES DOES THE CARD PROVIDE?
 * ============================================================================
 *
 * The Card.module.css typically includes styling for:
 *
 * • Background color (usually white or a light color)
 * • Border radius (rounded corners)
 * • Box shadow (subtle shadow for depth)
 * • Overflow hidden (to clip child content at rounded corners)
 * • Padding or margin (spacing)
 *
 * Example CSS (what Card.module.css might contain):
 * ```css
 * .card {
 *   background-color: white;
 *   border-radius: 6px;
 *   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
 *   overflow: hidden;
 * }
 * ```
 *
 * ============================================================================
 * ⚛️ THE props.children PATTERN
 * ============================================================================
 *
 * In React, `props.children` is a special prop that contains:
 * • Everything placed between the opening and closing tags of a component
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  props.children EXAMPLES                                                 │
 * │                                                                          │
 * │  SINGLE CHILD:                                                          │
 * │  <Card><h1>Hello</h1></Card>                                            │
 * │  // props.children = <h1>Hello</h1>                                     │
 * │                                                                          │
 * │  MULTIPLE CHILDREN:                                                      │
 * │  <Card>                                                                  │
 * │    <h1>Title</h1>                                                       │
 * │    <p>Text</p>                                                          │
 * │  </Card>                                                                 │
 * │  // props.children = [<h1>Title</h1>, <p>Text</p>]                      │
 * │                                                                          │
 * │  COMPONENT CHILDREN:                                                     │
 * │  <Card>                                                                  │
 * │    <MeetupContent />                                                    │
 * │  </Card>                                                                 │
 * │  // props.children = <MeetupContent />                                  │
 * │                                                                          │
 * │  TEXT CHILDREN:                                                          │
 * │  <Card>Just some text</Card>                                            │
 * │  // props.children = "Just some text"                                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔧 WHERE IS CARD USED IN THIS PROJECT?
 * ============================================================================
 *
 * Card is used by several components to provide consistent styling:
 *
 *   MeetupItem.js
 *   ├── Uses Card to wrap the meetup content
 *   └── Image, title, address, button all inside Card
 *
 *   NewMeetupForm.js
 *   ├── Uses Card to wrap the entire form
 *   └── All form fields inside Card
 *
 *   MeetupDetail.js (not yet examined)
 *   └── Likely uses Card for the detail view
 *
 * ============================================================================
 * 📂 LOCATION IN PROJECT
 * ============================================================================
 *
 *   /components/
 *   └── /ui/
 *       ├── Card.js          ← THIS FILE
 *       └── Card.module.css  (styles)
 *
 * The /ui/ folder contains reusable UI components that are:
 * • Generic (not specific to meetups)
 * • Used across multiple features
 * • Focused on visual styling
 *
 * ============================================================================
 * 💡 WHY CREATE A CARD COMPONENT?
 * ============================================================================
 *
 * Benefits of extracting Card as a separate component:
 *
 * 1. DRY (Don't Repeat Yourself)
 *    • Define card styling once, use everywhere
 *    • No copy-pasting className and styles
 *
 * 2. CONSISTENCY
 *    • All cards look the same across the app
 *    • Change the style once, updates everywhere
 *
 * 3. MAINTAINABILITY
 *    • Easy to update all cards at once
 *    • Single source of truth for card appearance
 *
 * 4. READABILITY
 *    • <Card>content</Card> is clearer than <div className={...}>
 *    • Component name describes its purpose
 *
 * ============================================================================
 * ⚛️ REACT CONCEPTS DEMONSTRATED
 * ============================================================================
 *
 * 1. WRAPPER/COMPOSITION PATTERN
 *    Using props.children to wrap content
 *
 * 2. REUSABLE COMPONENTS
 *    Generic component used in multiple places
 *
 * 3. CSS MODULES
 *    Scoped styling via Card.module.css
 *
 * 4. SIMPLE FUNCTIONAL COMPONENT
 *    Just returns JSX, no hooks or state needed
 *
 * ============================================================================
 */

import classes from './Card.module.css';

/**
 * Card Component - Reusable Card UI Wrapper
 *
 * Wraps content in a styled card container with rounded corners,
 * shadow, and consistent background styling.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to display inside the card
 *
 * @example
 * // Simple usage
 * <Card>
 *   <h2>Title</h2>
 *   <p>Content goes here</p>
 * </Card>
 *
 * @example
 * // With other components
 * <Card>
 *   <MeetupImage />
 *   <MeetupContent />
 *   <MeetupActions />
 * </Card>
 */
function Card(props) {
  /**
   * The simplest possible wrapper component:
   *
   * 1. Render a <div> with the card styling class
   * 2. Place props.children inside (whatever was passed between <Card>...</Card>)
   * 3. That's it!
   *
   * classes.card comes from Card.module.css and contains:
   * - Background color
   * - Border radius (rounded corners)
   * - Box shadow (depth effect)
   * - Overflow hidden (clips content to rounded corners)
   */
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;
