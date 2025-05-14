// import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Header from "src/components/section/Header"
import Home from "src/pages/Home"
import GenSteps from "src/pages/GenSteps"
import Video from "src/pages/Video.jsx";


function AppRoutes() {
  const location = useLocation();
  const hideHeaderPaths = ['/video-test'];
  const hideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generating/:articleId" element={<GenSteps />} />
        <Route path="/video-test" element={<Video />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
