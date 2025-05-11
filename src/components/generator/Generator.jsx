import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from 'src/style/generator/Generator.module.scss'

export default function Generator({ setIsLogin }) {
    const navigate = useNavigate();
    const [url, setUrl] = useState("");

    const handleSubmit = async function(event) {
        event.preventDefault();

        if (!localStorage.getItem("accessToken")) {
            setIsLogin(true);
        }
        else {
            const postData = {
                url: url
            };
    
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/articles`, postData);
                const articleId = response.data._id;
                console.log(articleId);
    
                navigate(`/generating/${articleId}`);
    
            } catch (error) {
                console.error('에러:', error);
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>나만의 뉴스를 만들어 봐!</div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='뉴스 링크 붙여넣기'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button type="submit">영상 만들기</button>
            </form>
        </div>
    )
}