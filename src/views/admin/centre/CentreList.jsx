import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing axios
import './centre.css';
import { FaEdit,FaEye, FaTrash } from 'react-icons/fa'; // Importing icons
import { Link, useNavigate } from 'react-router-dom';
import Modal from './TerrainModal';

const CentreList = () => {
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedCentre, setSelectedCentre] = useState(null); // Selected centre for modal

  const navigate = useNavigate();

  // Fetch centres from the backend
  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/centres');
        console.log(response.data);
        setCentres(response.data); // Assuming the API returns an array of centres
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCentres();
  }, []);

  // Handlers for edit and delete actions
  const handleEdit = (id) => {
    navigate(`/admin/centre-page/update/${id}`);
  };

  const handleDelete = async (id, assignedTerrains) => {
    // Check if there are assigned terrains
    if (assignedTerrains && assignedTerrains.length > 0) {
      // If terrain is assigned (non-empty), show an alert and prevent deletion
      alert('This centre has terrain assigned and cannot be deleted.');
      return;
    }

    // Proceed with deletion if no terrain is assigned
    if (window.confirm('Are you sure you want to delete this centre?')) {
      try {
        await axios.delete(`http://localhost:8085/api/centres/${id}`);
        setCentres((prev) => prev.filter((centre) => centre.id !== id));
        alert(`Centre with ID ${id} deleted successfully.`);
      } catch (err) {
        console.error(err);
        alert('Failed to delete the centre. Please try again.');
      }
    }
  };

  const handleView = (centre) => {
    setSelectedCentre(centre); // Set the selected centre data
    setIsModalOpen(true); // Open the modal to show terrain info
  };

  if (loading) {
    return <p>Loading centres...</p>;
  }

  if (error) {
    return <p>Error loading centres: {error}</p>;
  }

  return (
    <div className="table-container">
      <h2>Centres</h2>
      <Link to="/admin/centre-page/addNew" className="add-btn">Add New Centre</Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Horaires</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {centres.map((centre) => (
            <tr key={centre.id}>
              <td>{centre.id}</td>
              <td>{centre.nom}</td>
              <td>{centre.adresse}</td>
              <td>{centre.horaires}</td>
              <td className="action-column">
              <FaEye
                  className="action-icon view-icon"
                  onClick={() => handleView(centre)} // Trigger view on click
                />
                <FaEdit 
                  className="action-icon edit-icon" 
                  onClick={() => handleEdit(centre.id)} 
                />
                <FaTrash 
                  className="action-icon delete-icon" 
                  onClick={() => handleDelete(centre.id, centre.assignedTerrains)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal 
          centre={selectedCentre} // Pass the selected centre to the modal
          closeModal={() => setIsModalOpen(false)} // Close modal handler
        />
      )}
    </div>
  );
};

export default CentreList;
