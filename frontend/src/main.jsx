import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from "./store.js";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Offer from "./components/Offer.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route index={true} path="/" element={<HomePage></HomePage>}></Route>
      <Route
        path="/products/:name"
        element={<ProductsPage></ProductsPage>}
      ></Route>
      <Route path="/product/:id" element={<ProductPage></ProductPage>}></Route>
      <Route path="/cart" element={<CartPage></CartPage>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      <Route path="/offer" element={<Offer></Offer>}></Route>
      <Route path="" element={<ProtectedRoutes></ProtectedRoutes>}>
        <Route path="/shipping" element={<ShippingPage></ShippingPage>}></Route>
        <Route path="/payment" element={<PaymentPage></PaymentPage>}></Route>
        <Route
          path="/placeorder"
          element={<PlaceOrderPage></PlaceOrderPage>}
        ></Route>
        <Route path="/order/:id" element={<OrderPage></OrderPage>}></Route>
        <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
