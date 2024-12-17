import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ApartmentDetails = () => {
    const apartment = useLoaderData()
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const locationn = useLocation()
    // console.log(apartment)

    const bookApartment =(e)=>{
        e.preventDefault();
        const formData = e.target;
        // console.log(formData.month.value)
        const bookingApartment = {
            month: formData?.month?.value || null,
            apartmentId : apartment.data._id,
            email: user.email,
            location : apartment.data.location,
            price: apartment.data.price
        }
        if(user && user.email){
            axiosSecure.post('/bookings', bookingApartment)
            .then(res =>{
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} added to the cart`,
                        showConfirmButton: false,
                        timer: 1000
                      });
                }
            })
        }else{
            Swal.fire({
                title: "You are not logged in",
                text: "Please login to add to cart ",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state:{from : locationn}})
                }
              });
        }
        console.log('booked Apartment',bookingApartment)
    }
    return (
        <div className=' max-w-7xl mx-auto md:py-24 bg-white dark:bg-transparent  rounded'>
            <h1 className="mx-auto text-center text-2xl md:text-5xl font-medium my-8 text-green-500">{apartment?.data?.location}</h1>
            <div className=" py-5 px-1 rounded-lg items-center flex w-full gap-6 shadow-lg flex-col md:flex-row">
                <div className="p-1 shadow-2xl md:p-0 md:!w-10/12 md:h-full">
                    <img className='rounded-lg' src={apartment?.data?.image} alt="" />
                </div>
                <form onSubmit={bookApartment} className="p-3 shadow-2xl">
                    <div className="flex gap-2">
                        <iframe className=' mx-auto md:h-56' src={apartment?.data?.map} ></iframe>
                        {
                        apartment?.data?.category === 'rent' ? <div className="my-2">
                            <label className='mx-4 text-sm text-slate-500'>Chose the month.</label>
                            <input type="month"  placeholder='Chose The Month' required name="month" className='p-2 w-full shadow-lg  my-2' />
                        </div>:''
                        }
                    </div>
                    <p className="my-5 "><span className='font-semibold text-lg'>Details</span> : {apartment?.data?.description}</p>
                    <div className="flex text-3xl font-medium my-5 px-4 text-red-300 justify-between">
                        <p className="drop-shadow-2xl">$ {apartment?.data?.price} / per month</p>
                        <p className="">{apartment?.data?.category}</p>
                    </div>
                    
                    {
                       apartment?.data?.category === 'rent' ? <input type="submit" value="Book This" className='btn btn-primary w-full text-white' />
                       :
                       <button className=' w-full btn-primary btn text-white '>Buy This Apartment/Building</button>
                       }
                </form>
            </div>
        </div>
    );
};

export default ApartmentDetails;