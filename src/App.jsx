import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './App.css';

const cardImages = [
  { src: "🍎", matched: false },
  { src: "🍌", matched: false },
  { src: "🍇", matched: false },
  { src: "🍊", matched: false },
  { src: "🍉", matched: false },
  { src: "🍒", matched: false },
  { src: "🥑", matched: false },
  { src: "🥦", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // State for Best Score (Loaded from Local Storage)
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('bestScore');
    return saved ? parseInt(saved, 10) : null;
  });

  // Audio helper triggers (using standard browser synthesized audio so you don't need asset files!)
  const playSound = (type) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'match') {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5 note
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'win') {
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffled);
    setTurns(0);
    setSeconds(0);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  // Timer & Game Win Watcher
  useEffect(() => {
    const isGameOver = cards.length > 0 && cards.every(card => card.matched);

    if (isGameOver) {
      playSound('win');
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });

      // Update Best Score if it's lower than previous score or if no score exists yet
      if (bestScore === null || turns < bestScore) {
        setBestScore(turns);
        localStorage.setItem('bestScore', turns.toString());
      }
      return;
    }

    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cards]);

  const handleChoice = (card) => {
    if (disabled || card.id === choiceOne?.id) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        playSound('match');
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  const gameWon = cards.length > 0 && cards.every(card => card.matched);

  return (
    <div className="App">
      <h1>Memory Match Game</h1>

      <div className="stats-container">
        <div className="stats">
          <p>Moves: <strong>{turns}</strong></p>
          <p>Time: <strong>{seconds}s</strong></p>
          <p>🏆 Best Score: <strong>{bestScore !== null ? `${bestScore} moves` : 'N/A'}</strong></p>
        </div>
        <button className="restart-btn" onClick={shuffleCards}>Restart Game</button>
      </div>

      {gameWon ? (
        <div className="win-screen">
          <h2>🎉 Excellent Work! 🎉</h2>
          <p>Final Time: <strong>{seconds} seconds</strong></p>
          <p>Total Moves: <strong>{turns}</strong></p>
          {bestScore === turns && <p className="new-record">🔥 New Personal Best Record! 🔥</p>}
          <button onClick={shuffleCards}>Play Again</button>
        </div>
      ) : (
        <div className="card-grid">
          {cards.map(card => {
            const isFlipped = card === choiceOne || card === choiceTwo || card.matched;

            return (
              <div
                className={`card ${isFlipped ? 'flipped' : ''} ${card.matched ? 'matched-card' : ''}`}
                key={card.id}
                onClick={() => handleChoice(card)}
              >
                <div className="card-content">
                  {isFlipped ? card.src : "?"}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;