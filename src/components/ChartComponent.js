import React, { useEffect, useState } from 'react';
import randomColor from 'randomcolor';
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
import { Dropdown } from 'react-bootstrap';

import "./styles.css"
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);





export function ChartComponent({ currSheet, sheet, worksheet }) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: worksheet,
      },
      updateMode: 'reset'
    },
  };
  
  const labels = [sheet];

  const [graphX, setGraphX] = useState([]);
  const [graphY, setGraphY] = useState([]);
  const [currXKey, setCurrXKey] = useState(null);
  const [currYKey, setCurrYKey] = useState(null);

  // console.log("chartSheet chartComponent", currSheet)

  useEffect(() => {
    let graphYValues = [];
    let graphXValues = [];
    //we render the curr values and graphx values
    function isNumber(value) {
      if (typeof value === 'number') {
        return true;
      }
    }

    for (const keys in currSheet[0]) {
      if (isNumber(currSheet[0][keys])) {
        // setGraphY((prev)=> [...prev,keys])
        graphYValues.push(keys);
      } else graphXValues.push(keys);
    }

    setGraphX(graphXValues);
    setGraphY(graphYValues);
    setCurrXKey(graphXValues[0])
    setCurrYKey(graphYValues[0])
  }, [currSheet])

  const final = currSheet.map((sheet) => {
    if (sheet[currXKey] === "Grand Total") {
      return {
        label: "",
        data: 0,
        backgroundColor: "#fffff"
      }
    }
    return {

      label: sheet[currXKey],
      data: [sheet[currYKey]],
      backgroundColor: randomColor({luminosity: 'bright',count: 35}),
    }
  })

  const data = {
    labels,
    datasets: final
  };
  console.log("final", final);

  return (
    <>
      <div className='drop-button'>
        {graphX && (
          <Dropdown className='drop-left drop-padding'>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {currXKey}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {graphX.map((sheet) => (
                <Dropdown.Item
                  key={sheet}
                  value={sheet}
                  onClick={(e) => {
                    setCurrXKey(e.target.innerHTML);
                  }}
                >
                  {sheet}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
        {graphY && (
          <Dropdown className='drop-right drop-padding'>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {currYKey}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {graphY.map((sheet) => (
                <Dropdown.Item
                  key={sheet}
                  value={sheet}
                  onClick={(e) => {
                    setCurrYKey(e.target.innerHTML);
                  }}
                >
                  {sheet}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      <hr className="separator"></hr>

      <div className='graph'>
        {final && <Bar options={options} data={data} />}
      </div>
    </>
  );
}