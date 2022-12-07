import react, { useState } from "react";
import { Container, Dropdown, Table } from "react-bootstrap";

const TableMergeSheet = ({header,rows}) => {
    console.log("hii tablemerge sheet")
    console.log(header)
    console.log(rows);  
return (
    // <div></div>
    <Container>
        <div>
        <Table striped bordered hover>
            <thead>
            <tr>
                {header &&
                header.map((h) => <th>{h}</th>)
                }
            </tr>
            </thead>
            <tbody>
            {rows &&    
                Object.values(rows).map((row)=>
                    <tr>
                        <td>{row.label}</td>
                        {
                            row.data.map((val)=> <td>{val}</td>)
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
