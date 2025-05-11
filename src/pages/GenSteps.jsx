import React, { useState } from 'react'
import styles from 'src/style/pages/GenSteps.module.scss';
import GenStep1 from '../components/generator/gen-steps/GenStep1';
import GenStep2 from '../components/generator/gen-steps/GenStep2';
import GenStep3 from '../components/generator/gen-steps/GenStep3';
import { useNavigate } from 'react-router-dom';

export default function GenSteps() {
    const [step, setStep] = useState(1);
    const [conversation, setConversation] = useState({});
    const navigate = useNavigate();

    const stepUIList = [
        {num: 1, text: "캐릭터 선택하기"},
        {num: 2, text: "자막 수정하기"},
        {num: 3, text: "자료 추가하기"}
    ];

    const handleNextClick = function() {
        if (step < 3) setStep(step+1);
        else navigate("result");
    }

    const handlePreviousClick = function() {
        if (step > 1) setStep(step-1);
    }

    return (
        <div className={styles.container}>
            <div className={styles.stepUIContainer}>
                {stepUIList.map((stepUI, idx) => (
                    <div className={`${styles.stepUI} ${stepUI.num<step ? styles.passedStep : 
                                                        stepUI.num>step ? styles.futureStep : ''}`} key={idx}>  {/*default는 현재 단계 스타일*/}
                        <div className={`${styles.stepUITextContainer}`}>
                            <div className={styles.stepUINum}>{stepUI.num}</div> <div className={styles.stepUIText}>{stepUI.text}</div>
                        </div>
                        <div className={styles.stepUIBar}></div>
                    </div>
                ))}
            </div>

            {step==1 ? <GenStep1 /> :
            step==2 ? <GenStep2 conversation={conversation}  setConversation={setConversation} /> :
                    <GenStep3 conversation={conversation}  setConversation={setConversation} />}

            

            <div className={styles.stepButtonContainer}>
                <button className={styles.previousButton} onClick={handlePreviousClick}>이전</button>
                <button className={styles.nextButton} onClick={handleNextClick}>다음</button>
            </div>
        </div>
    )
}