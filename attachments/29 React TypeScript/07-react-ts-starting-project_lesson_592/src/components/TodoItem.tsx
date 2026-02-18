/**
 * ============================================================================
 * TodoItem.tsx — LESSON 595
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
 * ============================================================================
 */

import React from 'react';

// A functional component that renders a single todo item. The props
// definition specifies only "text: string" — the minimum data needed
// to display the item. The React.FC type automatically includes
// built-in props like "children" and "key" alongside our custom ones.
const TodoItem: React.FC<{ text: string }> = (props) => {
  return <li>{props.text}</li>;
};

export default TodoItem;
