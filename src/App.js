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


import AddCentre from './views/admin/centre/AddCentre';
import UpdateCentre from './views/admin/centre/UpdateCentre';
import AddTerrain from './views/admin/terrain/AddTerrain';


import Home from "./views/public/home";
import ProtectedRoute from './components/ProtectedRoute';
import UpdateTerrain from "./views/admin/terrain/UpdateTerrain"; // Import the ProtectedRoute component

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
          path="/admin/*"
          element={
            // <ProtectedRoute>
              <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
            // </ProtectedRoute>
          }
        />
         <Route
          path="/admin/all-reservations/update/:id"
          element={
            // <ProtectedRoute>
              <UpdateReservation />
            // </ProtectedRoute>
          }
        />
          <Route
          path="/admin/centre-page/addNew"
          element={
            // <ProtectedRoute>
              <AddCentre />
            // </ProtectedRoute>
          }
        />
          <Route
          path="/admin/centre-page/update/:id"
          element={
            // <ProtectedRoute>
              <UpdateCentre />
            // </ProtectedRoute>
          }
        />
          <Route
          path="/admin/terrain-page/addNew"
          element={
            // <ProtectedRoute>
              <AddTerrain />
            // </ProtectedRoute>
          }
        />
          <Route
          path="/admin/terrain-page/update/:id"
          element={
            // <ProtectedRoute>
              <UpdateTerrain />
            // </ProtectedRoute>
          }
        />
        {/* Redirect Root */}
        <Route path="/admin/*" element={<Navigate to="/admin/centre-page" replace />} />
      </Routes>
    </ChakraProvider>
  );
}
