import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import InfoUs from './components/InfoUs.jsx'
import Navbar from './components/Navbar'
import CardCel from './components/CardCel.jsx'
import Footer from './components/Footer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>  
      <div style={{ paddingTop: '6rem', paddingBottom: "5rem" }}> {/* Agregar padding para evitar solapamiento del navbar */}
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/CardCel' element={<CardCel />} />
          <Route path='/InfoUs' element={<InfoUs/>} />
        </Routes> 
      </div>
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>,
)
