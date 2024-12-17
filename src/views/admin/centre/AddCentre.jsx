import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCentre = () => {
  const [centreData, setCentreData] = useState({
    nom: '',
    adresse: '',
    horaires: '',
  });

  const timeSlots = [
    '8am-20am',
    '10am-20am',
    '12am-20am',
    '2pm-4pm',
    '4pm-6pm',
    '6pm-8pm',
  ];

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCentreData({ ...centreData, [name]: value });
  };

  // Handle form submission and make the POST request
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8088/api/centres', centreData);
      if (response.status === 201) {
        alert('Centre added successfully!');
        // Optionally, navigate or reset form after successful submission
        navigate('/admin/centre-page');
      }
    } catch (error) {
      console.error('Error adding centre:', error);
      alert('Failed to add centre. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Centre</h2>
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
          Add Centre
        </button>

        <button
          type="button"
          className="btn cancel-btn"
          onClick={() => {
            setCentreData({ nom: '', adresse: '', horaires: '' });
            // Optionally, navigate away or reset form
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddCentre;
