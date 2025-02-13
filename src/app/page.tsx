"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const [hoverCount, setHoverCount] = useState(0);
  const [position, setPosition] = useState({ top: "40%", left: "46%" });
  const [isAttracted, setIsAttracted] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false); // Track waiting state
  const prompts = [
    "Click me! 🥰",
    "Oops, Better be quick! 🤭",
    "Too slow again 🥱",
    "Haha can't catch me boo 🌚",
    "Be faster gadhi 😏",
    "Try again 😝",
    "Haha give up already 🙄",
    "Nopeeeee 🌚",
    "Wait what? 😨",
    "You're way too attractive 🥺",
  ];
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const router = useRouter();

  useEffect(() => {
    if (hoverCount === 8 && !isWaiting) {
      setIsWaiting(true); // Start waiting phase
      setTimeout(() => {
        setIsAttracted(true);
        setHoverCount(9);
      }, 3000); // Wait for 3 seconds before attraction
    }
  }, [hoverCount, isWaiting]);

  const handleClick = () => {
    if (isAttracted) {
      router.push("/Pacman");  
    }
  };

  const playBoingSound = () => {
    const boing = new Audio("/boing.mp3");
    boing.play();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });

    if (isAttracted) {
      setPosition({ top: `${e.clientY - 20}px`, left: `${e.clientX - 50}px` });
    }
  };

  const handleHover = () => {
    if (!isAttracted && !isWaiting) {
      playBoingSound();
      setHoverCount((prev) => prev + 1);
      setPosition({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
      });
    }
  };

  return (
    <div
      className={`w-screen h-screen flex bg-background justify-center items-center ${
        isAttracted ? "cursor-none" : ""
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* Custom Magnet Cursor */}
      {isWaiting && (
        <div
          className="absolute w-10 h-10 pointer-events-none transition-transform transform -translate-x-1/2 -translate-y-1/2"
          style={{ top: cursorPos.y, left: cursorPos.x }}
        >
          <img src="/magnet.png" alt="Magnet Cursor" className="w-full h-full" />
        </div>
      )}

      {/* Moving Button */}
      <button
        style={{ position: "absolute", top: position.top, left: position.left }}
        onMouseEnter={handleHover}
        onClick={handleClick}
        className={`font-bold text-2xl text-purple transition-all flex flex-col items-center justify-center ease-in ${isAttracted ? "duration-500" : "duration-300"}`}
      >
        <Image src="/heart.png" alt="heart" width={100} height={100} />
        <h1>{prompts[Math.min(hoverCount, prompts.length - 1)]}</h1>
      </button>
    </div>
  );
}
