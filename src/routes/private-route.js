// Aqui criaremos nossas rotas privadas, pois o login e cadastro são rotas publicas, mas para acessar as outras rotas
// o usuário tem que estar logado para ter acesso ao restante da aplicação

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

function PrivateRoute ({ component, ...rest }) {
  const user = localStorage.getItem('devburger:userData')
  // Se o user não existir ele será redirecionado para a tela de login ( usando o Redirect )

  if (!user) {
    return <Redirect to='/login' />
  }
  return <Route {...rest} component={component} />
}

export default PrivateRoute

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
}
