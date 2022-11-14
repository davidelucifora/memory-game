import { useState } from "react";
import { useEffect } from "react";
import helpers from "./components/helpers";
import LoadingSpinner from "./components/spinner";
import "./App.css";

function App() {
  const [game, setGame] = useState({
    level: 1, // Initial Level
    noOfCards: 4, // Defines how many cards for first level
    totalCharacters: 826,
    currentScore: 0,
    bestScore: 0,
  });

  // Array of all Cards to show in level
  const [allCards, setAllCards] = useState([]);

  // Shows or hides a spinner when loading data
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    // Show the spinner
    setSpinner(true);
    // Get API Data
    async function getAPIData() {
      const response = await fetch(
        "https://rickandmortyapi.com/api/character/" +
          // Appends n random character IDs to URL out of total n of characters
          [...helpers.getRandomIds(game.noOfCards, game.totalCharacters)]
      );

      const data = await response.json();
      setSpinner(false);
      return data;
    }
    // Pass data fetched to allCards state
    setAllCards(getAPIData());
  }, [game.level]);

  return (
    <div className="App">
      {spinner && <LoadingSpinner />}
      <button>Check</button>
    </div>
  );
}

export default App;

/**Let's pseudocode this baby
 * Ok we need basically 2 components, both reusable
 * 1. The level component. It takes as props the number of cards
 * and the current level.
 * These should live in the app state together with current score and best score (basically two counters)
 *
 * So first thing the app component renders, i useEffect to fetch 4 cards and assign lvl: 1 to the lvl state
 * in the App.
 * Then I render a Level component passing the lvl number and number of cards as props
 * The level will display the cards components accordingly.
 * Each card will have a isClicked state and when click will be set to true.
 * I reckon the cards could be held in state in an array of the level and displayed mapping through it.
 * onClick will check if the card was clicked
 * if true game over
 * if false, increment the score & check if all other cards are clicked and if true move on, if not re-shuffle.
 * The re-shuffle could actually happen at every re-render of <level >
 *
 * Every time you increment the score, check against best score
 * if best score is equal  to score, increment them together
 * if it's bigger, do fuck all.
 * Aight let's get on it
 */
