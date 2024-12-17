import { Elements } from "@stripe/react-stripe-js";
import ApartmntHeader from "../../../Home/Apartment/ApartmntHeader";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    return (
        <div>
            <ApartmntHeader header="Payments"></ApartmntHeader>
            <div className="">
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;