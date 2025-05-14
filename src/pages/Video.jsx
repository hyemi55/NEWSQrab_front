import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "src/style/pages/Video.module.scss";
import ShareButton from 'src/assets/img/ShareButton.png';
import Xicon from 'src/assets/img/x.png';
import ConversationIcon from 'src/assets/img/articleIcon.png';
import UpArrow from 'src/assets/img/up_arrow.png';
import DownArrow from 'src/assets/img/down_arrow.png';
import SoundVolume from 'src/assets/img/soundVolume.png';
import { useNavigate } from "react-router-dom";

export default function Video() {
    const videoRef = useRef(null);
    const [article, setArticle] = useState(null);
    const [isSeeConversation, setIsSeeConversation] = useState(false);
    const navigate = useNavigate();

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
        <button className={styles.backButton} onClick={() => navigate('/')}><img src={Xicon} alt="뒤로가기" /></button>
        <div className={styles.videoContainer}>
          <video ref={videoRef} className={styles.video} controls controlsList="nodownload">
            <source src='https://www.w3schools.com/html/movie.mp4' type="video/mp4" />
            비디오를 지원하지 않는 브라우저입니다.
          </video>
          
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.bar}>
            <button onClick={() => setIsSeeConversation(!isSeeConversation)}><img src={ConversationIcon} alt="대사 보기" /></button>
            <div className={styles.moveButtonContainer}>
              <button className={styles.moveButton}><img src={UpArrow} alt="이전 동영상 보기" /></button>
              <button className={styles.moveButton}><img src={DownArrow} alt="다음 동영상 보기" /></button>
            </div>
            <button className={styles.soundButton}><img src={SoundVolume} alt="음량 조절" /></button>
          </div>
          {isSeeConversation && (
              <div className={styles.articleContainer}>
                <div className={styles.articleTitle}>제목</div>
                <div className={styles.extraUIContainer}>
                  <div>4시간 전 | 3,600회</div>
                  <button className={styles.shareButton}><img src={ShareButton} alt="공유 버튼"/></button>
                </div>
                <div className={styles.article}>{article}</div>
                <button className={styles.seeSourceButton}>원문 보기</button>
              </div>
            )}
        </div>
      </div>
    );
  }