import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useApartments = () => {
    const axiosPublic = useAxiosPublic();

    const {data : apartments = [] , isPending : loading, refetch} = useQuery({
        queryKey: ['apartments'],
        queryFn: async () =>{
            const res = await axiosPublic.get('/apartmentDetails');
            return res.data;
        }
    })

    return [apartments ,loading, refetch]
};

export default useApartments;