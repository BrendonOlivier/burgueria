// Criar nossas rotas de navegação com react-router-dom (v6)
import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import { Home, Login, Products, Register, Cart } from '../pages'

function Routes () {
  return (
    <Router>
      <Switch>
        <Route exact component={Home} path="/" />
        <Route component={Login} path='/login' />
        <Route component={Register} path='/cadastro' />
        <Route component={Products} path="/produtos" />
        <Route component={Cart} path="/carrinho" />
      </Switch>
    </Router>
  )
}

export default Routes
