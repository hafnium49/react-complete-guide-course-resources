/**
 * ============================================================================
 * IMAGE PICKER COMPONENT - LESSONS 460 & 461: Custom File Input with Preview
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
 * │  • Add image preview functionality (Lesson 461)                         │
 * │  • Full control over appearance and behavior                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * LESSON 461 - ADDING IMAGE PREVIEW FUNCTIONALITY
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, to show a preview of the picked image, we need to handle the event
 * that an image was picked and then store some state so that we can update
 * this UI and show a preview as soon as we have an image."
 *
 * PREVIEW FEATURE OVERVIEW:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STEP 1: User clicks "Pick an Image" button                            │
 * │  STEP 2: File dialog opens, user selects an image                      │
 * │  STEP 3: onChange event fires on the hidden input                      │
 * │  STEP 4: handleImageChange reads the file with FileReader              │
 * │  STEP 5: FileReader converts file to Data URL                          │
 * │  STEP 6: Data URL is stored in pickedImage state                       │
 * │  STEP 7: Component re-renders, showing the preview                     │
 * └─────────────────────────────────────────────────────────────────────────┘
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
 * │  • Accessing browser-only APIs (window, document, FileReader, etc.)   │
 * │                                                                          │
 * │  THIS COMPONENT USES (Lesson 460):                                      │
 * │  ✓ onClick handler on button                                            │
 * │  ✓ useRef hook for input reference                                      │
 * │                                                                          │
 * │  THIS COMPONENT ALSO USES (Lesson 461):                                 │
 * │  ✓ onChange handler on input                                            │
 * │  ✓ useState hook for image preview                                      │
 * │  ✓ FileReader browser API                                               │
 * │  → Therefore it MUST be a Client Component                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "So we need some state here in this component, and therefore, we need to
 * use state hook. This would require us to turn this component into a client
 * component, but we already did this here, so no changes are needed."
 *
 * ============================================================================
 */
'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

/**
 * ============================================================================
 * IMAGE PICKER COMPONENT
 * ============================================================================
 *
 * COMPONENT ARCHITECTURE (Updated for Lesson 461):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  <div.picker>                                                           │
 * │  ├── <label>               → Displays configurable label text           │
 * │  │                                                                       │
 * │  └── <div.controls>        → Container for input, button, and preview   │
 * │      ├── <input>           → Hidden file input (handles actual upload)  │
 * │      ├── <button>          → Visible button that triggers the input     │
 * │      └── <div.preview>     → Shows picked image or placeholder text     │
 * │           ├── <p>          → "No image picked yet" (when no image)      │
 * │           └── <Image>      → Preview of selected image (when picked)    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Text to display as the input label
 * @param {string} props.name - Name attribute for the input (used in FormData)
 * @returns {JSX.Element} Custom styled image picker with file input and preview
 */
export default function ImagePicker({ label, name }) {
  /**
   * ================================================================
   * STATE FOR IMAGE PREVIEW (LESSON 461)
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Now here with this state, I then wanna manage the picked image, so I'll
   * name this picked image and have a set picked image state updating function."
   *
   * STATE VALUES:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  null/undefined  │  No image picked yet → show placeholder text     │
   * │  Data URL string │  Image picked → show preview with <Image>        │
   * └─────────────────────────────────────────────────────────────────────┘
   *
   * WHAT IS A DATA URL?
   * A Data URL is a string that embeds the file data directly. Example:
   * "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
   *
   * This can be used directly as the src attribute of an <img> element.
   */
  const [pickedImage, setPickedImage] = useState();

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

  /**
   * ================================================================
   * HANDLE IMAGE SELECTION (LESSON 461)
   * ================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And now we need a second event handler function here that could be called
   * handle image change, which should be triggered whenever this input here
   * has a new value, so whenever the change event on that input is emitted."
   *
   * INSTRUCTOR QUOTE:
   * "Now, here in handle image change, we'll then automatically get an event
   * object, as you always do for those event handling functions in React."
   *
   * THIS FUNCTION:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  1. Gets the selected file from event.target.files[0]              │
   * │  2. Validates that a file was actually selected                     │
   * │  3. Uses FileReader API to convert file to Data URL                 │
   * │  4. Stores the Data URL in state to trigger preview render          │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  function handleImageChange(event) {
    /**
     * ACCESSING THE SELECTED FILE
     *
     * INSTRUCTOR QUOTE:
     * "We can get hold of that picked file by using event.target.files
     * and then accessing the first file. This file property will exist
     * because the target of this event is this input, and this file input
     * object, under the hood, will have such a files property."
     *
     * INSTRUCTOR QUOTE:
     * "That will be an array of all the files that have been picked, but
     * here, it'll only be one file that can be picked. And therefore, I'll
     * just access that first file."
     *
     * NOTE ON MULTIPLE FILES:
     *
     * INSTRUCTOR QUOTE:
     * "You could allow the user to pick multiple files by adding the
     * multiple prop here to this file input, but since we don't have
     * that here and don't want it here, it'll only be one file that
     * we can access."
     */
    const file = event.target.files[0];

    /**
     * VALIDATION: CHECK IF FILE EXISTS
     *
     * INSTRUCTOR QUOTE:
     * "Now, it's possible that the user actually did not pick a file for
     * some reason, so I'll check if the file is undefined, if we got no
     * file, and in that case, I'll just return and not continue."
     *
     * This can happen if the user:
     * - Opens the file dialog but clicks Cancel
     * - Closes the dialog without selecting a file
     */
    if (!file) {
      return;
    }

    /**
     * ================================================================
     * FILEREADER API - CONVERTING FILE TO DATA URL
     * ================================================================
     *
     * INSTRUCTOR QUOTE:
     * "Now, in order to show it as a preview here, I now want to convert it
     * into a so-called data URL, which is simply a value that can be used
     * as an input for an image element, so that can be used as a source
     * for an image element."
     *
     * INSTRUCTOR QUOTE:
     * "And we can generate such a data URL with help of a class built into
     * JavaScript, the file reader class. We can construct such a file reader
     * and then do what its name implies."
     *
     * WHAT IS FileReader?
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  FileReader is a built-in browser API that reads File objects      │
     * │  and converts them to various formats:                             │
     * │                                                                     │
     * │  • readAsDataURL()  → Base64 encoded string (for <img src>)       │
     * │  • readAsText()     → Plain text string                            │
     * │  • readAsArrayBuffer() → Raw binary data                          │
     * └─────────────────────────────────────────────────────────────────────┘
     */
    const fileReader = new FileReader();

    /**
     * SETTING UP THE ONLOAD CALLBACK
     *
     * INSTRUCTOR QUOTE:
     * "Now, this method works in a bit of a strange way, because it doesn't
     * actually return anything, not a promise, not the read file, and it
     * also doesn't take a callback."
     *
     * INSTRUCTOR QUOTE:
     * "Instead, we get hold of that data URL that's being generated by
     * assigning a value to the on load property of this file reader object.
     * So we store a function as a value in on load, and this function will
     * then be triggered by the file reader once this method here, this
     * read as data URL method, is done."
     *
     * WHY THIS UNUSUAL PATTERN?
     * ┌─────────────────────────────────────────────────────────────────────┐
     * │  FileReader uses an event-based pattern instead of Promises:       │
     * │                                                                     │
     * │  1. Create FileReader instance                                     │
     * │  2. Set up onload callback (called when reading completes)         │
     * │  3. Call readAsDataURL() to start reading                          │
     * │  4. When done, onload fires and result is in fileReader.result     │
     * │                                                                     │
     * │  This is an older API pattern from before Promises were standard.  │
     * └─────────────────────────────────────────────────────────────────────┘
     *
     * INSTRUCTOR QUOTE:
     * "But here, we then won't get the generated URL as an input. Instead,
     * we can access it by accessing fileReader.result, and that will then
     * be that generated URL."
     *
     * INSTRUCTOR QUOTE:
     * "And that's what I then wanna store in my state. So I will set my
     * picked image to the result of accessing fileReader.result inside of
     * this on load function."
     */
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    /**
     * TRIGGER THE FILE READING PROCESS
     *
     * INSTRUCTOR QUOTE:
     * "We can read our file, and we can simply call file reader read as
     * data URL and pass that file to that method."
     *
     * This starts the asynchronous reading process. When complete,
     * the onload callback above will be triggered.
     */
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      {/**
       * LABEL ELEMENT
       *
       * INSTRUCTOR QUOTE:
       * "And then in that div, I wanna start by adding a label, a label with
       * a configurable text, which is expected to be received via props."
       */}
      <label htmlFor={name}>{label}</label>

      <div className={classes.controls}>
        {/**
         * HIDDEN FILE INPUT
         *
         * INSTRUCTOR QUOTE (on onChange):
         * "And therefore, we should add the on change prop here and set
         * handle image change as a value."
         *
         * INPUT ATTRIBUTES:
         * ┌───────────────────────────────────────────────────────────────────┐
         * │  ATTRIBUTE   │  PURPOSE                                           │
         * │  ───────────│───────────────────────────────────────────────────  │
         * │  className   │  Applies .input CSS to hide this element           │
         * │  type="file" │  Enables file selection functionality              │
         * │  id          │  Connects label to input for accessibility         │
         * │  accept      │  Limits to only PNG and JPEG images                │
         * │  name        │  Key used when extracting from FormData            │
         * │  ref         │  Allows programmatic access via useRef             │
         * │  onChange    │  Triggers handleImageChange when file selected     │
         * └───────────────────────────────────────────────────────────────────┘
         */}
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />

        {/**
         * CUSTOM STYLED BUTTON
         *
         * INSTRUCTOR QUOTE:
         * "If you would not set the type, it would by default be type submit,
         * and it would submit the surrounding form, which I don't want to
         * happen here. So the type should be button."
         */}
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>

        {/**
         * ================================================================
         * IMAGE PREVIEW SECTION (LESSON 461)
         * ================================================================
         *
         * INSTRUCTOR QUOTE:
         * "Well, and with that, we can then use this picked image state to
         * show a preview. So down here, in this controls div, I'll add another
         * div with a class name of preview."
         *
         * CONDITIONAL RENDERING:
         *
         * INSTRUCTOR QUOTE:
         * "And in that div, I now wanna check if we don't have a picked image,
         * in which case I'll simply output a paragraph where I say 'No image
         * picked yet' or something like that. But if we do have a picked image,
         * I wanna show that image."
         *
         * PREVIEW STATES:
         * ┌─────────────────────────────────────────────────────────────────┐
         * │  pickedImage is falsy (null/undefined):                        │
         * │  └── Show <p>No image picked yet.</p>                          │
         * │                                                                 │
         * │  pickedImage is truthy (Data URL string):                      │
         * │  └── Show <Image src={pickedImage} ... />                      │
         * └─────────────────────────────────────────────────────────────────┘
         */}
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            /**
             * NEXT.JS IMAGE COMPONENT WITH FILL PROP
             *
             * INSTRUCTOR QUOTE:
             * "And for that, I'll use the image component provided by next,
             * so you should import that from next image."
             *
             * INSTRUCTOR QUOTE:
             * "And then here on that image, I'll set the source to my picked
             * image, so to that data URL, and the alt text to 'The image
             * selected by the user,' and I'll add that fill prop because I
             * don't know the dimensions of that image in advance."
             *
             * WHY USE NEXT.JS IMAGE COMPONENT?
             * ┌─────────────────────────────────────────────────────────────┐
             * │  NEXT.JS <Image> BENEFITS:                                  │
             * │  • Automatic image optimization                             │
             * │  • Lazy loading by default                                  │
             * │  • Prevents Cumulative Layout Shift (CLS)                  │
             * │  • fill prop: Image fills its parent container             │
             * │                                                             │
             * │  WHY fill PROP HERE:                                        │
             * │  • User-selected images have unknown dimensions             │
             * │  • fill makes image responsive to container size            │
             * │  • Parent must have position: relative (see CSS)           │
             * └─────────────────────────────────────────────────────────────┘
             */
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * LESSONS 460 & 461 - IMAGE PICKER SUMMARY
 * ============================================================================
 *
 * LESSON 460 - CUSTOM FILE INPUT PATTERN:
 *
 * 1. HIDING NATIVE FILE INPUT
 *
 *    INSTRUCTOR QUOTE:
 *    "I wanna get rid of this ugly button here, and instead display my own
 *    button over which I have full control."
 *
 *    - Use CSS (display: none) to hide the native input
 *    - Create a custom styled button as replacement
 *    - Use useRef to programmatically trigger the hidden input
 *
 * 2. WHY type="button" MATTERS
 *
 *    INSTRUCTOR QUOTE:
 *    "If you would not set the type, it would by default be type submit,
 *    and it would submit the surrounding form."
 *
 *    - Buttons inside forms default to type="submit"
 *    - Set type="button" to prevent form submission
 *
 * LESSON 461 - IMAGE PREVIEW FUNCTIONALITY:
 *
 * 3. MANAGING PREVIEW STATE
 *
 *    INSTRUCTOR QUOTE:
 *    "We need to handle the event that an image was picked and then store
 *    some state so that we can update this UI and show a preview."
 *
 *    STATE FLOW:
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  Initial render  →  pickedImage = undefined  →  "No image picked"  │
 *    │  After picking   →  pickedImage = Data URL   →  Show <Image>       │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * 4. THE FileReader API
 *
 *    INSTRUCTOR QUOTE:
 *    "We can generate such a data URL with help of a class built into
 *    JavaScript, the file reader class."
 *
 *    KEY POINTS:
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │  • FileReader is a browser API (not Node.js)                       │
 *    │  • readAsDataURL() converts files to base64 strings                │
 *    │  • Uses onload callback pattern (not Promises)                     │
 *    │  • Result is accessed via fileReader.result                        │
 *    └─────────────────────────────────────────────────────────────────────┘
 *
 * 5. ACCESSING SELECTED FILES
 *
 *    INSTRUCTOR QUOTE:
 *    "We can get hold of that picked file by using event.target.files
 *    and then accessing the first file."
 *
 *    - event.target is the input element
 *    - .files is a FileList (array-like) of selected files
 *    - [0] gets the first (and only) file when multiple is not set
 *
 * 6. NEXT.JS IMAGE WITH fill PROP
 *
 *    INSTRUCTOR QUOTE:
 *    "I'll add that fill prop because I don't know the dimensions of
 *    that image in advance."
 *
 *    - fill makes the image fill its parent container
 *    - Parent container MUST have position: relative
 *    - Used when image dimensions are unknown at build time
 *
 * WHAT'S WORKING NOW:
 *
 * INSTRUCTOR QUOTE:
 * "Here in this application, I now got this preview area, and if I now
 * click this button, the file picker opens up, and if I pick an image,
 * I can see that preview here. So that is working."
 *
 * COMING NEXT:
 *
 * INSTRUCTOR QUOTE:
 * "And with that, we're now finally ready to also work on the submission
 * of this form."
 *
 * → Next lesson will add Server Actions for form submission
 *
 * ============================================================================
 */
