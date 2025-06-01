import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import styles from '../../style/generator/Generator.module.scss'

export default function Generator({ setIsLogin }) {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 480 });
    const [isLoading, setIsLoading] = useState(false);
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

            setIsLoading(true);
    
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/articles`, postData);
                const articleId = response.data._id;

                const content = response.data.content;
                if (content == "기사 내용을 찾을 수 없습니다.") {
                    alert("기사 내용을 찾을 수 없습니다")
                }
                else {
                    navigate(`/generating/${articleId}`);
                }
            } catch (error) {
                console.log('에러:', error);
                setIsLoading(false);
                alert("기사 내용을 찾을 수 없습니다")
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                어려운 IT·과학 이야기,{isMobile && <br/>}숏폼으로 만들어 봐!
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='뉴스 링크 붙여넣기'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button type="submit" className={isLoading ? styles.inActiveButton : ""}>{!isLoading ? '영상 만들기' : '기사 읽는 중'}</button>
            </form>
        </div>
    )
}