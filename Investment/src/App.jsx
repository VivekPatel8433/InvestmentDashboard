import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/signup";
import Login from "./components/login";
import axios from "axios";
import { setAccessToken } from "./api/apiClient";
import Dashboard from "./components/dashboard";

import "./App.css";

function App() {

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );

        setAccessToken(res.data.accessToken);
        // console.log("Access token:", res.data.accessToken); // For learning, access token should never be stored

      } catch (err) {
        // Not logged in (this is normal)
        console.log("No active session",err);
      }
    };

    restoreSession();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
