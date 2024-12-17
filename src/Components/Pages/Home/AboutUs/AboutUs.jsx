import { FcCheckmark } from 'react-icons/fc';
import aboutUs from '../../../../assets/aboutUs.jpg'

const AboutUs = () => {
    return (
        <div className="max-w-7xl my-10 shadow-lg mx-auto">
            <div className="md:flex items-center p-10">
                <div className="p-6">
                    <img className='rounded-2xl shadow' src={aboutUs} alt="" />
                </div>
                <div className="flex p-6 md:w-8/12 flex-col justify-between">
                    <h1 className="text-5xl my-4 font-medium text-red-500">About Us.</h1>
                    <p className="">Our company have a great reputation on building management system.We have a great number of expreaced employee. Lorem ipsum dolor, sit a Iste.
                    </p>
                    <ul className='p-4 font-medium shadow-sm space-y-3'>
                        <li className='flex gap-3 '><FcCheckmark></FcCheckmark>Security and privacy Features.</li>
                        <li className='flex gap-3 '><FcCheckmark></FcCheckmark>Always touched with our users.</li>
                        <li className='flex gap-3 '><FcCheckmark></FcCheckmark>Best price for rent apartment and sale.</li>
                        <li className='flex gap-3 '><FcCheckmark>.</FcCheckmark>Hassale free Documents</li>
                        <li className='flex gap-3 '><FcCheckmark></FcCheckmark>Provides best service and cheap price.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;