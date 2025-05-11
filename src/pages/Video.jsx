import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "src/style/pages/Video.module.scss";
import ShareButton from 'src/assets/img/ShareButton.png';
import LeftArrow from 'src/assets/img/arrow-left.png';
import { useNavigate } from "react-router-dom";

export default function Video() {
    const videoRef = useRef(null);
    const [article, setArticle] = useState(null);
    const [isSeeArticle, setIsSeeArticle] = useState(false);
    const navigate = useNavigate();

    const handlePlayPause = () => {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    };

    useEffect(() => {
        // 백엔드와 데이터 통신
        const fetchArticle = async () => {
            try {
                console.log(import.meta.env.VITE_BACKEND_URL)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/articles/66a8d5cfdc25ea64654b431c/content`);
                setArticle(response.data)
                console.log(response);
            } catch (error) {
                console.error('에러:', error);
            }
        }

        fetchArticle();
      }, []);

    
  
    return (
      <div className={styles.container}>
        <div className={styles.videoContainer}>
          <button className={styles.backButton} onClick={() => navigate('/')}><img src={LeftArrow} alt="뒤로가기" /></button>
          
          <video ref={videoRef} onClick={handlePlayPause} className={styles.video}>
            <source src='https://www.w3schools.com/html/movie.mp4' type="video/mp4" />
            비디오를 지원하지 않는 브라우저입니다.
          </video>

          <div className={styles.uiContainer}>
              <button className={styles.seeArticleButton} onClick={() => setIsSeeArticle(!isSeeArticle)}>원문 보기</button>
              <div>n시간 전 | 조회수</div>
              <button className={styles.shareButton}><img src={ShareButton} alt="공유 버튼"></img></button>
          </div>
          {isSeeArticle && (
            <div className={styles.article}>{article}</div>
          )}
        </div>
      </div>
    );
  }