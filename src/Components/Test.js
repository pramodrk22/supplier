import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import eye from '../Assets/eye.png';
import downloadLogo from '../Assets/download-logo.png';
import uploadLogo from '../Assets/upload-logo.png';

import TestModal from './TestModal';
import PDFViewer from './PDFViewer';

import './Shipment.css';

import factory from '../ethereum/factory'
import Campaign from '../ethereum/campaign'

import TestRow from './TestRow';

import { Button, Table } from "semantic-ui-react";
//import TestModal from './TestModal';


const Test = () => {

  const [campaigns, setCampaigns] = useState([]);

  const address = '0x85b2cE00d3e0eb8835E5721ad811D4Ba187d3d85';
  const [request, setRequest] = useState([])

 useEffect( () => {
  const address = '0x85b2cE00d3e0eb8835E5721ad811D4Ba187d3d85'
  const campaign = Campaign(address);
  console.log('use effect campaign',campaign);
  (async () => {
    const requestCount = await campaign.methods.getRequestsCount().call();
    console.log('req count', requestCount);
    const approversCount = await campaign.methods.approversCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          
          return campaign.methods.requests(index).call();
        })
    );
    setRequest(requests)
    console.log('useeffect requests', requests);
    return { address, requests, requestCount, approversCount };
  } )();
  
    
    return () => {
        
    }
   
 },[])

 const renderRows =  () => {
  console.log(campaigns);
  return request.map((request, index) => {
      console.log('reuest is ',request);
      return (
        <TestRow
          orderID={request[0]}
          inspectedBy={request[1]}
          approvedBy={request[2]}
          ether={request[3]}
          recipent={request[5]}
          status={request[6]}
          pdf={request[4]}
        />
      );
    });
}

const [shipmentCreate, setShipmentCreate] = useState(false);

const createBtnClicked = () => {
  setShipmentCreate(true);
}

return (
  <div>
  <h3>Test</h3>
<button type="button" class="btn btn-primary mb-2" style={{position: 'absolute', top:'13px', right:'25px'}} onClick={createBtnClicked}>Create</button>

  
<Table class="ui celled table">
<Table.Header>
  <Table.Row>
    <Table.HeaderCell>orderID</Table.HeaderCell>
    <Table.HeaderCell>inspected By</Table.HeaderCell>
    <Table.HeaderCell>approved by</Table.HeaderCell>
    <Table.HeaderCell>ether</Table.HeaderCell>
    <Table.HeaderCell>recipent</Table.HeaderCell>
    <Table.HeaderCell>status</Table.HeaderCell>
    <Table.HeaderCell>pdf</Table.HeaderCell>
  </Table.Row>
</Table.Header>
<Table.Body>{renderRows()}</Table.Body>
</Table>
{/* <div>Found {this.props.requestCount} requests.</div> */}

<TestModal open={shipmentCreate} onClose={() => setShipmentCreate(false)} rowInfo={[1]}/>

</div>


)

}

export default Test