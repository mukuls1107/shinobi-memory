import React, { useState, useEffect } from "react";
import "./App.css";
import CreateChakraParticles from "./Particle";
import loadData from "./Utils/getImages.js";

const chakraSymbols = [
  {
    name: "Naruto",
    symbol:
      "https://static.wikia.nocookie.net/naruto/images/7/7d/Naruto_Part_II.png",
  },
  {
    name: "Sasuke",
    symbol:
      "https://static.wikia.nocookie.net/naruto/images/1/13/Sasuke_Part_2.png",
  },
  {
    name: "Madara",
    symbol: "https://static.wikia.nocookie.net/naruto/images/f/fd/Madara.png",
  },
  {
    name: "Kakashi",
    symbol:
      "https://static.wikia.nocookie.net/naruto/images/2/25/Kakashi_Part_III.png",
  },
  {
    name: "Orochimaru",
    symbol:
      "https://static.wikia.nocookie.net/naruto/images/b/be/Orochimaru_Part_III.png",
  },
  {
    name: "Obito",
    symbol: "https://static.wikia.nocookie.net/naruto/images/3/3c/Obito.png",
  },
  {
    name: "Gaara",
    symbol:
      "https://static.wikia.nocookie.net/naruto/images/0/0f/Gaara_Part_II.png",
  },
  {
    name: "Kabuto",
    symbol:
      "https://static.wikia.nocookie.net/naruto/images/0/0b/Kabuto_Part_II.png",
  },
  {
    name: "Konohamaru",
    symbol:
      "https://static.wikia.nocookie.net/naruto/images/3/37/Konohamaru_Sarutobi.png",
  },
  {
    name: "Might Guy",
    symbol:
      "https://static.wikia.nocookie.net/naruto/images/b/b3/Might_Guy_Part_III.png",
  },
];

const ninjaRanks = ["Genin", "Chunin", "Jonin", "ANBU", "Kage"];

export default function NarutoMemoryGame() {
  const [idArray, setIdArray] = useState([]);
  const [displayText, setDisplayText] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [ninjaRank, setNinjaRank] = useState(ninjaRanks[0]);
  const [narutoMood, setNarutoMood] = useState("normal");
  const [won, setWon] = useState(false);
  const [chakraPositions, setChakraPositions] = useState([
    ...Array(chakraSymbols.length).keys(),
  ]);

  useEffect(() => {
    updateNinjaRank();
  }, [score]);

  function addInArray(id) {
    if (gameOver || won) return;
  
    if (idArray.includes(id)) {
      setGameOver(true);
      setDisplayText(`Game Over! Your final score is ${idArray.length}.`);
      setNarutoMood("defeated");
    } else if (idArray.length + 1 === chakraSymbols.length) { // Check if all symbols are matched
      setIdArray((prevArray) => [...prevArray, id]);
      setWon(true);
      setDisplayText(`Congrats! You Win 🎉`);
      setNarutoMood("happy");
    } else {
      setIdArray((prevArray) => [...prevArray, id]);
      setScore(idArray.length + 1);
      setNarutoMood("happy");
      shufflePositions();
    }
  }

  function shufflePositions() {
    const shuffled = [...chakraPositions].sort(() => Math.random() - 0.5);
    setChakraPositions(shuffled);
  }

  function displayAll() {
    if (!gameOver && !won) {
      setDisplayText(
        idArray.map((id) => chakraSymbols[id - 1].name).join(", ")
      );
    }
  }

  function updateNinjaRank() {
    setNinjaRank(
      ninjaRanks[Math.min(Math.floor(score / 3), ninjaRanks.length - 1)]
    );
  }
  function resetGame() {
    setIdArray([]);
    setDisplayText("");
    setGameOver(false);
    setWon(false);
    setScore(0);
    setNarutoMood("normal");
    shufflePositions(); // Reset the positions as well
  }

  return (
    <div className="game-container" onLoad={loadData("characters")}>
      <CreateChakraParticles />
      <div className="game-content">
        <h1 className="game-title">Shinobi Memory Challenge</h1>

        <div className="chakra-seal">
          {chakraPositions.map((pos, index) => (
            <button
              key={index}
              className={`chakra-button ${gameOver || won ? "disabled" : ""}`}
              onClick={() => addInArray(pos + 1)}
              disabled={gameOver || won}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={chakraSymbols[pos].symbol}
                alt={chakraSymbols[pos].name}
                className="chakra-image"
              />
            </button>
          ))}
        </div>

        <div className="ninja-info">
          <div className={`naruto-chibi ${narutoMood}`}></div>
          <div className="ninja-rank">
            <p>Ninja Rank: {ninjaRank}</p>
            <div className="rank-progress">
              <div
                className="rank-bar"
                style={{ width: `${((score % 3) / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {(gameOver || won) && (
        <div className="game-over-overlay">
          <div className="game-over-content">
            <div
              className={`chibi-animation ${won ? "won" : "lost"}`}
            ></div>
            <h2 className="game-over-title">
              {won ? "You Win!" : "Game Over!"}
            </h2>
            <p className="game-over-score">Your final score: {score + 1}</p>
            <button className="play-again-button" onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}