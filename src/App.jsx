import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BlogList from './pages/BlogList'
import BlogDetail from './pages/BlogDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateEditPost from './pages/CreateEditPost'
import ProtectedRoute from './components/ProtectedRoute'

function App(){
  return (
    <div>
      <Navbar />
      <main className="container mt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreateEditPost/></ProtectedRoute>} />
          <Route path="/edit/:slug" element={<ProtectedRoute><CreateEditPost/></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  )
}
export default App
