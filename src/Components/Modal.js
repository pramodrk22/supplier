
import React, { useState } from 'react';
import "./Modal.css";

const Modal = ({open, onClose, rowInfo}) => {
    const [file, setFile] = useState();
    if(!open) return null

    function handleFile(event){
        setFile(event.target.files[0])
        console.log(file)   
    }

    return(
        <div onClick={onClose} className='overlay'>
            <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
                
                <h5>Report upload</h5>
                {/* <p>{console.log("the data inside modal",rowInfo[0])}</p> */}

                <br/>
                <p > <b>Order ID : </b> {rowInfo[0]}</p>
                <p> <b>Date of inspection :</b> <input></input> </p>
                <p> <b>Inspected By :</b> <input></input> </p>
                <p> <b>Approved By :</b> <input></input> </p>
                <p> <b>Upload : </b> <input type="file" name='file' onChange={handleFile}></input> </p><span></span>
                {/* <button style={{height: 30, alignItems:'center', justifyContent:'center'}}>browse</button> */}
                <br/>
                <button>submit</button>
                <button onClick={onClose} className='close-modal'>close</button>
            </div>

        </div>
    )

}

export default Modal