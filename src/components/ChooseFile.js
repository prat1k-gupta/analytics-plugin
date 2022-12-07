import { useState } from "react";
import { ButtonGroup, Container, Dropdown, Form, ToggleButton} from "react-bootstrap";
import { read, utils} from "xlsx";
import { ChartComponent } from "./ChartComponent";
import { MergeSheetsChart } from "./MergeSheetChart";
import TableComponent from "./TableComponent";

const ChooseFile = () => {
  const radios = [
    { name: 'Total', value: '1' },
    { name: 'sheets', value: '2' },
  ];
    //states
  // const [workSheets,setWorkSheets] = useState({}); 
  const [workSheetsNames,setWorkSheetsNames] = useState([]); //done
  const [workSheets,setWorkSheets] = useState();//done
  const [currWorkSheet,setCurrWorksheet] = useState(""); //done
  
  const [sheetNames, setSheetNames] = useState({});//done
  const [fileName, setFileName] = useState("");//done
  const [currSheet,setCurrSheet] = useState("");//done
  const [defaultSheet,setDefaultSheet] = useState(""); 

  const [radioValue,setRadioValue] = useState('1'); 

  const readDataFromExcel = (data,name)=>{
    const wb = read(data);
    // console.log("workbook",wb)
    const sheetN = wb.SheetNames;
    setSheetNames((prev)=>({...prev,[name] : sheetN}));
    var finalData = {}; 
    for (let i = 0; i < wb.SheetNames.length; i++) {
      let sheetName = wb.SheetNames[i];
      let workSheet = wb.Sheets[sheetName]; 
      finalData[sheetName] = utils.sheet_to_json(workSheet,{
        range: 1,
        }); 
    }
    return finalData; 
  }

  const getWorksheets= async (files,workSheets)=>{
    await Promise.all(Object.values(files).map(async (file) => {
      const data = await file.arrayBuffer();
      const sheetsData = readDataFromExcel(data,file.name);
      console.log("SheetData: ",sheetsData)
      setWorkSheetsNames((prev) => [...prev, file.name]);
      workSheets[file.name] = sheetsData;
      // setWorkSheets((prev)=>({...prev, [file.name] : sheetsData}))
    }));
    
  }
  
  const handleFile = async (e) => {
    const files = e.target.files;
    let workSheets = {}; 
    await getWorksheets(files,workSheets); 
    // console.log(Object.keys(workSheets));
    setWorkSheets(workSheets); 
    setCurrWorksheet(Object.keys(workSheets)[0]);
    // console.log("value", Object.keys(Object.values(workSheets)[0])[0]);
    const defaultS = Object.keys(Object.values(workSheets)[0])[0]; 
    setCurrSheet(defaultS);
    setDefaultSheet(defaultS)
    setFileName(Object.keys(workSheets)[0]);
  };
// console.log(mySheets); 
return (
  <Container>
    {/* choose excel files */}
    {fileName ? (
      <p>{fileName}</p>
    ) : (
      <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Choose a excel file</Form.Label>
        <br />
        <Form.Control type="file" size="lg" onChange={handleFile} multiple />
      </Form.Group>
    )}
    
    {/* toggle button */}
    {workSheets && 
      <ButtonGroup className="mb-2">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    }
    
    

    {/* worksheets dropdown  */}
    {radioValue === '1' ?
    <>
      {workSheets && (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {currWorkSheet}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {workSheetsNames.map((sheet) => (
              <Dropdown.Item
                key={sheet}
                value={sheet}
                onClick={(e) => {
                  setCurrWorksheet(e.target.innerHTML);
                  setFileName(e.target.innerHTML);
                  setCurrSheet(defaultSheet); 
                }}
              >
                {sheet}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}

      {/* sheets dropdown */}
      {currWorkSheet && (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {currSheet ? currSheet : sheetNames[currWorkSheet][0]}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {sheetNames[currWorkSheet].map((sheet) => (
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
      {/* //to check values  */}
      {currWorkSheet && console.log("current",workSheets[currWorkSheet][currSheet])}
      {currSheet && (
        <div>
          {/* chart component and table component */}
          <ChartComponent currSheet={workSheets[currWorkSheet][currSheet]} sheet = {currSheet} />
          <TableComponent currSheet={workSheets[currWorkSheet][currSheet]} />
        </div>
      )}
    </>
    :
    //merge sheet component 
    <>
        <MergeSheetsChart workSheets = {workSheets}/>
    </>
    }
    
  </Container>

);
};

export default ChooseFile;
