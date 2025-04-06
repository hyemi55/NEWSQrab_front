// import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/Header"
import News from './pages/News'
import Generator from './pages/Generator'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/news" element={<News />} />
        <Route path="/generator" element={<Generator />} />

        <Route path="/" element={<Navigate to='/news' replace/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
