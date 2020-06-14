import axios from 'axios'

const serive = axios.create({
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
  timeout: 3000
})

serive.interceptors.request.use(config => {
  let token = sessionStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
},error => {
  return Promise.reject(error)
})

serive.interceptors.response.use(response => {
  return response
},error => {
  return Promise.reject(error)
})

export default serive