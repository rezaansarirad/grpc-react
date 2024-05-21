import React, { memo } from "react";
import styles from "./ListOfExtension.module.scss";

function ListOfExtension({ extensionList, filteredData }) {
  console.log(filteredData, "filteredData");

  let channelExtension = null;
  let destChannelExtension = null;

  if (
    filteredData &&
    filteredData.Event !== "DeviceStateChange" &&
    filteredData.Event !== "DialState"
  ) {
    const { Channel, DestChannel } = filteredData;

    if (Channel) {
      channelExtension = Channel.split("/")[1].split("-")[0];
    }
    if (DestChannel) {
      destChannelExtension = DestChannel.split("/")[1].split("-")[0];
    }
  }

  return (
    <div className={styles.card}>
      <h4>Extension List:</h4>
      <ul>
        {extensionList.map((item) => {
          let itemClass = styles.listItem;

          if (item.status === "Unavailable") {
            itemClass += ` ${styles.disabled}`;
          } else if (item.status === "Not_in_use") {
            itemClass += ` ${styles.notInUse}`;
          }

          if (
            item.extension === channelExtension ||
            item.extension === destChannelExtension
          ) {
            itemClass += ` ${styles.highlight}`;
          }

          return (
            <li key={item.extension} className={itemClass}>
              <div>
                <h3>Extension: {item.extension}</h3>
                <p>Status: {item.status}</p>
                {(item.extension === channelExtension ||
                  item.extension === destChannelExtension) && (
                  <div className={styles.iconHolder}>
                    <img src="/call.svg" alt="Call Icon" />
                    {item.extension === channelExtension && (
                      <span>{filteredData.DestCallerIDName}</span>
                    )}
                    {item.extension === destChannelExtension && (
                      <span>{filteredData.DestConnectedLineName}</span>
                    )}
                  </div>
                )}
              </div>
              {item.extension === channelExtension &&
                filteredData.ChannelStateDesc === "Ring" && (
                  <div className={styles.iconHolder}>
                    <img
                      src="/call.svg"
                      className={styles.callIcon}
                      alt="Call Icon"
                    />
                    <span> Ring ...</span>
                  </div>
                )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(ListOfExtension);
