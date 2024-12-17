import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import useBookings from "../../../../../Hooks/useBookings";
import ApartmntHeader from "../../../Home/Apartment/ApartmntHeader";
import { FiDelete } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BiPhoneCall } from "react-icons/bi";


const MyBooking = () => {
    const [bookings,refetch] = useBookings();
    const axiosSecure = useAxiosSecure();
    const totalPrice = bookings.reduce( (total,item) => total + parseInt(item.price) ,0)

    const bookACall =()=>{
        Swal.fire("01331224641");
    }

    const handleDeleteBookings = (id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) =>{
                if (result.isConfirmed){
                    axiosSecure.delete(`/bookings/${id}`)
                    .then(res =>{
                        if(res.data.deletedCount > 0){
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                                });  
                        }
                    })
                }
          })
    }

    return (
        <div className="h-screen">
            <ApartmntHeader header="My Bookings." ></ApartmntHeader>
            <div className="flex justify-evenly">
                
                <h2 className="text-4xl text-red-400">Total Price : {totalPrice} $</h2>
                {bookings.length  ? 
                    <button onClick={bookACall} className="btn btn-sm text-white btn-primary">Book a call <BiPhoneCall></BiPhoneCall></button>
                :
                <button disabled className="btn btn-sm text-white btn-primary">Book a call <BiPhoneCall></BiPhoneCall></button>}
            </div>
            <div className="overflow-x-auto">
                
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Location Name</th>
                            <th>price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        bookings.map((booking, idx) =><tr key={idx}>
                        <th>{idx +1}</th>
                        <td>{booking?.location}</td>
                        <td>{booking.price}</td>
                        
                        <th onClick={()=> handleDeleteBookings(booking._id)} className="text-2xl cursor-pointer"> <FiDelete></FiDelete> </th>
                    </tr>)
                    }
                    
                    </tbody>
                </table>
                {bookings.length ? <Link className="flex my-12" to="/dashboard/payment">
                    <button className="btn text-white btn-sm mx-auto  w-1/2 btn-primary">Pay</button>
                </Link>:
                <div className="flex justify-center my-12">
                    <button disabled className="btn btn-sm text-white w-1/2 btn-primary">Pay</button>
                </div>}
            </div>
        </div>
    );
};

export default MyBooking;