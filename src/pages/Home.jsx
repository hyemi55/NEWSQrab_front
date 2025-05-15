import React, { useState } from "react";
import styles from '../style/pages/Home.module.scss';
import News from "../components/news/News";
import Generator from "../components/generator/Generator";
import UserModal from "../components/users/UserModal";

export default function Home() {
    const [branch, setBranch] = useState('news');
    const [isLogin, setIsLogin] = useState(false);

    const classNameHandler = function(branchButton) {
        if (branchButton == branch) return styles.selectedBranchButton;
        else return '';
    }

    return (
        <div className={styles.container}>
            <UserModal isLogin={isLogin} setIsLogin={setIsLogin} />
            <div className={styles.branchButtonContainer}>
                <button onClick={() => setBranch('news')} className={classNameHandler('news')}>오늘의 지식</button>
                <button onClick={() => setBranch('generator')} className={classNameHandler('generator')}>영상 만들기</button>
            </div>

            {branch == 'news' ? <News />
                              : <Generator setIsLogin={setIsLogin} />}
        </div>
    )
}