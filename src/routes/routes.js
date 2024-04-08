// Criar nossas rotas de navegação com react-router-dom (v6)
import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import { Home, Login, Products, Register, Cart } from '../pages'
import PrivateRoute from './private-route'

function Routes () {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact component={Home} path="/" />
        <Route component={Login} path='/login' />
        <Route component={Register} path='/cadastro' />
        <PrivateRoute component={Products} path="/produtos" />
        <PrivateRoute component={Cart} path="/carrinho" />
      </Switch>
    </Router>
  )
}

export default Routes
