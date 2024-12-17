import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";


const Main = () => {

    const location = useLocation();
    const noHeader = location.pathname.includes('login') || location.pathname.includes('signUp')

    return (
        <div className="">
            {noHeader ||  <Navbar></Navbar> }
            <div className=" mx-auto">
                <Outlet></Outlet>
            </div>
            {noHeader ||  <Footer></Footer> }
            {/* <div className="w-[200%] fixed -left-[50%] right-0 -top-[50%] -z-10 -rotate-[25deg]">
                <div className="w-full h-screen bg-white"></div>
                <div className="w-full h-screen bg-cyan-800"></div>
            </div> */}
            
        </div>
    );
};

export default Main;