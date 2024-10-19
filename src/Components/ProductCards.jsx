export default function ProductCards({
  ulClassName,
  liClassName,
  currentProducts,
}) {
  return (
    <ul className={ulClassName}>
      {currentProducts.map((product, index) => (
        <li key={product.id} className={liClassName}>
          <img src={product.images} alt={product.title} />
          <h2>{product.title}</h2>
          <p>${product.price}</p>
        </li>
      ))}
    </ul>
  );
}
