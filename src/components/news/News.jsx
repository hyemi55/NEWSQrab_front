import React, { useState, useEffect } from "react"
import axios from "axios";
import styles from "src/style/news/News.module.scss";
import VideoList from "src/components/news/VideoList";

export default function News() {
    const [category, setCategory] = useState('all');

    return (
        <div className={styles.container}>
            <p className={styles.mainText}>"오늘 뉴스 봤어?"</p>
            <div className={styles.introduction}>
                <p>1분 안에 핵심 이슈만 쏙쏙!</p>
            </div>
            

            <div className={styles.categoryButtonContainer}>
                <button onClick={()=>setCategory('all')} className={category=='all' ? styles.selectedCategoryButton : ""}>핵심만!</button>
                <button onClick={()=>setCategory('politics')} className={category=='politics' ? styles.selectedCategoryButton : ""}>정치</button>
                <button onClick={()=>setCategory('economy')} className={category=='economy' ? styles.selectedCategoryButton : ""}>경제</button>
                <button onClick={()=>setCategory('society')} className={category=='society' ? styles.selectedCategoryButton : ""}>사회</button>
                <button onClick={()=>setCategory('culture')} className={category=='culture' ? styles.selectedCategoryButton : ""}>생활/문화</button>
                <button onClick={()=>setCategory('it')} className={category=='it' ? styles.selectedCategoryButton : ""}>IT/과학</button>
            </div>

            <VideoList category={category} />
        </div>
    )
}