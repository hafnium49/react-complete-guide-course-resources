/**
 * ============================================================================
 * src/components/NewChallenge.jsx - LESSONS 530, 531, 532 & 533
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
 * 🎓 LESSON 531: STAGGERING LIST ANIMATIONS WITH staggerChildren
 * ============================================================================
 *
 * THE PROBLEM WITH SIMULTANEOUS LIST ANIMATIONS:
 *
 * When multiple list items all animate at once (e.g., all images scaling
 * up simultaneously), the effect can feel overwhelming or flat. A more
 * polished approach is to STAGGER the animations: each item starts its
 * animation slightly after the previous one, creating a cascading wave
 * effect that feels more intentional and elegant.
 *
 * HOW TO STAGGER WITH FRAMER MOTION:
 *
 * Staggering is configured on the PARENT element (the list), not on
 * the individual items. The steps are:
 *
 * 1. Convert the parent element to a motion component (e.g., <ul> →
 *    <motion.ul>). This is needed because the parent must participate
 *    in the variants system to pass timing information to its children.
 *
 * 2. Add a `variants` prop on the parent with a variant (matching the
 *    parent's active variant name, e.g., "visible") that contains ONLY
 *    a `transition` property -- no animation values like opacity or
 *    scale, since we don't want to animate the list container itself.
 *
 * 3. Inside that transition, set `staggerChildren` to the desired delay
 *    (in seconds) between each child's animation start:
 *
 *      variants={{
 *        visible: { transition: { staggerChildren: 0.05 } }
 *      }}
 *
 *    With 0.05, the 1st child starts immediately, the 2nd starts after
 *    50ms, the 3rd after 100ms, the 4th after 150ms, and so on.
 *
 * PER-VARIANT TRANSITION vs GLOBAL TRANSITION PROP:
 *
 * You can configure transition settings in two places:
 *
 *   - The `transition` PROP on a motion component (e.g.,
 *     <motion.li transition={{ type: 'spring' }}>) applies to ALL
 *     animations on that element regardless of which variant or
 *     animation prop triggers them.
 *
 *   - A `transition` PROPERTY inside a variant object applies ONLY
 *     when that specific variant is active. This lets you use different
 *     timing for different animation states (e.g., fast entry but slow
 *     exit, or staggering only on the "visible" variant).
 *
 * This per-variant transition is not limited to variants -- you can
 * also embed transition settings inside inline animate, exit, etc.
 * objects to control timing for specific animation phases.
 *
 * ============================================================================
 * 🎓 LESSON 532: KEYFRAME ARRAYS -- MULTI-STEP ANIMATIONS
 * ============================================================================
 *
 * Instead of animating from a single starting value to a single ending
 * value, Framer Motion supports KEYFRAME ARRAYS: you provide an array
 * of values for an animation property, and Framer Motion will animate
 * through each value in sequence, creating a multi-step animation.
 *
 * For example, instead of:
 *   visible: { scale: 1 }          → single target (from hidden's 0.5 → 1)
 *
 * You can write:
 *   visible: { scale: [0.8, 1.3, 1] }   → three-step animation:
 *     step 1: scale to 0.8 (80% of final size)
 *     step 2: overshoot to 1.3 (130% -- bigger than final)
 *     step 3: settle to 1.0 (final size)
 *
 * This creates a custom bounce effect defined by your exact values,
 * rather than relying on spring physics to produce the overshoot.
 * You have full control over exactly how much overshoot occurs and
 * through which intermediate sizes the element passes.
 *
 * Keyframe arrays work for ANY animatable property -- scale, opacity,
 * x, y, rotate, colors, etc. The array can have any number of steps.
 * Framer Motion distributes the steps evenly across the animation
 * duration by default.
 *
 * ============================================================================
 * 🎓 LESSON 533: IMPERATIVE ANIMATIONS WITH useAnimate
 * ============================================================================
 *
 * DECLARATIVE vs IMPERATIVE ANIMATIONS:
 *
 * Everything we've done so far has been DECLARATIVE: we define animation
 * states via props (animate, initial, exit, whileHover, variants) and
 * Framer Motion decides when to play them based on component state,
 * mounting/unmounting, or user gestures.
 *
 * But sometimes you need to trigger an animation from CODE -- for
 * example, shaking input fields when form validation fails. There is
 * no prop change or mount event to hook into; you want to say "play
 * this animation NOW" in response to a specific condition in your logic.
 *
 * THE useAnimate HOOK:
 *
 * Framer Motion provides the useAnimate hook for imperative animations.
 * It returns an array with two elements:
 *
 *   const [scope, animate] = useAnimate();
 *
 *   scope   → a ref that should be attached to a container element
 *             (e.g., a form). This SCOPES the CSS selectors used in
 *             the animate function, so they only match elements INSIDE
 *             the scoped container -- not anywhere else on the page.
 *
 *   animate → a function you call to trigger animations imperatively.
 *
 * THE animate() FUNCTION -- THREE ARGUMENTS:
 *
 *   animate(selector, animationObject, transitionObject)
 *
 *   1. selector (string):  A CSS selector targeting which elements to
 *      animate within the scope. E.g., 'input, textarea' selects all
 *      input and textarea elements inside the scoped container. You
 *      can use any valid CSS selector: tag names, class names, IDs, etc.
 *
 *   2. animationObject:  Same format as the animate prop or variant
 *      values -- an object describing what to animate. Supports
 *      keyframe arrays: { x: [-10, 0, 10, 0] } shakes elements left
 *      and right by alternating x position through four keyframes.
 *
 *   3. transitionObject (optional):  Same format as the transition
 *      prop -- controls how the animation plays (type, duration, etc.).
 *
 * THE stagger() FUNCTION:
 *
 * For imperative animations, you cannot use staggerChildren (that only
 * works with variants on parent motion components). Instead, Framer
 * Motion provides a `stagger` function that you pass as the `delay`
 * value in the transition object:
 *
 *   { type: 'spring', duration: 0.2, delay: stagger(0.05) }
 *
 * This adds an incremental delay between each targeted element's
 * animation start, just like staggerChildren does for declarative
 * variant animations. With stagger(0.05), the first input shakes
 * immediately, the second after 50ms, the third after 100ms, etc.
 *
 * ============================================================================
 */

import { useContext, useRef, useState } from 'react';
import { motion, useAnimate, stagger } from 'framer-motion';

import { ChallengesContext } from '../store/challenges-context.jsx';
import Modal from './Modal.jsx';
import images from '../assets/images.js';

export default function NewChallenge({ onDone, isOpen }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  // LESSON 533: useAnimate returns a scope ref and an animate function.
  // The scope ref is attached to the form below to limit CSS selectors
  // to only match elements within this form.
  const [scope, animate] = useAnimate();

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
      // LESSON 533: Imperatively trigger a shake animation on all input
      // and textarea elements within the scoped form. The keyframe array
      // moves each element left → center → right → center along the x axis.
      // stagger(0.05) adds a 50ms delay between each element's shake start.
      animate(
        'input, textarea',
        { x: [-10, 0, 10, 0] },
        { type: 'spring', duration: 0.2, delay: stagger(0.05) }
      );
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone} open={isOpen}>
      {/* LESSON 533: ref={scope} scopes the imperative animate() calls
          to only select elements within this form, preventing selectors
          like 'input, textarea' from matching elements elsewhere on the page. */}
      <form id="new-challenge" onSubmit={handleSubmit} ref={scope}>
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

        {/* LESSON 531: <ul> → <motion.ul> to enable stagger control over
            its children. The "visible" variant contains only a transition
            with staggerChildren: 0.05, adding a 50ms delay between each
            child motion.li's animation start. No opacity/scale is set
            here because we don't want to animate the list container. */}
        <motion.ul id="new-challenge-images" variants={{
          visible: { transition: { staggerChildren: 0.05 } },
        }}>
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
              /* LESSON 532: The scale property in the "visible" variant
                 uses a keyframe array instead of a single number. The
                 animation goes through three steps: 80% → 130% → 100%,
                 creating a custom bounce effect as each image appears. */
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              exit={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' }}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

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
