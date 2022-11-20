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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  return { getRandomIds, shuffleArray };
})();
