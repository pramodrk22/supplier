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

import factory from '../ethereum/factory'

import ShipmentRows from './ShipmentRows';

import { Button, Table } from "semantic-ui-react";
import Campaign from '../ethereum/campaign'



const Report = () => {
 const pdfURL = 'http://localhost:4000/orders';

 const [reportName, setReportName] = useState("rmReport");
 
 const [rowData, setRowData] = useState(); 
 
 
 const [columnDefs, setColumnDefs] = useState([
   {field: 'orderID', headerName: 'Order ID', filter: true, flex: 1.5},
//    {headerName: 'Reports', flex: 1.5, 
//             cellRendererFramework: (param) => {
//                 // console.log('param is', param);
//                 return (
//                     <ReportDropdown param={param} selectValue={(r) => setReportName(r)}/>
//                     // <ReportDropdown param={param}/>
//                 );
//     }},
{field: 'rmReport', headerName: 'RM Report', filter: true, flex: 1.5, cellRendererFramework:(params)=>{
    parameter = params;
    return(
        <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={params.data.rmReport} data-col={params.colDef.headerName} 
            onClick={onViewClicked}/> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={params.data.rmReport} data-col={params.colDef.headerName}
            onClick={onDownloadClicked} /> 
        </div>
        
    )
}},
{field: 'qualityReport', headerName: 'Quality Report', filter: true, flex: 1.5, cellRendererFramework:(params)=>{
    return(
        <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={params.data.qualityReport} data-col={params.colDef.headerName}
            onClick={onViewClicked} /> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={params.data.qualityReport} data-col={params.colDef.headerName}
            onClick={onDownloadClicked} /> 
        </div>
        
    )
}},
{field: 'insuranceReport', headerName: 'Insurance Report', filter: true, flex: 1.5, cellRendererFramework:(params)=>{
    return(
        <div>
            <img src={eye} style={{ height: 35, width: 30 }} data-view={params.data.insuranceReport} data-col={params.colDef.headerName} 
            onClick={onViewClicked}/> &nbsp;&nbsp;
            <img src={downloadLogo} style={{ height: 30, width: 30 }} data-download={params.data.insuranceReport} data-col={params.colDef.headerName}
            onClick={onDownloadClicked} /> 
        </div>
        
    )
}},
    { headerName:'Upload', flex:1.5, cellRendererFramework:()=>{
        return(
            // <Link to="/" >
            //     <img src={eye}  />
            // </Link>
            <img src={uploadLogo} style={{ height: 30, width: 30 }} />
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
//  useEffect(() => {
//    fetch('http://localhost:4000/posts')
//    .then(result => result.json())
//    .then(rowData => setRowData(rowData))
//  }, []);

const [request, setRequest] = useState([])
const [supplyData, setSupplyData]  = useState();
 useEffect( () => {
  const address = '0xBbDaCbEDf32B5cCe669Ccafc580Ac24Bc31b89cf'
  const campaign = Campaign(address);
  console.log('use effect campaign',campaign);
  (async () => {
    const requestCount = await campaign.methods.getSupplyChainDataCount().call();
    console.log('req count', requestCount);
    //const approversCount = await campaign.methods.approversCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          
          return campaign.methods.supplyChainDatas(index).call();
        })
    );
    setRequest(requests)
    setSupplyData(requests)
    console.log('useeffect requests', requests);
    setRowData(requests);
    return { address, requests, requestCount };
  } )();
  
    
    return () => {
        
    }
   
 },[])

 
 const [openModal, setOpenModal] = useState(false);

 const [orderID, setOrderID] = useState();
 

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
const [pdfValue, setPdfValue] = useState();
const onViewClicked = (params)=> {
    console.log('params viewwwww', params.target.getAttribute('data-view'));
    console.log('params collll', params.target.getAttribute('data-col'));
    if(params.target.getAttribute('data-col') == 'RM Report'){
        setPdfValue(params.target.getAttribute('data-view'))
    }
    if(params.target.getAttribute('data-col') == 'Quality Report'){
        setPdfValue(params.target.getAttribute('data-view'))
    }
    if(params.target.getAttribute('data-col') == 'Insurance Report'){
        setPdfValue(params.target.getAttribute('data-view'))
    }
    console.log('parameterrrrrr', parameter);
    //console.log("cell clicked", parameter);
    setOpenPDFModal(true);

 }

 

 const [openTestModal, setOpenTestModal] = useState(false);
 const[cellValue, setCellValue] = useState()  ;
const [arrayIndex, SetArrayIndex] = useState();

const onCellClicked = (params) => {
  console.log('oncell clicked', params);
  setCellValue(params.data.orderID) ;
  
  if(params.colDef.headerName == "Upload"){
    let arrFind = supplyData.findIndex((e, i) => {
      console.log('eeeeeee',e, i);
      return e.orderID === params.data.orderID 
    })
    console.log('arrFindindex',arrFind);
    setOpenModal(true);
    SetArrayIndex(arrFind);
  }
    
  }
  

 const onDownloadClicked = () => {
    
    // const aTag = document.createElement('a');
    
    // document.body.appendChild(aTag);
    // aTag.click();
    // aTag.remove();
    //var pdf="data:application/pdf;base64,JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==";
    var pdf = 'https://gateway.pinata.cloud/ipfs/QmaNxbQNrJdLzzd8CKRutBjMZ6GXRjvuPepLuNSsfdeJRJ'
    //console.log(pdf);
    const linkSource =pdf;
    const downloadLink = document.createElement("a");
    const fileName = "file.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
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
           
           onCellClicked={onCellClicked} 

           pagination={true}
        />

        <Modal open={openModal} onClose={() => setOpenModal(false)} rowInfo={arrayIndex}/>
        <PDFViewer open={openPDFModal} onClose={() => setOpenPDFModal(false)} info={pdfValue}/>
     </div>
   </div>
 );
};

export default Report;