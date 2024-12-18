import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme'; //  { themeGreen }
import { useState } from 'react';
import Reservation from "./views/public/reservation";
import UpdateReservation from 'views/admin/reservations/UpdateReservation';
// Chakra imports
import Payment from './views/payments/Payment';
import Home from "./views/public/home";


export default function Main() {
  // eslint-disable-next-line
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path="/home" element={ <Home /> } />
        <Route path="auth/*" element={<AuthLayout />} />
        <Route
          path="admin/*"
          element={
            <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        <Route path="/payments" element={<Payment />} />

          <Route path="/admin/reservations/update/:id" element={<UpdateReservation />} />

          <Route path="/reservation" element={ <Reservation /> } />


        {/*<Route path="/public/*" element={} />*/}
      </Routes>
    </ChakraProvider>
  );
}
