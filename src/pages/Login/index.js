import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'
import LoginImg from '../../assets/ImageLogin.svg'
import Logo from '../../assets/Logo.svg'

import { Container, LoginImage, ContainerItens, Label, Input, SignLink, ErrorMessage } from './styles'
import Button from '../../components/Button'
import { useUser } from '../../hooks/UserContext'

function Login () {
  const history = useHistory()
  const { putUserData } = useUser()

  // Validar email e senha com o yupResolver
  const schema = Yup.object().shape({
    email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 dígitos')
  }).required()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  // Buscar no BackEnd as informações de email e senhas
  const onSubmit = async clientData => {
    const { data } = await toast.promise(
      api.post('sessions', {
        email: clientData.email,
        password: clientData.password
      }),
      {
        pending: 'Verificando seus dados',
        success: 'Seja bem vindo(a)',
        error: 'Verifique seu e-mail e senha 🤯'
      }
    )

    putUserData(data)

    setTimeout(() => {
      history.push('/')
    }, 1000)
  }
  return (
    <Container>
      <LoginImage src={LoginImg} alt="login-image" />
      <ContainerItens>
        <img src={Logo} alt="logo-img" />
        <h1>Login</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>Email</Label>
          <Input type="email" {...register('email')} error={errors.email?.message} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label>Senha</Label>
          <Input type="password" {...register('password')} error={errors.password?.message} />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 30, marginBottom: 10 }} >Entrar</Button>
        </form>
        <SignLink>Não possui conta ? <Link style={{ color: 'white' }} to="/cadastro">Cadastre-se</Link></SignLink>
      </ContainerItens>
    </Container>
  )
}

export default Login
