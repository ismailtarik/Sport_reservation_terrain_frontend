import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './terrain.css'; // Include styling as needed

const UpdateTerrain = () => {
  const { id } = useParams(); // Get the ID from the route
  const navigate = useNavigate();

  // State for terrain fields
  const [formData, setFormData] = useState({
    nom: '',
    type: '',
    prix: '',
    disponible: false,
    centreId: '',  // New field to store selected center ID
  });
  
  // State for loading and error
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // State for storing list of centers
  const [centers, setCenters] = useState([]);

  // Fetch terrain data when the component loads
  useEffect(() => {
    // Fetch terrain data
    axios
      .get(`http://localhost:8088/api/terrains/${id}`)
      .then((response) => {
        setFormData({
          nom: response.data.nom,
          type: response.data.type,
          prix: response.data.prix,
          disponible: response.data.disponible,
          centreId: response.data.centreId, // Assuming the response contains centreId
        });
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load terrain data.');
        setLoading(false);
      });

    // Fetch centers list
    axios
      .get('http://localhost:8088/api/centres') // Assuming this is the endpoint for the centers list
      .then((response) => {
        console.log(response.data); // Log the data to inspect it
        if (Array.isArray(response.data)) {
          setCenters(response.data); // Assuming the response data is an array of centers
        } else {
          console.error('Expected an array of centers, but got:', response.data);
        }
      })
      .catch((err) => {
        console.error('Error fetching centers:', err);
        setError('Failed to load centers.');
      });
  }, [id]);

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
    axios
      .put(`http://localhost:8088/api/terrains/${id}`, formData)
      .then(() => {
        alert('Terrain updated successfully!');
        navigate('/admin/terrain-page'); // Navigate back to terrain list
      })
      .catch((err) => {
        alert('Failed to update terrain.');
        console.error(err);
      });
  };

  if (loading) return <p>Loading terrain data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="form-container">
      <h2>Update Terrain</h2>
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
          <label htmlFor="centreId">Centre:</label>
          <select
            id="centreId"
            name="centreId"
            value={formData.centreId}
            onChange={handleChange}
            required
          >
            <option value="">Select Centre</option>
            {centers.length > 0 ? (
              centers.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.nom} {/* Assuming the center has an 'id' and 'name' */}
                </option>
              ))
            ) : (
              <option disabled>No centers available</option>
            )}
          </select>
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
    </div>
  );
};

export default UpdateTerrain;
