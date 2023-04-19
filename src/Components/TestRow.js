import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";


const TestRow = ({orderID, inspectedBy, approvedBy, ether, recipent, status, pdf}) => {
    const { Row, Cell } = Table;
    let dStatus;
    if(!status){
        dStatus = 'not delivered';
    }
    else{
        dStatus = 'delivered';
    }


    return (

        <Row>
        <Cell>{orderID}</Cell>
        <Cell>{inspectedBy}</Cell>
        <Cell>{approvedBy}</Cell>
        <Cell>{ether}</Cell>
        <Cell>{recipent}</Cell>
        <Cell>{dStatus}</Cell>
        <Cell>{pdf}</Cell>
      </Row>
    )
}

export default TestRow;
