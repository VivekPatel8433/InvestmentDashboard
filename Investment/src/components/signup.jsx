import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useState } from "react"
import  axios  from "axios";
import videoBg from '../assets/1797251-uhd_3840_2160_24fps.mp4';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent Page Reloading
    setMessage('')

  try{
    const response = await axios.post(
      'http://localhost:5000/api/v1/auth/register',
      { email, password }
    );

    setMessage(response.data.message);
    setEmail('');
    setPassword('');
    window.location.href = "./login"

  } catch(error) {
    console.log("error", error)
     if (error.response) {
        setMessage(error.response.data.error); // Backend error
      } else {
        setMessage('Network error');
      }
  }
  };
  return (
   <div className="relative min-h-screen flex items-center justify-center" id="Signup">
       <video
        autoPlay
        muted
        loop
        className="absolute w-full h-full object-cover"
  >
    <source src={videoBg} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
    <div className="absolute w-full h-full bg-black/40"></div>
        <div className="relative z-10 w-full max-w-md p-10 flex flex-col items-center space-y-6
                bg-white/20 backdrop-blur-md border border-white/80 rounded-xl shadow-lg">
            <div className="border border-gray-800 rounded-3xl p-2">
                <FontAwesomeIcon icon={faUser} size="3x"/> 
            </div>
            <div>
              <h2 className="text-2xl text-gray-300">Create An Account</h2>
              <form onSubmit={handleSubmit} className="w-full space-y-4 mt-4">
                <div>
                  <label className="block text-lg text-gray-300 mb-1">Email: </label>
                  <input type="text" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7879ff] focus:outline-none" placeholder="Enter Your Email"></input>
                </div>
                 <div>
                  <label className="block text-lg text-gray-300 mb-1">Password: </label>
                  <input type="text" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7879ff] focus:outline-none" placeholder="Enter Your Password"></input>
                </div>
                 <div>
                   <p className="text-sm text-gray-300">
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
                 <p className="text-sm text-gray-300">
                    Already have an account?{" "}
                 <Link to="/login" className="text-[#7879ff] font-semibold hover:underline">
                     Login
                </Link>
              </p>
               </div>
              </form>
              {message && <p className="mt-2 text-red-500">{message}</p>}
            </div>
            
      </div>
    </div>
  );
}

export default SignUp;