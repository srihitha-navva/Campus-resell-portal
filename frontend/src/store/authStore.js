//authStore.js

import axios from "axios";
import { create } from "zustand";

import { API_BASE_URL } from "../config/api";

const AUTH_USER_KEY = "campus-resell-current-user";

// --------------------
// Local Storage Helpers
// --------------------

const getStoredUser = () => {
  try {
    const user = localStorage.getItem(AUTH_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const storeUser = (user) => {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

const clearStoredUser = () => {
  localStorage.removeItem(AUTH_USER_KEY);
};

const storedUser = getStoredUser();

// --------------------
// Auth Store
// --------------------

export const useAuth = create((set, get) => ({
  currentUser: storedUser,
  loading: false,
  isAuthenticated: Boolean(storedUser),
  authChecked: false,
  error: null,

  // --------------------
  // Set User
  // --------------------

  setAuthenticatedUser: (user) => {
    storeUser(user);

    set({
      currentUser: user,
      loading: false,
      isAuthenticated: true,
      authChecked: true,
      error: null,
    });
  },

  // --------------------
  // Register
  // --------------------

  register: async (formData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await axios.post(
        `${API_BASE_URL}/common-api/users`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const user = res.data.payload;

      storeUser(user);

      set({
        currentUser: user,
        loading: false,
        isAuthenticated: true,
        authChecked: true,
        error: null,
      });

      return user;
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data?.message || "Registration failed",
      });

      throw err;
    }
  },

  // --------------------
  // Login
  // --------------------

  login: async (userCred) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await axios.post(
        `${API_BASE_URL}/common-api/login`,
        userCred,
        {
          withCredentials: true,
        }
      );

      const loggedInUser = res.data.payload;

      storeUser(loggedInUser);

      set({
        currentUser: loggedInUser,
        loading: false,
        isAuthenticated: true,
        authChecked: true,
        error: null,
      });

      return loggedInUser;
    } catch (err) {
      clearStoredUser();

      set({
        currentUser: null,
        loading: false,
        isAuthenticated: false,
        authChecked: true,
        error: err.response?.data?.message || "Login failed",
      });

      throw err;
    }
  },

  // --------------------
  // Logout
  // --------------------

  logout: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      await axios.get(`${API_BASE_URL}/common-api/logout`, {
        withCredentials: true,
      });

      clearStoredUser();

      set({
        currentUser: null,
        loading: false,
        isAuthenticated: false,
        authChecked: true,
        error: null,
      });
    } catch (err) {
      clearStoredUser();

      set({
        currentUser: null,
        loading: false,
        isAuthenticated: false,
        authChecked: true,
        error: err.response?.data?.message || "Logout failed",
      });
    }
  },

  // --------------------
  // Check Authentication
  // --------------------

  checkAuth: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await axios.get(
        `${API_BASE_URL}/common-api/check-auth`,
        {
          withCredentials: true,
        }
      );

      const checkedUser = res.data.payload;

      storeUser(checkedUser);

      set({
        currentUser: checkedUser,
        loading: false,
        isAuthenticated: true,
        authChecked: true,
        error: null,
      });
    } catch {
      clearStoredUser();

      set({
        currentUser: null,
        loading: false,
        isAuthenticated: false,
        authChecked: true,
        error: null,
      });
    }
  },

  // --------------------
  // Helpers
  // --------------------

  isAdmin: () => {
    return get().currentUser?.role === "ADMIN";
  },

  isStudent: () => {
    return get().currentUser?.role === "STUDENT";
  },
}));