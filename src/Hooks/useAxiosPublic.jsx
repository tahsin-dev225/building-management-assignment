import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://building-management-assignment-server.onrender.com',
    withCredentials : true
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;