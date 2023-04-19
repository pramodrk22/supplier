import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";


const ShipmentRows = ({orderID,logistcsProviderName,status,shipmentDetails,billOfLanding,deliveryRecipt }) => {
    const { Row, Cell } = Table;
    


    return (

        <Row>
        <Cell>{orderID}</Cell>
        <Cell>{logistcsProviderName}</Cell>
        <Cell>{status}</Cell>
        <Cell>{shipmentDetails}</Cell>
        <Cell>{billOfLanding}</Cell>
        <Cell>{deliveryRecipt}</Cell>
      </Row>
    )
}

export default ShipmentRows;
