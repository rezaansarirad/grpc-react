import React, { useState } from "react";
import styles from "./PanelLayout.module.scss";
function PanelLayout({ children }) {
  const [activeList, setActiveList] = useState("Queues");
  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <ul>
          <li
            className={`${activeList === "Queues" ? styles.activeItem : ""}`}
            onClick={() => setActiveList("Queues")}
          >
            <h4>Queues</h4>
          </li>
          <li
            className={`${
              activeList === "Queue Call" ? styles.activeItem : ""
            }`}
            onClick={() => setActiveList("Queue Call")}
          >
            <h4>Queue Call</h4>
          </li>
          <li
            className={`${activeList === "Trunks" ? styles.activeItem : ""}`}
            onClick={() => setActiveList("Trunks")}
          >
            <h4>Trunks</h4>
          </li>
          <li
            className={`${
              activeList === "Park Slots" ? styles.activeItem : ""
            }`}
            onClick={() => setActiveList("Park Slots")}
          >
            <h4>Park Slots</h4>
          </li>
          <li
            className={`${
              activeList === "Conferences" ? styles.activeItem : ""
            }`}
            onClick={() => setActiveList("Conferences")}
          >
            <h4>Conferences</h4>
          </li>
        </ul>
      </div>
      <div className={styles.content_holder}>
        <div className={styles.titr}>
          <h4>Extensions</h4>
        </div>

        {children}
      </div>
      <div className={styles.menu_holder}>
        <div className={styles.menu_Items}>
          <ul>
            <li>
              <img src="/icons/menu/dashboard.svg" alt="dashboard" />
            </li>
            <li>
              <img src="/icons/menu/email.svg" alt="email" />
            </li>
            <li>
              <img src="/icons/menu/setting.svg" alt="setting" />
            </li>
            <li>
              <img src="/icons/menu/person.svg" alt="person" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PanelLayout;
