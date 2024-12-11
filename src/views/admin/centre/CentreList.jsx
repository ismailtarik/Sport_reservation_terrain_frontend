import React from 'react';
import './centre.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing the icons
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CentreList = () => {
  const centres = [
    { id: 1, nom: 'Centre A', adresse: 'Location 1, Casablanca', horaires: '9:00 AM - 6:00 PM' },
    { id: 2, nom: 'Centre B', adresse: 'Location 2, Marrakech', horaires: '8:00 AM - 5:00 PM' },
    { id: 3, nom: 'Centre C', adresse: 'Location 3, Fès', horaires: '9:00 AM - 7:00 PM' },
    { id: 4, nom: 'Centre D', adresse: 'Location 4, Rabat', horaires: '10:00 AM - 5:00 PM' },
  ];


  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/centre-page/update/${id}`);
  };

  const handleDelete = (id) => {
    alert(`Delete centre with id: ${id}`);
  };

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
                <FaEdit 
                  className="action-icon edit-icon" 
                  onClick={() => handleEdit(centre.id)} 
                />
                <FaTrash 
                  className="action-icon delete-icon" 
                  onClick={() => handleDelete(centre.id)} 
                />

                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CentreList;
