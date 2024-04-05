// Aqui vamos facilitar o import na aplicação, resumindo todos nossos hooks em um só

import React from 'react'

import PropTypes from 'prop-types'

import { UserProvider } from './UserContext'
import { CartProvider } from './CartContext'

const AppProvider = ({ children }) => (
  <UserProvider>
    <CartProvider> {children}</CartProvider>
  </UserProvider>)

AppProvider.propTypes = {
  children: PropTypes.node
}

export default AppProvider
