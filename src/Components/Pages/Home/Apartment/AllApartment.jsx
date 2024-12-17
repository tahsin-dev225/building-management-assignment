import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Apartment from "./Apartment";
import { useState } from "react";
import useApartments from "../../../../Hooks/useApartments";
import ApartmntHeader from "./ApartmntHeader";
import ApartmentCard from "./ApartmentCard";

const AllApartment = () => {
    const [activeTab, setActiveTab ] = useState('all')
    const [apartments] = useApartments();
    const rent = apartments.filter(aprt => aprt.category === 'rent')
    const sale = apartments.filter(aprt => aprt.category === 'sale')
    

    return (
        <div className="max-w-7xl pt-16 mb-24 pb-6 mx-auto">
            <ApartmntHeader header={"Apartment"} title={"orem ipsum dolor sit amet consectetur, adipisicing elit. Quis quo eveniet, vero animi quam ab deleniti tempore blanditiis?"}></ApartmntHeader>
            <Tabs>
                <TabList   className="flex cursor-pointer font-semibold gap-3  w-max p-1 px-3">
                    <Tab onClick={()=>setActiveTab("all")} className={`${ activeTab === 'all' ? 'bg-blue-500 py-1 px-4 text-white' : 'py-1 px-4' }`}>All</Tab>
                    <Tab onClick={()=>setActiveTab("rent")} className={`${ activeTab === 'rent' ? 'bg-blue-500 py-1 px-4 text-white' : 'py-1 px-4' }`}>Rent</Tab>
                    <Tab onClick={()=>setActiveTab("sale")} className={`${ activeTab === 'sale' ? 'bg-blue-500 py-1 px-4 text-white' : 'py-1 px-4' }`}>Sale</Tab>
                </TabList>

                <TabPanel>
                    <Apartment></Apartment>
                </TabPanel>
                <TabPanel >
                    <div className="my-6 grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-5 ">
                        {
                            rent?.map((aprt ,idx) => <ApartmentCard apartment={aprt} key={idx}></ApartmentCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="my-6 grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-5 ">
                        {
                            sale?.map((aprt ,idx) => <ApartmentCard apartment={aprt} key={idx}></ApartmentCard>)
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default AllApartment;