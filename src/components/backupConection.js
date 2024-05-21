import React, { useState, useEffect, useRef } from "react";
import { StreamServiceClient } from "./generated/data_grpc_web_pb";
import { Request } from "./generated/data_pb";
import styles from "./ConectionServer.module.scss";
const client = new StreamServiceClient("http://147.135.48.97:5233");

function ConectionServer() {
  const [responseData, setResponseData] = useState(null);
  const streamRef = useRef(null);
  useEffect(() => {
    const connectStream = () => {
      const request = new Request();
      request.setId(1);

      streamRef.current = client.fetchResponse(request);
      const stream = streamRef.current;

      const onData = (response) => {
        const jsonData = JSON.parse(response.getResult());
        setResponseData(jsonData);
        console.log(jsonData, "data");
      };

      const onEnd = () => {
        console.log("Finished");
        setTimeout(connectStream, 1000);
      };

      const onError = (err) => {
        console.error("Error: ", err);

        setTimeout(connectStream, 2000);
      };

      const onStatus = (status) => {
        console.log("Status: ", status);
        if (status?.code === 2) {
          setTimeout(connectStream, 1000);
        }
      };

      stream.on("data", onData);
      stream.on("end", onEnd);
      stream.on("error", onError);
      stream.on("status", onStatus);

      return () => {
        stream.off("data", onData);
        stream.off("end", onEnd);
        stream.off("error", onError);
        stream.off("status", onStatus);
        stream.cancel();
      };
    };

    const streamConnectionTimeout = setTimeout(() => {
      if (streamRef.current && streamRef.current.readyState === 0) {
        clearTimeout(streamConnectionTimeout);
        connectStream();
      }
    }, 5000);

    connectStream();
  }, []);
  const renderCard = () => {
    if (!responseData) return null;

    const { Event } = responseData;
    // if (
    //   Event === "DeviceStateChange" &&
    //   (Device === "PJSIP/GW1" ||
    //     Device === "PJSIP/BW2" ||
    //     Device === "PJSIP/BW1" ||
    //     Device === "PJSIP/GW2")
    // ) {
    //   return null;
    // }
    let keysToDisplay = [];
    if (Event === "DialEnd" || Event === "DialBegin") {
      keysToDisplay = [
        "Event",
        "CallerIDName",
        "CallerIDNum",
        "Channel",
        "DestCallerIDName",
        "DestCallerIDNum",
        "DestChannel",
        "DialStatus",
      ];
    } else {
      keysToDisplay = Object.keys(responseData);
    }

    return (
      <div className={styles.card}>
        <div className={styles.card_body}>
          <ul className={styles.list_group}>
            {keysToDisplay.map((key) => (
              <li key={key}>
                <strong>{key}:</strong>{" "}
                {key === "DialStatus" || key === "State" ? (
                  <span
                    style={{
                      backgroundColor: `${
                        responseData[key] === "ANSWER" ? "green" : "red"
                      }
                      `,
                      borderRadius: "4px",
                      color: "#fff",
                      padding: "4px",
                    }}
                  >
                    {responseData[key]}
                  </span>
                ) : (
                  responseData[key]
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  return (
    <div>
      {renderCard()}
      {!responseData && (
        <div className={styles.waiting}>waiting for call...</div>
      )}
    </div>
  );
}

export default ConectionServer;
