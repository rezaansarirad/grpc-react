import React, { useState, useEffect } from "react";
import { StreamServiceClient } from "./generated/data_grpc_web_pb";
import { Request } from "./generated/data_pb";
import styles from "./ListOfExtension.module.scss";
const client = new StreamServiceClient("http://147.135.48.97:5233");

function ListOfExtension() {
  const [ExtensionList, setExtensionList] = useState(null);
  useEffect(() => {
    const getExtensionList = () => {
      const request = new Request();
      request.setId(1);

      client.fetchExtensions(request, {}, (error, response) => {
        if (error) {
          console.error(error.message);
        } else {
          const jsonData = JSON.parse(response.getResult());
          setExtensionList(jsonData);
        }
      });

      return () => {};
    };

    getExtensionList();
  }, []);

  const renderCard = () => {
    if (!responseData) return null;
    return (
      <div className={styles.card}>
        <h4>Extension List:</h4>
        <ul>
          {Object.entries(responseData).map(([extension, status]) => (
            <li
              key={extension}
              style={{
                borderColor: status === "Unavailable" ? "red" : "gray",
              }}
            >
              <h3>Extension: {extension}</h3>
              <p>Status: {status}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      {renderCard()}
      {!responseData && (
        <div className={styles.waiting}>waiting for fetch...</div>
      )}
    </div>
  );
}

export default ListOfExtension;
