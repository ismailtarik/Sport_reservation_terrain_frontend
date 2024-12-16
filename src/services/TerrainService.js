import axios from 'axios';

const TERRAIN_API_BASE_URL = "http://localhost:8084/api/terrains";

class TerrainService {
    getTerrains() {
        return axios.get(TERRAIN_API_BASE_URL)
            .then(response => response)
            .catch(error => {
                console.error("Error fetching terrains:", error);
                return Promise.reject(error);
            });
    }

    getTerrainById(terrainId) {
        return axios.get(`${TERRAIN_API_BASE_URL}/${terrainId}`)
            .then(response => response)
            .catch(error => {
                console.error("Error fetching terrain by ID:", error);
                return Promise.reject(error);
            });
    }

    getTerrainsByCentre(centreId) {
        return axios.get(`${TERRAIN_API_BASE_URL}/centre/${centreId}`)
            .then(response => response)
            .catch(error => {
                console.error("Error fetching terrain by ID:", error);
                return Promise.reject(error);
            });
    }

    addTerrain(terrainData) {
        return axios.post(TERRAIN_API_BASE_URL, terrainData)
            .then(response => response)
            .catch(error => {
                console.error("Error adding new terrain:", error);
                return Promise.reject(error);
            });
    }

    updateTerrain(terrainId, terrainData) {
        return axios.put(`${TERRAIN_API_BASE_URL}/${terrainId}`, terrainData)
            .then(response => response)
            .catch(error => {
                console.error("Error updating terrain:", error);
                return Promise.reject(error);
            });
    }

    deleteTerrain(terrainId) {
        return axios.delete(`${TERRAIN_API_BASE_URL}/${terrainId}`)
            .then(response => response)
            .catch(error => {
                console.error("Error deleting terrain:", error);
                return Promise.reject(error);
            });
    }
}

export default new TerrainService();
