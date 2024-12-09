import React, { useState } from 'react';

const AddCentre = () => {
  const [centreData, setCentreData] = useState({
    nom: '',
    adresse: '',
    horaires: '',
  });

  const timeSlots = [
    '8am-10am',
    '10am-12pm',
    '12pm-2pm',
    '2pm-4pm',
    '4pm-6pm',
    '6pm-8pm',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCentreData({ ...centreData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Centre Data Entered:
      Nom: ${centreData.nom}
      Adresse: ${centreData.adresse}
      Horaires: ${centreData.horaires}`);
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
        <button type="submit"  className="submit-btn">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddCentre;
