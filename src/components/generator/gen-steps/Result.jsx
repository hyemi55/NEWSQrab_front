import React, { useEffect, useState } from 'react';
import styles from "../../../style/generator/gen-steps/Result.module.scss"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Result({ conversationId }) {
    const { articleId } = useParams();
    const username = useSelector((state) => state.user.username);
    const [url, setUrl] = useState("");

    useEffect(() => {
        const fetchVideo = async () => {
            const postDataForFinalize = {
                    articleId: articleId,
                    owner: username,
                    character1: "크랩이",
                    character2: "복어",
                    createdBy: username,
                }

            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reels/${conversationId}/tts`);
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/conversation/${conversationId}/confirm`);
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reels/${conversationId}/generate-reels`);
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reels/${conversationId}/add-subtitles`);
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reels/${conversationId}/finalize`, postDataForFinalize);
                setUrl(response.data.reelsUrl);
    
            } catch (error) {
                console.log("conversation 수정 에러: ", error);
            }
        }

        fetchVideo();
    }, [])
    
    const handleDownloadClick = async () => {
        try {
            const response = await axios.get(url,
                {
                    responseType: 'blob',
                }
            );

            const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = 'my-video.mp4';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log('다운로드 실패:', error);
        }
    }

    const handleUploadClick = () => {

    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>완성~ 내 뉴스를 업로드해볼까?</div>
            
            {!url=="" ? <video src={url} controls className={styles.video}/>
                        : <div className={styles.altVideoText}>영상 생성 중...</div>}

            <div className={styles.buttonContainer}>
                {/* <button className={styles.downloadButton} onClick={handleDownloadClick}>다운로드</button> */}
                {/* <button className={styles.uploadButton} onClick={handleUploadClick}>업로드</button> */}
            </div>
        </div>
    )
}