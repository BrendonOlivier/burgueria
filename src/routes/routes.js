// Criar nossas rotas de navegação com react-router-dom (v6)
import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Home from '../pages/Home'
import PrivateRoute from './private-route'

function Routes () {
  return (
    <Router>
      <Switch>
        <Route exact component={Home} path="/" />
        <Route component={Login} path='/login' />
        <Route component={Register} path='/cadastro' />

      </Switch>
    </Router>
  )
}

export default Routes
