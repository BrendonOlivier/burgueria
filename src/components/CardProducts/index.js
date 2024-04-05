// Criar o componente dos cards para nossos Produtos, para ficar mais organizado a aplicação

import React from 'react'
import { Container, Image, ProductName, ProductPrice } from './styles'
import { Button } from '../Button'
import PropTypes from 'prop-types'
import { useCart } from '../../hooks/CartContext'

export function CardProduct ({ product }) {
  const { putProductInCart } = useCart() // Essa função é responsável por chamar nossos produtos
  return (
    <Container>
      <Image src={product.url} alt='imagem do produto' />
      <div>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.formatedPrice}</ProductPrice>
        <Button onClick={ () => putProductInCart(product)}>Adicionar</Button>
      </div>

    </Container>
  ) // Coloquei o onClick no meu botão pra quando eu clicar, já adicionar o item no carrinho
}

CardProduct.propTypes = {
  product: PropTypes.object
}
