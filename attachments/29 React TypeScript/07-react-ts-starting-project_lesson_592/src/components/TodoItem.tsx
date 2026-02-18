/**
 * ============================================================================
 * TodoItem.tsx — LESSONS 595, 600, 601
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
 * LESSON 601 — ADDING A CALLBACK PROP FOR REMOVING TODOS
 * ============================================================================
 *
 * To remove a todo when the user clicks on it, this component needs
 * to notify its parent that a click occurred. The standard React
 * pattern is to receive a callback function as a prop and call it
 * from an event handler.
 *
 * THE onRemoveTodo PROP TYPE — () => void:
 *
 * The function type for onRemoveTodo is () => void — a function that
 * takes NO parameters and returns nothing. This may seem surprising
 * because the removal logic in App.tsx needs the todo's ID to know
 * WHICH todo to remove. However, TodoItem itself does not know or
 * care about IDs. The ID is pre-configured by the PARENT component
 * (Todos.tsx) using .bind() before the function is passed down.
 * By the time TodoItem receives onRemoveTodo, the ID is already
 * baked in, so TodoItem just calls it with no arguments.
 *
 * This keeps TodoItem's interface minimal — it does not need to
 * receive an ID prop just to pass it back up through a callback.
 *
 * WHY NOT INCLUDE THE EVENT PARAMETER?
 *
 * Since onRemoveTodo is bound to onClick, we COULD type it as
 * (event: React.MouseEvent) => void to match onClick's signature
 * exactly. But if the function never uses the event object (which
 * it does not here), the parameter can be omitted from the type
 * definition entirely. TypeScript allows a function with FEWER
 * parameters to be assigned where more parameters are expected —
 * the extra arguments are simply ignored at runtime.
 *
 * ============================================================================
 */

import React from 'react';

import classes from './TodoItem.module.css';

// Props now include onRemoveTodo — a callback with no parameters.
// The parent pre-configures which todo to remove (via .bind()),
// so this component only needs to invoke the function on click.
const TodoItem: React.FC<{ text: string; onRemoveTodo: () => void }> = (props) => {
  // onClick triggers onRemoveTodo, which the parent has already
  // bound to the specific todo's ID. No arguments needed here.
  return (
    <li className={classes.item} onClick={props.onRemoveTodo}>
      {props.text}
    </li>
  );
};

export default TodoItem;
