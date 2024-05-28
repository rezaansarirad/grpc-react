import React, { useState, useEffect, useRef } from "react";
import { StreamServiceClient } from "./generated/data_grpc_web_pb";
import { Request } from "./generated/data_pb";
import styles from "./ConectionServer.module.scss";
import ListOfExtension from "./ListOfExtension";
const client = new StreamServiceClient("http://officepbx.cfbtel.us:5233");

function ConectionServer() {
  const [ExtensionList, setExtensionList] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const streamRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  useEffect(() => {
    const connectStream = () => {
      const request = new Request();
      request.setId(1);

      const stream = client.fetchResponse(request);
      streamRef.current = stream;

      const onData = (response) => {
        const jsonData = JSON.parse(response.getResult());
        if (jsonData) {
          setResponseData(jsonData);
        }
      };

      const onEnd = () => {
        console.log("Finished");
        reconnectTimeoutRef.current = setTimeout(connectStream, 1000);
      };

      const onError = (err) => {
        console.error("Error: ", err);
        reconnectTimeoutRef.current = setTimeout(connectStream, 2000);
      };

      const onStatus = (status) => {
        console.log("Status: ", status);
        if (status?.code === 2) {
          reconnectTimeoutRef.current = setTimeout(connectStream, 1000);
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

    const getExtensionList = () => {
      const request = new Request();
      request.setId(1);

      client.fetchExtensions(request, {}, (error, response) => {
        if (error) {
          console.error(error.message);
        } else {
          const jsonData = JSON.parse(response.getResult());
          const extensionArray = jsonData.sort((a, b) =>
            a.extension.localeCompare(b.extension)
          );

          setExtensionList(extensionArray);
        }
      });
    };

    getExtensionList();
    connectStream();

    return () => {
      if (streamRef.current) {
        streamRef.current.cancel();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {!ExtensionList && (
        <div className={styles.waiting}>waiting for fetch...</div>
      )}

      {ExtensionList && (
        <ListOfExtension
          extensionList={ExtensionList}
          filteredData={responseData}
        />
      )}
    </>
  );
}

export default ConectionServer;
