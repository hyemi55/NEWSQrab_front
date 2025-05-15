import React, { useState, useEffect } from "react"
import axios from "axios";
import styles from "../../style/news/News.module.scss";
import VideoList from "./VideoList";

export default function News() {
    const [category, setCategory] = useState('pick');

    return (
        <div className={styles.container}>
            <div className={styles.slogan}>IT·과학 이슈, 1분 컷!</div>
            <div className={styles.introduction}>
                <p>스크롤하다 얻어가는 오늘의 똑똑한 지식</p>
            </div>
            

            <div className={styles.categoryButtonContainer}>
                <button onClick={()=>setCategory('pick')} className={category=='pick' ? styles.selectedCategoryButton : ""}>Qrab Pick!</button>
                <button onClick={()=>setCategory('all')} className={category=='all' ? styles.selectedCategoryButton : ""}>전체</button>
                <button onClick={()=>setCategory('ai')} className={category=='ai' ? styles.selectedCategoryButton : ""}>AI</button>
                <button onClick={()=>setCategory('robot')} className={category=='robot' ? styles.selectedCategoryButton : ""}>로봇</button>
                <button onClick={()=>setCategory('app')} className={category=='app' ? styles.selectedCategoryButton : ""}>앱 트렌드</button>
                <button onClick={()=>setCategory('bio')} className={category=='bio' ? styles.selectedCategoryButton : ""}>생명</button>
                <button onClick={()=>setCategory('aero')} className={category=='aero' ? styles.selectedCategoryButton : ""}>항공·우주</button>
                <button onClick={()=>setCategory('env')} className={category=='env' ? styles.selectedCategoryButton : ""}>환경</button>
            </div>

            <VideoList category={category} />
        </div>
    )
}