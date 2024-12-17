import { useForm } from "react-hook-form";

import logoo from '../../../assets/Frame 7.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";
import SocialLogin from "./SocialLogin";

const Login = () => {
    const {signIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(true)
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const { register, handleSubmit,  formState: { errors } } = useForm();

    useEffect(()=>{
        loadCaptchaEnginge(6);
    },[])

    const onSubmit = (data) => {
        signIn(data.email, data.password)
        .then(result =>{
            console.log(result.user)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Sign Up succesully ",
                showConfirmButton: false,
                timer: 1500
              });
            navigate(from)
        })
    }

    const handleValidateCaptcha = (e) =>{
        const user_captcha_value = e.target.value;
        console.log(user_captcha_value)
        if(validateCaptcha(user_captcha_value) === true){
            setDisabled(false)
        }
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex max-w-7xl justify-center  flex-col items-center mx-2  md:gap-6 my-8 md:mx-auto">
                <img className=" py-2 px-8 rounded shadow-lg my-5 md:my-0 bg-slate-500" src={logoo} alt="" />
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 relative rounded-xl shadow-md bg-opacity-50 md:w-5/12 bg-slate-800">
                    <div className=" w-0  absolute -top-1 shadow-2xl -right-1 border-l-[50px] border-l-transparent  h-0 border-t-[75px] border-t-red-500"></div>
                    <h1 className="sm:text-4xl text-xl flex justify-center gap-4 text-white font-serif font-semibold mx-auto text-center mt-2 mb-7">Login Form</h1>
                    
                    <div className="my-3">
                        <p className="m-2 text-white text-sm">Email</p>
                        <input placeholder="Enter Your Email" {...register("email", {required:true, })} className="w-full p-2 bg-slate-100 rounded" />
                    </div>
                    {errors.email && <span>This field is required</span>}
                    <div className="my-3">
                        <p className="m-2 text-white text-sm">Password</p>
                        <input type="password" placeholder="Enter Your Password" {...register("password", {required:true, password:true})} className="w-full p-2 bg-slate-100 rounded" />
                    </div>
                    {errors.password && <span>This field is required</span>}

                    <div className="form-control mt-5 my-3">
                        <LoadCanvasTemplate></LoadCanvasTemplate>
                        <input onBlur={handleValidateCaptcha} placeholder="Type the text above" name="validCaptcha" className="w-full p-2 my-3 bg-slate-100 rounded" />
                    </div>
                    
                    <input disabled={disabled} type="submit" className="text-white btn w-full font-bold bg-blue-800 rounded-md my-3 mt-6" />

                    <div className=" md:flex justify-evenly items-center md:mt-12">
                        <SocialLogin></SocialLogin>
                        <h1 className="bg-white rounded backdrop-blur-3xl bg-opacity-20 p-2">
                            Do not have account ? <Link to='/signup' className="btn-link"> Sing Up </Link>
                        </h1>
                        </div>
                </form>
                {/* <div className="">
                    <h1 className="text-5xl mx-auto my-5 leading-snug text-center ">Login Here For Get All Service And Booking.</h1>
                </div> */}
            </div>
            <div className="w-[200%] fixed -left-[50%] right-0 -top-[50%] -rotate-[39deg] -z-10 lg:-rotate-[25deg]">
                <div className="w-full h-screen bg-white"></div>
                <div className="w-full h-screen bg-cyan-800"></div>
            </div>
        </div>
    );
};

export default Login;