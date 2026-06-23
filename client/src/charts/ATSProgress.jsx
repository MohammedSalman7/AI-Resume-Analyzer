import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function ATSProgress({ score }) {
  return (
    <div className="w-40 h-40">
      <CircularProgressbar
        value={score}
        text={`${score}%`}
        styles={buildStyles({
          pathColor: "#3b82f6",
          textColor: "#ffffff",
          trailColor: "#1e293b",
        })}
      />
    </div>
  );
}

export default ATSProgress;