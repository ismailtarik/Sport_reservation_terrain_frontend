import axios from 'axios';

// Set base URL for your API (update this URL with your backend's URL)
const API_URL = 'http://localhost:5000/api';  // Change this to your actual API URL

// Set up Axios instance with default configurations
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// CENTRE API METHODS
export const getCentres = async () => {
  try {
    const response = await api.get('/centres');
    return response.data;
  } catch (error) {
    console.error('Error fetching centres:', error);
    throw error;
  }
};

export const getCentreById = async (id) => {
  try {
    const response = await api.get(`/centres/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching centre by ID:', error);
    throw error;
  }
};

export const addCentre = async (centreData) => {
  try {
    const response = await api.post('/centres', centreData);
    return response.data;
  } catch (error) {
    console.error('Error adding new centre:', error);
    throw error;
  }
};

export const updateCentre = async (id, centreData) => {
  try {
    const response = await api.put(`/centres/${id}`, centreData);
    return response.data;
  } catch (error) {
    console.error('Error updating centre:', error);
    throw error;
  }
};

export const deleteCentre = async (id) => {
  try {
    const response = await api.delete(`/centres/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting centre:', error);
    throw error;
  }
};

// TERRAIN API METHODS
export const getTerrains = async () => {
  try {
    const response = await api.get('/terrains');
    return response.data;
  } catch (error) {
    console.error('Error fetching terrains:', error);
    throw error;
  }
};

export const getTerrainById = async (id) => {
  try {
    const response = await api.get(`/terrains/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching terrain by ID:', error);
    throw error;
  }
};

export const addTerrain = async (terrainData) => {
  try {
    const response = await api.post('/terrains', terrainData);
    return response.data;
  } catch (error) {
    console.error('Error adding new terrain:', error);
    throw error;
  }
};

export const updateTerrain = async (id, terrainData) => {
  try {
    const response = await api.put(`/terrains/${id}`, terrainData);
    return response.data;
  } catch (error) {
    console.error('Error updating terrain:', error);
    throw error;
  }
};

export const deleteTerrain = async (id) => {
  try {
    const response = await api.delete(`/terrains/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting terrain:', error);
    throw error;
  }
};
