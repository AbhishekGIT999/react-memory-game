# 🎮 Responsive Memory Card Matching Game

A responsive, polished Memory Card Matching Game built with **React** and deployed on **Vercel**. This project was developed as a submission for the Frontend Internship assignment.

## 🚀 Live Demo & Repository
* **Live Deployment URL:** https://react-memory-game-drab.vercel.app/
* **GitHub Repository:** https://github.com/AbhishekGIT999/react-memory-game

## ✨ Features Implemented
* **Core Mechanics:** 16-card grid (8 matching pairs) with randomized shuffling on initialization and game reset.
* **Game Tracking:** Interactive turn/move counter alongside a real-time game timer.
* **Smart Choices:** Handles click-blocking while evaluating selections to prevent rapid-click exploit bugs.
* **Polished UX:** Integrated dynamic web-synthesized audio effects for matches and wins.
* **Winning Celebration:** Triggered a canvas-confetti particle explosion overlay when all pairs match.
* **Bonus - Local Storage:** Tracks and saves your personal best score (lowest moves) locally.
* **Fully Responsive:** Beautifully adapts to mobile views, tablets, and wide desktop layout screens using CSS Grid and Flexbox.

## 🛠️ Tech Stack & Architecture
* **Frontend Library:** React (Functional components, hooks architecture)
* **Build Tool:** Vite
* **State Management:** Hooks (`useState`, `useEffect`)
* **Styling:** Custom CSS3 with custom cubic-bezier flip transitions
* **Third-Party Integration:** `canvas-confetti` for celebratory effects

## 📦 Local Setup Instructions
To get this project running locally on your computer:

1. Clone the repository:
```bash
git clone [https://github.com/AbhishekGIT999/react-memory-game.git](https://github.com/AbhishekGIT999/react-memory-game.git)

2. **Navigate into the project folder:**
   ```bash
   cd react-memory-game