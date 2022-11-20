import React from "react";
import Spinner from "./spinner";
import { useState } from "react";
import { useEffect } from "react";
import Card from "./card";
import helpers from "./helpers";

export default function Level(props) {
  // Keeps track of fully loaded images
  const [loadedCounter, setLoadedCounter] = useState(0);
  const allCards = props.allCards;

  function addToCurrentScore() {
    props.setCurrentScore((prevScore) => prevScore + 1);
  }

  // List cards
  const listCards = allCards.map((card) => {
    return (
      <Card
        card={card}
        key={card.id}
        updateLoadedCounter={setLoadedCounter}
        setAllCards={props.setAllCards}
        addToCurrentScore={addToCurrentScore}
      />
    );
  });

  return (
    <div className="level">
      <h1>Level {props.level}</h1>
      {loadedCounter < allCards.length && <Spinner />}
      <div
        className={`list-cards-wrapper ${
          loadedCounter < allCards.length && "hide"
        }`}
      >
        {helpers.shuffleArray(listCards)}
        {/* <p>{correctCards}</p> */}
      </div>
    </div>
  );
}
