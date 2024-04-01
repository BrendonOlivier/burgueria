// Criar nossas rotas de navegação com react-router-dom (v6)
import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import PrivateRoute from './private-route'

function MyRoutes () {
  return (
        <Router>
            <Routes>
                <Route element={<Login />} path='/login' />
                <Route element={<Register />} path='/cadastro' />
                <PrivateRoute element={<Home />} path='/' />
            </Routes>
        </Router>
  )
}

export default MyRoutes
