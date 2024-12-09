import axios from 'axios';

const RESERVATION_API_BASE_URL = "http://localhost:8080/api/reservations";

class ReservationService {
    getReservations() {
        return axios.get(RESERVATION_API_BASE_URL);
    }

    createReservation(reservation) {
        return axios.post(RESERVATION_API_BASE_URL, reservation);
    }

    getReservationById(reservationNumber) {
        return axios.get(RESERVATION_API_BASE_URL + '/' + reservationNumber);
    }

    // Get all reservations by terrainId
    getReservationByTerrainId(terrainId) {
        return axios.get(RESERVATION_API_BASE_URL + '/terrain/' + terrainId);
    }

    updateReservation(reservation, reservationNumber) {
        return axios.put(RESERVATION_API_BASE_URL + '/' + reservationNumber, reservation);
    }

    deleteReservation(reservationNumber) {
        return axios.delete(RESERVATION_API_BASE_URL + '/' + reservationNumber);
    }
}

export default new ReservationService();