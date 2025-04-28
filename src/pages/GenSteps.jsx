import React, { useState } from 'react'
import styles from 'src/style/generator/GenSteps.module.scss';
import GenStep1 from '../components/generator/gen-steps/GenStep1';
import GenStep3 from '../components/generator/gen-steps/GenStep3';
import GenStep4 from '../components/generator/gen-steps/GenStep4';
import GenStep2 from '../components/generator/gen-steps/GenStep2';

export default function GenSteps() {
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

            {step==1 ? <GenStep1 /> :
            step==2 ? <GenStep2 /> :
            step==3 ? <GenStep3 /> :
                        <GenStep4 />}

            

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