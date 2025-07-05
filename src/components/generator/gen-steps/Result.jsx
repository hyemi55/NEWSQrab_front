import React, { useEffect, useState } from 'react';
import styles from "../../../style/generator/gen-steps/Result.module.scss"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Result({ conversationId }) {
    const { articleId } = useParams();
    const username = useSelector((state) => state.user.username);
    const char1 = useSelector((state) => state.characters.char1);
    const char2 = useSelector((state) => state.characters.char2);
    const [url, setUrl] = useState("");
    const [ progress, setProgress ] = useState(0);
    const [ targetProgress, setTargetProgress ] = useState(0);

    useEffect(() => {
        const fetchVideo = async () => {

            const postDataForFinalize = {
                    articleId: articleId,
                    owner: username,
                    character1: char1.species,
                    character2: char2.species,
                    createdBy: username,
                }

            try {
                setProgress(5);
                setTargetProgress(40);

                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reels/${conversationId}/tts`);
                setProgress(40);
                setTargetProgress(60);
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/conversation/${conversationId}/confirm`);
                setProgress(60);
                setTargetProgress(85);
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reels/${conversationId}/generate-reels`);
                setProgress(85);
                setTargetProgress(95);
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reels/${conversationId}/add-subtitles`);
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reels/${conversationId}/finalize`, postDataForFinalize);
                setUrl(response.data.reelsUrl);
    
            } catch (error) {
                console.log("conversation 수정 에러: ", error);
            }
        }

        fetchVideo();
    }, [])

    useEffect(() => {
        let interval;
        if (url=="") {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= targetProgress) return prev;
                    return Math.min(prev + Math.random() * 1, targetProgress);
                })
            }, 700);
        }

        return () => clearInterval(interval);
    }, [url, targetProgress])

    return (
        <div className={styles.container}>
            <div className={styles.title}>완성~ 내 뉴스를 업로드해볼까?</div>
            
            {!url=="" ? <video src={url} controls className={styles.video}/>
                        : <div className={styles.altVideoContianer}>
                            <div className={styles.altVideoText}>{char1.name} & {char2.name}가<br/>열심히 영상 생성 중...</div>
                            <div className={styles.progressBarWrapper}>
                                <div className={styles.progressBar} style={{ width: `${progress}%`}}/>
                            </div>
                        </div>}
        </div>
    )
}