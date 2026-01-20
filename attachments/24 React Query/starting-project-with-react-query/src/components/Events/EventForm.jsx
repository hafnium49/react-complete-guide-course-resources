/**
 * ============================================================================
 * EventForm Component - LESSON 418: Fetching Selectable Images
 * ============================================================================
 *
 * This component demonstrates using useQuery to fetch data needed for a form
 * (in this case, a list of selectable images for the ImagePicker).
 *
 * ============================================================================
 * WHY FETCH IMAGES FROM THE BACKEND?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Those actual images that will be displayed are stored on the backend in
 * that public folder there, they're not part of the frontend project.
 * Therefore I can't just include them in my frontend code."
 *
 * INSTRUCTOR QUOTE:
 * "Instead, a request must be sent to this backend route here so that we get
 * that list of images that we can display and we can then render that list
 * on the frontend."
 *
 * ============================================================================
 * USING useQuery FOR FORM DATA
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And of course, this is a job for React Query again and here it's the Query
 * hook we need because I don't want change any data on the backend. I don't
 * wanna perform a data mutation. Therefore, instead I just wanna Query for
 * data. I want to get some data so we can and should use useQuery here in
 * this EventForm component."
 *
 * Data flow for images:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. EventForm mounts → useQuery starts fetching images                  │
 * │  2. Backend returns: { images: ['img1.jpg', 'img2.jpg', ...] }          │
 * │  3. data = ['img1.jpg', 'img2.jpg', ...]                                │
 * │  4. ImagePicker receives data as images prop                            │
 * │  5. User can select an image                                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

import { useState } from 'react';

/**
 * IMPORTING useQuery FOR FETCHING IMAGES
 *
 * INSTRUCTOR QUOTE:
 * "So in the EventForm component we need to fetch that list of images from the
 * backend. And of course, this is a job for React Query again and here it's
 * the Query hook we need."
 */
import { useQuery } from '@tanstack/react-query';

import ImagePicker from '../ImagePicker.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

/**
 * IMPORTING THE FETCH FUNCTION
 *
 * INSTRUCTOR QUOTE:
 * "Now, regarding the Query function, I again prepared something for you,
 * because attached you find another updated version of the http.js file,
 * which now also includes this fetchSelectableImages function which sends a
 * request to that backend URL, I just explained to you, where we get that
 * list of selectable images."
 *
 * INSTRUCTOR QUOTE:
 * "It's now this function that should be used as a Query function here in
 * the EventForm component. So therefore, here I'll import this
 * fetchSelectableImages function from the http.js file."
 */
import { fetchSelectableImages } from '../../util/http.js';

export default function EventForm({ inputData, onSubmit, children }) {
  const [selectedImage, setSelectedImage] = useState(inputData?.image);

  /**
   * ============================================================================
   * useQuery FOR FETCHING SELECTABLE IMAGES
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And as before in this section, we must configure this hook by defining
   * a Query function and a Query key."
   *
   * ABOUT THE queryKey:
   * INSTRUCTOR QUOTE:
   * "And here the Query key can again be something hard coded, like
   * 'events-images'. We don't need any dynamic element in here because the
   * request I wanna send here will always be the same. It does not depend on
   * any user input or anything like that."
   *
   * Why 'events-images' as the key:
   * - Static key because the list of available images doesn't change based
   *   on user input
   * - Different from 'events' key to avoid cache conflicts
   * - React Query will cache this list and reuse it
   *
   * WHAT WE EXTRACT FROM useQuery:
   * INSTRUCTOR QUOTE:
   * "Hence, we then can use that object returned by useQuery to get hold of
   * the data which will be that list of images and also isPending and maybe
   * also isError to show some alternative information on the screen if
   * fetching that list of images failed."
   */
  const { data, isPending, isError } = useQuery({
    queryKey: ['events-images'],
    queryFn: fetchSelectableImages,
  });

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit({ ...data, image: selectedImage });
  }

  return (
    <form id="event-form" onSubmit={handleSubmit}>
      <p className="control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={inputData?.title ?? ''}
        />
      </p>

      {/**
       * =====================================================================
       * CONDITIONAL RENDERING FOR IMAGE PICKER
       * =====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "But now I also wanna make sure that we only show this if we get
       * images to display. So I'll show it conditionally only if we have data."
       *
       * LOADING STATE:
       * INSTRUCTOR QUOTE:
       * "On the other hand I wanna show some loading text if isPending is true,
       * so that I show a paragraph here, for example, where I say
       * 'Loading selectable images'."
       *
       * ERROR STATE:
       * INSTRUCTOR QUOTE:
       * "And if we got an error if isError is true, we could use this ErrorBlock
       * again, this custom component which again must be imported where we then
       * say 'Failed to load selectable images,' and then maybe a message of
       * 'Please try again later.'"
       *
       * Conditional rendering pattern:
       * ┌─────────────────────────────────────────────────────────────────────┐
       * │  isPending = true  →  Show "Loading selectable images..."          │
       * │  isError = true    →  Show ErrorBlock with error message           │
       * │  data exists       →  Show ImagePicker with images                 │
       * └─────────────────────────────────────────────────────────────────────┘
       */}
      <div className="control">
        {isPending && <p>Loading selectable images...</p>}
        {isError && (
          <ErrorBlock
            title="Failed to load selectable images"
            message="Please try again later."
          />
        )}
        {data && (
          <ImagePicker
            images={data}
            onSelect={handleSelectImage}
            selectedImage={selectedImage}
          />
        )}
      </div>

      <p className="control">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={inputData?.description ?? ''}
        />
      </p>

      <div className="controls-row">
        <p className="control">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            defaultValue={inputData?.date ?? ''}
          />
        </p>

        <p className="control">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={inputData?.time ?? ''}
          />
        </p>
      </div>

      <p className="control">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          defaultValue={inputData?.location ?? ''}
        />
      </p>

      <p className="form-actions">{children}</p>
    </form>
  );
}
