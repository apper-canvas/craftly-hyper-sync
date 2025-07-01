import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'

const Layout = () => {
  const navigate = useNavigate()

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`)
    } else {
      navigate('/products')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      <Header onSearch={handleSearch} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout