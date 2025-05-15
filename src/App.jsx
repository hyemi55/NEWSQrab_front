// import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Header from "./components/section/Header"
import Home from "./pages/Home"
import GenSteps from "./pages/GenSteps"
import Video from "./pages/Video.jsx";
import DownloadTest from "./DownloadTest.jsx";


function AppRoutes() {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith('/reels/');

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generating/:articleId" element={<GenSteps />} />
        <Route path="/reels/:reelsId" element={<Video key={location.pathname}/>} />
        <Route path="/DownloadTest" element={<DownloadTest />} />
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
