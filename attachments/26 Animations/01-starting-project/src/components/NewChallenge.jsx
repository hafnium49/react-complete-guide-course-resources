/**
 * ============================================================================
 * src/components/NewChallenge.jsx - LESSON 530
 * ============================================================================
 *
 * The form for creating a new challenge. It is rendered as a child of the
 * Modal component, so the form content appears inside the <motion.dialog>.
 *
 * ============================================================================
 * 🎓 LESSON 530: VARIANT PROPAGATION -- PARENT-TO-CHILD ANIMATION CASCADE
 * ============================================================================
 *
 * THE CORE IDEA:
 *
 * When a parent motion component uses variant names (strings) for its
 * initial, animate, or exit props, Framer Motion automatically propagates
 * those variant names DOWN to all descendant motion components. If a
 * child motion component defines a `variants` prop with matching keys,
 * the corresponding animation states activate automatically -- WITHOUT
 * the child needing to set its own initial, animate, or exit props.
 *
 * In this app, the Modal component (parent) has:
 *   initial="hidden"  animate="visible"  exit="hidden"
 *
 * So any motion component rendered as a descendant of that modal will
 * receive "hidden" when the modal mounts (initial state) and "visible"
 * once the entry animation begins. The child just needs to define
 * variants with those same keys:
 *
 *   variants={{
 *     hidden:  { opacity: 0, scale: 0.5 },   // activated by parent's initial
 *     visible: { opacity: 1, scale: 1 },      // activated by parent's animate
 *   }}
 *
 * This enables coordinated animations: the modal slides up and fades in,
 * while simultaneously the image thumbnails inside scale up and fade in.
 * No explicit wiring is needed -- just matching variant names.
 *
 * THE EXIT ANIMATION PROBLEM:
 *
 * The parent modal also has exit="hidden", which propagates to children.
 * This means the child images would play their "hidden" exit animation
 * (shrinking and fading out) when the modal closes. Framer Motion waits
 * for ALL exit animations to complete before removing elements, so the
 * backdrop lingers while the image exit animations play -- an unwanted
 * delay.
 *
 * THE FIX -- OVERRIDING EXIT ON THE CHILD:
 *
 * To prevent the child exit animation from causing a delay, we can set
 * exit on the child motion.li to override the propagated variant.
 *
 * IMPORTANT WORKAROUND: At the time of writing, setting exit to a
 * variant NAME string (e.g., exit="visible") on a child component
 * breaks the entry animation. Instead, we must use the actual INLINE
 * animation object that matches the visible state:
 *
 *   exit={{ opacity: 1, scale: 1 }}
 *
 * This tells Framer Motion: "when exiting, animate to the visible state"
 * -- but since we're already at that state, no animation plays, and
 * there's no delay. The entry animation still works because the
 * variants propagation from the parent is not disrupted.
 *
 * ============================================================================
 */

import { useContext, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context.jsx';
import Modal from './Modal.jsx';
import images from '../assets/images.js';

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <ul id="new-challenge-images">
          {images.map((image) => (
            /* LESSON 530: <li> → <motion.li> with variants that match the
               parent modal's variant names ("hidden"/"visible"). When the
               modal enters, "visible" propagates here automatically, causing
               each image to scale up and fade in with a spring animation.
               The exit prop uses an inline object (not a variant name string)
               to prevent the child exit animation from delaying backdrop
               removal -- see the header comment for the full explanation. */
            <motion.li
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? 'selected' : undefined}
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: 1 },
              }}
              exit={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' }}
            >
              <img {...image} />
            </motion.li>
          ))}
        </ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
