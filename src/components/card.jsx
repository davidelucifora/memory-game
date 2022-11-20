import React from "react";
import helpers from "./helpers";

export default function Card(props) {
  // Destructure props.card
  // When an image loads, add it to the level loadedCounter
  function handleOnLoad() {
    props.updateLoadedCounter((prevCounter) => prevCounter + 1);
  }

  function handleOnClick() {
    props.setAllCards((prevArray) =>
      prevArray.map((card) => {
        if (card.id === props.card.id) {
          if (card.isSelected) {
            console.log("game over");
          } else {
            props.addToCurrentScore();
            return { ...card, isSelected: true };
          }
          return card;
        } else return card;
      })
    );
  }
  return (
    <div className="card" onClick={handleOnClick}>
      <img src={props.card.image} onLoad={handleOnLoad}></img>
      <h3>{props.card.name}</h3>
    </div>
  );
}
