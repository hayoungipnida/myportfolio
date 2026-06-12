import styles from "./Nav.module.css";


export default function Nav() {
  return (
    <nav className={styles.nav}>
      <a href="#" className={styles.navLink}>works</a>
      <a href="#" className={styles.navLink}>skill</a>
      <a href="#" className={styles.navLink}>contact</a>
    </nav>
  );
}
