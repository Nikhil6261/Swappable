import React from 'react'
import Hero from './pages/Hero'
import { Route , Routes } from 'react-router-dom'
import Signup from './component/Signup'
import Login from './component/Login'
import DashboardPage from './component/Dash'
import Marketplace from './component/Marketing'
import CreateSwapForm from './component/Createfrom'

const App = () => {
  return (
      <Routes>

      <Route path="/" element={<Hero />} />

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup/>} />

      <Route path="dash" element={<DashboardPage/>} />
      <Route path="marketplace" element={<Marketplace/>} />

      <Route path="create" element={<CreateSwapForm/>} />



    </Routes>
  )
}

export default App  