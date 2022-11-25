import { useState } from "react";
import { useEffect } from "react";
import helpers from "./components/helpers";
import LoadingSpinner from "./components/spinner";
import Level from "./components/level";
import Scoreboard from "./components/scoreboard";
import "./App.css";

function App() {
  const [game, setGame] = useState({
    level: 1, // Initial Level
    noOfCards: 4, // Defines how many cards for first level
    totalCharacters: 826,
  });
  // Keep track of scores
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // Array of all Cards to show in level
  const [allCards, setAllCards] = useState([]);

  // Shows or hides a spinner when loading data
  const [spinner, setSpinner] = useState(true);

  // Things to do at start of game or game over
  useEffect(() => {
    // If game is over go back to lev 1
    !spinner && setSpinner(true);
    if (game.level === 0) {
      setGame((prevGame) => ({
        ...prevGame,
        level: 1,
        noOfCards: 4,
      }));
      // And reset currentScore
      setCurrentScore(0);
    }
    // Show the spinner
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

    getAPIData();
    // Pass data fetched to allCards state
  }, [game.level]);

  // Triggered when card is clicked twice
  function gameOver() {
    setGame((prevGame) => ({
      // Changes value of game.level to re-trigger useEffect
      ...prevGame,
      level: 0,
      noOfCards: 4,
    }));
    // Resets current score
    setCurrentScore(0);
  }

  function checkForWin(cards) {
    if (
      cards.every((card) => {
        return card.hasOwnProperty("isSelected") && card.isSelected;
      })
    ) {
      setGame({
        ...game,
        level: (game.level += 1),
        noOfCards: (game.noOfCards += 4),
      });
    }
  }

  /**Random change */
  return (
    <div className="App">
      <div className="scoreboard">
        <Scoreboard
          currentScore={currentScore}
          bestScore={bestScore}
          setBestScore={setBestScore}
        />
      </div>
      {spinner ? (
        <LoadingSpinner />
      ) : (
        <Level
          level={game.level}
          allCards={allCards}
          setAllCards={setAllCards}
          setCurrentScore={setCurrentScore}
          gameOver={gameOver}
          checkForWin={checkForWin}
        />
      )}
      <p>{console.table([...allCards, currentScore])}</p>
    </div>
  );
}

export default App;
