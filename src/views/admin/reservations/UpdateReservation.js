import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReservationService from '../../../services/ReservationService';

const UpdateReservation = () => {
    const { id } = useParams(); // Assuming the reservation ID is passed in the URL
    const [reservationData, setReservationData] = useState({
        terrainId: '',
        reservedBy: '',
        reservationDate: '',
        phoneNumber: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservationData = async () => {
            try {
                const response = await ReservationService.getReservationById(id);
                setReservationData(response.data);
            } catch (err) {
                console.error("Error fetching reservation data:", err);
            }
        };

        fetchReservationData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservationData({ ...reservationData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ReservationService.updateReservation(reservationData, id);
            navigate('/admin/all-reservations'); // Redirect to the reservations list page
        } catch (err) {
            console.error("Error updating reservation:", err);
            alert('Failed to update reservation. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2>Update Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="terrainId">Terrain ID:</label>
                    <input
                        type="text"
                        id="terrainId"
                        name="terrainId"
                        value={reservationData.terrainId}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="reservedBy">Reserved By:</label>
                    <input
                        type="text"
                        id="reservedBy"
                        name="reservedBy"
                        value={reservationData.reservedBy}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="reservationDate">Reservation Date:</label>
                    <input
                        type="datetime-local"
                        id="reservationDate"
                        name="reservationDate"
                        value={reservationData.reservationDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={reservationData.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Update Reservation
                </button>

                <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={() => navigate('/admin/all-reservations')}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default UpdateReservation;
