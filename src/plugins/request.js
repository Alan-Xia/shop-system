import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const serive = axios.create({
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
  timeout: 3000
})
// 在 request 拦截器中，展示进度条 NProgress.start()
serive.interceptors.request.use(config => {
  NProgress.start()
  let token = sessionStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
},error => {
  return Promise.reject(error)
})

// 在 response 拦截器中，隐藏进度条 NProgress.done()
serive.interceptors.response.use(response => {
  NProgress.done()
  return response
},error => {
  return Promise.reject(error)
})

export default serive