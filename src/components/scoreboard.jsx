import React from "react";
export default function Scoreboard(props) {
  return (
    <div className="scoreboard">
      <h2 className="green-accent-text">Level {props.level}</h2>
      <p>
        Current score:
        <span className="green-accent-text"> {props.currentScore}</span>
      </p>
      <p>
        Best score:<span className="green-accent-text"> {props.bestScore}</span>
      </p>
    </div>
  );
}
