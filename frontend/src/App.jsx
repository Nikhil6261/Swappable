import React from 'react'
import Hero from './pages/Hero'
import { Route , Routes } from 'react-router-dom'
import Signup from './component/Signup'
import Login from './component/Login'

const App = () => {
  return (
      <Routes>

      <Route path="/" element={<Hero />} />

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup/>} />


    </Routes>
  )
}

export default App  