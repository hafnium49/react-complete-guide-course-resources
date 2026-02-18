/**
 * ============================================================================
 * TodoItem.tsx — LESSONS 595, 600
 * ============================================================================
 *
 * A SINGLE TODO ITEM — OUTSOURCED INTO ITS OWN COMPONENT
 *
 * In real applications, the markup for a single list item is often
 * more complex than a simple <li> tag — it might include buttons,
 * icons, styling, event handlers, and more. Extracting it into a
 * separate component keeps the parent (Todos) clean and makes the
 * item independently testable and reusable.
 *
 * NAMING — TodoItem vs Todo:
 *
 * This component is named "TodoItem" (not "Todo") to avoid confusion
 * with the Todo CLASS in models/todo.ts. The class describes the DATA
 * shape; this component describes the UI for a single item.
 *
 * MINIMAL PROPS — ONLY WHAT THE COMPONENT NEEDS:
 *
 * This component only renders the todo's text — it does not use the
 * ID. Therefore, the props definition only includes "text: string"
 * rather than expecting the entire Todo object. This is a deliberate
 * design choice: components should only receive the data they
 * actually need. If the full Todo object were passed, it would work,
 * but the extra data (id) would be unused inside the component.
 *
 * An alternative approach — accepting the full Todo object:
 *
 *   React.FC<{ item: Todo }>
 *
 * That would also work and is perfectly valid. The choice depends on
 * how much data the component needs. Here, a single string suffices.
 *
 * WHERE THE "key" PROP GOES:
 *
 * The "key" prop is NOT defined in this component's props. It does
 * not need to be — React handles "key" as a special internal prop.
 * The React.FC type already allows "key" to be passed when using
 * the component in JSX, without us explicitly declaring it. The key
 * is set in the PARENT component (Todos.tsx) where the map happens,
 * not inside TodoItem itself.
 *
 * LESSON 600 — CSS MODULE STYLING:
 *
 * The .item class from TodoItem.module.css is applied to the <li>
 * element via className={classes.item}. This gives each todo item
 * its own card-like appearance with padding and a box shadow.
 *
 * ============================================================================
 */

import React from 'react';

import classes from './TodoItem.module.css';

// The className uses the scoped "item" class from the CSS module,
// which styles each list item as a card with shadow and padding.
const TodoItem: React.FC<{ text: string }> = (props) => {
  return <li className={classes.item}>{props.text}</li>;
};

export default TodoItem;
