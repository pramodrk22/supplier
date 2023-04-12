
import { Position } from '@react-pdf-viewer/core';
import React, { useState } from 'react';
import "./Modal.css";

const Modal = ({ open, onClose, rowInfo }) => {
    const [file, setFile] = useState();
    if (!open) return null

    function handleFile(event) {
        setFile(event.target.files[0])
        console.log(file)
    }

    return (
        <div onClick={onClose} className='overlay'>
            <div onClick={(e) => e.stopPropagation()} className='modal-content ' >

                <h5>Report upload</h5>
                {/* <p>{console.log("the data inside modal",rowInfo[0])}</p> */}

                <br />
                <form >
                    <div >
                        <div class="form-group row">
                            <label for="orderID" class="col-sm-2 col-form-label">Order ID</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="orderID" placeholder={rowInfo[0]}/>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label for="dateOfInspection" class="col-sm-2 col-form-label">Date of inspection</label>
                            <div class="col-sm-10">
                                <input type="date" class="form-control" id="dateOfInspection" placeholder="today"/>
                            </div>
                        </div>
                    
                        <div class="form-group row">
                            <label for="inspectedBy" class="col-sm-2 col-form-label">Inspected By</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="inspectedBy" placeholder="jay"/>
                            </div>
                        </div>
               
                        <div class="form-group row">
                            <label for="approvedBy" class="col-sm-2 col-form-label">Approved By</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="approvedBy" placeholder="mike"/>
                            </div>
                        </div>
                        <br/>
                        <div class="form-group row">
                            <label for="upload" class="col-sm-2 col-form-label">Upload</label>
                            <div class="col-sm-10">
                                <input name='file' onChange={handleFile} type="file" class="form-control" id="upload" placeholder="file"/>
                            </div>
                        </div>

                        {/* <p> <b>Upload : </b> <input type="file" name='file' onChange={handleFile}></input> </p><span></span> */}
                        {/* <button style={{height: 30, alignItems:'center', justifyContent:'center'}}>browse</button> */}
                        <br />
                        {/* <button>submit</button>
                        <button type="button"  onClick={onClose} className='close-modal' >close</button> */}
                        <button type="submit" class="btn btn-primary btn-block">Submit</button>
                        <button type="button"  onClick={onClose}  class="btn btn-danger mb-2 " style={{position:'absolute', top:'10px', right:'10px'}}>close</button> 
                        

                        
                    </div>

                </form>

            </div>

        </div>
    )

}

export default Modal