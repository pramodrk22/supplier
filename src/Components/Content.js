import { useLocation } from 'react-router-dom';
//import Dashboard from './Dashboard';
import Report from './Report';
import Shipment from './Shipment';
import Payment from './Payment';
import Dashboard from './OrderDashboard';

function Content() {
    const location = useLocation();
    console.log("location", location);
    return (
        <>
            {location && location.pathname === "/report" && <Report />}
            {location && location.pathname === "/shipment" && <Shipment />}
            {location && location.pathname === "/payment" && <Payment />}
            {location && location.pathname === "/dashboard" && <Dashboard />}
            {/* {location && location.pathname === "/user" && <Employee />}
            {location && location.pathname === "/TransactionHistory" && <TransactionHistory />} */}
        </>
    )
}
export default Content;