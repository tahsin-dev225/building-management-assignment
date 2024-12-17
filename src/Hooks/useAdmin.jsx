import { useContext } from "react";
import { AuthContext } from "../Components/Pages/Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const useAdmin = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure =  useAxiosSecure();
    const {data :isAdmin,isPending: isAdminLoading }= useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log(res.data);
            return res?.data?.admin;
        }
    })

    return [isAdmin, isAdminLoading]
};

export default useAdmin;