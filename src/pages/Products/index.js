import React from 'react'

import ProductLogo from '../../assets/ProductLogo.png'

import { Container, ProductsImage } from './styles'

function Products () {
  return (
    <Container>
      <ProductsImage src={ProductLogo} alt='logo-do-produto' />
    </Container>
  )
}

export default Products
