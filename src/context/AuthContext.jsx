// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react'
import { login as apiLogin, logout as apiLogout, getProfile } from '../services/api'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [tokens, setTokens] = useState(() => {
    const raw = localStorage.getItem('matrixblog_tokens')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    async function fetchProfile(){
      if (tokens?.access) {
        try {
          const profile = await getProfile()
          setUser(profile)
        } catch (e) {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    }
    fetchProfile()
  }, [tokens])

  const login = async (credentials) => {
    const tok = await apiLogin(credentials)
    setTokens(tok)
    localStorage.setItem('matrixblog_tokens', JSON.stringify(tok))
    const profile = await getProfile()
    setUser(profile)
    return profile
  }

  const logout = () => {
    apiLogout()
    setTokens(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
