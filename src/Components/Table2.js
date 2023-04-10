import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import pdf from '../Assets/Supplier.pdf'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import view from '../Assets/view.png';
import "./Table2.css";
import download from '../Assets/download.png';
const onButtonClick = () => {
    // using Java Script method to get PDF file
    fetch('SamplePDF.pdf').then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = 'supplier.pdf';
            alink.click();
        })
    })
}

const Table2 = () => {
   const [rowData] = useState([
    {orderId: 1, from: 'Trupti', date: '04.04.2023', status: 'Shipped'},
    {orderId: 2, from: 'Sahiti', date: '30.03.2023', status: 'Delivered'},
    {orderId: 3, from: 'Naveen', date: '06.03.2023', status: 'Delivered'},
    {orderId: 4, from: 'Akshay', date: '18.03.2023', status: 'Delivered'},
    {orderId: 5, from: 'Pramod', date: '29.03.2023', status: 'Delivered'},
    {orderId: 6, from: 'Sunil', date: '05.04.2023', status: 'Shipped'},
    {orderId: 7, from: 'Vijay', date: '04.04.2023', status: 'Shipped'}
   ]);
   
   const [columnDefs] = useState([
    { field: 'orderId', headerName: 'Order ID', filter: true, sortable: true, floatingFilter: true, flex: 1 },
    { field: 'from', filter: true, sortable: true, floatingFilter: true, flex: 1.50 },
    { field: 'date', filter: true, sortable: true, floatingFilter: true, flex: 1.50  },
    { field: 'status', filter: true, sortable: true, floatingFilter: true, flex: 1 },
    // { field: 'address', floatingFilter: true, flex: 2 },
    // {
    //     flex: 0.75, cellRendererFramework: (param) =>
    //         <button type="button" class="btn btn-primary" onClick={() => handleClick(param)}>send</button>
    // },
    {
         field:'view Invoice', flex: 1, cellRendererFramework: (param) =>
               <button type="button" class="btn btn-primary" style={{width:'50%',backgroundColor:'white', border:'none'}}><a href={pdf} target="_blank" ><img src={view} style={{width:'100%' ,height:'100%'}} ></img> </a></button>
         },
         
        //  {
        //     field:'download Invoice', flex: 1.75, cellRendererFramework: (param) =>
        //           <button type="button" class="btn btn-primary" >Download</button>
        //     }

        {
            field:'download Invoice', flex: 1.75, cellRendererFramework: (param) =>
                  <button type="button" class="btn btn-primary" style={{width:'50%',backgroundColor:'white', border:'none'}} onClick={onButtonClick}><img src={download} style={{width:'40%' ,height:'30%'}} ></img></button>
            }

   ])
  
   return (
       <div className="ag-theme-alpine" style={{height: 400, width: 1100}}>
           <AgGridReact
               rowData={rowData}
               columnDefs={columnDefs}>
           </AgGridReact>
       </div>
   );
};
export default Table2;