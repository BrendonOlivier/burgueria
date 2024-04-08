import React, { createContext, useContext, useState, useEffect } from 'react'

import PropTypes from 'prop-types'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({})

  const putUserData = async (userInfo) => {
    setUserData(userInfo)

    // Estamos gravando os dados do usuário no localStorage que fica no nosso navegador
    await localStorage.setItem('devburguer:userData', JSON.stringify(userInfo))
  }

  // Criar uma função para deslogar o usuário
  const logout = async () => {
    localStorage.removeItem('devburguer:userData')
  }

  // e com o useEffect, toda vez que recarregar a página, não perderemos os dados
  useEffect(() => {
    const loadUserData = async () => {
      const clientInfo = await localStorage.getItem('devburguer:userData')

      if (clientInfo) {
        setUserData(JSON.parse(clientInfo))
      }
    }
    loadUserData()
  }, [])

  return (
        <UserContext.Provider value={{ putUserData, userData, logout }}>
            {children}
        </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used with UserContext')
  }

  return context
}

UserProvider.propTypes = {
  children: PropTypes.node
}
