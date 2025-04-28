import React, { useState } from "react";
import styles from 'src/style/Home.module.scss';
import News from "src/components/news/News";
import Generator from "src/components/generator/Generator";

export default function Home() {
    const [branch, setBranch] = useState('news');

    const classNameHandler = function(branchButton) {
        if (branchButton == branch) return styles.selectedBranchButton;
        else return '';
    }

    return (
        <div className={styles.container}>
            <div className={styles.branchButtonContainer}>
                <button onClick={() => setBranch('news')} className={classNameHandler('news')}>오늘의 뉴스</button>
                <button onClick={() => setBranch('generator')} className={classNameHandler('generator')}>영상 만들기</button>
            </div>

            {branch == 'news' ? <News />
                              : <Generator />}
        </div>
    )
}