import { useState, useEffect } from "react";
import styles from "./Hero.module.css";
 

const DECOR_POSITIONS = [
  { top: "8%", left: "6%", delay: 1000 },
  { top: "10%", left: "85%", delay: 2200 },
  { top: "55%", left: "90%", delay: 3400 },
  { top: "65%", left: "62%", delay: 4600 },
  { top: "75%", left: "10%", delay: 5800 },
  { top: "50%", left: "50%", delay: 7000 },
];
 
export default function Hero() {
  const [expandedHero, setExpandedHero] = useState(false);
  const [visibleDecor, setVisibleDecor] = useState([]);
 
  // Scroll-driven expansion of "portfolio"
  useEffect(() => {
    const handleScroll = () => {
      setExpandedHero(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  // Staggered fade-in of background "HA0HA0" decorations
  useEffect(() => {
    const timers = DECOR_POSITIONS.map((_, i) =>
      setTimeout(() => {
        setVisibleDecor((prev) => [...prev, i]);
      }, DECOR_POSITIONS[i].delay)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);
 
  return (
    <section className={styles.hero}>
      {DECOR_POSITIONS.map((pos, i) => (
        <span
          key={i}
          className={`${styles.decor} ${visibleDecor.includes(i) ? styles.decorVisible : ""}`}
          style={{ top: pos.top, left: pos.left }}
        >
          HA0HA0
        </span>
      ))}
 
      <div className={styles.heroContent}>
        <div className={styles.nameBlock}>
          <span className={styles.heroLine}>Hayoung</span>
          <span className={styles.heroLine}>Jeong 's</span>
        </div>
        <span
          className={`${styles.portfolioWord} ${
            expandedHero ? styles.portfolioWordExpanded : ""
          }`}
          onClick={() => setExpandedHero((v) => !v)}
        >
          portfolio
        </span>
      </div>
      <div className={styles.scrollHint}>scroll ↓</div>
    </section>
  );
}
 