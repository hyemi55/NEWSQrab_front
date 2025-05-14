import React, { useEffect, useState } from 'react';
import styles from "src/style/generator/gen-steps/Result.module.scss"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Result({ conversationId}) {
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
            console.log("이름" + username);

            try {
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/conversation/${conversationId}/confirm`);
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reels/${conversationId}/tts`);
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/reels/${conversationId}/generate-reels`);
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/conversation/generate/user-modified`, postDataForFinalize);
                setUrl(response.data.reelsUrl);

                console.log(response.data);
    
    
            } catch (error) {
                console.log("conversation 수정 에러: ", error);
            }
        }

        fetchVideo();
    }, [])
    
    const handleDownloadClick = async () => {
        // cors 에러. 백엔드 완성 이후 재작성할 것.
        // try {
        //     const response = await axios.get(
        //         'https://www.w3schools.com/html/movie.mp4',
        //         {
        //             responseType: 'blob',
        //         }
        //     );

        //     const url = URL.createObjectURL(response.data);
        //     const a = document.createElement('a');
        //     a.href = url;
        //     a.download = 'my-video.mp4';
        //     a.click();
        //     URL.revokeObjectURL(url);
        // } catch (error) {
        //     console.error('다운로드 실패:', error);
        // }
    }

    const handleUploadClick = () => {

    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>완성~ 내 뉴스를 업로드해볼까?</div>
            
            <video src={url} controls className={styles.video}/>

            <div className={styles.buttonContainer}>
                <button className={styles.downloadButton} onClick={handleDownloadClick}>다운로드</button>
                {/* <button className={styles.uploadButton} onClick={handleUploadClick}>업로드</button> */}
            </div>
        </div>
    )
}