
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './PDFViewer.css'

import samplePDF  from '../Assets/sample.pdf'

import {Viewer, Worker} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer = ({open, onClose, rowInfo}) => {
    
     const [viewPDF, setViewPDF] = useState();

    // setViewPDF(samplePDF);

    //const viewPDF = samplePDF;  
    
    useEffect(() => {
        fetch('http://localhost:4000/orders')
        .then((response) => response.json())
        .then((data)=> {
            console.log(data[0]);
            setViewPDF(data[1].pdf)
        })
    })
    const newplugin = defaultLayoutPlugin();

    if(!open) return null
    

    

    return(
        <div onClick={onClose} className='overlay'>
        <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
            
            <h5>PDF</h5>
            <div className='pdf-container'>
                <Worker workerUrl='http://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                    {viewPDF && <>
                        <Viewer fileUrl={viewPDF} plugins={[newplugin]} />
                    </>}
                    {!viewPDF && <>no PDF</>}
                </Worker>
            </div>

            <br/>
            
            <button onClick={onClose} className='close-modal'>close</button>
        </div>

    </div>
    )

}

export default PDFViewer