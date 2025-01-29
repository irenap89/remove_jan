import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Remove_bg from './remove_bg'
import Login from './Login'

function App() {

  return (

    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="Remove_bg" element={<Remove_bg />} />
        </Routes>
    </BrowserRouter>

  )
}

export default App
