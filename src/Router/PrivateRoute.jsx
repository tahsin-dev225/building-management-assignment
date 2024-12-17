import { useContext } from "react";
import { AuthContext } from "../Components/Pages/Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user , loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]" >Loading...</span>
    }

    if(user){
        return children;
    }

    return <Navigate to="/login" state={{from : location}} replace ></Navigate>
};

export default PrivateRoute;