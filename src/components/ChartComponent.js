import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Week 1',
    },
    updateMode: 'reset'
  },
};

const labels = ['Week1'];



export function ChartComponent({currSheet}) {


  console.log("chartSheet chartComponent",currSheet)
  const newObjectArray = []; 
  const makeNewObject = (currSheet,l,d) => {
    for (let i = 2; i < currSheet.length; i++) {
      if (currSheet[i][0] && currSheet[i][1]){
        newObjectArray.push({
          label: currSheet[i][l],
          data: [currSheet[i][d]],
          backgroundColor: `rgba(${70*i}, ${99+i*10}, ${132+i*-60})`,
        });
      }
    }
    return newObjectArray; 
  };
  // const [barData, setBarData] = useState({});
  var final ; 
  if(currSheet[2].length<3){
    final = makeNewObject(currSheet,0,1); 
    final.pop(); 
  }else{
    final = makeNewObject(currSheet, 1, 3);
  }

  // console.log("finalforGraph", final); 
  const data = {
    labels,
    datasets: final
  };

  return <Bar options={options} data={data} />;
}