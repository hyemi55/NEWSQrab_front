import React, { useState } from 'react'
import styles from '../style/GenWeb.module.scss'
import Step1GenWeb from '../components/Step1GenWeb';
import Step2GenWeb from '../components/Step2GenWeb';
import Step3GenWeb from '../components/Step3GenWeb';
import Step4GenWeb from '../components/Step4GenWeb';

export default function GenWeb() {
    const [step, setStep] = useState(1);

    const stepUIList = [
        {num: 1, text: "자막 만들기"},
        {num: 2, text: "자막 수정하기"},
        {num: 3, text: "영상 수정하기"},
        {num: 4, text: "저장 및 업로드"}
    ];

    const handleNextClick = function() {
        if (step < 4) setStep(step+1);
    }

    const handlePreviousClick = function() {
        if (step > 1) setStep(step-1);
    }

    return (
        <div className={styles.container}>
            <div className={styles.stepUIContainer}>
                {stepUIList.map((stepUI, idx) => (
                    <div className={`${styles.stepUI} ${stepUI.num<step ? styles.passedStep : 
                                                        stepUI.num>step ? styles.futureStep : ''}`} key={idx}>  {/*default는 현재 step 스타일*/}
                        <div className={`${styles.stepUITextContainer}`}> {/*이건 step 넘어가는 기능 만들고 다시 하자*/}
                            <div className={styles.stepUINum}>{stepUI.num}</div> <div className={styles.stepUIText}>{stepUI.text}</div>
                        </div>
                        <div className={styles.stepUIBar}></div>
                    </div>
                ))}
            </div>

            {step==1 ? <Step1GenWeb /> :
            step==2 ? <Step2GenWeb /> :
            step==3 ? <Step3GenWeb /> :
                        <Step4GenWeb />}

            

            <div className={styles.stepButtonContainer}>
                <button className={styles.previousButton} onClick={handlePreviousClick}>이전</button>
                <button className={styles.nextButton} onClick={handleNextClick}>
                    {step==1 ? '자막 만들기' :
                    step==2 ? '영상 만들기' :
                    step==3 ? '영상 완성하기' : '업로드'}
                </button>
            </div>
        </div>
    )
}