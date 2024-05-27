import { useEffect, useState } from "react";
import styles from "./Header.module.scss";

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <header className={styles.headerHolder}>
      <img className={styles.logo} src="/logo.svg" alt="logo" />
      <div className={styles.icon_holder}>
        <span className={styles.showDate}>
          {currentTime.toLocaleTimeString()}
        </span>
        <img src="/icons/header/phone-call.svg" alt="phone" />
        <img src="/icons/header/notificaiton.svg" alt="notif" />
        <img src="/icons/header/person.svg" alt="person" />
      </div>
    </header>
  );
}

export default Header;
