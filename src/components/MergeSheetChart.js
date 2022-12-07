import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import randomColor from 'randomcolor';
import { Line } from 'react-chartjs-2';
import TableMergeSheet from './TableMergeSheet';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


//notes
//dataset 
//labels 
//label : curr week
//data : grand total

export function MergeSheetsChart({ workSheets,worksheet }) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'All Sheets Data',
      },
    },
  };
  
  const labels = Object.keys(workSheets)

  console.log("workSheets mergesheetchart ", workSheets)
  const obj = {};
  const finalData = [];
  for (let curr in workSheets) {
    for (let keys in workSheets[curr]) {
      // console.log(keys);
      const last = Object.values(workSheets[curr][keys])[Object.keys(workSheets[curr][keys]).length - 1]
      //last['Samples Delivered'];
      if (!obj[keys]) {
        obj[keys] = [];
      }
      obj[keys].push(last['Samples Delivered']);
      // console.log("length",workSheets.length);
      if (obj[keys].length === Object.keys(workSheets).length && obj[keys][0]) {
        finalData.push({
          label: keys,
          data: obj[keys],
          borderColor: randomColor({
            luminosity: 'bright',
            format: 'rgb' // e.g. 'rgb(225,200,20)'
         }),
          backgroundColor: randomColor({
            luminosity: 'bright',
            format: 'rgb' // e.g. 'rgb(225,200,20)'
         }),
        }
        )
      }
    }
  }

  const data = {
    labels,
    datasets: finalData
  };
  return (
    finalData &&
    <>
      <hr className="separator"></hr>
      <div className='graph'>
        <Line className = "mb-4" options={options} data={data} />
        <div >
          <h1>Total Sample Data per Week Table</h1>
          <TableMergeSheet header={["cities", ...labels]} rows={finalData} />
        </div>
      </div>
    </>

  );
}
