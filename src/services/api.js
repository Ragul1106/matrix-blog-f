// src/services/api.js
import axios from 'axios'
import * as jwtDecode from 'jwt-decode'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: API_BASE,
})

/*
Store & refresh logic expects tokens in localStorage:
{ access: '...', refresh: '...' }
*/

function getTokens(){
  const raw = localStorage.getItem('matrixblog_tokens')
  return raw ? JSON.parse(raw) : null
}

function setTokens(tokens){
  localStorage.setItem('matrixblog_tokens', JSON.stringify(tokens))
}

function clearTokens(){
  localStorage.removeItem('matrixblog_tokens')
}

// request interceptor to attach token
api.interceptors.request.use((config) => {
  const tokens = getTokens()
  if (tokens?.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`
  }
  return config
})

// response interceptor to handle 401 by trying refresh
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token=null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config
    if (err.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true
      const tokens = getTokens()
      if (tokens?.refresh) {
        if (isRefreshing){
          return new Promise(function(resolve,reject){
            failedQueue.push({resolve, reject})
          }).then(token => {
            originalReq.headers.Authorization = 'Bearer ' + token
            return api(originalReq)
          }).catch(e => Promise.reject(e))
        }
        isRefreshing = true
        try {
          const response = await axios.post(`${API_BASE}/token/refresh/`, { refresh: tokens.refresh })
          const newTokens = response.data
          setTokens(newTokens)
          api.defaults.headers.common['Authorization'] = 'Bearer ' + newTokens.access
          processQueue(null, newTokens.access)
          isRefreshing = false
          originalReq.headers.Authorization = 'Bearer ' + newTokens.access
          return api(originalReq)
        } catch (e){
          processQueue(e, null)
          isRefreshing = false
          clearTokens()
          window.location.href = '/login'
          return Promise.reject(e)
        }
      } else {
        clearTokens()
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

/* Auth */
export async function login(credentials){
  const resp = await api.post('/token/', credentials)
  setTokens(resp.data)
  return resp.data
}
export async function register(data){
  const resp = await api.post('/register/', data)
  return resp.data
}
export function logout(){
  clearTokens()
}

/* Users */
export async function getProfile(){
  const resp = await api.get('/users/profile/')
  return resp.data
}
export async function getUsers(params){
  const resp = await api.get('/users/', { params })
  return resp.data
}

/* Posts */
export async function getPosts(page=1, filters={}){
  const params = { page, ...filters }
  const resp = await api.get('/posts/', { params })
  return resp.data
}
export async function getPost(slug){
  const resp = await api.get(`/posts/${slug}/`)
  return resp.data
}
export async function createPost(formData){
  const resp = await api.post('/posts/', formData, { headers: {'Content-Type': 'multipart/form-data'} })
  return resp.data
}
export async function updatePost(slug, formData){
  const resp = await api.patch(`/posts/${slug}/`, formData, { headers: {'Content-Type': 'multipart/form-data'} })
  return resp.data
}
export async function deletePost(slug){
  const resp = await api.delete(`/posts/${slug}/`)
  return resp.data
}

/* Comments */
export async function getCommentsForPost(slug){
  const resp = await api.get(`/posts/${slug}/comments/`)
  return resp.data
}
export async function createComment(data){
  const resp = await api.post('/comments/', data)
  return resp.data
}
export async function updateComment(id, data){
  const resp = await api.patch(`/comments/${id}/`, data)
  return resp.data
}
export async function deleteComment(id){
  const resp = await api.delete(`/comments/${id}/`)
  return resp.data
}

export default api
