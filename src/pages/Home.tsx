import { useEffect, useRef, useState } from "react";
import profile from "../assets/profile.jpg";
import "../styles/pages/home.css";

const titles = [
  "Coder",
  "Mathematician",
  "Nerd",
  "Rocket Scientist",
  "Volunteer",
  "Cat Lover",
];

function getDifferentIndex(current: number, length: number) {
  let next = current;
  while (next === current) {
    next = Math.floor(Math.random() * length);
  }
  return next;
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  useEffect(() => {
    const animationDuration = 800;
    const intervalDuration = 3200;

    const interval = window.setInterval(() => {
      if (isAnimatingRef.current) return;

      const current = currentIndexRef.current;
      const next = getDifferentIndex(current, titles.length-1);

      setNextIndex(next);
      setIsAnimating(true);
      isAnimatingRef.current = true;

      window.setTimeout(() => {
        setCurrentIndex(next);
        currentIndexRef.current = next;
        setIsAnimating(false);
        isAnimatingRef.current = false;
      }, animationDuration);
    }, intervalDuration);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="homeContainer">
      <div className="homeText">
        <h1 className="homeTitle">
          <span className="homeTitleStatic">I am a</span>

          <span className="slotWindow" aria-live="polite" aria-atomic="true">
            <span className={`slotReel ${isAnimating ? "isAnimating" : ""}`}>
              <span className="slotItem">{titles[currentIndex]}</span>
              <span className="slotItem">{titles[nextIndex]}</span>
            </span>
          </span>
        </h1>
      </div>

      <div className="homeImage">
        <img src={profile} alt="Profile portrait" />
      </div>
    </div>
  );
}