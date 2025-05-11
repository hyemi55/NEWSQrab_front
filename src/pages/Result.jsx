import React from 'react';
import styles from "src/style/pages/Result.module.scss"

export default function Result() {

    const handleDownloadClick = () => {

    }

    const handleUploadClick = () => {

    }

    return (
        <div className={styles.container}>
            <h2>완성~ 내 뉴스를 업로드해볼까?</h2>
            
            <video src='1' controls className={styles.video}/>

            <div className={styles.buttonContainer}>
                <button className={styles.downloadButton} onClick={handleDownloadClick}>다운로드</button>
                <button className={styles.uploadButton} onClick={handleUploadClick}>업로드</button>
            </div>
        </div>
    )
}