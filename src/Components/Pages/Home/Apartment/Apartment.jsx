
import { useEffect, useState } from "react";
import ApartmentCard from "./ApartmentCard";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";


const Apartment = () => {
    const [apartments, setApartment] = useState()

    const axiosPublic = useAxiosPublic();

    useEffect(()=>{
        axiosPublic.get('/apartmentDetails')
        .then(res =>{
            console.log(res.data)
            setApartment(res.data)
        })
    },[axiosPublic])

    return (
        <div className="max-w-7xl mx-auto">
            <div className="my-6 grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-5 ">
                {
                    apartments?.map((aprt ,idx) => <ApartmentCard apartment={aprt} key={idx}></ApartmentCard>)
                }
            </div>
        </div>
    );
};

export default Apartment;