export default  function CoreConcept({image, title, description}) {
  return (
    <li>
      <img src={image} className="concept-logo" alt="Stylized atom" />
      <h3>{title}</h3>
      <p>
        {description}
      </p>
    </li>
  );
}