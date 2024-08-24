import React, { useState, useEffect } from "react";
import "./App.css";

const chakraSymbols = [
  { name: "Fire", symbol: "🔥" },
  { name: "Water", symbol: "💧" },
  { name: "Earth", symbol: "🏔️" },
  { name: "Wind", symbol: "🌪️" },
  { name: "Lightning", symbol: "⚡" },
  { name: "Wood", symbol: "🌳" },
  { name: "Lava", symbol: "🌋" },
  { name: "Ice", symbol: "❄️" },
  { name: "Storm", symbol: "🌩️" },
  { name: "Boil", symbol: "♨️" },
];

const ninjaRanks = ["Genin", "Chunin", "Jonin", "ANBU", "Kage"];

export default function NarutoMemoryGame() {
  const [idArray, setIdArray] = useState([]);
  const [displayText, setDisplayText] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [ninjaRank, setNinjaRank] = useState(ninjaRanks[0]);
  const [narutoMood, setNarutoMood] = useState("normal");
  const [won, setWon] = useState(false); // New state to track if the user has won

  useEffect(() => {
    updateNinjaRank();
  }, [score]);


  function createChakraParticles() {
    const container = document.createElement("div");
    container.className = "chakra-particles";
    document.body.appendChild(container);

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numParticles = 50;

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("span");
      particle.className = "chakra-particle";
      particle.textContent =
        letters[Math.floor(Math.random() * letters.length)];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${15 + Math.random() * 15}s`;
      particle.style.animationDelay = `${-Math.random() * 20}s`;
      container.appendChild(particle);
    }
  }



  function addInArray(id) {
    if (gameOver || won) return;

    if (idArray.includes(id)) {
      setGameOver(true);
      setDisplayText(`Game Over! Your final score is ${idArray.length}.`);
      setNarutoMood("defeated");
    } else if (idArray.length === chakraSymbols.length - 1) {
      // User clicked all the symbols correctly
      setIdArray((prevArray) => [...prevArray, id]);
      setWon(true);
      setDisplayText(`Congrats! You Win 🎉`);
      setNarutoMood("happy");
    } else {
      setIdArray((prevArray) => [...prevArray, id]);
      setScore(idArray.length + 1);
      setNarutoMood("happy");
    }
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
    setWon(false); // Reset the win state
    setScore(0);
    setNarutoMood("normal");
  }


  return (
    <div className="game-container" onLoad={createChakraParticles()}>
      <div className="game-content">
        <h1 className="game-title">Shinobi Memory Challenge</h1>

        <div className="chakra-seal">
          {chakraSymbols.map((chakra, index) => (
            <button
              key={index}
              className={`chakra-button ${gameOver || won ? "disabled" : ""}`}
              onClick={() => addInArray(index + 1)}
              disabled={gameOver || won}
            >
              {chakra.symbol}
            </button>
          ))}
        </div>
        {/* 
        <div className="game-controls">
          <button className="jutsu-button" onClick={displayAll} disabled={gameOver || won}>
            Reveal Jutsu
          </button>
        </div> */}

        {/* <div className="scroll-message">
          <p>{displayText}</p>
        </div> */}

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
