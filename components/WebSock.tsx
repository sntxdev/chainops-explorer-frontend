import React, { useState, useEffect } from "react";

export const WebSock = () => {
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://194.163.167.188:8000/archway");
    ws.onopen = (event: any) => {
      ws.send(JSON.stringify({}));
    };

    ws.onmessage = function (event: any) {
      const json = JSON.parse(event.data);

      if (json.hasOwnProperty("transaction")) {
        setTxs((prevState) => ({
          ...prevState,
          transaction: json.transaction,
        }));
      }
    };
  }, []);

  console.log(txs);
  console.log(txs.length);
  return (
    <div className="websock">
      {/*<div>{txs?.map(tx => <div>test</div>)}</div>*/}
      <div>test</div>
    </div>
  );
};
