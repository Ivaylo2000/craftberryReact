import FirstCard from "./FirstCard";
import { useEffect, useState } from "react";
export default function ProductCards({
  ulClassName,
  liClassName,
  handleAddToWishlist,
  currentProducts,
  wishlist,
}) {
  return (
    <ul className={ulClassName}>
      <FirstCard liClassName={liClassName} />
      {currentProducts.map((product, index) => (
        <li key={index} className={liClassName}>
          <div style={{ backgroundImage: `url(${product.images})` }}>
            <span
              onClick={() => handleAddToWishlist(product)}
              className={wishlist}
            ></span>
          </div>
          <h2>{product.title}</h2>
          <p>${product.price}</p>
        </li>
      ))}
    </ul>
  );
}
