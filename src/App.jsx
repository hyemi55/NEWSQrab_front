import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import News from './pages/News'
import Generate from './pages/Generate'
import Main from './pages/Main'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/news" element={<News />} />
        <Route path="/generate" element={<Generate />} />

        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
