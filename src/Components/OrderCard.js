import { useEffect, useState } from "react";
import order from "./../Assets/order.png";
import ship from "./../Assets/ship.png"
import './OrderCard.css';
import axios from 'axios';
import ReactDOM from 'react-dom'
import React from 'react'
function Card() {
    //GET NUMBER OF ORDERS
    const [userCount, setUserCount] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:3030/posts')
            .then(response => {
                setUserCount(response.data.length);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    //GET SHIPPED COUNT
    const [shippedOrderCount, setShippedOrderCount] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:3030/posts?status=Shipped')
            .then(response => {
                setShippedOrderCount(response.data.length);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div style={{ display: "flex" }} className="usercard">

                <div className="card text-dark bg-i mb-3" style={{ maxWidth: "18rem", }}>
                    <div className="card-heade">
                        <span className='nftsspan'>
                            <i className='fa fa-users usersicon'></i>
                            {order && <img className="order" src={order} />}
                        </span>
                    </div>
                    <div className="card-footer bg-transparent border-success">
                        <p className="card-text"><b><h3>Orders</h3></b></p>
                        <h5 className="card-title">{userCount}</h5>

                    </div>
                </div>


                <div className="card carduser2 card-user text-dar bg-info-2 mb-3" style={{ maxWidth: "18rem", marginLeft: "20px" }}>
                    <div className="card-heade">
                        <span className='nftsspan'>
                            <i className='fa fa-users usersicon'></i>
                            {ship && <img className="order" src={ship} />}
                        </span>
                    </div>
                    <div class="card-footer bg-transparent border-success">
                        <p className="card-text"><b><h3>Shipped</h3></b></p>
                        <h5 className="card-title">{shippedOrderCount}</h5>

                    </div>
                </div>
            </div>

        </>
    )
}
export default Card;
