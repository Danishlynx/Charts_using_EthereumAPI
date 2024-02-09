import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { getBlockLogs } from "./components/log";
import { getGasData } from "./components/gas";
import "./App.css";

const App = () => {
  const [blockData, setBlockData] = useState([]);
  const [baseFeePerGasData, setBaseFeePerGasData] = useState([]);
  const [gasUsedRatioData, setGasUsedRatioData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const logs = await getBlockLogs();
      const gasDataResponse = await getGasData();

      const processedBlockData = processBlockData(logs);
      setBlockData(processedBlockData);
      setBaseFeePerGasData(processBaseFeePerGasData(processedBlockData, gasDataResponse));
      setGasUsedRatioData(processGasUsedRatioData(processedBlockData, gasDataResponse));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const processBlockData = (logs) => {
    const blockCounts = {};
    logs.forEach((log) => {
      const blockNumber = parseInt(log.blockNumber, 16);
      if (blockCounts[blockNumber]) {
        blockCounts[blockNumber]++;
      } else {
        blockCounts[blockNumber] = 1;
      }
    });

    const data = [["Block Number", "Transaction Count"]];
    const blockNumbers = Object.keys(blockCounts).map(Number);
    const sortedBlockNumbers = blockNumbers.sort((a, b) => b - a); // Sort block numbers in descending order
    const last10Blocks = sortedBlockNumbers.slice(0, 10); // Take only the latest 10 blocks
    last10Blocks.forEach((blockNumber) => {
      data.push([blockNumber.toString(), blockCounts[blockNumber]]);
    });
    return data;
  };

  const processBaseFeePerGasData = (blockData, gasDataResponse) => {
    const baseFeePerGasData = blockData.slice(1).map((row, index) => {
      const blockNumber = row[0];
      const fee = gasDataResponse.baseFeePerGas[index];
      return [blockNumber, fee];
    });
    return [["Block Number", "Gas Fees"], ...baseFeePerGasData];
  };

  const processGasUsedRatioData = (blockData, gasDataResponse) => {
    const gasUsedRatioData = blockData.slice(1).map((row, index) => {
      const blockNumber = row[0];
      const ratio = gasDataResponse.gasUsedRatio[index];
      return [blockNumber, ratio];
    });
    return [["Block Number", "Gas Used %"], ...gasUsedRatioData];
  };

  const fetchAllData = async () => {
    fetchData();
  };

  return (
    <div className="app-container">
      <button className="fetch-button" onClick={fetchAllData} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch Current Data"}
      </button>

      {/* Render Charts only if isLoading is false */}
      {!isLoading && (
        <div className="chart-container">
          {/* First Chart: Transactions per Block */}
          <div className="chart-box">
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={blockData}
              options={{
                title: "Transactions per Block",
                legend: { position: "none" },
                chartArea: { width: "80%", height: "80%" },
                colors: ["#b0120a"],
                vAxis: {
                  title: "Transaction Count",
                  minValue: 0,
                  textStyle: { fontSize: 12 },
                },
                hAxis: {
                  title: "Block Number",
                  textStyle: { fontSize: 12 },
                },
                bar: { groupWidth: "50%" },
                annotations: {
                  textStyle: {
                    fontSize: 12,
                    bold: false,
                  },
                },
              }}
            />
          </div>

          {/* Second Chart: Base Fee Per Gas */}
          <div className="chart-box">
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={baseFeePerGasData}
              options={{
                title: "Base Fee Per Gas",
                legend: { position: "none" },
                chartArea: { width: "80%", height: "80%" },
                colors: ["#3366CC"],
                vAxis: {
                  title: "Gas Fees (gwei)",
                  minValue: 0,
                  textStyle: { fontSize: 12 },
                },
                hAxis: {
                  title: "Block Number",
                  textStyle: { fontSize: 12 },
                },
                bar: {
                  groupWidth: "50%",
                  style: {
                    fill: "#3366CC",
                  },
                },
                annotations: {
                  textStyle: {
                    fontSize: 12,
                    bold: false,
                  },
                },
              }}
            />
          </div>

          {/* Third Chart: Gas Used Ratio */}
          <div className="chart-box">
            <Chart
              chartType="ColumnChart"
              width="100%"
              height="400px"
              data={gasUsedRatioData}
              options={{
                title: "gas_Used over gas_Limit %",
                legend: { position: "none" },
                chartArea: { width: "80%", height: "80%" },
                colors: ["#FF9900"],
                vAxis: {
                  title: "gasUsed %",
                  minValue: 0,
                  textStyle: { fontSize: 12 },
                },
                hAxis: {
                  title: "Block Number",
                  textStyle: { fontSize: 12 },
                },
                bar: {
                  groupWidth: "50%",
                  style: {
                    fill: "#FF9900",
                  },
                },
                annotations: {
                  textStyle: {
                    fontSize: 12,
                    bold: false,
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
