// App.jsx

import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RootLayout from "./components/RootLayout";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import MyProducts from "./components/MyProducts";

import Cart from "./components/Cart";
import Profile from "./components/Profile";

import AdminDashboard from "./components/AdminDashboard";
import UserManagement from "./components/UserManagement";
import ProductManagement from "./components/ProductManagement";

import { useAuth } from "./store/authStore";

function App() {
  const checkAuth = useAuth((state) => state.checkAuth);
  const authChecked = useAuth((state) => state.authChecked);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-[#6D6875]">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Layout Routes */}
      <Route element={<RootLayout />}>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Product */}
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Protected Routes */}
        <Route
          path="/add-product"
          element={
            isAuthenticated ? (
              <AddProduct />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/update-product/:id"
          element={
            isAuthenticated ? (
              <UpdateProduct />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/my-products"
          element={
            isAuthenticated ? (
              <MyProducts />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/cart"
          element={
            isAuthenticated ? (
              <Cart />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin-dashboard"
          element={
            isAuthenticated && currentUser?.role === "ADMIN" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/user-management"
          element={
            isAuthenticated && currentUser?.role === "ADMIN" ? (
              <UserManagement />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/product-management"
          element={
            isAuthenticated && currentUser?.role === "ADMIN" ? (
              <ProductManagement />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Route>

      {/* Auth Pages */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Register />
          )
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
