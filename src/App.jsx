import { useState } from "react";
import { useEffect } from "react";
import helpers from "./components/helpers";
import LoadingSpinner from "./components/spinner";
import Level from "./components/level";
import "./App.css";

function App() {
  const [game, setGame] = useState({
    level: 1, // Initial Level
    noOfCards: 4, // Defines how many cards for first level
    totalCharacters: 826,
  });
  const [currentScore, setCurrentScore] = useState(0);

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
      setAllCards(data);
      setSpinner(false);
    }
    // Pass data fetched to allCards state
    getAPIData();
  }, [game.level]);

  return (
    <div className="App">
      {spinner ? (
        <LoadingSpinner />
      ) : (
        <Level
          level={game.level}
          allCards={allCards}
          setAllCards={setAllCards}
          setCurrentScore={setCurrentScore}
        />
      )}
      <button>Check</button>
      <p>{console.table([...allCards, currentScore])}</p>
      <p>{currentScore}</p>
    </div>
  );
}

export default App;

/**Let's pseudocode this baby
 *
 *
 * Let's figure out the scoreboard.
 * The score increases whenever a user clicks a card that wasnt' previously clicked
 * There is also a Best score.
 * The logic should be the following:
 * 1. I click the card.
 *  1.1 if it's selected game over
 *  1.2 if it ain't, increase the score and flag as selected
 *  when increasing the score, if the current score is higher than best score update them together
 *  Should it be bestScore = currentScore or just bestScore++ ?
 *  Well, let's say you start from 0 0
 *  card clicked.
 *  score added
 *  is best score lower than current? Yes -> bestScore + 1
 *  I guess + 1 would work
 *
 * Now in terms of react: I guess There is a scoreboard component
 * Well the currentScore could just count in the App state the number of cards that are selected
 * then we would look at the bestScore
 * this could be a useEffect maybe(?)
 * How do I check? I filter all the isSelected and it returns an array. Its lenght is the currentScore
 * then I checck
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
