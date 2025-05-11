import React from 'react'
import styles from 'src/style/generator/gen-steps/GenStep3.module.scss'

export default function GenStep3({ conversation, setConversation }) {


    return (
        <div className={styles.container}>
            <h2>마지막 점검! 사진과 동영상을 추가할 수 있어</h2>
            
            <div className={styles.mainContentContainer}>
                <video src='1' controls className={styles.video}/>
                <div className={styles.conversationContainer}>
                    {conversation.map((lineObj, index) => {
                        const text = Object.values(lineObj)[0];
                        return (
                            <div key={index} className={styles.lineBlock}>
                                <div className={styles.line}>{text}</div>
                                <button className={styles.plusButton}>+</button>
                            </div>
                        );
                    })}
                </div>
            </div>
            
        </div>
    )
}