import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'
import { boot } from 'quasar/wrappers'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

function getDefaultConfig(config: AxiosRequestConfig | undefined): InternalAxiosRequestConfig {
  const token = localStorage.getItem('token')

  if (!config) {
    config = {}
  }
  if (!config.headers) {
    config.headers = {}
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json'
  }

  // Cast to InternalAxiosRequestConfig
  return config as InternalAxiosRequestConfig
}

// Create Axios instance
const api = axios.create({
  //change this to your own api
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 10000,
})

const axiosResponseHandler = (res: AxiosResponse) => {
  return {
    ...res,
    data: res.data,
  }
}

api.interceptors.request.use(
  (config) => getDefaultConfig(config || undefined),
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

api.interceptors.response.use(axiosResponseHandler, (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        console.warn('Unauthorized. Redirecting to login...')
        break
      case 403:
        console.warn('Forbidden. You do not have access.')
        break
      case 404:
        console.error('Resource not found:', error.response.config.url)
        break
      case 500:
        console.error('Server error. Try again later.')
        break
      default:
        console.error('Unhandled error:', error.response.status)
    }
  } else if (error.request) {
    console.error('No response from server:', error.request)
  } else {
    console.error('Request setup error:', error.message)
  }
  return Promise.reject(error)
})

export default boot(({ app }) => {
  // Make both the default Axios instance and the custom API instance available
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
