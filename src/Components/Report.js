import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

//import './Report.css';
import ReportDropdown from './ReportDropdown';
//import { Button } from 'react-bootstrap';

import Modal from './Modal.js';

import eye from '../Assets/eye.png';
import downloadLogo from '../Assets/download-logo.png';
import uploadLogo from '../Assets/upload-logo.png';

import samplePDF  from '../Assets/sample.pdf'

import { Link } from "react-router-dom";
import PDFViewer from './PDFViewer';


const Report = () => {
 const pdfURL = 'http://localhost:4000/orders';
 
 const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

 // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
   {field: 'make', headerName: 'Sl.No', filter: true, flex: 1.5},
   {field: 'model', headerName: 'Order ID', filter: true, flex: 1.5, filter: true,floatingFilter: true},
   {headerName: 'Reports', flex: 1.5, 
            cellRendererFramework: (param) => {
                //console.log('param is', param);
                return (
                    <ReportDropdown param={param}/>
                    // <ReportDropdown param={param}/>
                );
    }},
    {field: 'view', headerName:'View', flex:1.5, cellRendererFramework:()=>{
        return(
            // <Link to="/" >
            //     <img src={eye}  />
            // </Link>
            <img src={eye} onClick={onViewClicked}  />
        )
    }},
    {field: 'download', headerName: 'Download',  flex: 1.5, cellRendererFramework:()=>{
        return(
            <img src={downloadLogo} onClick={onDownloadClicked}/>
        )
    }},
    {field: 'upload', headerName: 'Upload',  flex: 1.5, cellRendererFramework:(params)=>{
        parameter = params;
        return(
            <img src={uploadLogo} onClick={onUploadClicked}/>
        )
    }}
 ]);


 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
     
     sortable: true,
        filter: true,
        //autoHeight: true,
        //resizable: true
   }));

 // Example of consuming Grid Event
//  const cellClickedListener = useCallback( event => {
//    console.log('cellClicked', event);
//  }, []);

 // Example load data from server
 useEffect(() => {
   fetch('https://www.ag-grid.com/example-assets/row-data.json')
   .then(result => result.json())
   .then(rowData => setRowData(rowData))
 }, []);


 
 const [openModal, setOpenModal] = useState(false);

 const [orderID, setOrderID] = useState();
 const [reportName, setReportName] = useState();

 let parameter;

 const onUploadClicked = () => {
    console.log("cell clicked", parameter);
    setOpenModal(true);
    setOrderID(parameter.data.model);
    //setReportName(parameter.data.)
    
 };

 const [openPDFModal, setOpenPDFModal] = useState(false);
//  const fileType = ['application/pdf']
//  const [pdfFile, setPDFFile] = useState();
 const onViewClicked = ()=> {
    // if(samplePDF){
    //     if(samplePDF && fileType.includes(samplePDF.type)){
    //         let reader = new FileReader()
    //         reader.readAsDataURL(samplePDF)
    //         reader.onload = ()=>{
    //             setPDFFile(samplePDF)
    //         }
    //     }
    //     else{
    //         setPDFFile(null);
    //     }
    // }
    console.log("cell clicked", parameter);
    setOpenPDFModal(true);

 }

 const onDownloadClicked = () => {
    const aTag = document.createElement('a');
    aTag.href = pdfURL;
    
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
 }

 return (
   <div>

    <h3>Reports</h3><br />

     {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
     <div className="ag-theme-alpine" style={{ height: 490, width: 'auto' }}>

       <AgGridReact
           
           rowData={rowData} // Row Data for Rows

           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           //animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           
           //onCellClicked={onCellClicked} 

           pagination={true}
        />

        <Modal open={openModal} onClose={() => setOpenModal(false)} rowInfo={[orderID]}/>
        <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={[1]}/>
     </div>
   </div>
 );
};

export default Report;