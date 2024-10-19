import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProgressCircle({ divClassName, value, text }) {
  return (
    <div className={divClassName}>
      <CircularProgressbar
        value={value}
        text={text}
        styles={buildStyles({
          strokeLinecap: "round",
          pathTransitionDuration: 0.5,
          pathColor: "#AADDF3",
          textColor: "#000000",
          trailColor: "#d6d6d6",
        })}
      />
    </div>
  );
}
