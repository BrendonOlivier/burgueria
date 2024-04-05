// Vamos criar um componente para nosso botão já que usaremos ele várias vezes na aplicação

import React from 'react'

import PropTypes from 'prop-types' // Gerenciar erros na Biblioteca PropTypes

import { ContainerButton } from './styles'

export function Button ({ children, ...rest }) {
  return <ContainerButton {...rest}>{children}</ContainerButton>
}

// Corrigindo o erro com o PropTypes

Button.propTypes = {
  children: PropTypes.string
}
