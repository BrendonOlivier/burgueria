// Aqui ficará emcarregado de formatar os valores, exemplo : R$ 2,00 que será utilizado em toda a aplicação

const formatCurrency = value => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export default formatCurrency
