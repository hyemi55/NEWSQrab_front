import React from 'react';
import styles from "src/style/generator/gen-steps/Result.module.scss"
import axios from 'axios';

export default function Result() {

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
            
            <video src='1' controls className={styles.video}/>

            <div className={styles.buttonContainer}>
                <button className={styles.downloadButton} onClick={handleDownloadClick}>다운로드</button>
                <button className={styles.uploadButton} onClick={handleUploadClick}>업로드</button>
            </div>
        </div>
    )
}