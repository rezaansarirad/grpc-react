import React, { useState, useEffect, useRef } from "react";
import { StreamServiceClient } from "./generated/data_grpc_web_pb";
import { Request } from "./generated/data_pb";
import styles from "./ConectionServer.module.scss";
import ListOfExtension from "./ListOfExtension";
const client = new StreamServiceClient("http://officepbx.cfbtel.us:5233");

function ConectionServer() {
  const [ExtensionList, setExtensionList] = useState(null);
  const [responseData, setResponseData] = useState(null);
  // const [filteredData, setFilteredData] = useState(null);
  const streamRef = useRef(null);
  useEffect(() => {
    const connectStream = () => {
      const request = new Request();
      request.setId(1);

      streamRef.current = client.fetchResponse(request);
      const stream = streamRef.current;

      const onData = (response) => {
        const jsonData = JSON.parse(response.getResult());
        if (jsonData) {
          setResponseData(jsonData);
        }
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
    const getExtensionList = () => {
      const request = new Request();
      request.setId(1);

      client.fetchExtensions(request, {}, (error, response) => {
        if (error) {
          console.error(error.message);
        } else {
          const jsonData = JSON.parse(response.getResult());
          const extensionArray = jsonData;

          setExtensionList(extensionArray);
        }
      });

      return () => {};
    };

    getExtensionList();
    connectStream();
  }, []);

  // useEffect(() => {}, []);
  // const renderCard = () => {
  //   if (!responseData) return null;

  //   const { Event } = responseData;
  //   if (
  //     Event === "DeviceStateChange" &&
  //     (Device === "PJSIP/GW1" ||
  //       Device === "PJSIP/BW2" ||
  //       Device === "PJSIP/BW1" ||
  //       Device === "PJSIP/GW2")
  //   ) {
  //     return null;
  //   }
  //   let keysToDisplay = [];
  //   if (Event === "DialEnd" || Event === "DialBegin") {
  //     keysToDisplay = [
  //       "Event",
  //       "CallerIDName",
  //       "CallerIDNum",
  //       "Channel",
  //       "ChannelStateDesc",
  //       "DestCallerIDName",
  //       "DestCallerIDNum",
  //       "DestChannel",
  //       "DialStatus",
  //     ];
  //   } else {
  //     return null;
  //   }
  //   const filtered = keysToDisplay.reduce((acc, key) => {
  //     if (responseData.hasOwnProperty(key)) {
  //       acc[key] = responseData[key];
  //     }
  //     return acc;
  //   }, {});

  //   setFilteredData(filtered);
  // };

  return (
    <div>
      {/* {renderCard()} */}
      {!ExtensionList && (
        <div className={styles.waiting}>waiting for fetch...</div>
      )}

      {ExtensionList && (
        <ListOfExtension
          extensionList={ExtensionList}
          filteredData={responseData}
        />
      )}
    </div>
  );
}

export default ConectionServer;
