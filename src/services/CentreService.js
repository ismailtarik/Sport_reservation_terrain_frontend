import axios from 'axios';

const CENTRE_API_BASE_URL = "http://localhost:8085/api/centres";

class CentreService {
    getCentres() {
        return axios.get(CENTRE_API_BASE_URL)
            .then(response => response)
            .catch(error => {
                console.error("Error fetching centres:", error);
                return Promise.reject(error);
            });
    }

    getCentreById(centreId) {
        return axios.get(`${CENTRE_API_BASE_URL}/${centreId}`)
            .then(response => response)
            .catch(error => {
                console.error("Error fetching centre by ID:", error);
                return Promise.reject(error);
            });
    }

    addCentre(centreData) {
        return axios.post(CENTRE_API_BASE_URL, centreData)
            .then(response => response)
            .catch(error => {
                console.error("Error adding new centre:", error);
                return Promise.reject(error);
            });
    }

    updateCentre(centreId, centreData) {
        return axios.put(`${CENTRE_API_BASE_URL}/${centreId}`, centreData)
            .then(response => response)
            .catch(error => {
                console.error("Error updating centre:", error);
                return Promise.reject(error);
            });
    }

    deleteCentre(centreId) {
        return axios.delete(`${CENTRE_API_BASE_URL}/${centreId}`)
            .then(response => response)
            .catch(error => {
                console.error("Error deleting centre:", error);
                return Promise.reject(error);
            });
    }
}

export default new CentreService();
