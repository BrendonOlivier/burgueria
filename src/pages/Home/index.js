import React from 'react'

import HomeLogo from '../../assets/HomeLogo.svg'

import { Container, HomeImg } from './styles'
import { CategoryCarousel, OffersCarousel } from '../../components'

export function Home () {
  return (
    <Container>
      <HomeImg src={HomeLogo} alt='logo-da-home' />
      <CategoryCarousel />
      <OffersCarousel />
    </Container>
  )
}
