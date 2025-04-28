// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "src/components/section/Header"
import Home from "src/pages/Home"
import GenSteps from "src/pages/GenSteps"
import Video from "src/pages/Video.jsx";


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generating" element={<GenSteps />} />
        <Route path="/video-test" element={<Video />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
