import React, { useEffect, useState } from 'react';
import './terrain.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing the icons
import axios from 'axios';
const TerrainList = () => {
  const [terrains, setTerrains] = useState([]);
  const navigate = useNavigate();

  // Fetch terrains from the API
  useEffect(() => {
     // Fetch terrains from the API using axios
     const fetchTerrains = async () => {
      try {
        const response = await axios.get('http://localhost:8088/api/terrains');
        setTerrains(response.data); // Set the fetched data to the state
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching terrains:', error); // Handle errors
      } finally {
        // setLoading(false); // Set loading to false once the request is complete
      }
    };

    fetchTerrains(); // Call the function to fetch terrains
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/terrain-page/update/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete the terrain with ID ${id}?`)) {
      fetch(`http://localhost:8088/api/terrains/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            alert('Terrain deleted successfully');
            setTerrains(terrains.filter((terrain) => terrain.id !== id));
          } else {
            alert('Failed to delete the terrain');
          }
        })
        .catch((error) => console.error('Error deleting terrain:', error));
    }
  };

  return (
    <div className="table-container">
      <h2>Terrain List</h2>
      <Link to="/admin/terrain-page/addNew" className="add-btn">
        Add New Terrain
      </Link>
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
          {terrains.length > 0 ? (
            terrains.map((terrain) => (
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
            ))
          ) : (
            <tr>
              <td colSpan="6">No terrains available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TerrainList;
