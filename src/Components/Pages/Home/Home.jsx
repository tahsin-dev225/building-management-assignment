import AboutUs from "./AboutUs/AboutUs";
import HomeApartment from "./Apartment/HomeApartment";
import Banner from "./Banner/Banner";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AboutUs></AboutUs>
            <HomeApartment></HomeApartment>
        </div>
    );
};

export default Home;