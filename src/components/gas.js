// gas.js

import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: "process.env.REACT_APP_ALCHEMY_API_KEY",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export const getGasData = async () => {
  try {
    const res = await alchemy.core.send("eth_feeHistory", ["10", "latest", []]);
    console.log("Gas Data Response:", res);
    
    const baseFeePerGas = res.baseFeePerGas.slice(-10).map(hex => parseInt(hex, 16) / 1e9); // Convert from wei to gwei
    const gasUsedRatio = res.gasUsedRatio.slice(-10).map(ratio => ratio * 100); // Convert to percentage

    return { baseFeePerGas, gasUsedRatio };
  } catch (error) {
    console.error("Error fetching gas data:", error);
    throw error;
  }
};
