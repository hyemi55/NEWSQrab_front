import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import styles from "../style/News.module.scss";
import VideoList from "../components/VideoList";

export default function News() {
    const navigate = useNavigate();
    const [category, setCategory] = useState('all');

    return (
        <div className={styles.container}>
            <h2>"오늘 뉴스 봤어?"</h2>
            <p className={styles.introduction}>수다처럼 재밌고, 놓치기 아쉬운 이슈만 쏙쏙!<br />친근한 대화로 뉴스를 전해줘요.</p>

            <div>
                <button>오늘의 뉴스</button>
                <button onClick={() => {navigate('/generator')}}>영상 만들기</button>
            </div>

            <div className={styles.categoryButtonContainer}>
                <button onClick={()=>setCategory('all')}>핵심만!</button>
                <button onClick={()=>setCategory('politics')}>정치</button>
                <button onClick={()=>setCategory('economy')}>경제</button>
                <button onClick={()=>setCategory('society')}>사회</button>
                <button onClick={()=>setCategory('culture')}>생활/문화</button>
                <button onClick={()=>setCategory('it')}>IT/과학</button>
            </div>

            <VideoList category={category} />
        </div>
    )
}