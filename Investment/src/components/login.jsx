import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import videoBg1 from '../assets/14003675-uhd_3840_2160_60fps.mp4';

function Login() {
  return (
   <div className="relative min-h-screen flex items-center justify-center">
       <video
    autoPlay
    muted
    loop
    className="absolute w-full h-full object-cover"
  >
    <source src={videoBg1} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="absolute w-full h-full bg-black/40"></div>
        <div className="relative z-10 w-full max-w-md p-10 flex flex-col items-center space-y-6
                bg-white/40 backdrop-blur-md border border-white/80 rounded-xl shadow-lg">
            <div className="border border-gray-800 rounded-3xl p-2">
                <FontAwesomeIcon icon={faUser} size="3x"/> 
            </div>
            <div>
              <h2 className="text-2xl text-gray-800 flex justify-center">Welcome Back</h2>
              <form className="w-full space-y-4 mt-4">
                <div>
                  <label className="block text-lg text-gray-700 mb-1">Email: </label>
                  <input type="text" className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7879ff] focus:outline-none" placeholder="Enter Your Email"></input>
                </div>
                 <div>
                  <label className="block text-lg text-gray-700 mb-1">Password: </label>
                  <input type="text" className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7879ff] focus:outline-none" placeholder="Enter Your Password"></input>
                </div>
                <div>
                    <p className="text-sm text-gray-600">
                    Forgot Password?{" "}
                    <Link to="/" className="text-[#7879ff] font-semibold hover:underline">
                    Click
                  </Link>
                    </p>
                </div>
                <div>
                  <button type="submit" className="w-full bg-[#7879ff] text-white py-2 rounded-lg font-medium hover:bg-[#5d5ee6] transition">Submit</button>
                </div>
                <div>
                 <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                  <Link to="/" className="text-[#7879ff] font-semibold hover:underline">
                    Signup
                  </Link>
                </p>
                 </div>
              </form>
            </div>
            
      </div>
    </div>
  );
}

export default Login;
// #7879ff