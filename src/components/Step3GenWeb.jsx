import React from 'react'
import styles from '../style/Step3GenWeb.module.scss'

export default function Step3GenWeb() {


    return (
        <div>
            <h2>마지막 점검! 사진과 동영상을 추가할 수 있어</h2>
            
            <div className={styles.mainContentContainer}>
                <video src='1' controls className={styles.video}/>
                <div className={styles.subtitleContainer}></div>
            </div>
            
        </div>
    )
}