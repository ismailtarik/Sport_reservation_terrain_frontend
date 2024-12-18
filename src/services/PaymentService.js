import axios from 'axios';

const PAYMENT_API_BASE_URL = process.env.REACT_APP_PAYMENT_URL;
// const PAYMENT_API_BASE_URL = "http://localhost:9091/api/payment";

class PaymentService {

    addCard(payload) {
        return axios.post(`${PAYMENT_API_BASE_URL}/addCard`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.data)
            .catch(error => {
                console.error("Error adding card:", error);
                return Promise.reject(error.response?.data || "Failed to add card");
            });
    }

    confirmPayment(payload) {
        return axios.post(`${PAYMENT_API_BASE_URL}/confirmReservation`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.data)
            .catch(error => {
                console.error("Error confirming payment:", error);
                return Promise.reject(error.response?.data || "Failed to confirm payment");
            });
    }
}

export default new PaymentService();
