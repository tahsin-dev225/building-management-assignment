import { HiOutlineUserAdd } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoo from '../../../assets/Frame 7.png'
import { useContext, useState } from "react";
import { AuthContext } from "../../Pages/Provider/AuthProvider";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { FaUser } from "react-icons/fa";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
    const {user,logOut } = useContext(AuthContext)
    const navigate = useNavigate();
    const [isAdmin] = useAdmin();
    console.log(user)

    const [isOpen, setIsOpen] = useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const handleLogOut = ()=>{
        logOut()
        .then(()=>{
            console.log('log Out user')
            navigate('/')
        })
    }

    const navOptions =<>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/apartment'>Apartment</NavLink></li>
        { isAdmin && user && <li><NavLink to='/dashboard/adminHome'>Dashboard</NavLink></li> }
        {!isAdmin && user && <li><NavLink to='/dashboard/booking'>Bookings</NavLink></li>}
       
    </>

    return (
        <div className="navbar md:fixed md:z-10 text-white bg-black">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[20] mt-3 w-52 p-2 shadow">
                    {navOptions}
                </ul>
                </div>
                <img className="mx-5 my-2 max-h-10  " src={logoo} alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        
                        {
                           user.photoUrl === null ? 
                           <div onClick={toggleDrawer} className="btn-circle border cursor-pointer flex justify-center items-center"><FaUser></FaUser></div>:
                           <img className="h-12 w-12 cursor-pointer rounded-full" src={user.photoURL} onClick={toggleDrawer} />
                        } 
                        <Drawer
                            open={isOpen}
                            onClose={toggleDrawer}
                            direction='right'
                            className='flex !bg-black md:!w-[30%]  w-full flex-col justify-center items-center'
                        >
                            <div className="p-4 ">
                                <div className="flex  justify-center items-center">
                                {user.photoUrl === null ? <div  className="btn-circle border flex justify-center items-center"><FaUser></FaUser></div> : 
                                <img  src={user.photoURL} className="h-12 w-12 cursor-pointer rounded-full" onClick={toggleDrawer} />  
                                }
                                </div>
                                <div className="my-12">
                                    <h1 className="text-md my-4 text-white">Name : {user.displayName ? user?.displayName : 'No name'}</h1>
                                    <h1 className="text-md  my-4 text-white">Email : {user.email ? user?.email : 'no email'}</h1>
                                </div>
                                <button onClick={handleLogOut} className="btn btn-error text-white">Logout</button>
                            </div>
                        </Drawer>
                    </>:
                    <Link to="/login" className="flex items-center border pr-2 h-10 rounded-md gap-">
                        <button className="btn btn-link text-orange-300 ">Login</button>
                        <HiOutlineUserAdd className="text-orange-300"></HiOutlineUserAdd>
                    </Link>
                }
            </div>
        </div>
    );
};

export default Navbar;