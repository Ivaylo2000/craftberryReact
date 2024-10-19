import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { questions } from "../../questions/questions";
import classes from "./QuestionPage.module.css";
import ProgressCircle from "../../Components/ProgressCircle";
import Button from "../../Shared/Button";

const QuestionPage = ({ onAnswers, onhandleAnswerClick }) => {
  const { id } = useParams();
  const questionId = parseInt(id);
  const question = questions[questionId - 1];
  const navigate = useNavigate();

  if (!question) {
    return <h2>Question not found</h2>;
  }

  const handleBack = () => {
    if (questionId > 1) {
      navigate(`/question/${questionId - 1}`);
    } else {
      navigate("/");
    }
  };

  const handleNext = () => {
    if (questionId !== questions.length) {
      navigate(`/question/${questionId + 1}`);
    } else {
      navigate("/results");
    }
  };
  const percentage = (questionId / 5) * 100;
  const nextButtonText =
    questionId === questions.length ? "Discover your results" : "Next question";
  const nextButtonImage =
    questionId === questions.length ? "" : <img src="/arrow.svg" alt="arrow" />;

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <h1>{question.question}</h1>
          <ul className={classes.answers}>
            {question.options.map((option, index) => (
              <li
                className={`${classes.answer} ${
                  onAnswers[question.id] === option ? classes.selected : ""
                }`}
                key={index}
                onClick={() => {
                  onhandleAnswerClick(question.id, option);
                }}
              >
                {`${String.fromCharCode(96 + index + 1)}. ${option}`}
              </li>
            ))}
          </ul>
          <div className={classes.buttonsWrapper}>
            <Button className={classes.back} onClick={handleBack}>
              Back
            </Button>
            <Button className={classes.next} onClick={handleNext}>
              {nextButtonText}
              {nextButtonImage}
            </Button>
          </div>
        </div>
        <ProgressCircle
          divClassName={classes.progress}
          value={percentage}
          text={`${questionId}/5`}
        />
      </div>
    </div>
  );
};

export default QuestionPage;
