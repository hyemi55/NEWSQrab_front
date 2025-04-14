// import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/Header"
import News from './pages/News'
import GenMobile from './pages/GenMobile'
import GenWeb from "./pages/GenWeb"

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/news" element={<News />} />
        {/* <Route path="/generator" element={<GenMobile />} /> */}
        <Route path="/generator" element={<GenWeb />} />

        <Route path="/" element={<Navigate to='/news' replace/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
