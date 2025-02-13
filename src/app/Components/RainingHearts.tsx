"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RainingHearts() {
  const [hearts, setHearts] = useState<
    { id: number; left: number; delay: number; size: number }[]
  >([]);

  useEffect(() => {
    const addHeart = () => {
      setHearts((prevHearts) => [
        ...prevHearts,
        {
          id: Math.random(), // Unique ID for each heart
          left: Math.random() * 100, // Random left position (0% to 100%)
          delay: Math.random() * 2, // Random delay (0-2 sec)
          size: Math.random() * 20 + 20, // Random size (20px to 40px)
        },
      ]);
    };

    const interval = setInterval(addHeart, 300); // Add a new heart every 0.3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute w-full h-full top-0 left-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 0, y: -50 }} // Start above the screen
          animate={{ opacity: 1, y: "100vh", rotate: 360 }} // Fall to bottom while rotating
          transition={{
            duration: 5, // Takes 5 seconds to fall
            delay: heart.delay,
            ease: "linear",
          }}
          className="absolute text-red-500"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`, // Random heart sizes
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
