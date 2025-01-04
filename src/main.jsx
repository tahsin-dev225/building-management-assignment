import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Components/Layout/Main.jsx';
import Home from './Components/Pages/Home/Home.jsx';
import Login from './Components/Pages/Register/Login.jsx';
import SignUp from './Components/Pages/Register/SignUp.jsx';
import AuthProvider from './Components/Pages/Provider/AuthProvider.jsx';
import ApartmentDetails from './Components/Pages/ApartmentDetails/ApartmentDetails.jsx';
import Dashboard from './Components/Layout/Dashboard.jsx';
import AddApartment from './Components/Pages/Dashboard/Admin/AddApartments/AddApartment.jsx';
import PrivateRoute from './Router/PrivateRoute.jsx';
import AllApartment from './Components/Pages/Home/Apartment/AllApartment.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AllUsers from './Components/Pages/Dashboard/Admin/AllUsers/AllUsers.jsx';
import AdminHome from './Components/Pages/Dashboard/Admin/AdminHome/AdminHome.jsx';
import ManageApartment from './Components/Pages/Dashboard/Admin/ManageApartment/ManageApartment.jsx';
import UpdateApartment from './Components/Pages/Dashboard/Admin/UpdateApartment/UpdateApartment.jsx';
import AdminRoute from './Router/AdminRoute.jsx';
import MyBooking from './Components/Pages/Dashboard/UserDash/Bookings/MyBooking.jsx';
import Payment from './Components/Pages/Dashboard/payment/Payment/Payment.jsx';
import PaymentHistory from './Components/Pages/Dashboard/payment/PaymentHistory/PaymentHistory.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:'/',
        element:<Home></Home>,
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/signup',
        element:<SignUp></SignUp>
      },
      {
        path:'/apartment',
        element:<AllApartment></AllApartment>
      },
      {
        path: '/apartmentDetails/:id',
        element:<PrivateRoute><ApartmentDetails></ApartmentDetails></PrivateRoute>,
        loader: ({params}) => fetch(`https://building-management-assignment-server.onrender.com/apartmentDetails/${params.id}`,{credentials : "include"})
      }
    ]
  },
  {
    path:'dashboard',
    element:<Dashboard></Dashboard>,
    children:[
      // normal users
      {
        path: 'booking',
        element:<MyBooking></MyBooking>
      },
      {
        path:'payment',
        element:<Payment></Payment>
      },
      {
        path:'paymentHistory',
        element:<PaymentHistory></PaymentHistory>,
      },

      // admin
      {
        path:'addApartment',
        element:<AdminRoute><AddApartment></AddApartment></AdminRoute>
      },
      {
        path:'allUsers',
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path:'adminHome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path:'manageApartment',
        element:<AdminRoute><ManageApartment></ManageApartment></AdminRoute>
      },
      {
        path:'updateApartment/:id',
        element:<AdminRoute><UpdateApartment></UpdateApartment></AdminRoute>,
        loader: ({params}) => fetch(`https://building-management-assignment-server.onrender.com/${params.id}`, {credentials: 'include'})
      }
    ]
  }
]);

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
