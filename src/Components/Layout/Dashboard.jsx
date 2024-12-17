import { NavLink, Outlet } from "react-router-dom";
import logo from '../../assets/Frame 8.jpg'
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {

    const [isAdmin] = useAdmin();

    return (
        <div className="flex  items-center">
            <div className="md:w-[20%] border-r-2 border-red-200 bg-white shadow-2xl">
                <div className="h-screen"> 
                    <img src={logo} className="mx-auto px-1 shadow-2xl pt-4" />
                    <ul className="menu space-y-2">
                       {
                        isAdmin ? <>
                           <li><NavLink to="/dashboard/adminHome">Admin Home</NavLink></li> 
                           <li><NavLink to="/dashboard/allUsers">Users</NavLink></li>
                           <li><NavLink to="/dashboard/addApartment">Add Apartment.</NavLink></li> 
                           <li><NavLink to="/dashboard/manageApartment">Manage Apartment.</NavLink></li> 
                        </>
                        :
                        <>
                            <li><NavLink to="/dashboard/booking">My Bookings</NavLink></li>
                            <li><NavLink to="/dashboard/paymentHistory">Payment History</NavLink></li>
                        </>}
                        <div className="w-[95%] mx-auto h-[1px] my-10 bg-gray-300"></div>
                        <>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/apartment">Apartment</NavLink></li>
                        </>
                    </ul>
                </div>    
            </div>
            <div className="w-full ">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;