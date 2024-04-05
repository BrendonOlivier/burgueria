import React, { useEffect, useState } from 'react'

import ProductLogo from '../../assets/ProductLogo.png'
import { CardProduct } from '../../components'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import { Container, ProductsImage, CategoryButton, CategoriesMenu, ProductsContainer } from './styles'

export function Products () {
  const [categories, setCateories] = useState([])
  const [products, setProducts] = useState([]) // Criando um estado pros produtos
  const [filterProducts, setFilterProducts] = useState([]) // Iremos filtar os produtos pelas categorias do menu
  const [activeCategory, setActiveCategory] = useState() // Toda vez que eu clicar no botão, vou pegar o id desse botão e guardar nessa variável

  useEffect(() => {
    async function loadCategories () {
      const { data } = await api.get('categories')
      // Adicionando uma nova categoria
      const newCategories = [{ id: 0, name: 'Todas' }, ...data]

      setCateories(newCategories)
    }

    // Criar os cards com os nosso produtos, 1º passo, indo no BackEnd indo pegar nossos produtos
    async function loadProducts () {
      const { data: allProducts } = await api.get('products')
      // Formatando a moeda
      const newProducts = allProducts.map(product => {
        return { ...product, formatedPrice: formatCurrency(product.price) }
      })

      setProducts(newProducts)
    }

    loadProducts()
    loadCategories()
  }, [])
  // Filtrando os produtos para saber se é os produtos das categorias desejadas no menu
  useEffect(() => {
    if (activeCategory === 0) {
      setFilterProducts(products) // Se o usuário clicar em ' Todas ' irei mostrar TODOS os PRODUTOS
    } else {
      const newFilteredProducts = products.filter(product => product.category_id === activeCategory)

      setFilterProducts(newFilteredProducts)
    } // E se não for, irei filtrar Normalmente
  }, [activeCategory, products])

  return (
    <Container>
      <ProductsImage src={ProductLogo} alt='logo-do-produto' />
      <CategoriesMenu>
        {categories && categories.map(category =>
          <CategoryButton type='button'
            key={category.id}
            onClick={() => { setActiveCategory(category.id) }}
            isActiveCategory={activeCategory === category.id}>
            {category.name}
          </CategoryButton> // Se o botão que eu clicar for igual ao id da category, irei mudar a cor da categoria
        )}
      </CategoriesMenu>
      <ProductsContainer>
        {filterProducts && filterProducts.map(product => (
          <CardProduct key={product.id} product={product} /> // Se existir produto, irei mapear eles
        ))}

      </ProductsContainer>
    </Container>
  )
}
