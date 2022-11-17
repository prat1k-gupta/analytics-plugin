import react, { useState } from "react";
import { Container, Dropdown, Form, Table } from "react-bootstrap";
import { read, utils, writeFile } from "xlsx";
import { ChartComponent } from "./ChartComponent";
import TableComponent from "./TableComponent";

const ChooseFile = () => {
    //states
  const [sheetNames, setSheetNames] = useState(null);
  const [fileName, setFileName] = useState("");
  const [mySheets, setMySheets] = useState();
  const [currSheet,setCurrSheet] = useState();

  const readDataFromExcel = (data)=>{
    const wb = read(data);
    console.log("workbook",wb)
    const sheetN = wb.SheetNames;
    setSheetNames(sheetN);
    setCurrSheet(wb.SheetNames[0])
    var finalData = {}; 
    for (let i = 0; i < wb.SheetNames.length; i++) {
      let sheetName = wb.SheetNames[i];
      let workSheet = wb.Sheets[sheetName]; 
      finalData[sheetName] = utils.sheet_to_json(workSheet,{
        header: 1,
        }); 
    }
    return finalData; 
  }

  const handleFile = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name)
    const data = await file.arrayBuffer();
    const sheetsData = readDataFromExcel(data); 
    // getFileData(sheetsData.finalData,sheetsData.sheetN); 
    setMySheets(sheetsData); 
    // console.log("sheetsData",sheetsData.finalData)
  };
console.log(mySheets); 
return (
  <Container>
    {fileName ? (
      <p>{fileName}</p>
    ) : (
      <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Choose a excel file</Form.Label>
        <br />
        <Form.Control type="file" size="lg" onChange={handleFile} />
      </Form.Group>
    )}
    {mySheets && (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {currSheet}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {sheetNames.map((sheet) => (
            <Dropdown.Item
              key={sheet}
              value={sheet}
              onClick={(e) => {
                setCurrSheet(e.target.innerHTML);
              }}
            >
              {sheet}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    )}
    {mySheets && (
      <div>
        <ChartComponent currSheet={mySheets[currSheet]} />
        <TableComponent
          currSheet={mySheets[currSheet]}
        />
      </div>
    )}
  </Container>
);
};

export default ChooseFile;
