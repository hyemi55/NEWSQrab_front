// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "src/components/section/Header"
import Home from "src/pages/Home"
import GenSteps from "src/pages/GenSteps"
import Video from "src/pages/Video.jsx";
import Result from "src/pages/Result.jsx";


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generating/:articleId" element={<GenSteps />} />
        <Route path="/generating/:articleId/result" element={<Result />} />

        {/* 추후 라우팅 path를 video id로 변경 */}
        <Route path="/video-test" element={<Video />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
