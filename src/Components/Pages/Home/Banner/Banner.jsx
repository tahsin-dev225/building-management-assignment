import { Swiper, SwiperSlide } from 'swiper/react';

import './banner.css'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import banner1 from '../../../../assets/banner-building.jpg'
import banner2 from '../../../../assets/bnr.jpg'
import banner3 from '../../../../assets/banner-building3.jpg'
import banner4 from '../../../../assets/bnrr.jpg'


import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Banner = () => {
    return (
        <div className='flex relative py-5 pt-16 bg-opacity-20 md:bg-opacity-5 bg-black justify-between  md:px-12 gap-5 items-center'>
            <div className="md:w-1/2 w-full mt md:h-auto h-full bg-black bg-opacity-10 md:text-left text-center mx-auto bnr absolute z-10 md:static shadow-sm p-6 rounded-lg">
                <h1 className="md:text-6xl  text-2xl text-yellow-400 font-semibold">THEVA APARTMENT .</h1>
                <h1 className="my-2 md:my-4 text-black md:text-white text-sm  p-1">Our company has a great repotation for providing the best building management system. and we have all kind  of apartment details.We always care about our customers.</h1>
                <Link to='/apartment' className='p-2 mx-auto md:m-0  flex w-max items-center gap-2 px-3 bg-gradient-to-r from-amber-400 to-stone-500 text-white md:font-bold rounded-sm'>See Apartment <FaArrowRight></FaArrowRight> </Link>
            </div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation ]}
                className="mySwiper lg:h-[700px] opacity-45 md:opacity-90 shadow md:w-1/2"
            >
                    <SwiperSlide className='w-full lg:flex lg:justify-center lg:items-center lg:h-full md:p-10'>
                        <img className='w-full rounded-md lg:h-[80%]' src={banner1} alt="" />
                    </SwiperSlide>
                    <SwiperSlide className='w-full lg:flex lg:justify-center lg:items-center lg:h-full md:p-10'>
                        <img className='w-full rounded-md lg:h-[80%]' src={banner2} alt="" />
                    </SwiperSlide>
                    <SwiperSlide className='w-full lg:flex lg:justify-center lg:items-center lg:h-full md:p-10'>
                        <img className='w-full rounded-md lg:h-[80%]' src={banner3} alt="" />
                    </SwiperSlide>
                    <SwiperSlide className='w-full lg:flex lg:justify-center lg:items-center lg:h-full md:p-10'>
                        <img className='w-full rounded-md lg:h-[80%]' src={banner4} alt="" />
                    </SwiperSlide>
                    
            </Swiper>
            <div className="hidden  md:flex absolute h-full w-full left-0 top-0 banner-bg-img -z-20 "  ></div>
        </div>
    );
};

export default Banner;