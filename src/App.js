
import ChooseFile from "./components/ChooseFile"
import "./App.css";
import TableComponent from "./components/TableComponent";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { ChartComponent } from "./components/ChartComponent";

function App() {
  // console.log(currSheet);
  return (
    <div className="App">
      <h1>Analytics plugin</h1>
      <ChooseFile />
    </div>
  );
}

export default App;
