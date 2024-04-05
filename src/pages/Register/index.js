import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

import api from '../../services/api'
import RegisterImg from '../../assets/ImageRegister.svg'
import Logo from '../../assets/Logo.svg'

import { Container, RegisterImage, ContainerItens, Label, Input, SignLink, ErrorMessage } from './styles'
import { Button } from '../../components'

export function Register () {
  // Validar email e senha com o yupResolver
  const schema = Yup.object().shape({
    name: Yup.string().required('O seu nome é obrigatório'),
    email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 dígitos'),
    confirmPassword: Yup.string().required('A senha é obrigatória').oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
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
    try {
      const { status } = await api.post('users', {
        name: clientData.name,
        email: clientData.email,
        password: clientData.password
      }, { validateStatus: () => true })

      if (status === 201 || status === 200) {
        toast.success('Cadastro criado com sucesso')
      } else if (status === 409) {
        toast.error('E-mail já cadastrado! Faça login para continuar')
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error('Falha no sistema! Tente novamente')
    }
  }
  return (
    <Container>
      <RegisterImage src={RegisterImg} alt="register-image" />
      <ContainerItens>
        <img src={Logo} alt="logo-img" />
        <h1>Cadastre-se</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label error={errors.name?.message}>Nome</Label>
          <Input type="text" {...register('name')} error={errors.name?.message} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <Label error={errors.email?.message}>Email</Label>
          <Input type="email" {...register('email')} error={errors.email?.message} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label error={errors.password?.message}>Senha</Label>
          <Input type="password" {...register('password')} error={errors.password?.message} />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Label error={errors.confirmPassword?.message}>Confirmar Senha</Label>
          <Input type="password" {...register('confirmPassword')} error={errors.confirmPassword?.message} />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 20, marginBottom: 10 }} >Inscrever-se</Button>
        </form>
        <SignLink>Já possui conta ? <Link style={{ color: 'white' }} to="/login">Entrar</Link></SignLink>
      </ContainerItens>
    </Container>
  )
}
