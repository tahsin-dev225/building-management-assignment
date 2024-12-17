import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imgae_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddApartment = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async data => {
        console.log(data)
        const  imageFile = {image: data.image[0]}
        const res = await axios.post(imgae_hosting_api , imageFile,{
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
         console.log('with img url',res.data)
        if(res.data.success){
            const apartmentDetails = {
                location : data.location,
                category : data.category,
                map : data.map,
                price : data.price,
                description : data.description,
                image : res.data.data.display_url,
            }
            const detailsRes = await axiosPublic.post('/apartmentDetails', apartmentDetails);
            if(detailsRes.data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.location} added in the  apartment details`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reset()
                  console.log( 'details added',detailsRes.data)
            }
        }
       
    }

    return (
        <div className="w-full h-screen  bg-white">
            
            <h1 className="text-center md:text-4xl text-xl border-b-2 px-3 rounded-md shadow-sm border-blue-200 w-max font-bold pt-8 pb-6 mx-auto">Add Apartments</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="md:w-4/6 shadow-2xl shadow-blue-500 mx-auto my-10 p-8 rounded-lg bg-white" >
                <p className="px-2 md:px-6 py-3 rounded md:text-2xl font-mono text-white bg-orange-600 bg-opacity-80">Please add all the information carefully.</p>
                <div className="grid my-5 grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <input  placeholder="location" className="px-3 py-2 outline-none rounded-md bg-slate-200" {...register("location")} />
                    <select defaultValue={'defalt'} className="px-3 py-2  outline-none rounded-md bg-slate-200" {...register("category")}>
                        <option disabled className="outline-none text-white bg-indigo-950" value="defalt">Category</option>
                        <option className="outline-none text-white bg-indigo-950" value="rent">rent</option>
                        <option className="outline-none text-white bg-indigo-950" value="sale">sale</option>
                    </select>
                    <input  placeholder="Map" className="px-3 py-2 outline-none rounded-md bg-slate-200" {...register("map")} />
                    <input  placeholder="price" className="px-3 py-2 outline-none rounded-md bg-slate-200" {...register("price")} />
                    <input  placeholder="description" className="px-3 py-2 outline-none rounded-md md:col-span-2  bg-slate-200" {...register("description")} />
                    <div className=" my-6 w-full">
                        <input {...register('image',{required:true})} type="file" className="file-input w-full  md:w-max" />
                    </div>
                </div>
                <input className="w-full btn bg-pink-800" type="submit" />
            </form>
        </div>
    );
};

export default AddApartment;