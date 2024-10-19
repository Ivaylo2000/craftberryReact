import classes from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1>Build a self care routine suitable for you</h1>
        <p>
          Take out test to get a personalised self care routine based on your
          needs.
        </p>
        <button onClick={() => navigate(`/question/1`)}>Start the quiz</button>
      </div>
    </div>
  );
}
