import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { Container } from './styles'
import { Button } from '../Button'
import formatCurrency from '../../utils/formatCurrency'
import { useCart } from '../../hooks/CartContext'
import api from '../../services/api'

export function CartResume () {
  // Com o useState vou criar a lógica do resumo do carrinho
  const [finalPirce, setFinalPrice] = useState(0) // Preço dos itens
  const [deliveryTax] = useState(5) // Preço da entrega

  const { cartProducts } = useCart() // Pegando os produtos do carrinho

  // Toda vez que alterar meu carrinho, eu quero somar todos itens pra atualizar no preço final
  useEffect(() => { // Então aqui irei fazer o cálculo
    const sumAllItems = cartProducts.reduce((acc, current) => { // Valor do produto VEZES a quantidade
      return current.price * current.quantity + acc
    }, 0)

    setFinalPrice(sumAllItems)
  }, [cartProducts, deliveryTax])

  // Fazer a chamada pra nossa API quando o cliente for Finalizar o pedido
  const submitOrder = async () => {
    const order = cartProducts.map(product => {
      return { id: product.id, quantity: product.quantity }
    })

    await toast.promise(api.post('orders', { products: order }), {
      pending: 'Realizando o seu pedido...',
      success: 'Pedido realizado com sucesso',
      error: 'Falha ao tentar realizar o seu pedido, tente novamente'
    })
  }

  return (
    <div>
    <Container>
      <div className='container-top'>
        <h2 className='title'>Resumo do pedido</h2>
        <p className='items'>Items</p>
        <p className='items-price'>{formatCurrency(finalPirce)}</p>
        <p className='delivery-tax'>Taxa de entrega</p>
        <p className='delivery-tax-price'>{formatCurrency(deliveryTax)}</p>
      </div>
      <div className='container-bot'>
        <p>Total</p>
        <p>{formatCurrency(finalPirce + deliveryTax)}</p>
      </div>
    </Container>
    <Button style={{ width: '100%', marginTop: 30 }} onClick={submitOrder}>Finalizar Pedido</Button>
    </div>
  )
}
