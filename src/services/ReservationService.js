import axios from 'axios';

const RESERVATION_API_BASE_URL = "http://localhost:8086/api/reservations";

class ReservationService {
    getReservations() {
        return axios.get(RESERVATION_API_BASE_URL)
            .then(response => response)
            .catch(error => {
                console.error("Error fetching reservations:", error);
                return Promise.reject(error);
            });
    }

    createReservation(reservation) {
        return axios.post(RESERVATION_API_BASE_URL, reservation)
            .then(response => response)
            .catch(error => {
                console.error("Error creating reservation:", error);
                return Promise.reject(error);
            });
    }

    getReservationById(reservationNumber) {
        return axios.get(`${RESERVATION_API_BASE_URL}/${reservationNumber}`)
            .then(response => response)
            .catch(error => {
                console.error("Error fetching reservation by ID:", error);
                return Promise.reject(error);
            });
    }

    getReservationByTerrainId(terrainId) {
        return axios.get(`${RESERVATION_API_BASE_URL}/terrain/${terrainId}`)
            .then(response => response)
            .catch(error => {
                console.error("Error fetching reservations by terrain ID:", error);
                return Promise.reject(error);
            });
    }

    updateReservation(reservation, reservationNumber) {
        return axios.patch(`${RESERVATION_API_BASE_URL}/${reservationNumber}`, reservation)
            .then(response => response)
            .catch(error => {
                console.error("Error updating reservation:", error);
                return Promise.reject(error);
            });
    }

    deleteReservation(reservationNumber) {
        return axios.delete(`${RESERVATION_API_BASE_URL}/${reservationNumber}`)
            .then(response => response)
            .catch(error => {
                console.error("Error deleting reservation:", error);
                return Promise.reject(error);
            });
    }
}

export default new ReservationService();
