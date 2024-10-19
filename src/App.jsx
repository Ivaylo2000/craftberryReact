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
        <Route path="/results" element={<ResultPage onAnswers={answers} />} />
      </Routes>
    </Router>
  );
}

export default App;
