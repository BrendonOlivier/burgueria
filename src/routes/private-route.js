// Aqui criaremos nossas rotas privadas, pois o login e cadastro são rotas publicas, mas para acessar as outras rotas
// o usuário tem que estar logado para ter acesso ao restante da aplicação

import React from 'react'
import { Route, redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

function PrivateRoute ({ element, ...rest }) {
  const user = localStorage.getItem('devburguer:userData')

  if (!user) { // Se o user não existir ele será redirecionado para a tela de login ( usando o Redirect )
    return redirect('/login')
  }
  return <Route {...rest} element={element} />
}

export default PrivateRoute

PrivateRoute.propTypes = {
  element: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
}
