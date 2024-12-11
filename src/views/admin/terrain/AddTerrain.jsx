import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './terrain.css'; // Include styling as needed

const AddTerrain = () => {
  const navigate = useNavigate();

  // State for terrain fields
  const [formData, setFormData] = useState({
    nom: '',
    type: '',
    prix: '',
    disponible: false,
  });

  // Handle field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Terrain Data:
      Name: ${formData.nom}
      Type: ${formData.type}
      Price: ${formData.prix}
      Available: ${formData.disponible ? 'Yes' : 'No'}
    `);
    navigate('/terrain-page'); // Navigate back to the terrain list after submission
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
