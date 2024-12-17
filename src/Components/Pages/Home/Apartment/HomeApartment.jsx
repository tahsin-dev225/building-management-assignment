import { useEffect, useState } from "react";
import ApartmentCard from "./ApartmentCard";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import ApartmntHeader from "./ApartmntHeader";
import { NavLink } from "react-router-dom";


const HomeApartment = () => {
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
        <div className="max-w-7xl my-16 mb-24 pt-14 mx-auto">
            <ApartmntHeader header={"Apartment"} title={"orem ipsum dolor sit amet consectetur, adipisicing elit. Quis quo eveniet, vero animi quam ab deleniti tempore blanditiis?"}></ApartmntHeader>
            <div className="my-12 grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-5 ">
                {
                    apartments?.slice(0,6).map((aprt ,idx) => <ApartmentCard apartment={aprt} key={idx}></ApartmentCard>)
                }
            </div>
            <div className="flex my-4 justify-center">
                <NavLink to="/apartment" className="btn btn-info">See All Apartments</NavLink>
            </div>
        </div>
    );
};

export default HomeApartment;