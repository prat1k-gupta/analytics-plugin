import react, { useState } from "react";
import { Container, Dropdown, Table } from "react-bootstrap";

import "./styles.css"

const TableComponent = ({ currSheet }) => {
    const header = currSheet[0];
    return (
        // <div></div>
        <Container>
            <hr className="separator mb-6"></hr>
            <div>
                <Table striped bordered hover className="table-data">
                    <thead className="table-header">
                        <tr>
                            {currSheet &&
                                Object.keys(header).map((h) => <th>{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {currSheet &&
                            currSheet.map((row) =>
                                <tr className='table-row'>
                                    {
                                        Object.values(row).map((val) =>
                                            <td>
                                                {val}
                                            </td>
                                        )
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default TableComponent;
