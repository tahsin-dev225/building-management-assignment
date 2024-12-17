import { TiDelete } from "react-icons/ti";
import useApartments from "../../../../../Hooks/useApartments";
import ApartmntHeader from "../../../Home/Apartment/ApartmntHeader";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { BiEdit } from "react-icons/bi";
import { NavLink } from "react-router-dom";


const ManageApartment = () => {
    const [apartments,,refetch] = useApartments();
    const axiosSecure = useAxiosSecure();


    const handleDeleteApartment =(apartment)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) =>{
            if(result.isConfirmed){
                const res =await axiosSecure.delete(`/apartmentDetails/${apartment._id}`);
                console.log(res.data)
                if(res.data.deletedCount > 0){
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `You have deleted ${apartment.location}`,
                        showConfirmButton: false,
                        timer: 1000
                      });
                }
            }
          })
        
    }


    return (
        <div>
            <ApartmntHeader header={"Manage Items"} title={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ducimus aut voluptatum esse ab accusantium? Fugit, nesciunt molestias? Magnam?"}></ApartmntHeader>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>location</th>
                            <th>category</th>
                            <th>price</th>
                            <th>Update</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            apartments.map((aprt, idx) =><tr key={idx}>
                            <th>{idx +1}</th>
                            <td>{aprt.location}</td>
                            <td>{aprt.category}</td>
                            <th>
                                {aprt.price} 
                            </th>
                            <th className="text-xl "><NavLink to={`/dashboard/updateApartment/${aprt._id}`}><BiEdit></BiEdit></NavLink></th>
                            <th onClick={()=>handleDeleteApartment(aprt)} className="text-2xl cursor-pointer"> <TiDelete></TiDelete> </th>
                        </tr>)
                        }
                        
                        </tbody>
                    </table>
            </div>
        </div>
    );
};

export default ManageApartment;