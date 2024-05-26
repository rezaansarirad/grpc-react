import React, { memo, useState, useEffect } from "react";
import styles from "./ListOfExtension.module.scss";

function ListOfExtension({ extensionList, filteredData }) {
  const [currentChannelExtension, setCurrentChannelExtension] = useState(null);
  const [currentDestChannelExtension, setCurrentDestChannelExtension] =
    useState(null);
  const [currentStateExtension, setCurrentStateExtension] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [dialStatus, setDialStatus] = useState(null);

  useEffect(() => {
    if (filteredData) {
      const { Event } = filteredData;
      console.log(filteredData);
      setCurrentEvent(Event);

      if (Event === "DeviceStateChange") {
        const { Device, State } = filteredData;
        if (Device) {
          setCurrentChannelExtension(Device.split("/")[1]);
        }
        if (State) {
          setCurrentStateExtension(State);
        }
      } else if (Event === "DialBegin") {
        const { Channel, DestChannel } = filteredData;
        if (Channel) {
          setCurrentChannelExtension(Channel.split("/")[1].split("-")[0]);
        }
        if (DestChannel) {
          setCurrentDestChannelExtension(
            DestChannel.split("/")[1].split("-")[0]
          );
        }
      } else if (Event === "DialEnd") {
        const { Channel, DestChannel, DialStatus } = filteredData;
        setDialStatus(DialStatus);
        if (Channel) {
          setCurrentChannelExtension(Channel.split("/")[1].split("-")[0]);
        }
        if (DestChannel) {
          setCurrentDestChannelExtension(
            DestChannel.split("/")[1].split("-")[0]
          );
        }
      } else if (Event === "DialState") {
        const { Channel, DialStatus, ChannelStateDesc } = filteredData;
        if (DialStatus === "RINGING" || ChannelStateDesc === "Ring") {
          if (Channel) {
            setCurrentChannelExtension(Channel.split("/")[1].split("-")[0]);
            setDialStatus(DialStatus || ChannelStateDesc);
          }
        }
      }
    }
  }, [filteredData]);

  return (
    <div className={styles.card}>
      <h4>Extension List:</h4>
      <ul>
        {extensionList.map((item) => {
          let itemClassName = styles.listItem;
          let itemStatus = item.status;
          let itemBackground = "";

          if (
            currentEvent === "DeviceStateChange" &&
            item.extension === currentChannelExtension
          ) {
            itemStatus = currentStateExtension;
            itemBackground = styles.changing; // Yellow background for changing status
            if (currentStateExtension === "NOT_INUSE") {
              itemBackground = styles.notInUse; // Green background for NOT_INUSE state
            }
          }

          if (itemStatus === "Unavailable") {
            itemClassName += ` ${styles.disabled}`;
          } else if (itemStatus === "Not_in_use") {
            itemClassName += ` ${styles.notInUse}`;
          }

          if (
            currentEvent === "DialBegin" &&
            (item.extension === currentChannelExtension ||
              item.extension === currentDestChannelExtension)
          ) {
            itemClassName += ` ${styles.highlight}`;
          }

          if (
            currentEvent === "DialEnd" &&
            dialStatus === "ANSWER" &&
            (item.extension === currentChannelExtension ||
              item.extension === currentDestChannelExtension)
          ) {
            itemClassName += ` ${styles.highlight}`;
            itemStatus = dialStatus;
          }

          return (
            <li
              key={item.extension}
              className={`${itemClassName} ${itemBackground}`}
            >
              <h3>
                {item.name}-{item.extension}
              </h3>
              <p>Status: {itemStatus}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(ListOfExtension);
