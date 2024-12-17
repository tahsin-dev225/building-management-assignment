import { useQuery } from "@tanstack/react-query";
import ApartmntHeader from "../../../Home/Apartment/ApartmntHeader";
import { FiDelete } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";


const AllUsers = () => {

    const axiosSecure = useAxiosSecure();

    const {data : users = [] ,refetch } = useQuery({
        queryKey : ['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })

    const handleMakeAdmin =(user)=>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0 ){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an admin now.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    const handleDeleteUser =(user)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if(result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                .then(res =>{
                    if(res.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                })
                .catch(err =>console.error(err))
            }
          });
    }

    return (
        <div>
            <ApartmntHeader header={"All Users"} title={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ducimus aut voluptatum esse ab accusantium? Fugit, nesciunt molestias? Magnam?"}></ApartmntHeader>
            <div className="overflow-x-auto">
                
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user, idx) =><tr key={idx}>
                        <th>{idx +1}</th>
                        <td>{user?.name}</td>
                        <td>{user.email}</td>
                        <th>
                             {user.role === 'admin' ? 'Admin' : <button onClick={()=>handleMakeAdmin(user)} className="flex items-center justify-center gap-1" >Make Admin<FaCircleUser></FaCircleUser></button>} 
                        </th>
                        <th onClick={()=> handleDeleteUser(user)} className="text-2xl cursor-pointer"> <FiDelete></FiDelete> </th>
                    </tr>)
                    }
                    
                    </tbody>
                </table>
                </div>
        </div>
    );
};

export default AllUsers;