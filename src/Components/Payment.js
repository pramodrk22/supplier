
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import eye from '../Assets/eye.png';
import downloadLogo from '../Assets/download-logo.png';
import uploadLogo from '../Assets/upload-logo.png';


const Payment = () => {
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

 // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
   {field: 'make', headerName: 'Order ID', filter: true, flex: 1.5, filter: true,floatingFilter: true},
   {field: 'model', headerName: 'From', filter: true, flex: 1.5, filter: true,floatingFilter: true},
    {field: 'view', headerName:'Date', flex:1.5},
    { headerName: 'Payment Status',  flex: 1.5, filter: true,floatingFilter: true},
    { headerName: 'Amount',  flex: 1.5, filter: true,floatingFilter: true},
    { headerName: 'Bill',  flex: 1.5, cellRendererFramework:(params)=>{
        
        return(
            <div>
                <img src={eye} />
                <img src={downloadLogo}/>
            </div>
            
        )
    }},
    
 ]);

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
     
    sortable: true,
       filter: true,
       //autoHeight: true,
       //resizable: true
  }));

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
    .then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, []);

    

    return(
        <div>

    <h3>Payment</h3>
        {/* <button style={{position: 'relative', left:900}}>Create</button> */}
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

        
     </div>
   </div>
    )

}

export default Payment