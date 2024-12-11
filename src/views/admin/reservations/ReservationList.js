import {React, useState, useEffect} from 'react';
// import './centre.css';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing the icons
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ReservationService from '../../../services/ReservationService';

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);

    const fetchReservations = async () => {
        try {
            const response = await ReservationService.getReservations();
            // Debugging: Log the fetched data
            console.log("Fetched Reservations:", response.data);
            setReservations(response.data);
        } catch (err) {
            console.error("Error fetching reservations:", err);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);


    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/admin/all-reservations/update/${id}`);
    };

    const handleDelete = (id) => {
        ReservationService.deleteReservation(`${id}`);
        alert(`Delete centre with id: ${id}`);
        // Refetch the reservations list after deletion
        fetchReservations();
    };

    return (
        <div className="table-container">
            <h2>Reservations</h2>
            {/*<Link to="/admin/centre-page/addNew" className="add-btn">Add New Centre</Link>*/}
            <table className="styled-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>terrainId</th>
                    <th>reservedBy</th>
                    <th>phoneNumber</th>
                    <th>reservationDate</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                        <td>{reservation.id}</td>
                        <td>{reservation.terrainId}</td>
                        <td>{reservation.reservedBy}</td>
                        <td>{reservation.phoneNumber}</td>
                        <td>{reservation.reservationDate}</td>
                        <td className="action-column">
                            <FaEdit
                                className="action-icon edit-icon"
                                onClick={() => handleEdit(reservation.id)}
                            />
                            <FaTrash
                                className="action-icon delete-icon"
                                onClick={() => handleDelete(reservation.id)}
                            />


                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationList;
