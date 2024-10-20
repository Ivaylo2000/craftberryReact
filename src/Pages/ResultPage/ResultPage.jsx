import classes from "./ResultPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../Shared/Button";
import ProductCards from "../../Components/ProductCards";
import Pagination from "../../Components/Pagination";
import { filteredProducts } from "../../utils/filteredProducts";

export default function ResultPage({ onAnswers, handleAddToWishlist }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://jeval.com.au/collections/hair-care/products.json?page=1"
        );
        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const recommendations = filteredProducts(products, onAnswers);

  const recomendedProducts = recommendations.map((product) => ({
    images: product.images[0]?.src || "",
    title: product.title,
    price: product.variants[0]?.price || "0",
  }));

  const combinedProducts = [...storedWishlist, ...recomendedProducts];

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = combinedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(combinedProducts.length / itemsPerPage);

  return (
    <div className={classes.resultPage}>
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Build your everyday self-care routine.</h1>
          <p>
            Perfect for if you're looking for soft, nourished skin, our
            moisturizing body washes are made with skin-natural nutrients that
            work with your skin to replenish moisture. With a light formula, the
            bubbly lather leaves your skin feeling cleansed and cared for. And
            by choosing relaxing fragrances you can add a moment of calm to the
            end of your day.
          </p>
          <button onClick={() => navigate(`/question/1`)}>
            Retake the quiz
          </button>
        </div>
      </div>

      <div className={classes.productsContainer}>
        <Button
          className={
            currentPage === 1 ? `${classes.hidden}` : `${classes.buttonBack}`
          }
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <span></span>
        </Button>

        <ProductCards
          ulClassName={`${classes["product-cards"]}`}
          currentProducts={currentProducts}
          liClassName={`${classes["product-card"]}`}
          wishlist={classes.wishlist}
          handleAddToWishlist={handleAddToWishlist}
        />

        <Button
          className={
            currentPage < totalPages
              ? `${classes.nextButton}`
              : `${classes.hidden}`
          }
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          <span></span>
        </Button>
      </div>

      <Pagination
        totalPages={totalPages}
        divClass={classes.currentPage}
        currentPage={currentPage}
        active={classes.active}
        inactive={classes.inactive}
      />
    </div>
  );
}
