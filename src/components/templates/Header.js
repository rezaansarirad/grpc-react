import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.headerHolder}>
      <img src="/logo.svg" alt="logo" />
    </header>
  );
}

export default Header;
