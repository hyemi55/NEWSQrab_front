import React, { useState } from "react"
import axios from "axios"
import styles from "../style/Generator.module.scss"

export default function Generator() {
    const [videoUrl, setVideoUrl] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
      setInputValue(e.target.value);
    };

    const isValid = inputValue.trim().length > 0;

    //url 업로드 핸들러
    const handleUrlUpload = async (event) => {
        event.preventDefault();

        if (!inputValue) return;

        const url = inputValue;

        const formData = new FormData();
        formData.append("url", url);
        try {
            // const response = await axios.post(BACKEND_URL, formData, {
            //     headers: { "Content-Type": "multipart/form-data" },
            // });
            // setData(response);
            console.log('try');
            setVideoUrl(url);
        } catch (error) {
            console.error("Error uploading file", error);
        } finally {
            console.log('finally');
        }
    }

    return (
        <div className={styles.container}>
            { !videoUrl ? (
                    <form className={styles.contents} onSubmit={handleUrlUpload}>
                        <input type='text' onChange={handleChange} value={inputValue} placeholder="뉴스 URL"/>
                        <button type='submit' className={styles.mainButton} disabled={!isValid}>영상 만들기</button>
                    </form>
                ) : (
                    <div className={styles.contents}>
                        <video controls>
                            <source src={videoUrl} type="video/mp4" />
                            브라우저가 video 태그를 지원하지 않습니다.
                        </video>
                        <button className={styles.captionButton}>자막 보기</button>
                        <button className={styles.mainButton}>업로드 하기</button>
                    </div>
                )
            }
        </div>
    )
}