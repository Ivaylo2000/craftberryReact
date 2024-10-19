import classes from "./ResultPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../Shared/Button";
import ProductCards from "../../Components/ProductCards";

export default function ResultPage({ onAnswers }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  //page with products
  const URL = "https://jeval.com.au/collections/hair-care/products.json?page=1";
  //fetching the products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  //getting the names of the selected answers
  const filteredProducts = (products, answers) => {
    const answerEntries = Object.entries(answers).map(
      ([questionId, answer]) => {
        return answer.trim().toLowerCase();
      }
    );

    //returning the products that match criteria
    return products.filter((product) => {
      return answerEntries.some((answer) => {
        return (
          product.tags.map((tag) => tag.toLowerCase()).includes(answer) ||
          product.body_html.toLowerCase().includes(answer)
        );
      });
    });
  };
  //calling the function
  const recommendations = filteredProducts(products, onAnswers);

  //getting the products
  const productInfo = recommendations.map((product) => {
    return {
      images: product.images[0].src,
      title: product.title,
      price: product.variants[0]?.price,
    };
  });
  console.log(productInfo);
  // get the last product intex
  const indexOfLastProduct = currentPage * itemsPerPage;

  //get the first product index

  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  const currentProducts = productInfo.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(productInfo.length / itemsPerPage);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Build you everyday self care routine.</h1>
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
      {productInfo.length === 0 ? (
        <p className={classes.notFound}>No products found</p>
      ) : (
        <div className={classes.productsContainer}>
          {/* we don't show the button if we are on the first page */}
          {currentPage === 1 ? (
            ""
          ) : (
            <Button
              className={classes.buttonBack}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <span></span>
            </Button>
          )}
          {/* we show the products */}
          <ProductCards
            ulClassName={`${classes["product-cards"]}`}
            currentProducts={currentProducts}
            liClassName={`${classes["product-card"]}`}
          />
          {/* we don't show the button if we are on the last page */}
          {currentPage < totalPages && (
            <Button
              className={classes.nextButton}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              <span></span>
            </Button>
          )}
        </div>
      )}
    </>
  );
}
