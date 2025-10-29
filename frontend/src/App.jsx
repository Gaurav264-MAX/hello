import { useState, useEffect } from 'react'
import axios from "axios";
import ResponsiveNavbar from './navbar.jsx' 
import CarouselComponent from "./CarouselComponent.jsx";
import Carrom from "./Card.jsx";
import Showmore from './Showmore.jsx';
import Heading from './heading.jsx';
import Footer from './footer.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ClickCard from './ClickCard.jsx';
import { Card } from '@mui/material';
import ProductList from './ProductList.jsx';
import ProductList1 from './Productlist1.jsx';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './Home.jsx';
import Washingmachine from './Washingmachine.jsx';
import Ac from './Ac.jsx';
import Tv from './Tv.jsx';
import MachineList1 from './product/machine.jsx';
import TvList1 from './product/tvadd.jsx';
import AcList1 from './product/acadd.jsx';
import DeliveryForm from './Delivery.jsx';
import DataFetchComponent from './DataFetchComponent.jsx';
import DynamicCard from './DynamicCard.jsx';
import Signup from './signup.jsx';
import Users from './Users.jsx';
import Register from './register.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from './components/context/CartContext.jsx';
import OrdersList from './components/OrdersList';
import AuthWrapper from './AuthWrapper.jsx';
import SearchResults from './components/SearchResults.jsx';
import './App.css'
import { AuthStatusProvider } from './AuthWrapper.jsx';
import ProfileDashboard from './ProfileDashboard.jsx';
import Myorders from './Myorders.jsx';
import AdminPasswordGate from './AdminPasswordGate.jsx';
import InvoicePage from './InvoicePage.jsx';
// Wrap each route element with AuthWrapper
const wrapWithAuth = (Element) => {
  return (
    <AuthWrapper>
      {Element}
    </AuthWrapper>
  );
};

const route = createBrowserRouter([
  {
    path: "/",
    element: wrapWithAuth(<Home />),
  },
  {
    path: "/washingmachine",
    element: wrapWithAuth(<Washingmachine />),
  },
  {
    path: "/product",
    element: wrapWithAuth(<ProductList />),
  },
  {
    path: "/ac",
    element: wrapWithAuth(<Ac />),
  },
  {
    path: "/tv",
    element: wrapWithAuth(<Tv />),
  },
  {
    path: "/product1",
    element: wrapWithAuth(<ProductList1 />),
  },
  {
    path: "/machine",
    element: wrapWithAuth(<MachineList1 />),
  },
  {
    path: "/tvadd",
    element: wrapWithAuth(<TvList1 />),
  },
  {
    path: "/acadd",
    element: wrapWithAuth(<AcList1 />),
  },
  {
    path: "/delivery",
    element: wrapWithAuth(<DeliveryForm />),
  },
  {
    path: "/data",
    element: wrapWithAuth(<DataFetchComponent />),
  },
  {
    path: "/learnmore",
    element: wrapWithAuth(<ClickCard />),
  },
  {
    path: "/:type/:_id",
    element: wrapWithAuth(<DynamicCard />),
  },
  {
    path: "/signup",
    element: <Signup />, // Don't wrap signup page
  },
  {
    path: "/get-all-users",
    element: wrapWithAuth(<Users />),
  },
  {
    path: "/register",
    element: <Register />, // Don't wrap register page
  },
  {
    path: "/orders",
    element: wrapWithAuth(<OrdersList />),
  },
  {
    path: "/search",
    element: wrapWithAuth(<SearchResults />),
  },
  {
    path: "/profile",
    element: wrapWithAuth(<ProfileDashboard />),
  },
  {
    path: "/myorders",
    element: wrapWithAuth(<Myorders />),
  },
   {
    path: "/:type/edit",
    element: wrapWithAuth(<AdminPasswordGate />),
  },
  {
    path: "/invoice/:orderId",
    element: wrapWithAuth(<InvoicePage />),
  }
]);

function App() {
  return (
    <>
    <AuthStatusProvider>
      <CartProvider>
        <RouterProvider router={route} />
        <ToastContainer position="top-center" autoClose={3000} />
      </CartProvider>
</AuthStatusProvider>
    </>
  )
}

export default App;