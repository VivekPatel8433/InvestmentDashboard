import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from './components/signup'
import Login from './components/login'

import './App.css'


function App() {

  return (
    <>
        <Routes>
           <Route path="/" element={<SignUp />} />
           <Route path="/login" element={<Login />} />
        </Routes>
    </>
  )
}

export default App
