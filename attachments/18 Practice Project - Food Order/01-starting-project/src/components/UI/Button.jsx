/**
 * ============================================================================
 * REUSABLE BUTTON COMPONENT (Lesson 289)
 * ============================================================================
 *
 * This component creates a configurable, reusable button that can be used
 * throughout the application with different styles.
 *
 * LESSON 289 - KEY LEARNING OBJECTIVES:
 * =====================================
 * 1. Creating a dedicated UI folder for reusable components
 * 2. Using the children prop for flexible content
 * 3. Creating configurable components with props (textOnly)
 * 4. Merging incoming className with hard-coded classes
 * 5. Using rest/spread syntax to forward props
 *
 * WHY CREATE A UI FOLDER?
 * =======================
 * The instructor explains:
 * "I'll add a separate UI sub folder in my components folder, since I have
 * a couple of components in this app here that are basically just core
 * generic UI building blocks."
 *
 * "Of course, all components in the end are UI building blocks but there
 * are certain building blocks like buttons that are needed all over the
 * place. And I'll put such components into that UI folder, which is just
 * a convention I personally like to follow but not a convention you have
 * to adopt."
 *
 * FOLDER STRUCTURE:
 * =================
 * src/
 * └── components/
 *     ├── Header.jsx
 *     ├── Meals.jsx
 *     ├── MealItem.jsx
 *     └── UI/               ← New folder for reusable UI components
 *         └── Button.jsx    ← This file
 *
 * BUTTON STYLES (from index.css):
 * ================================
 * 1. ".button" class:
 *    - Gold background (#ffc404)
 *    - Dark text (#1f1a09)
 *    - Padding and border-radius
 *    - Used for primary actions (Add to Cart, Submit Order)
 *
 * 2. ".text-button" class:
 *    - Transparent background
 *    - Gold text (#ffc404)
 *    - No border
 *    - Used for secondary actions (Close, Cart button in header)
 */

/**
 * BUTTON COMPONENT
 * ================
 * A reusable button component that supports two visual styles and can
 * forward any additional props to the underlying button element.
 *
 * PROPS EXPLAINED:
 * ================
 *
 * 1. children (Lesson 289):
 *    -----------------------
 *    The instructor explains: "I want to accept the children prop, for
 *    example, so that we can still use this custom button like the built-in
 *    button and wrap it around the text that should be output on the button."
 *
 *    "And of course, you learned that if you wrap a custom component around
 *    something, around some text or JSX code, that text or JSX code will be
 *    received through that built in children prop."
 *
 *    Usage:
 *    <Button>Add to Cart</Button>  → children = "Add to Cart"
 *    <Button>Cart (5)</Button>     → children = "Cart (5)"
 *
 * 2. textOnly (Lesson 289):
 *    ----------------------
 *    The instructor explains: "I also want to support different kinds of
 *    buttons with different styles. I basically want to have buttons that
 *    have a background color and that look like big buttons on the screen.
 *    And then I also wanna have text only buttons which in the end is just
 *    some clickable text."
 *
 *    Usage:
 *    <Button>Submit</Button>           → Gold background button
 *    <Button textOnly>Close</Button>   → Text-only button (no background)
 *
 *    Setting textOnly without a value:
 *    "You could set it to true like this, but that's actually not required
 *    because just adding a prop like this will automatically set it to true
 *    in React."
 *
 * 3. className (Lesson 289):
 *    -----------------------
 *    The instructor explains: "In addition, I also wanna make sure that
 *    theoretically the button styling could also be adjusted from outside
 *    this component by adding more CSS classes to it."
 *
 *    This allows external CSS classes to be merged with the component's
 *    built-in classes.
 *
 *    Usage:
 *    <Button className="extra-margin">Submit</Button>
 *    → className will be "button extra-margin"
 *
 * 4. ...props (Rest syntax - Lesson 289):
 *    ------------------------------------
 *    The instructor explains: "And now as a last but very important step,
 *    I of course also wanna make sure that my button in the end can be used
 *    just like the built-in button. That, for example the type can be set,
 *    that the onClick prop can be set, and so on."
 *
 *    "And to achieve this, we could of course accept and extract all these
 *    props here, but we would have to add a very long list of props here to
 *    cover all possible use cases."
 *
 *    "A way simpler alternative is to use this rest properties syntax here,
 *    where you basically look for all other props you might be getting, all
 *    other properties that are set on that incoming props object, and you
 *    merge them into a new object."
 *
 *    This pattern allows:
 *    <Button onClick={handleClick}>Click me</Button>
 *    <Button type="submit">Submit Form</Button>
 *    <Button disabled>Can't Click</Button>
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to display inside button
 * @param {boolean} props.textOnly - If true, uses text-only styling
 * @param {string} props.className - Additional CSS classes to apply
 * @param {Object} props....props - Any other props to forward to <button>
 */
export default function Button({ children, textOnly, className, ...props }) {
  /**
   * BUILDING CSS CLASSES (Lesson 289)
   * ==================================
   * The instructor explains the logic:
   *
   * "And I'll then add cssClasses constant here, which takes a look at text
   * only. And if that is true, I want to add a CSS class of text-button to
   * this button. Otherwise it should be just the button CSS class."
   *
   * TERNARY OPERATOR:
   * -----------------
   * textOnly ? 'text-button' : 'button'
   *
   * If textOnly is truthy → use 'text-button'
   * If textOnly is falsy  → use 'button'
   */
  let cssClasses = textOnly ? 'text-button' : 'button';

  /**
   * MERGING EXTERNAL CLASSES (Lesson 289)
   * =====================================
   * The instructor explains:
   *
   * "So in addition, I'll also extract the class name prop so that this prop
   * can also be set on my custom component. And I wanna merge this into the
   * hard-coded classes I have here."
   *
   * "To achieve this, we can of course convert these strings to template
   * literals and simply inject class name like this into both, or
   * alternatively, keep these classes as strings, convert this from a
   * constant to a variable, and then simply append the class name like this
   * separated by some white space here so that we don't build one long class
   * name but we instead have multiple class names on that button."
   *
   * RESULT:
   * -------
   * If className is "extra-class":
   *   cssClasses = "button extra-class"
   * or
   *   cssClasses = "text-button extra-class"
   *
   * Note: If className is undefined, this appends " undefined" which is
   * harmless but could be handled more elegantly with:
   *   cssClasses += className ? ' ' + className : '';
   */
  cssClasses += ' ' + className;

  /**
   * RENDER BUTTON WITH SPREAD PROPS (Lesson 289)
   * =============================================
   * The instructor explains the spread syntax:
   *
   * "And it's now this props object that should be spread onto this button,
   * which thankfully also is pretty easy to do by using this syntax here.
   * So with that here, we're collecting all remaining props and we're then
   * spreading those props onto the button element, the built-in button element."
   *
   * HOW ...props WORKS:
   * -------------------
   * 1. When the component receives: { onClick: fn, type: "submit", disabled: true }
   * 2. We extract: children, textOnly, className
   * 3. The rest (...props) becomes: { onClick: fn, type: "submit", disabled: true }
   * 4. {...props} spreads these onto <button>
   *
   * This makes our Button work just like the native button element!
   */
  return (
    <button className={cssClasses} {...props}>
      {/*
        CHILDREN CONTENT (Lesson 289)
        =============================
        "It's therefore this children prop which I also want to use here to
        output that content which is passed between my button tags."

        Whatever is passed between <Button>...</Button> tags appears here.
      */}
      {children}
    </button>
  );
}

/**
 * ============================================================================
 * SUMMARY & KEY CONCEPTS FROM LESSON 289
 * ============================================================================
 *
 * THE CHILDREN PROP:
 * ==================
 * A special prop that contains whatever is placed between component tags.
 *
 * <Button>Hello</Button>  → children = "Hello"
 * <Button><span>Hi</span></Button>  → children = <span>Hi</span>
 *
 * BOOLEAN PROPS SHORTHAND:
 * ========================
 * In React, these are equivalent:
 *   <Button textOnly={true}>Close</Button>
 *   <Button textOnly>Close</Button>
 *
 * Just adding the prop name without a value sets it to true.
 *
 * REST/SPREAD PATTERN:
 * ====================
 * Collecting remaining props:
 *   function Button({ children, textOnly, ...props }) { }
 *                                          ^^^^^^^^
 *                                          Collects everything else
 *
 * Spreading onto element:
 *   <button {...props}>
 *           ^^^^^^^^^
 *           Applies all collected props
 *
 * This pattern is extremely useful for wrapper components!
 *
 * USAGE IN THIS PROJECT (Lesson 289):
 * ====================================
 * In Header.jsx:
 *   <Button textOnly onClick={handleShowCart}>
 *     Cart ({totalCartItems})
 *   </Button>
 *
 * In MealItem.jsx:
 *   <Button onClick={handleAddMealToCart}>
 *     Add to Cart
 *   </Button>
 *
 * WHAT'S NEXT (end of Lesson 289):
 * ================================
 * "And therefore, I'd say as a next step it probably makes sense to make
 * sure that these buttons can be clicked and that we start managing some
 * cart data which we then at some point can also display in a modal that
 * opens when we click this cart button."
 *
 * "But as a first step, let's make sure that we start managing some cart
 * data whenever this button or this button, or this button here gets clicked."
 */
