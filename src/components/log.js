// components/log.js

import { Network, Alchemy } from "alchemy-sdk";

const getBlockLogs = () => {
  const settings = {
    apiKey: "demo", // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };
  const alchemy = new Alchemy(settings);

  return alchemy.core.getBlockNumber().then(blockNumber => {
    const fromBlock = Math.max(blockNumber - 10, 0);

    return alchemy.core
      .getLogs({
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        fromBlock: fromBlock,
        toBlock: "latest",
      })
      .then(logs => logs)
      .catch(error => {
        console.error(error);
        return [];
      });
  });
};

export { getBlockLogs };  // Export the getBlockLogs function


