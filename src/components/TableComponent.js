import react, { useState } from "react";
import { Container, Dropdown, Table } from "react-bootstrap";
import { ChartComponent } from "./ChartComponent";

const TableComponent = ({currSheet}) => {
return (
    <Container>
        <div>
        <Table striped bordered hover variant="dark">
            <thead>
            <tr>
                {currSheet &&
                currSheet[1].map((sheet) => <th>{sheet}</th>)}
            </tr>
            </thead>
            <tbody>
            {currSheet &&
                currSheet.slice(2).map((sheet) => (
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
