import React from 'react';
import './terrain.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing the icons
const TerrainList = () => {
  const terrains = [
    { id: 1, nom: 'Terrain A', type: 'Football', prix: 1500, disponible: true },
    { id: 2, nom: 'Terrain B', type: 'Basketball', prix: 1200, disponible: false },
    { id: 3, nom: 'Terrain C', type: 'Tennis', prix: 1000, disponible: true },
    { id: 4, nom: 'Terrain D', type: 'Football', prix: 1600, disponible: true },
    { id: 5, nom: 'Terrain E', type: 'Basketball', prix: 1400, disponible: false },
  ];
  const handleEdit = (id) => {
    navigate(`/admin/terrain-page/update/${id}`);
  };
  const navigate = useNavigate();
  const handleDelete = (id) => {
    alert(`Delete centre with id: ${id}`);
  };
  return (
    <div className="table-container">
      <h2>Terrain List</h2>
      <Link to="/admin/terrain-page/addNew" className="add-btn">Add New Terrain</Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Type</th>
            <th>Prix</th>
            <th>Disponible</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {terrains.map((terrain) => (
            <tr key={terrain.id}>
              <td>{terrain.id}</td>
              <td>{terrain.nom}</td>
              <td>{terrain.type}</td>
              <td>{terrain.prix} MAD</td>
              <td>{terrain.disponible ? 'Yes' : 'No'}</td>

              <td className="action-column">
                <FaEdit
                  className="action-icon edit-icon"
                  onClick={() => handleEdit(terrain.id)}
                />
                <FaTrash
                  className="action-icon delete-icon"
                  onClick={() => handleDelete(terrain.id)}
                />


              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TerrainList;
