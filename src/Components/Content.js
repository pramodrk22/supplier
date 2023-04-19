import { useLocation } from 'react-router-dom';
//import Dashboard from './Dashboard';
import Report from './Report';
import Shipment from './Shipment';
import Payment from './Payment';
import Dashboard from './OrderDashboard';
import Test from './Test';
import Test2 from './Test2';
import Test3 from './Test3';
import Test4 from './Test4';

function Content() {
    const location = useLocation();
    console.log("location", location);
    return (
        <>
            {location && location.pathname === "/report" && <Report />}
            {location && location.pathname === "/shipment" && <Shipment />}
            {location && location.pathname === "/payment" && <Payment />}
            {location && location.pathname === "/dashboard" && <Dashboard />}
            {location && location.pathname === "/test" && <Test />}
            {location && location.pathname === "/test2" && <Test2/>}
            {location && location.pathname === "/test3" && <Test3/>}
            {location && location.pathname === "/test4" && <Test4/>}
            {/* {location && location.pathname === "/user" && <Employee />}
            {location && location.pathname === "/TransactionHistory" && <TransactionHistory />} */}
        </>
    )
}
export default Content;