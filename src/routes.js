import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';

import AddCentre from 'views/admin/centre/AddCentre';
import UpdateCentre from 'views/admin/centre/UpdateCentre';
import AddTerrain from 'views/admin/terrain/AddTerrain';
import UpdateTerrain from 'views/admin/terrain/UpdateTerrain';
import Reservations from 'views/admin/reservations';
import UpdateResevation from 'views/admin/reservations/UpdateReservation';

// Admin Imports
import MainDashboard from 'views/admin/default';
import Profile from 'views/admin/profile';
import Centre from 'views/admin/centre';
import Terrain from 'views/admin/terrain';

// Payment imports
import Payment from 'views/payments/Payment'

// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
  // {
  //   name: 'Main Dashboard',
  //   layout: '/admin',
  //   path: '/default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: <MainDashboard />,
  // },
  {
    name: 'Add New Centre',
    layout: '/admin',
    path: '/centre-page/addNew',
    component: <AddCentre />,
  },
  {
    name: 'Update Centre',
    layout: '/admin', 
    path: '/centre-page/update/:id',
    component: <UpdateCentre />,
  },
  {
    name: 'Add New Terrain',
    layout: '/admin',
    path: '/terrain-page/addNew',
    component: <AddTerrain />,
  },
  {
    name: 'Update Terrain',
    layout: '/admin',
    path: '/terrain-page/update/:id',
    component: <UpdateTerrain />,
  },
  {
    name: 'Terrain Page',
    layout: '/admin',
    path: '/terrain-page',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <Terrain />,
    secondary: true,
  },
  {
    name: 'Centre Page',
    layout: '/admin',
    path: '/centre-page',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <Centre />,
    secondary: true,
  },
  // {
  //   name: 'Profile',
  //   layout: '/admin',
  //   path: '/profile',
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   component: <Profile />,
  // },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  {
    name: 'Payment',
    layout: '/payment',
    path: '/payment',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <Payment />,
  },
];

export default routes;
