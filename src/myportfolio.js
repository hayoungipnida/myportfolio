import styles from "./myportfolio.module.css";
import TickerBar from "./components/TickerBar";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WorksSection from "./components/WorksSection";

export default function MyPortfolio() {
  return (
    <div className={styles.root}>
      <TickerBar />
      <Nav />
      <Hero />
      <div className={styles.divider} />
      <WorksSection />
    </div>
  );
}
