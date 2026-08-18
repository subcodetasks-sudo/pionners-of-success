import axios from 'axios'
import { getCurrentLocale } from '@/i18n/locales'

export const api = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  config.headers.set('Accept-Language', getCurrentLocale())
  config.headers.set('ngrok-skip-browser-warning', 'true')
  return config
})
