import React from "react";
import styles from "./index.module.scss";
function PanelLayout({ children }) {
  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <ul>
          <li>
            <img src="/icons/sidebar/dashboard.svg" alt="1" />
          </li>
          <li>
            <img src="/icons/sidebar/call_out.svg" alt="2" />
          </li>
          <li>
            <img src="/icons/sidebar/call_to_call.svg" alt="call_to_call" />
          </li>
          <li>
            <img src="/icons/sidebar/call_message.svg" alt="call_message" />
          </li>
          <li>
            <img src="/icons/sidebar/call_book.svg" alt="call_book" />
          </li>
          <li>
            <img src="/icons/sidebar/visper.svg" alt="visper" />
          </li>
          <li>
            <img src="/icons/sidebar/visber_talk.svg" alt="visber_talk" />
          </li>
          <li>
            <img src="/icons/sidebar/phone_out.svg" alt="phone_out" />
          </li>
          <li>
            <img src="/icons/sidebar/phone_in.svg" alt="phone_in" />
          </li>{" "}
          <li>
            <img src="/icons/sidebar/record.svg" alt="record" />
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
}

export default PanelLayout;
