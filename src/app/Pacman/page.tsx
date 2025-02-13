"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const gridSize = 10; // 10x10 Grid
const pacmanStart = { x: 1, y: 1 }; // Pac-Man Start Position
const heartCount = 20; // More Hearts!
const barriers = [
  { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 },
  { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 },
  { x: 2, y: 7 }, { x: 7, y: 7 },
];

// Start positions for 2 ghosts
const ghostStartPositions = [{ x: 8, y: 8 }, { x: 1, y: 8 }];



export default function Book() {
  const [pacman, setPacman] = useState(pacmanStart);
  const [direction, setDirection] = useState(""); // Default direction
  const [hearts, setHearts] = useState<{ x: number; y: number }[]>([]);
  const [ghosts, setGhosts] = useState(ghostStartPositions);
  const [score, setScore] = useState(0);
  const router = useRouter();


  useEffect(() => {
    // Generate random hearts avoiding barriers
    const generateHearts = () => {
      let newHearts = [];
      while (newHearts.length < heartCount) {
        let heart = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize),
        };
        if (
          !barriers.some((b) => b.x === heart.x && b.y === heart.y) &&
          !(heart.x === pacmanStart.x && heart.y === pacmanStart.y)
        ) {
          newHearts.push(heart);
        }
      }
      setHearts(newHearts);
    };
    generateHearts();
  }, []);

  useEffect(() => {
    if (hearts.length === 0 && score > 0) {
        alert(`Congratulations Boo! You Won all my love! Final Score: ${score}`);
        setTimeout(() => {
            router.push("/Book");
            }, 2000);
    }
  }, [hearts, score, router]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        setDirection(e.key); // Change direction
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const movePacman = () => {
      setPacman((prev) => {
        let newX = prev.x, newY = prev.y;

        if (direction === "ArrowUp" && prev.y > 0) newY--;
        if (direction === "ArrowDown" && prev.y < gridSize - 1) newY++;
        if (direction === "ArrowLeft" && prev.x > 0) newX--;
        if (direction === "ArrowRight" && prev.x < gridSize - 1) newX++;

        // Prevent Pac-Man from moving into barriers
        if (barriers.some((b) => b.x === newX && b.y === newY)) return prev;

        return { x: newX, y: newY };
      });
    };

    const pacmanInterval = setInterval(movePacman, 300); // Move every 300ms
    return () => clearInterval(pacmanInterval);
  }, [direction]);

  useEffect(() => {
    // Move ghosts towards Pac-Man
    const moveGhosts = () => {
      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost) => {
          let newX = ghost.x, newY = ghost.y;

          if (pacman.x > ghost.x && ghost.x < gridSize - 1) newX++;
          else if (pacman.x < ghost.x && ghost.x > 0) newX--;

          if (pacman.y > ghost.y && ghost.y < gridSize - 1) newY++;
          else if (pacman.y < ghost.y && ghost.y > 0) newY--;

          if (barriers.some((b) => b.x === newX && b.y === newY)) return ghost;

          return { x: newX, y: newY };
        })
      );
    };

    const ghostInterval = setInterval(moveGhosts, 500);
    return () => clearInterval(ghostInterval);
  }, [pacman]);

  useEffect(() => {
    // Check if Pac-Man eats a heart
    setHearts((prevHearts) => {
      return prevHearts.filter((heart) => {
        if (heart.x === pacman.x && heart.y === pacman.y) {
          setScore((prev) => prev + 10);
          return false;
        }
        return true;
      });
    });

    // Check if a ghost catches Pac-Man (Game Over)
    if (ghosts.some((ghost) => ghost.x === pacman.x && ghost.y === pacman.y)) {
      alert(`Game Over! Final Score: ${score}`);
      setPacman(pacmanStart);
      setGhosts(ghostStartPositions);
      setScore(0);
      setDirection("ArrowRight"); // Reset direction
    }
  }, [pacman]);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-yellow-300">
      <h1 className="text-4xl font-bold">Collect all my love 🥰</h1>
      <p className="text-lg mb-2">Use Arrow Keys to Change Direction</p>
      <p className="text-lg mb-4">Score: {score}</p>

      {/* Pac-Man Grid */}
      <div
        className="grid border-2 border-yellow-500"
        style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, 30px)` }}
      >
        {[...Array(gridSize * gridSize)].map((_, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          const isPacman = pacman.x === x && pacman.y === y;
          const isHeart = hearts.some((heart) => heart.x === x && heart.y === y);
          const isGhost = ghosts.some((ghost) => ghost.x === x && ghost.y === y);
          const isBarrier = barriers.some((b) => b.x === x && b.y === y);

          return (
            <div
              key={index}
              className="w-8 h-8 flex items-center justify-center border border-gray-700"
            >
              {isPacman ? (
                <span className="text-yellow-500 text-xl">🟡</span> // Pac-Man
              ) : isHeart ? (
                <span className="text-red-500 text-lg">❤️</span> // Hearts
              ) : isGhost ? (
                <span className="text-blue-400 text-xl">👻</span> // Moving Ghosts
              ) : isBarrier ? (
                <span className="text-gray-500 text-xl">⬛</span> // Barriers (Walls)
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
