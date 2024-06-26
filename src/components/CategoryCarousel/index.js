// Criando um componente para uso de toda aplicação de Carrosel

import React, { useEffect, useState } from 'react'

import Category from '../../assets/category.png'
import api from '../../services/api'
import { Container, CategoryImg, ContainerItens, Image, Button } from './styles'
import Carousel from 'react-elastic-carousel'

export function CategoryCarousel () {
  const [categories, setCateories] = useState([])

  useEffect(() => {
    async function loadCategories () {
      const { data } = await api.get('categories')

      setCateories(data)
    }

    loadCategories()
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
      <CategoryImg src={Category} alt='logo-da-categoria' />
      <Carousel itemsToShow={5} style={{ width: '90%' }} breakPoints={breakPoints}>
        {
          categories && categories.map(category => (
            <ContainerItens key={category.id}>
              <Image src={category.url} alt='foto da categoria' />
              <Button>{category.name}</Button>
            </ContainerItens>
          ))
        }
      </Carousel>
    </Container>
  )
}
