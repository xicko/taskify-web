import Image from "next/image";
import React, { useState, useEffect } from "react";

interface ScreenshotsProps {
  classes: string;
}

const screenshots = [
  "/compressed_cropped_light/lightcropped3.webp",
  "/compressed_cropped_light/lightcropped4.webp",
  "/compressed_cropped_light/lightcropped5.webp",
  "/compressed_cropped_light/lightcropped6.webp",
  "/compressed_cropped_light/lightcropped7.webp",
  "/compressed_cropped_light/lightcropped8.webp",
  "/compressed_cropped_light/lightcropped9.webp",
  "/compressed_cropped_light/lightcropped10.webp",
  "/compressed_cropped_light/lightcropped11.webp",
  "/compressed_cropped_light/lightcropped12.webp",
];

const Screenshots: React.FC<ScreenshotsProps> = ({ classes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    // Show the placeholder for the first X seconds
    const placeholderTimer = setTimeout(() => {
      setShowPlaceholder(false);
    }, 1400);

    // Change images every 2750ms
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
    }, 2750);

    return () => {
      clearTimeout(placeholderTimer);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={`${classes} relative`}>
      <Image
        className={`${classes} absolute transition-opacity ease-in duration-500 ${
          showPlaceholder ? "opacity-100" : "opacity-0"
        }`}
        draggable={false}
        src="/ssplaceholder.webp"
        alt="Placeholder"
        fetchPriority="high"
        width="748"
        height="1542"
      />

      <Image
        className={` transition-opacity ease-in duration-500 ${
          showPlaceholder ? "opacity-0" : "opacity-100"
        }`}
        draggable={false}
        src={screenshots[currentIndex]}
        alt="Screenshot"
        fetchPriority="high"
        width="748"
        height="1542"
      />
    </div>
  );
};

export default Screenshots;
