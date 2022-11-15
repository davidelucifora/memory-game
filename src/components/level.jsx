import React from "react";
import Spinner from "./spinner";
import { useState } from "react";

function Card(props) {
  // Destructure props.card
  const { card } = props;
  // When an image loads, add it to the level loadedCounter
  function handleOnLoad() {
    props.updateLoadedCounter((prevCounter) => prevCounter + 1);
  }
  return (
    <div className="card">
      <h2>{card.name}</h2>
      <img src={card.image} onLoad={handleOnLoad}></img>
    </div>
  );
}

export default function Level(props) {
  // Keeps track of fully loaded images
  const [loadedCounter, setLoadedCounter] = useState(0);

  // List cards
  const listCards = props.cards.map((card) => {
    return (
      <Card card={card} key={card.id} updateLoadedCounter={setLoadedCounter} />
    );
  });
  return (
    <div className="level">
      <h1>Level {props.level}</h1>
      {loadedCounter < props.cards.length && <Spinner />}
      <div
        className={`list-cards-wrapper ${
          loadedCounter < props.cards.length && "hide"
        }`}
      >
        {listCards}
      </div>
    </div>
  );
}
