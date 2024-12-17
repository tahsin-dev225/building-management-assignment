import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Components/Pages/Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useBookings = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const {data : bookings = [] , refetch} = useQuery({
        queryKey:['bookings', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/bookings?email=${user.email}`)
            return res.data;
        }
    })
    return [bookings, refetch]
};

export default useBookings;