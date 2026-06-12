import styles from "./TickerBar.module.css";

const TICKER_TEXT = "welcome This is hayoung jeong's portfolio";

export default function TickerBar() {
  return (
    <div className={styles.tickerBar}>
      <span className={styles.tickerInner1}>{TICKER_TEXT}</span>
      <span className={styles.tickerInner2}>{TICKER_TEXT}</span>
    </div>
  );
}
