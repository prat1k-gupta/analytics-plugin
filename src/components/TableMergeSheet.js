import react, { useState } from "react";
import { Container, Dropdown, Table } from "react-bootstrap";

const TableMergeSheet = ({ header, rows }) => {
    console.log("hii tablemerge sheet")
    console.log(header)
    console.log(rows);
    return (
        // <div></div>
        <Container>
            <hr className="separator mb-6"></hr>
            <div>
                <Table striped bordered hover className="table-data">
                    <thead className="table-header">
                        <tr>
                            {header &&
                                header.map((h) => <th>{h}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {rows &&
                            Object.values(rows).map((row) =>
                                <tr className='table-row'>
                                    <td>{row.label}</td>
                                    {
                                        row.data.map((val) => <td>{val}</td>)
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

export default TableMergeSheet;
