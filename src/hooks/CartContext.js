// Aqui vamos conseguir pegar o que o cliente adicionou ao carrinho, salvar e poder usar em toda a aplicação
import React, { createContext, useContext, useState, useEffect } from 'react'

import PropTypes from 'prop-types'

const CartContext = createContext({})

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]) // Aqui teremos as informações de TODOS os produtos do carrinho

  // Vou criar uma função para atualizar o LocalStorage, pra economizar códigos
  const updateLocalStorage = async (products) => {
    await localStorage.setItem('devburguer:cartInfo', JSON.stringify(products))
  }

  const putProductInCart = async product => {
    // Aqui iremos verificar caso o cliente peça o mesmo produto em maior quantidade, vou apenas aumentar as quantidades
    const cartIndex = cartProducts
      .findIndex(prd => prd.id === product.id) // Vou procurar aqui se o produto já existe, e quero a posição dele

    let newCartProducts = []
    if (cartIndex >= 0) { // No IF vamos tratar se adicionarmo um produto que já existe no carrinho
      newCartProducts = cartProducts

      newCartProducts[cartIndex].quantity = newCartProducts[cartIndex].quantity + 1

      setCartProducts(newCartProducts)
    } else {
      product.quantity = 1
      newCartProducts = [...cartProducts, product]
      setCartProducts(newCartProducts) // Pego todos produtos que já estão lá, e só adicionando mais um campo
    } // No else estamos adicionando um produto que ainda não existe no carrinho

    await updateLocalStorage(newCartProducts) // E gravamos no servidor do navegador
  }

  // Esse campo é para deletar o produto do carrinho
  const deleteProducts = async productId => {
    const newCart = cartProducts.filter(product => product.id !== productId)

    setCartProducts(newCart)

    await updateLocalStorage(newCart)
  }

  // Aqui iremos adicionar um produto quando o cliente clicar no +
  const increaseProducts = async productId => {
    const newCart = cartProducts.map(product => {
      return product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
    })
    setCartProducts(newCart)

    await updateLocalStorage(newCart) // Gravar no servidor do navegador as info
  }

  // Aqui iremos diminuir um produto quando o cliente clicar no -
  // Porém temos que saber se o produto tem 1 ou mais de 1, porquê se tiver só 1, irei excluir o produto,
  // mas se tiver mais de um por exemplo ( 2 ) então vou diminuir ele para ( 1 )
  const decreaseProducts = async productId => {
    // Pegando a quantidade do produto
    const cartIndex = cartProducts.findIndex(pd => pd.id === productId)
    // E se a quantidade for mais de 1, irei tirar o produto
    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map(product => {
        return product.id === productId ? { ...product, quantity: product.quantity - 1 } : product
      })

      setCartProducts(newCart)

      await updateLocalStorage(newCart)
    } else {
      deleteProducts(productId) // Aqui deletaremos o produto caso esteja só 1
    }
  }

  // e com o useEffect, caso o usuário recarregue a página, os itens não perdidos, ficam gravados
  useEffect(() => {
    const loadUserData = async () => {
      const clientCartData = await localStorage.getItem('devburguer:cartInfo')

      if (clientCartData) {
        setCartProducts(JSON.parse(clientCartData))
      }
    }
    loadUserData()
  }, [])

  // Aqui no nosso Provider, tudo que eu colocar aqui vai estar disponivel para toda a aplicação, no caso os Itens do Carrinho
  return (
        <CartContext.Provider value={{ putProductInCart, cartProducts, increaseProducts, decreaseProducts }}>
            {children}
        </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used with CartContext')
  }

  return context
}

CartProvider.propTypes = {
  children: PropTypes.node
}
