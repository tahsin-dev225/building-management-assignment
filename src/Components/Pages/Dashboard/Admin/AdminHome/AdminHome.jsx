import { BiBookAdd, BiDollar, BiUserCircle } from "react-icons/bi";
import ApartmntHeader from "../../../Home/Apartment/ApartmntHeader";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { PiBuildingApartment } from "react-icons/pi";


const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const {data : stats} = useQuery({
        queryKey : ['amdin-stats'],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })
    console.log('staaaat',stats)

    return (
        <div className="bg-slate-300 -gradient-to-r text-slate-700 pt-3 h-screen ">
            <ApartmntHeader header="Wellcome back." className={"border-b-4 border-dashed border-b-slate-500 w-max mx-auto"}></ApartmntHeader>
            <div className="grid text-orange-400 py-10 items-center  grid-cols-2 gap-6 w-full mx-auto ">
                <div className="flex border  shadow-2xl  justify-evenly items-center p-5 rounded-2xl w-[75%] mx-auto gap-5">
                    <BiDollar className="text-5xl"></BiDollar>
                    <div className="text-center space-y-5">
                        <h1 className="text-3xl font-medium">Revenue</h1>
                        <h1 className="text-3xl font-semibold text-amber-800">{stats?.revenue}</h1>
                    </div>
                </div>
                <div className="flex border shadow-2xl  justify-evenly items-center p-5 rounded-2xl w-[75%] mx-auto gap-5">
                    <BiUserCircle className="text-5xl"></BiUserCircle>
                    <div className="text-center space-y-5">
                        <h1 className="text-3xl font-medium"> All Users</h1>
                        <h1 className="text-3xl font-semibold text-amber-800">{stats?.user}</h1>
                    </div>
                </div>
                <div className="flex border shadow-2xl justify-evenly items-center p-5 rounded-2xl w-[75%] mx-auto gap-5">
                    <BiBookAdd className="text-5xl"></BiBookAdd>
                    <div className="text-center space-y-5">
                        <h1 className="text-3xl font-medium">Booked</h1>
                        <h1 className="text-3xl font-semibold text-amber-800">{stats?.orders}</h1>
                    </div>
                </div>
                <div className="flex border shadow-2xl justify-evenly items-center p-5 rounded-2xl w-[75%] mx-auto gap-5">
                    <PiBuildingApartment className="text-5xl"></PiBuildingApartment>
                    <div className="text-center space-y-5">
                        <h1 className="text-3xl font-medium">Apartments</h1>
                        <h1 className="text-3xl font-semibold text-amber-800">{stats?.allApartments}</h1>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default AdminHome;