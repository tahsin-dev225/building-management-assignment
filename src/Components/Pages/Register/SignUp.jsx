import { useForm } from 'react-hook-form';
import logoo from '../../../assets/Frame 7.png'
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import SocialLogin from './SocialLogin';


const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
    const {createUser,updateUserProfile} = useContext(AuthContext)
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const { register, handleSubmit,reset,  formState: { errors } } = useForm();

    const onSubmit = data => {

        createUser(data.email, data.password)
        .then(() =>{
            updateUserProfile(data.name,data.photo)
            .then(() =>{
                const userInfo = {
                    name: data.name,
                    email: data.email,
                }
                axiosPublic.post('/users',userInfo)
                .then((result)=>{
                    if(result.data.insertedId){
                        reset();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Sign Up succesully ",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(from)
                    }
                })
            })
        })
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex max-w-7xl justify-center flex-col items-center mx-2  md:gap-6 pt-20 py-8 md:mx-auto">
                <img className=" py-2 px-8 rounded shadow-lg my-5 md:my-0 bg-slate-500" src={logoo} alt="" />
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 rounded-xl shadow-md bg-opacity-50 md:w-5/12 bg-slate-800">
                    <h1 className="sm:text-4xl text-xl  flex justify-center gap-4 text-white font-serif font-semibold mx-auto text-center mt-2 mb-7">Sign Up Form</h1>
                    <div className="my-3">
                        <p className="m-2 text-white text-sm">Name</p>
                        <input placeholder="Enter Your Name..." {...register("name" , {required:true, })} className="w-full p-2 bg-slate-100 rounded" />
                    </div>
                    {errors.name && <span>This field is required</span>}
                    <div className="my-3">
                        <p className="m-2 text-white text-sm">Photo</p>
                        <input placeholder="Enter Photo Url" {...register("photo", {required:true, })} className="w-full p-2 bg-slate-100 rounded" />
                    </div>
                    {errors.photo && <span>This field is required</span>}
                    <div className="my-3">
                        <p className="m-2 text-white text-sm">email</p>
                        <input placeholder="Enter Your Email" {...register("email", {required:true, })} className="w-full p-2 bg-slate-100 rounded" />
                    </div>
                    {errors.email && <span>This field is required</span>}
                    <div className="my-3">
                        <p className="m-2 text-white text-sm">password</p>
                        <input placeholder="Enter Your Password" {...register("password", {required:true, })} className="w-full p-2 bg-slate-100 rounded" />
                    </div>
                    {errors.password && <span>This field is required</span>}
                    
                    <input type="submit" value={'Sign Up'} className="text-white btn w-full font-bold bg-blue-800 rounded-md my-3 mt-6" />

                    <div className=" md:flex justify-evenly items-center md:mt-12">
                        <SocialLogin></SocialLogin>
                        <h1 className="bg-black rounded backdrop-blur-3xl bg-opacity-20 p-2">
                            Do not have any account ? <Link to='/login' className="btn-link">Login </Link>
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

export default SignUp;