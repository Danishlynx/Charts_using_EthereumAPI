import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

let lastFetchedBlockNumber = 0; // To track the last block number we fetched data for

const getBlockLogs = (updateTransactionChartData, updateGasChartData) => {
  alchemy.ws.on("block", async (latestBlockNumber) => {
    if (latestBlockNumber >= lastFetchedBlockNumber + 10 || lastFetchedBlockNumber === 0) {
      lastFetchedBlockNumber = latestBlockNumber;

      const fromBlock = Math.max(latestBlockNumber - 9, 0);
      const transactionPromises = [];
      const gasDataPromises = [];

      for (let i = 0; i < 10; i++) {
        const blockNumber = fromBlock + i;
        transactionPromises.push(
          alchemy.core.getLogs({
            address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            fromBlock: `0x${blockNumber.toString(16)}`,
            toBlock: `0x${blockNumber.toString(16)}`,
            topics: [
              "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            ],
          })
        );

        gasDataPromises.push(getGasData(blockNumber));
      }

      const transactionLogs = await Promise.all(transactionPromises);
      transactionLogs.forEach((logs, index) => {
        updateTransactionChartData(fromBlock + index, logs.length);
      });

      const gasDataResults = await Promise.all(gasDataPromises);
      updateGasChartData(gasDataResults.flat());
    }
  });
};

const getGasData = async (blockNumber) => {
  const feeHistoryResponse = await alchemy.core.send('eth_feeHistory', [
    `0x1`, // Requesting data for a single block
    `0x${blockNumber.toString(16)}`,
    []
  ]);

  if (feeHistoryResponse && feeHistoryResponse.baseFeePerGas && feeHistoryResponse.baseFeePerGas.length > 0) {
    const baseFeePerGas = parseInt(feeHistoryResponse.baseFeePerGas[0], 16) / 1e9;
    const gasUsedRatio = feeHistoryResponse.gasUsedRatio[0] * 100;
    return [[` ${blockNumber}`, baseFeePerGas, gasUsedRatio]];
  }
  return [];
};

export { getBlockLogs, getGasData };
