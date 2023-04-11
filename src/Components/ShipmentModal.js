
import React, { useState } from 'react';
import "./Modal.css";

const ShipmentModal = ({open, onClose, rowInfo}) => {
    const [file, setFile] = useState();
    if(!open) return null

    function handleFile(event){
        setFile(event.target.files[0])
        console.log(file)   
    }

    return(
        <div onClick={onClose} className='overlay'>
            <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
                
                <h5>Create Shipment </h5>
                {/* <p>{console.log("the data inside modal",rowInfo[0])}</p> */}

                <br/>
                <p > <b>Order ID : </b> {rowInfo[0]}</p>
                <p> <b>Logistics Provider :</b> <input></input> </p>
                <p> <b>Delivery Date :</b> <input></input> </p>
                <p> <b>Status :</b> <input></input> </p>
                <p> <b>Upload  : </b> <input type="file" name='file' onChange={handleFile}></input> </p><span></span>
                {/* <button style={{height: 30, alignItems:'center', justifyContent:'center'}}>browse</button> */}
                <br/>
                <button>submit</button>
                <button type="button"  onClick={onClose} className='close-modal' >close</button>
            </div>
            
        </div>
    )

}

export default ShipmentModal