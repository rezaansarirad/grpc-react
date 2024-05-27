import React, { useState, useEffect, memo } from "react";
import styles from "./ListOfExtension.module.scss";

function ListOfExtension({ extensionList, filteredData }) {
  const [updatedExtensionList, setUpdatedExtensionList] =
    useState(extensionList);

  useEffect(() => {
    if (filteredData) {
      console.log(filteredData, "filteredData");
      const {
        Event,
        Device,
        State,
        Channel,
        DestChannel,
        DialStatus,
        CallerIDName,
        DestCallerIDName,
      } = filteredData;

      if (Event === "DeviceStateChange" && Device) {
        const ChannelExtension = Device.split("/")[1];

        setUpdatedExtensionList((prevList) =>
          prevList.map((item) => {
            if (item.extension === ChannelExtension) {
              if (State === "NOT_INUSE") {
                return { ...item, status: "Not_in_use" };
              } else {
                return { ...item, status: State };
              }
            }
            return item;
          })
        );
      }

      if (Event === "DialEnd" && DialStatus === "ANSWER") {
        let Extension1, Extension2;

        if (Channel) {
          Extension1 = Channel.split("/")[1].split("-")[0];
        }
        if (DestChannel) {
          Extension2 = DestChannel.split("/")[1].split("-")[0];
        }

        if (Extension1 || Extension2) {
          setUpdatedExtensionList((prevList) =>
            prevList.map((item) => {
              if (item.extension === Extension1) {
                return {
                  ...item,
                  status: "IN_CALL",
                  callWith: DestCallerIDName,
                };
              } else if (item.extension === Extension2) {
                return { ...item, status: "IN_CALL", callWith: CallerIDName };
              }
              return item;
            })
          );
        }
      }
    }
  }, [filteredData]);

  return (
    <div className={styles.card}>
      <ul>
        {updatedExtensionList.map((item) => {
          let itemClass = "";

          if (item.status === "Unavailable") {
            itemClass = styles.unavailable;
          } else if (item.status === "Not_in_use") {
            itemClass = styles.notInUse;
          } else if (item.status === "INUSE") {
            itemClass = styles.inUse;
          } else if (item.status === "RINGING") {
            itemClass = styles.ringing;
          } else if (item.status === "IN_CALL") {
            itemClass = styles.inCall;
          }

          return (
            <li key={item.extension} className={itemClass}>
              <span className={styles.extension}>{item.extension}</span>
              <h3>{item.name}</h3>
              <p>Status: {item.status}</p>
              {item.status === "IN_CALL" && item.callWith && (
                <p>Call with: {item.callWith}</p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default memo(ListOfExtension);
