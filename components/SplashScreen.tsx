"use client";

import React from "react";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  duration: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ duration }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Set a timeout to hide splash after a delay
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, duration); // duration

    // Cleanup function to clear timeout
    return () => {
      clearTimeout(splashTimeout);
    };
  }, [duration]);

  return (
    <div
      className={`bg-[#0f0f11] dark:bg-[#0f0f11] fixed top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-2500 ease-in-out ${
        showSplash ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ zIndex: 9999 }}
    ></div>
  );
};

export default SplashScreen;
