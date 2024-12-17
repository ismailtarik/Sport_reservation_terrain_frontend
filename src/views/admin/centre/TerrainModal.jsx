import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Modal = ({ centre, closeModal }) => {
  const [terrains, setTerrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all terrains using Axios
    const fetchTerrains = async () => {
      try {
        const response = await axios.get('http://localhost:8088/api/terrains'); // Updated URL
        const allTerrains = response.data;

        // Filter the terrains based on the centreId
        const filteredTerrains = allTerrains.filter(terrain => terrain.centreId === centre.id);

        setTerrains(filteredTerrains); // Set the filtered terrains to the state
      } catch (error) {
        console.error('Error fetching terrains:', error);
      } finally {
        setLoading(false); // Stop loading after fetching the data
      }
    };

    fetchTerrains();
  }, [centre]); // Re-run when the centre prop changes

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Terrain Information for {centre?.nom}</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="styled-table">
            <thead>
            <tr>
              <th>Terrain ID</th>
              <th>Terrain Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Available</th>
            </tr>
            </thead>
            <tbody>
              {terrains.length === 0 ? (
                <tr>
                  <td colSpan="4">No terrains assigned to this centre.</td>
                </tr>
              ) : (
                terrains.map((terrain) => (
                  <tr key={terrain.id}>
                    <td>{terrain.id}</td>
                    <td>{terrain.nom}</td>
                    <td>{terrain.type}</td>
                    <td>{terrain.prix}</td>
                    <td>{terrain.disponible ? 'Available' : 'Not Available'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
        <button className="cancel-btn" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
