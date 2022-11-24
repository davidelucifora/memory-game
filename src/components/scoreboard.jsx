import React from "react";
export default function Scoreboard(props) {
  if (props.currentScore > props.bestScore)
    props.setBestScore(props.currentScore);

  return (
    <div className="scoreboard">
      <p>
        Current score:
        <span className="green-accent-text"> {props.currentScore}</span>
      </p>
      <p>
        Best score:<span className="green-accent-text">{props.bestScore}</span>
      </p>
    </div>
  );
}
