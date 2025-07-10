import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><h1>neurofi</h1></Link>
      </div>
      
      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          {!isAuthPage && <>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>}
        </ul>
      </nav>
      
      <div className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  )
}