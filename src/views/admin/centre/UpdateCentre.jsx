import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

  useEffect(() => {
    // Simulating fetching data for the given ID
    const fetchCentreData = async () => {
      // Replace with API call or logic to get center details by ID
      const fakeData = {
        id: 1,
        nom: 'Centre Example',
        adresse: 'Example Address',
        horaires: '10am-12pm',
      };

      if (parseInt(id, 10) === fakeData.id) {
        setCentreData(fakeData);
      }
    };

    fetchCentreData();
  }, [id]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCentreData({ ...centreData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispconst navigate = useNavigate();laying updated data as alert for testing purposes
    alert(`Updated Centre Data:
      Nom: ${centreData.nom}
      Adresse: ${centreData.adresse}
      Horaires: ${centreData.horaires}`);
    // Replace this alert with API call or logic to save updated data
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
