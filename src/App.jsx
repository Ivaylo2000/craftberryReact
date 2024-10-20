import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import QuestionPage from "./Pages/QuestionPage/QuestionPage";
import ResultPage from "./Pages/ResultPage/ResultPage";
import { useState } from "react";
function App() {
  const [answers, setAnswers] = useState({});

  const handleAnswerClick = (questionId, option) => {
    setAnswers((prevState) => ({ ...prevState, [questionId]: option }));
  };

  const handleAddToWishlist = (product) => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const productIndex = existingWishlist.findIndex(
      (item) => item.title === product.title
    );

    if (productIndex !== -1) {
      existingWishlist.splice(productIndex, 1);
    } else {
      existingWishlist.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
  };
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          path="/question/:id"
          element={
            <QuestionPage
              onAnswers={answers}
              onhandleAnswerClick={handleAnswerClick}
            />
          }
        />
        <Route
          path="/results"
          element={
            <ResultPage
              onAnswers={answers}
              handleAddToWishlist={handleAddToWishlist}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
