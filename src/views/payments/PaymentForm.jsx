import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./PaymentStyles.css"; // Import des styles

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe has not loaded properly. Please try again.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);

      const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (stripeError) {
        setError(`Stripe error: ${stripeError.message}`);
        setIsProcessing(false);
        return;
      }

      const payload = { paymentMethodId: paymentMethod.id, amount };

      const response = await fetch(
        `${process.env.REACT_APP_PAYMENT_URL}/addCard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Error: ${errorData.error} - ${errorData.message}`);
        setIsProcessing(false);
        return;
      }

      const data = await response.json();

      if (data.paymentIntentId) {
        const confirmResponse = await fetch(
          `${process.env.REACT_APP_PAYMENT_URL}/addCard`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          body: JSON.stringify({
            paymentIntentId: data.paymentIntentId,
          }),
        });

        if (confirmResponse.ok) {
          setPaymentSucceeded(true);
        } else {
          const confirmErrorData = await confirmResponse.json();
          setError(`Error confirming reservation: ${confirmErrorData.message || confirmErrorData.error}`);
        }
      } else {
        setError("PaymentIntent ID is missing from the response.");
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      {/* <h2>Payment Information</h2> */}
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        required
      />

      <label>Card Details</label>
      <div className="card-element-container">
        <CardElement />
      </div>

      {error && <div className="payment-error">{error}</div>}
      {paymentSucceeded && <div className="payment-success">Payment successful! Reservation confirmed.</div>}

      <button type="submit" disabled={isProcessing || !stripe}>
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default PaymentForm;
