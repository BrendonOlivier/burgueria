import React from 'react'
import { useHistory } from 'react-router-dom'

import { useUser } from '../../hooks/UserContext' // importando o Logout para deslogarmos o usuário

import Logo from '../../assets/logo-header.png'
import Cart from '../../assets/cart.png'
import User from '../../assets/user.png'
import { Container, ContainerLeft, PageLink, ContainerRight, Line, ContainerText, PageLinkExit } from './styles'

export function Header () {
  const { logout } = useUser() // Pegando o logout
  const { push, location: { pathname } } = useHistory() // Criar nossas navegações com o useHistory
  // Com o pathname, eu vou saber em que página eu estou, e dependendo a que eu tiver, irei mudar a cor do meu link

  // Criando a função para deslogar
  const logoutUser = () => {
    logout()
    push('/login')
  }

  return (
    <Container>
      <ContainerLeft>
        <img src={Logo} alt='logo do hamburguer' />
        <PageLink onClick={() => push('/')} isActive={pathname === '/'}>Home</PageLink>
        <PageLink onClick={() => push('/produtos')} isActive={pathname.includes('/produtos')}>Ver Produtos</PageLink>
        <PageLink>Contato</PageLink>
      </ContainerLeft>

      <ContainerRight>
        <PageLink><img src={User} alt='Usuário' /></PageLink>
        <Line></Line>
        <PageLink onClick={() => push('/carrinho')}>
          <img src={Cart} alt='carrinho' />
          <p>Pedidos</p>
        </PageLink>
      </ContainerRight>

      <ContainerText>
        <p>
          Olá, Brendon
        </p>
        <PageLinkExit onClick={logoutUser}>Sair</PageLinkExit>
      </ContainerText>
    </Container>
  )
}
