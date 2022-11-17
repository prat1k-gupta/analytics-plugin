import react, { useState } from "react";
import { Container, Dropdown, Table } from "react-bootstrap";
import { ChartComponent } from "./ChartComponent";

const TableComponent = ({mySheets,sheetN,getCurrSheet}) => {
const [currSheet,setCurrSheet] = useState(Object.keys(mySheets)[0])
// console.log("currSheet",currSheet); 
return (
    <Container>
        {mySheets && (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            {currSheet}
            </Dropdown.Toggle>
            <Dropdown.Menu>
            {sheetN.map((sheet) => (
                <Dropdown.Item
                key={sheet}
                value={sheet}
                onClick={(e) => {
                    setCurrSheet(e.target.innerHTML) 
                    getCurrSheet(e.target.innerHTML)
                }}
                >
                {sheet}
                </Dropdown.Item>
            ))}
            </Dropdown.Menu>
        </Dropdown>
        )}
        <div>
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                {currSheet &&
                mySheets[currSheet][1].map((sheet) => <th>{sheet}</th>)}
            </tr>
            </thead>
            <tbody>
            {currSheet &&
                mySheets[currSheet].slice(2).map((sheet) => (
                <tr>
                    {sheet.map((val) => {
                    return <td>{val}</td>;
                    })}
                </tr>
                ))}
            </tbody>
        </Table>
        </div>
    </Container>
  );
};

export default TableComponent;
