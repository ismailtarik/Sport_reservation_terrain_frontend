import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateCentre = () => {
  const { id } = useParams(); // Assuming you're using React Router and the center's ID is passed in the URL
  const [centreData, setCentreData] = useState({
    nom: '',
    adresse: '',
    horaires: '',
  });
  const navigate = useNavigate();
  const timeSlots = [
    '8am-10am',
    '10am-12pm',
    '12pm-2pm',
    '2pm-4pm',
    '4pm-6pm',
    '6pm-8pm',
  ];

  // Static API URL
  const API_URL = `http://localhost:8088/api/centres/${id}`; // This URL will fetch or update the specific centre by ID

  // Fetch centre data based on the ID
  useEffect(() => {
    const fetchCentreData = async () => {
      try {
        const response = await axios.get(API_URL); // Fetch centre details by ID
        setCentreData(response.data); // Assuming the backend returns { id, nom, adresse, horaires }
      } catch (error) {
        console.error('Error fetching centre data:', error);
        alert('Error fetching centre data.');
      }
    };

    fetchCentreData();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCentreData({ ...centreData, [name]: value });
  };

  // Submit updated data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(API_URL, centreData); // Send PUT request with updated data
      if (response.status === 200) {
        alert('Centre updated successfully!');
        navigate('/admin/centre-page'); // Redirect after successful update
      } else {
        alert('Failed to update centre. Please try again.');
      }
    } catch (error) {
      console.error('Error updating centre data:', error);
      alert('Error updating centre data.');
    }
  };

  return (
    <div className="form-container">
      <h2>Update Centre</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={centreData.nom}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="adresse">Adresse:</label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={centreData.adresse}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="horaires">Horaires:</label>
          <select
            id="horaires"
            name="horaires"
            value={centreData.horaires}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Update Centre
        </button>
        
        <button
            type="button"
            className="btn cancel-btn"
            onClick={() => navigate('/admin/centre-page')}
          >
            Cancel
          </button>
      </form>
    </div>
  );
};

export default UpdateCentre;
