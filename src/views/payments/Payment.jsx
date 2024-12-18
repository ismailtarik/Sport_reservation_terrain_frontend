import React from "react";
import { useLocation } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import "./PaymentStyles.css"; // Import des styles

const stripePromise = loadStripe("pk_test_51QL5EyFY8ODNUY9tACjvXNxWLOVSXlKZrvbmT5zX0PYHTIax08Ax9h49oDzcopnq4PigCANMJ2nUyVYf9eiFMsKT00T6h2IjUn");

const Payment = () => {
    const location = useLocation();
    const reservationData = location.state;

    if (!reservationData) {
        return <p>Error: No reservation data found. Please go back and try again.</p>;
    }
  return (
    <div className="payment-container">
      <h1>Payment for Reservation</h1>
      <Elements stripe={stripePromise}>
        <PaymentForm reservationData={reservationData} />
      </Elements>
    </div>
  );
};

export default Payment;
