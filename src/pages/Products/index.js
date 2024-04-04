import React from 'react'

import HomeLogo from '../../assets/HomeLogo.svg'

import { Container, HomeImg } from './styles'
import OffersCarousel from '../../components/OfferCarousel'
import CategoryCarousel from '../../components/CategoryCarousel'

function Home () {
  return (
    <Container>
      <HomeImg src={HomeLogo} alt='logo-da-home' />
      <CategoryCarousel />
      <OffersCarousel />
    </Container>
  )
}

export default Home
