import react, { useState } from "react";
import { Container, Dropdown, Table } from "react-bootstrap";

const TableComponent = ({currSheet}) => {
    const header = currSheet[0]; 
return (
    // <div></div>
    <Container>
        <div>
        <Table striped bordered hover>
            <thead>
            <tr>
                {currSheet &&
                Object.keys(header).map((h) => <th>{h}</th>)}
            </tr>
            </thead>
            <tbody>
            {currSheet &&    
                currSheet.map((row)=>
                    <tr>
                        {
                            Object.values(row).map((val)=>
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
