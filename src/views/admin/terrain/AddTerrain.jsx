import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './terrain.css';

const AddTerrain = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    type: '',
    prix: '',
    disponible: false,
    centreId: '',  // Added field for the selected centre ID
  });

  const [centers, setCenters] = useState([]);

  // Fetch the list of centers when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:8085/api/centres')
      .then((response) => {
        setCenters(response.data);  // Assuming the response contains the list of centers
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching centers:', error);
        alert('Failed to fetch centers.');
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the centreId to the form data before posting
    const terrainData = {
      ...formData,
      centreId: formData.centreId,  // Include selected centreId
    };

    axios
      .post('http://localhost:8084/api/terrains', terrainData)
      .then(() => {
        alert('Terrain added successfully!');
        navigate('/admin/terrain-page');
      })
      .catch((error) => {
        console.error('Error adding terrain:', error);
        alert('Failed to add terrain.');
      });
  };

  return (
    <div className="form-container">
      <h2>Add New Terrain</h2>
      <form onSubmit={handleSubmit} className="terrain-form">
        <div className="form-group">
          <label htmlFor="nom">Name:</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Tennis">Tennis</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="prix">Price:</label>
          <input
            type="number"
            id="prix"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="disponible">
            <input
              type="checkbox"
              id="disponible"
              name="disponible"
              checked={formData.disponible}
              onChange={handleChange}
            />
            Available for Reservation
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="centreId">Center:</label>
          <select
            id="centreId"
            name="centreId"
            value={formData.centreId}
            onChange={handleChange}
            required
          >
            <option value="">Select Center</option>
            {centers.map((centre) => (
              <option key={centre.id} value={centre.id}>
                {centre.nom} {/* Assuming `centre.nom` is the name of the center */}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn submit-btn">
            Add Terrain
          </button>
          <button
            type="button"
            className="btn cancel-btn"
            onClick={() => navigate('/admin/terrain-page')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTerrain;
