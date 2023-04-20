import { useState } from "react";
import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import Layout from "./Layout";
import { Buffer } from "safe-buffer";
import {create as ipfsClient} from 'ipfs-http-client';


const Test4Modal = ({open, onClose, rowInfo}) => {
  const projectId = '2NxJMYhDpERqRp621ZYvAdfMCli';
  const projectSecret = 'eeb623c13ca6fde2936a70a6f2f2bd51';
  const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  
      
  const ipfs = ipfsClient({ host: 'ipfs.infura.io',port: 5001,protocol: 'https',headers: {authorization: auth,}, });
  
  const [state, setState] = useState({
    orderId: "",
    manufacturerName: '',
    supplierName: '',
    invoiceReport:'',
  })
  if(!open) return null

  const onSubmit = async () => {
    
    const campaign = Campaign('0x780c66A89ae42514c9e54bb7Ce95Dff7A5332816');
    const { orderId, manufacturerName, supplierName, invoiceReport } = state;

    //setState({ ...state, loading: true, errorMessage: "" });

    try {
        const accounts = await web3.eth.getAccounts();

        const addPdfToIpfs = async (pdfFile) => {
          const result = await ipfs.add(pdfFile);
          return result.path;
        };

        const ipfsHash = await addPdfToIpfs(invoiceReport);
        
        console.log('ipfs hash', ipfsHash);

        await campaign.methods
          .createManufacturerInvoice(orderId, manufacturerName, supplierName, ipfsHash)
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
    <>
        <Layout>
            <div  className='overlay'>
            <div onClick={(e) => e.stopPropagation()} className='modal-content ' >
          <h3>Create an Order</h3>

          <Form onSubmit={onSubmit} error={!!state.errorMessage}>

          <Form.Field>
            <label>Order Id</label>
            <Input
              value={state.orderId}
              onChange={(event) =>
                setState({ ...state, orderId: event.target.value })
              }
            />
          </Form.Field>
          
          <Form.Field>
            <label>manufacturerName</label>
            <Input
              value={state.manufacturerName}
              onChange={(event) =>
                setState({ ...state, manufacturerName: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>supplierName</label>
            <Input
              value={state.supplierName}
              onChange={(event) =>
                setState({ ...state, supplierName: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>invoiceReport</label>
            <Input
              type="file"
              onChange={(event) =>
                setState({ ...state, invoiceReport: event.target.files[0] })
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
    </>
  )
}
export default Test4Modal;