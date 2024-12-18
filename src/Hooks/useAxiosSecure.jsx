import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Components/Pages/Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL : 'https://building-management-assignment-server.onrender.com',
    withCredentials: true
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useContext(AuthContext)

    // reqest interceptor to add authorization header for every for secure call to the api 
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        console.log('request stopped by interceptor before adding token', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    },function(error){
        return Promise.reject(error);
    })

    // intercepts 403 and 401 status
    axiosSecure.interceptors.response.use(function(response){
            return response;
        }, async (error) =>{
            const status = error?.response?.status;
            console.log('status error in the interceptor', status)
            // for 401 and 403 logout the user and move to the login page
            if(status === 403){
                await logOut();
                navigate('/login')
            }
            return Promise.reject(error);
        })

    return axiosSecure
};

export default useAxiosSecure;