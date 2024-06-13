import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { getBlockLogs } from './components/log';
import './App.css'; // Make sure to create and import App.css

const App = () => {
  const [transactionChartData, setTransactionChartData] = useState([
    ['Block Number', 'Transactions'],
  ]);

  const [gasChartData, setGasChartData] = useState([
    ['Block Number', 'Base Fee Per Gas (Gwei)', 'Gas Used Ratio (%)'],
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateTransactionChartData = (blockNumber, transactionCount) => {
      setTransactionChartData(prevData => {
        const newData = [...prevData];
        if (newData.length > 10) {
          newData.splice(1, 1);
        }
        newData.push([blockNumber.toString(), Number(transactionCount)]);
        return newData;
      });
      setLoading(false);
    };

    const updateGasChartData = (gasData) => {
      setGasChartData(prevData => {
        return [
          ['Block Number', 'Base Fee Per Gas (Gwei)', 'Gas Used Ratio (%)'],
          ...gasData.map(item => [item[0].toString(), Number(item[1]), Number(item[2])]),
        ];
      });
      setLoading(false);
    };

    getBlockLogs(updateTransactionChartData, updateGasChartData);
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading charts...</div>
      ) : (
        <>
          <div className="chart-container">
            <h1 className="chart-title">Transactions Per Block (Last 10 Blocks)</h1>
            <Chart
              width={'100%'}
              height={'400px'}
              chartType="ColumnChart"
              data={transactionChartData}
              options={{
                title: 'Number of Transactions Per Block',
                chartArea: { width: '70%' },
                hAxis: { title: 'Block Number' },
                vAxis: { title: 'Transactions' },
              }}
            />
          </div>

          <div className="chart-container">
            <h1 className="chart-title">Gas Data (Last 10 Blocks)</h1>
            <Chart
              width={'100%'}
              height={'400px'}
              chartType="LineChart"
              data={gasChartData}
              options={{
                title: 'Gas Data for Last 10 Blocks',
                chartArea: { width: '70%' },
                hAxis: { title: 'Block Number' },
                vAxis: { title: 'Base Fee / Gas Used Ratio', minValue: 0 },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
