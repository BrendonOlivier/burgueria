import axios from 'axios'

const apiDevBurgueria = axios.create({
  baseURL: 'http://localhost:3001'
})

apiDevBurgueria.interceptors.request.use(async config => {
  const userData = await localStorage.getItem('devburguer:userData')
  const token = userData && JSON.parse(userData).token
  config.headers.authorization = `Bearer ${token}`
  return config
})

export default apiDevBurgueria
