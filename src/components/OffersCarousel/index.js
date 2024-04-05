// Criando um componente para uso de toda aplicação de Carrosel

import React, { useEffect, useState } from 'react'

import Offers from '../../assets/Offers.png'
import api from '../../services/api'
import { Container, CategoryImg, ContainerItens, Image, Button } from './styles'
import Carousel from 'react-elastic-carousel'
import formatCurrency from '../../utils/formatCurrency'

export function OffersCarousel () {
  const [offers, setOffers] = useState([])

  useEffect(() => {
    async function loadOffers () {
      const { data } = await api.get('products')

      // Aqui estamos filtrando para mostrar na tela apenas os produtos que estão em ofertas !
      // E com o map estamos formatando as moedas da nossa formatação
      const onlyOffers = data.filter(product => product.offer).map(product => {
        return { ...product, formatedPrice: formatCurrency(product.price) }
      })

      setOffers(onlyOffers)
    }

    loadOffers()
  }, [])
  // Criaremos uma váriavel breakPoints que irá definir quantas categorias vai ter conforme a tela vai diminuindo
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
    { width: 1300, itemsToShow: 5 }
  ]

  // Montar nosso carossel de categorias
  return (
    <Container>
      <CategoryImg src={Offers} alt='logo do produto' />
      <Carousel itemsToShow={5} style={{ width: '90%' }} breakPoints={breakPoints}>
        {
          offers && offers.map(product => (
            <ContainerItens key={product.id}>
              <Image src={product.url} alt='foto da produto' />
              <p>{product.name}</p>
              <p>{product.formatedPrice}</p>
              <Button>Peça agora</Button>
            </ContainerItens>
          ))
        }
      </Carousel>
    </Container>
  )
}
