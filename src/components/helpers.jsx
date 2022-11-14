import React from "react";
export default (function helpers() {
  /** Get random IDs depending on noOf cards and total characters in API */
  function getRandomIds(noOfCards, totalCharacters) {
    const IdsArray = [];
    for (let i = 0; i < noOfCards; i++) {
      IdsArray.push(Math.floor(Math.random() * totalCharacters));
    }
    return IdsArray;
  }
  return { getRandomIds };
})();
