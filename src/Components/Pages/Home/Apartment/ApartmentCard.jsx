import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowRight } from 'react-icons/fa';

const ApartmentCard = ({apartment}) => {
    return (
        <div className='shadow-2xl flex h-full relative  flex-col bg-white m-2 border-[1px]  rounded-xl '>
            <div className="h- lg:h-80 shadow w-full">
                <img className='h-full w-full rounded-t-xl ' src={apartment.image} alt="" />
            </div>
            <div className="p-3 bg-slate-50 text-slate-800 flex flex-col">
                <h1 className="text-3xl text-[#2DB0BC]  my-3 font-medium">{apartment?.location}</h1>
                <p className="my-1 line-clamp-2">{apartment.description}</p>
                <div className="flex font-semibold flex-grow my-3 px-4 text-red-700 justify-between">
                    <p className="font-bold text-xl">{apartment.price } $</p>
                    <p className="absolute top-0 right-0 px-4 text-lg rounded-tr-xl rounded-bl-xl py-2 bg-sky-200 font-bold">{apartment.category}</p>
                </div>
                
                <NavLink className="" to={`/apartmentDetails/${apartment._id}`}>
                    <button className='p-1 w-full btn btn-primary text-white btn-md '>See Details <FaArrowRight></FaArrowRight></button>
                </NavLink>
            </div>
        </div>
    );
};


ApartmentCard.propTypes = {
    apartment: PropTypes.object,
};

export default ApartmentCard;