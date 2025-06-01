import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "../style/pages/Video.module.scss";
import BackImg from "../assets/img/VideoPageBackImg.png"
import ShareButton from '../assets/img/ShareButton.png';
import Xicon from '../assets/img/x.png';
import ConversationIcon from '../assets/img/articleIcon.png';
import UpArrow from '../assets/img/up_arrow.png';
import DownArrow from '../assets/img/down_arrow.png';
import SoundVolume from '../assets/img/soundVolume.png';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function Video() {
    const videoRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 480 });
    const { reelsId } = useParams();
    const { currentIndex, reelsDataList } = location.state || {};
    const currentReelsData = reelsDataList[currentIndex];
    const [reelsUrl, setReelsUrl] = useState(null);
    const [conversation, setConversation] = useState({});
    const [articleUrl, setArticleUrl] = useState();
    const [muted, setMuted] = useState(false);
    const [isSeeConversation, setIsSeeConversation] = useState(false);
    const [hasCurrentIndex, setHasCurrentIndex] = useState(false);

    useEffect(() => {
        if (currentIndex) setHasCurrentIndex(true);

        // 백엔드와 데이터 통신
        try {
          axios.put(`${import.meta.env.VITE_BACKEND_URL}/reels/${reelsId}/views`);
        } catch (error) {
          console.log('조회수 증가 에러', error);
        }

        const fetchReelsDetails = async () => {
          try {
              const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reels/${reelsId}/details`);
              setReelsUrl(response.data.reels.reelsUrl);
              setConversation(response.data.conversation.script)
              setArticleUrl(response.data.articleUrl);
          } catch (error) {
            console.error('reels 디테일 불러오기 에러:', error);
          }
        }

        fetchReelsDetails();
      }, []);

    const handleUpClick = async () => {
      const upReelsData = reelsDataList[currentIndex - 1];
      if (currentIndex != 0) {  
        navigate(`/reels/${upReelsData._id}`, {
                            state: {
                                currentIndex: currentIndex - 1,
                                reelsDataList: reelsDataList,
                            }
                })
              }
    }

    const handleDownClick = async () => {
      const downReelsData = reelsDataList[currentIndex + 1];
      if (currentIndex != reelsDataList.length-1) {
        navigate(`/reels/${downReelsData._id}`, {
                            state: {
                                currentIndex: currentIndex + 1,
                                reelsDataList: reelsDataList,
                            }
              })
      }
    }

    const toggleMute = () => {
      const video = videoRef.current;
      video.muted = !video.muted;
      setMuted(video.muted);
    };

    function timeAgo(dateString) {
      const now = new Date();
      const past = new Date(dateString);
      const diffInSeconds = Math.floor((now - past) / 1000);

      if (diffInSeconds < 60) {
        return `${diffInSeconds}초 전`;
      }

      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
      }

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
      }

      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}일 전`;
    }

    return (
      <div className={styles.container}>
        <img className={styles.backImg} src={BackImg}/>
        {(!isMobile||!isSeeConversation) &&
          <button className={styles.backButton} onClick={() => navigate('/')}><img src={Xicon} alt="뒤로가기" /></button>
        }
        <div className={styles.videoContainer}>
          {reelsUrl||reelsDataList[currentIndex].reelsUrl ? 
          <video ref={videoRef} className={styles.video} controls controlsList="nodownload">
            <source src={reelsUrl ? reelsUrl : reelsDataList[currentIndex].reelsUrl} type="video/mp4" />
            비디오를 지원하지 않는 브라우저입니다.
          </video> : <div />
          }
        </div>
        <div className={styles.rightContainer}>
          {(!isMobile||!isSeeConversation) &&
          <div className={styles.bar}>
            <button onClick={() => setIsSeeConversation(!isSeeConversation)}><img src={ConversationIcon} alt="대사 보기" /></button>
            {hasCurrentIndex >= 0 ? 
            <div className={styles.moveButtonContainer}>
              <button className={styles.moveButton} onClick={handleUpClick}><img src={UpArrow} alt="이전 동영상 보기" /></button>
              <button className={styles.moveButton} onClick={handleDownClick}><img src={DownArrow} alt="다음 동영상 보기" /></button>
            </div>
            :
            <div />}
            <button className={styles.soundButton} onClick={toggleMute}><img src={SoundVolume} alt="음량 조절" /></button>
          </div>}

          {isSeeConversation && (
              <div className={styles.conversationContainer}>
                {/* <div className={styles.articleTitle}>제목</div> */}
                <div className={styles.extraUIContainer}>
                  <div>{timeAgo(currentReelsData.createdAt)} | {currentReelsData.views}회</div>
                  {/* <button className={styles.shareButton}><img src={ShareButton} alt="공유 버튼"/></button> */}
                  {isMobile && <button className={styles.closeConversationButton} onClick={() => setIsSeeConversation(!isSeeConversation)}><img src={Xicon} alt="대사 닫기" /></button>}
                </div>
                <div className={styles.conversation}>
                  {conversation.map((lineObj, index) => {
                                          const text = Object.values(lineObj)[0];
                                          return (
                                              <div className={styles.script} key={index}>{text}</div>
                                          );
                                      })}
                </div>
                <button className={styles.seeSourceButton} onClick={() => window.open(articleUrl)}>원문 보기</button>
              </div>
            )}

        </div>
      </div>
    );
  }