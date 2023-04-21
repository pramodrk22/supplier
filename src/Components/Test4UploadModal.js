
import { Position } from '@react-pdf-viewer/core';
import React, { useState } from 'react';
import "./Modal.css";
import { Form, Button, Message, Input } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import Layout from "./Layout";
import { Buffer } from "safe-buffer";
import {create as ipfsClient} from 'ipfs-http-client';


const Test4UploadModal = ({ open, onClose, rowInfo }) => {
    const projectId = '2NxJMYhDpERqRp621ZYvAdfMCli';
  const projectSecret = 'eeb623c13ca6fde2936a70a6f2f2bd51';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  
      
  const ipfs = ipfsClient({ host: 'ipfs.infura.io',port: 5001,protocol: 'https',headers: {authorization: auth,}, });

    const [state, setState] = useState({
        deliveryRecipt: "",
        billNo:''
    })
    if (!open) return null

    const onSubmit = async () => {
    
        const campaign = Campaign('0x8A59B3f39129379D39eC22cA815cA726BB395338');
        const { deliveryRecipt, billNo } = state;
    
        //setState({ ...state, loading: true, errorMessage: "" });
    
        try {
            const accounts = await web3.eth.getAccounts();
    
            const addPdfToIpfs = async (pdfFile) => {
              const result = await ipfs.add(pdfFile);
              return result.path;
            };
    
            const ipfsHash = await addPdfToIpfs(deliveryRecipt);
            
            console.log('ipfs hash', ipfsHash);
    
            await campaign.methods
              .createManufacturerDelivery(ipfsHash, rowInfo, billNo) // ###################################
              .send({
                from: accounts[0],
              });
           // Router.pushRoute(`/campaigns/${this.props.address}/requests`);
         } 
        catch (err) {
          console.log(err.message)
          setState({ ...state, errorMessage: err.message });
        }
        //setState({ ...state, loading: false });
      };
    

    return (
        <div onClick={onClose} className='overlay'>
            <div onClick={(e) => e.stopPropagation()} className='modal-content ' >

                <h5>Report upload</h5>
                {/* <p>{console.log("the data inside modal",rowInfo[0])}</p> */}

                <br />
                {/* <form > */}
                    <div >
                        {/* <div class="form-group row">
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
                        <br/> */}
                        {/* <div class="form-group row">
                            <label for="upload" class="col-sm-2 col-form-label">Upload</label>
                            <div class="col-sm-10">
                                <input name='file' onChange={handleFile} type="file" class="form-control" id="upload" placeholder="file"/>
                            </div>
                        </div> */}

                        {/* <p> <b>Upload : </b> <input type="file" name='file' onChange={handleFile}></input> </p><span></span> */}
                        {/* <button style={{height: 30, alignItems:'center', justifyContent:'center'}}>browse</button> */}
                        <br />
                        {/* <button>submit</button>
                        <button type="button"  onClick={onClose} className='close-modal' >close</button> */}
                        {/* <button type="submit" class="btn btn-primary btn-block">Submit</button>
                        <button type="button"  onClick={onClose}  class="btn btn-danger mb-2 " style={{position:'absolute', top:'10px', right:'10px'}}>close</button>  */}
                        

                        
                    </div>

                {/* </form> */}

            </div>

            <Layout>
            <div  className='overlay'>
            <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
          <h3>Create a Request</h3>

          <Form onSubmit={onSubmit} error={!!state.errorMessage}>

          <Form.Field>
            <label>deliveryRecipt</label>
            <Input
              type="file"
              onChange={(event) =>
                setState({ ...state, deliveryRecipt: event.target.files[0] })
              }
            />
          </Form.Field>

          <Form.Field>
            <label>bill no</label>
            <Input
              value={state.billNo}
              onChange={(event) =>
                setState({ ...state, billNo: event.target.value })
              }
            />
          </Form.Field>
          
            <Message error  content={state.errorMessage} />
            <Button primary loading={state.loading}>
              Create!
            </Button>
            <button type="button"  onClick={onClose}  class="btn btn-danger mb-2 " style={{position:'absolute', top:'10px', right:'10px'}}>close</button> 
             </Form>
      </div>
      </div>

      </Layout>

        </div>
    )

}

export default Test4UploadModal