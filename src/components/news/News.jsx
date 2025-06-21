import React, { useState } from "react"
import styles from "../../style/news/News.module.scss";
import VideoList from "./VideoList";

export default function News() {
    const [category, setCategory] = useState('view');

    return (
        <div className={styles.container}>
            <div className={styles.slogan}>IT·과학 이슈, 1분 컷!</div>
            <div className={styles.introduction}>
                <p>스크롤하다 얻어가는 오늘의 똑똑한 지식</p>
            </div>
            

            <div className={styles.categoryButtonContainer}>
                <button onClick={()=>setCategory('view')} className={category=='view' ? styles.selectedCategoryButton : ""}>인기순</button>
                <button onClick={()=>setCategory('latest')} className={category=='latest' ? styles.selectedCategoryButton : ""}>최신순</button>
            </div>

            <VideoList category={category} />
        </div>
    )
}