import "./Sidebar.css";
import { Link } from "react-router-dom";
import logo from '../Assets/admin-logo.jfif';
import sonatalogo from '../Assets/sonata-logo.png';
import { useLocation } from 'react-router-dom';

function Sidebar() {
    function handleLogout() {
    }
    const location = useLocation();
    let userinfo = localStorage.getItem("user-info");
    const obj = JSON.parse(userinfo);

    return (
        <>
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div className="d-flex flex-column align-items-center px-2 pt-2 text-white min-vh-100">
                    {/* <span>    {sonatalogo && <img className='sonata-logo' src={sonatalogo} />}    </span><br /> */}

                    <span >
                        {logo && <img className='image-logo' src={logo} />}
                    </span>
                    <span className='name pt-1 px-2'>
                        {/* {obj.firstName}&nbsp;{obj.lastName} */}Akshay
                    </span><br />

                    {(location && location.pathname === "/dashboard") || (location && location.pathname === "/report")|| (location && location.pathname === "/shipment") ?
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center" id="menu">
                            <li className="nav-item">
                                
                                    <Link to="/dashboard" className='remove-under-line'>
                                        Dashboard
                                    </Link>
                               
                                
                            </li>

                            <li className="nav-item">
                                <Link to="/report" className='remove-under-line'>
                                    Report
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/shipment" className='remove-under-line'>
                                    Shipment
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/" className="remove-under-line">
                                    <span onClick={handleLogout}>Logout</span>
                                </Link>
                            </li>
                        </ul>

                        : (location && location.pathname === "/user") ?
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center " id="menu">
                                <br />
                                <li className="nav-item">
                                    <Link to="/" className="remove-under-line">
                                        <span onClick={handleLogout}>Logout</span>
                                    </Link>
                                </li>
                            </ul>
                            : ""}
                </div>
            </div>
        </>
    )
}
export default Sidebar;