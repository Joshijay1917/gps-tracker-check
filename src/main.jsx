import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserInterface from './components/userInter.jsx'
import LiveGps from './components/LiveGps.jsx'
import QRCode from './components/QRCode.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/user/:username' element={<UserInterface />}/>
        <Route path='/dash' element={<LiveGps />}/>
        <Route path='/qrcode' element={<QRCode />}/>
      </Routes>
  </BrowserRouter>
)
