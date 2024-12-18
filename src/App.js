import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';
import Reservation from './views/public/reservation';
import UpdateReservation from 'views/admin/reservations/UpdateReservation';
import Payment from './views/payments/Payment';


import Home from "./views/public/home";
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>

        <Route path="/home" element={ <Home /> } />

        {/* Public Routes */}
        <Route path="/reservation" element={<Reservation />} />

        <Route path="auth/*" element={<AuthLayout />} />
        <Route
          path="/payments"
          element={
              <Payment />
          }
        />

        <Route path="/" element={<Navigate to="/home" replace />} />
         



        {/* Protected Routes */}
        <Route
          path="admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
            </ProtectedRoute>
          }
        />
         <Route
          path="/admin/reservations/update/:id"
          element={
            <ProtectedRoute>
              <UpdateReservation />
            </ProtectedRoute>
          }
        />
        {/* Redirect Root */}
        <Route path="/admin" element={<Navigate to="/admin" replace />} />
      </Routes>
    </ChakraProvider>
  );
}
