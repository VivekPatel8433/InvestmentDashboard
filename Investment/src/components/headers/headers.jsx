import React from "react";
import { useNavigate } from "react-router-dom";

export const Headers = () => {
    const navigate = useNavigate();

    const LogoutUser = () => {
        navigate("/login");
    };

  return (
    <header className="bg-gray-500 text-white p-4 shadow rounded">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Investment Tracker</h1>
        <nav>
          <ul className="flex space-x-4">
            <li className="hover:text-gray-300 cursor-pointer">Add Investment</li>
            <li className="hover:text-gray-300 cursor-pointer">Home</li>
            <li className="hover:text-gray-300 cursor-pointer">Profile</li>
            <li className="hover:text-gray-300 cursor-pointer">Settings</li>
            <button className="hover:text-gray-300 cursor-pointer px-2 border rounded" onClick={LogoutUser}>Logout</button>
          </ul>
        </nav>
      </div>
    </header>
  );
};
