import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handeleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            const userInfo = {
                email: result?.user?.email,
                name: result?.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res.data);
                navigate(from)
            })
        })
    }


    return (
        <div className="flex my-3 flex-1 ml-14">
                <button onClick={handeleGoogleSignIn} className='btn '><FcGoogle className="text-lg"></FcGoogle> Google</button>
        </div>
    );
};

export default SocialLogin;