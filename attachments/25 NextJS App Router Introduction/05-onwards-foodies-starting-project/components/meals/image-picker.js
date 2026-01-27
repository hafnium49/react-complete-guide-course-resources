/**
 * ============================================================================
 * IMAGE PICKER COMPONENT - LESSON 460: Configuring the Image Picker Component
 * ============================================================================
 *
 * LESSON 460 - BUILDING A CUSTOM IMAGE PICKER
 *
 * INSTRUCTOR QUOTE:
 * "So I got this IMAGE PICKER placeholder here, and my idea here simply is to
 * display an image picker that can be used by the user to attach an image to
 * the form and to upload an image when the form is submitted."
 *
 * WHY BUILD A CUSTOM IMAGE PICKER?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  NATIVE FILE INPUT PROBLEMS:                                            │
 * │  • Ugly default styling that varies across browsers                     │
 * │  • Very difficult to style with CSS                                     │
 * │  • No built-in image preview                                            │
 * │                                                                          │
 * │  OUR CUSTOM SOLUTION:                                                   │
 * │  • Hide the native input completely                                     │
 * │  • Use a styled button that triggers the hidden input                   │
 * │  • Add image preview functionality                                      │
 * │  • Full control over appearance and behavior                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "Now for that, I'll actually build a separate component since this image
 * picker is a bit more complex, and hence, I'll go to this components folder,
 * and then there in the meals folder, I'll add my image-picker.js file."
 *
 * ============================================================================
 * WHY 'use client' IS REQUIRED HERE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now if you do that, you'll be greeted by an error because as I briefly
 * mentioned earlier, event handlers like this, so whenever you are assigning
 * a function or any value to the onClick prop or any other event handling
 * prop cannot be used in server components, which kind of makes sense because
 * those interactions happen on the client in the browser."
 *
 * CLIENT COMPONENT REQUIREMENTS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  NEEDS 'use client' WHEN:                                               │
 * │  • Using onClick, onChange, or other event handlers                     │
 * │  • Using React hooks (useState, useRef, useEffect, etc.)               │
 * │  • Accessing browser-only APIs (window, document, etc.)                │
 * │                                                                          │
 * │  THIS COMPONENT USES:                                                   │
 * │  ✓ onClick handler on button                                            │
 * │  ✓ useRef hook for input reference                                      │
 * │  → Therefore it MUST be a Client Component                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "Therefore, we must mark this ImagePicker as a client component by adding
 * this use client directive at the top of this file."
 *
 * ============================================================================
 */
'use client';

import { useRef } from 'react';

import classes from './image-picker.module.css';

/**
 * ============================================================================
 * IMAGE PICKER COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And then here we can and should export a component function that can be
 * called ImagePicker like this. And the job of this component function is
 * to output some markup and then also handle the picking process."
 *
 * COMPONENT ARCHITECTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  <div.picker>                                                           │
 * │  ├── <label>               → Displays configurable label text           │
 * │  │                                                                       │
 * │  └── <div.controls>        → Container for input, button, and preview   │
 * │      ├── <input>           → Hidden file input (handles actual upload)  │
 * │      └── <button>          → Visible button that triggers the input     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Text to display as the input label
 * @param {string} props.name - Name attribute for the input (used in FormData)
 * @returns {JSX.Element} Custom styled image picker with file input
 */
export default function ImagePicker({ label, name }) {
  /**
   * ================================================================
   * REF FOR TRIGGERING HIDDEN INPUT
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "What I wanna do is, as mentioned, forward that click. I wanna trigger
   * a click on this input, and we can do that with help of refs, a feature
   * built into React."
   *
   * INSTRUCTOR QUOTE:
   * "We can create a ref with the useRef hook, which is imported from React,
   * so which has nothing to do with NextJS, but which instead works the way
   * you know it from React."
   *
   * HOW REFS WORK:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  1. Create ref: const imageInput = useRef();                       │
   * │  2. Connect to element: <input ref={imageInput} />                 │
   * │  3. Access element: imageInput.current                             │
   * │  4. Call methods: imageInput.current.click()                       │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  const imageInput = useRef();

  /**
   * ================================================================
   * HANDLE BUTTON CLICK TO TRIGGER FILE INPUT
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now to make that work, we of course need to handle clicks on this button
   * and then forward them, so to say, to this input."
   *
   * INSTRUCTOR QUOTE:
   * "And that now allows us to use this ref to trigger the click method.
   * However, of course, we have to access .current first because that then
   * gives us access to the actual connected element and object."
   *
   * THE CLICK FORWARDING PATTERN:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  User clicks visible button                                        │
   * │           ↓                                                         │
   * │  handlePickClick() is called                                       │
   * │           ↓                                                         │
   * │  imageInput.current.click() triggers hidden input                  │
   * │           ↓                                                         │
   * │  Browser's native file dialog opens                                │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  function handlePickClick() {
    imageInput.current.click();
  }

  return (
    <div className={classes.picker}>
      {/**
       * LABEL ELEMENT
       *
       * INSTRUCTOR QUOTE:
       * "And then in that div, I wanna start by adding a label, a label with
       * a configurable text, which is expected to be received via props."
       *
       * INSTRUCTOR QUOTE:
       * "Now I will add the htmlFor prop here to connect this label to some
       * input, and I'll connect it to an input with a name of image or with
       * an ID of image to be precise."
       *
       * ACCESSIBILITY NOTE:
       * The htmlFor attribute connects this label to the input via matching id.
       * Screen readers use this to announce what the input is for.
       */}
      <label htmlFor={name}>{label}</label>

      <div className={classes.controls}>
        {/**
         * HIDDEN FILE INPUT
         *
         * INSTRUCTOR QUOTE:
         * "And therefore we of course also need such an input. But I will nest
         * that input into a div here, a div to which I assign a className of
         * controls. And then in there I wanna have an input element where the
         * type should be set to file, because this should be an input that
         * allows us to select a file."
         *
         * INPUT ATTRIBUTES EXPLAINED:
         * ┌───────────────────────────────────────────────────────────────────┐
         * │  ATTRIBUTE   │  PURPOSE                                           │
         * │  ───────────│───────────────────────────────────────────────────  │
         * │  className   │  Applies .input CSS to hide this element           │
         * │  type="file" │  Enables file selection functionality              │
         * │  id          │  Connects label to input for accessibility         │
         * │  accept      │  Limits to only PNG and JPEG images                │
         * │  name        │  Key used when extracting from FormData            │
         * │  ref         │  Allows programmatic access via useRef             │
         * └───────────────────────────────────────────────────────────────────┘
         *
         * INSTRUCTOR QUOTE:
         * "And I'll add the accept prop to control which files are accepted.
         * And here I only wanna accept files that are of type image/png or
         * image/jpeg, so no other files can be uploaded with help of that
         * picker."
         *
         * INSTRUCTOR QUOTE:
         * "I'll also give this input a name of image, which will later be
         * important for extracting that uploaded image."
         */}
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
        />

        {/**
         * CUSTOM STYLED BUTTON
         *
         * INSTRUCTOR QUOTE:
         * "So therefore here, maybe after the input, we can output a button,
         * which should receive a class of button and which should be of type
         * button, which is important so that it won't submit the surrounding
         * form."
         *
         * WHY type="button" IS CRITICAL:
         *
         * INSTRUCTOR QUOTE:
         * "If you would not set the type, it would by default be type submit,
         * and it would submit the surrounding form, which I don't want to
         * happen here. So the type should be button."
         *
         * BUTTON TYPE BEHAVIOR:
         * ┌───────────────────────────────────────────────────────────────────┐
         * │  type="submit" (default)  │  Submits the parent form             │
         * │  type="button"            │  Does nothing, only onClick fires    │
         * │  type="reset"             │  Resets all form fields              │
         * └───────────────────────────────────────────────────────────────────┘
         *
         * INSTRUCTOR QUOTE:
         * "With that, if I now click my own button, this image picker opens
         * up again."
         */}
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * LESSON 460 - IMAGE PICKER SUMMARY (PART 1)
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. CUSTOM FILE INPUT PATTERN
 *
 *    INSTRUCTOR QUOTE:
 *    "I wanna get rid of this ugly button here, and instead display my own
 *    button over which I have full control."
 *
 *    - Hide native file input with CSS (display: none)
 *    - Create a styled button to replace it
 *    - Use useRef to connect button clicks to hidden input
 *
 * 2. CLIENT COMPONENTS FOR INTERACTIVITY
 *
 *    INSTRUCTOR QUOTE:
 *    "Event handlers like this... cannot be used in server components."
 *
 *    - onClick requires 'use client' directive
 *    - React hooks (useRef) also require client components
 *    - Interactions happen in the browser, not on the server
 *
 * 3. CONFIGURABLE COMPONENT DESIGN
 *
 *    INSTRUCTOR QUOTE:
 *    "Alternatively, we can also make this image picker a bit more
 *    configurable by accepting that name as a prop."
 *
 *    PROPS ACCEPTED:
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  PROP   │  TYPE    │  USAGE                                        │
 *    │  ──────│──────────│────────────────────────────────────────────── │
 *    │  label  │  string  │  Text displayed above the picker             │
 *    │  name   │  string  │  Input's name, id, and label's htmlFor       │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * 4. REFS FOR DOM MANIPULATION
 *
 *    INSTRUCTOR QUOTE:
 *    "We can create a ref with the useRef hook, which is imported from React."
 *
 *    - useRef creates a mutable reference object
 *    - .current property holds the referenced DOM element
 *    - Can call native DOM methods like .click()
 *
 * 5. BUTTON TYPES IN FORMS
 *
 *    INSTRUCTOR QUOTE:
 *    "If you would not set the type, it would by default be type submit."
 *
 *    - Always set type="button" for non-submit buttons in forms
 *    - Prevents accidental form submission
 *
 * COMING NEXT (mentioned at end of Lesson 460):
 *
 * INSTRUCTOR QUOTE:
 * "But now as a final step, I wanna make sure that as soon as I pick an
 * image, I also show a preview of that here."
 *
 * → Image preview will be added in the next lesson
 *
 * ============================================================================
 */
