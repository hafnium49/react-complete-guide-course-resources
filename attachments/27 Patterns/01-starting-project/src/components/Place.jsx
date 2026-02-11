/**
 * ============================================================================
 * src/components/Place.jsx - LESSON 549
 * ============================================================================
 *
 * A PRESENTATIONAL COMPONENT FOR A SINGLE PLACE:
 *
 * This component receives an item prop containing a place object (with
 * image, title, and description fields) and renders it as an <article>
 * with a photo and text.
 *
 * It exists specifically to be used as the rendering function's return
 * value inside a SearchableList's render prop. The SearchableList
 * handles the search/filter LOGIC, while this component handles the
 * PRESENTATION of each filtered result.
 *
 * This separation is exactly what the render props pattern enables:
 * SearchableList doesn't know or care about Place, and Place doesn't
 * know or care about searching. The consumer (App.jsx) wires them
 * together by passing a function that renders <Place> for each item.
 *
 * ============================================================================
 */

export default function Place({ item }) {
  return (
    <article className="place">
      <img src={item.image} alt={item.title} />
      <div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>
    </article>
  );
}
