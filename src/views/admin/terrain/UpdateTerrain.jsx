import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './terrain.css'; // Include styling as needed

const UpdateTerrain = () => {
  const { id } = useParams(); // Get the ID from the route
  const navigate = useNavigate();

  // Simulated terrain data for testing
  const terrains = [
    { id: 1, nom: 'Terrain A', type: 'Football', prix: 50, disponible: true },
    { id: 2, nom: 'Terrain B', type: 'Tennis', prix: 30, disponible: false },
    { id: 3, nom: 'Terrain C', type: 'Basketball', prix: 40, disponible: true },
  ];

  // Fetch the terrain to update
  const terrainToUpdate = terrains.find((terrain) => terrain.id === parseInt(id));

  // State for terrain fields
  const [formData, setFormData] = useState({
    nom: '',
    type: '',
    prix: '',
    disponible: false,
  });

  // Initialize form data
  useEffect(() => {
    if (terrainToUpdate) {
      setFormData({
        nom: terrainToUpdate.nom,
        type: terrainToUpdate.type,
        prix: terrainToUpdate.prix,
        disponible: terrainToUpdate.disponible,
      });
    }
  }, [terrainToUpdate]);

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
    alert(`Updated Terrain Data:
      ID: ${id}
      Name: ${formData.nom}
      Type: ${formData.type}
      Price: ${formData.prix}
      Available: ${formData.disponible ? 'Yes' : 'No'}
    `);
    navigate('/terrain-page'); // Navigate back to terrain list
  };

  return (
    <div className="form-container">
      <h2>Update Terrain</h2>
      {terrainToUpdate ? (
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
            <button type="btton" className="btn submit-btn">
              Update Terrain
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
      ) : (
        <p>Terrain not found.</p>
      )}
    </div>
  );
};

export default UpdateTerrain;
