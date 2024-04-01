import axios from 'axios'

const apiDevBurgueria = axios.create({
  baseURL: 'http://localhost:3001'
})

export default apiDevBurgueria
