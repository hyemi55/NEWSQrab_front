import React, {useState} from 'react'
import styles from 'src/style/generator/gen-steps/GenStep1.module.scss'
import ToggleSwitch from '../../ui/ToggleSwitch';

export default function GenStep1() {
    const [charA, setCharA] = useState(0);
    const [charB, setCharB] = useState(0); 

    const characterA = ['기쁨이', '불안이', '버럭이', '슬픔이', '까칠이'];
    const characterB = ['없음', '', '', '', ''];

    return (
        <div>
            <h2>어떤 톤의 뉴스를 만들어 볼까?</h2>

            <form className={styles.urlInputForm}>
                <label htmlFor='url' className={styles.label}>뉴스 링크</label>
                <input type='text' name='url' placeholder='뉴스 링크 붙여넣기'></input>
            </form>

            <div className={styles.label}>캐릭터A 선택</div>
            <div className={styles.characterTypeContainer}>
            {characterA.map((type, idx) => (
                <button className={`${styles.characterTypeButton} ${idx==charA ? styles.selectedTypeButton : ''}`} key={idx}
                            onClick={() => setCharA(idx)}>{type}</button>
            ))}
            {/*index 비교해서 선택된 캐릭터 타입 판별*/}
            </div>
            
            <div className={styles.label}>캐릭터B 선택</div>
            <div className={styles.characterTypeContainer}>
            {characterB.map((type, idx) => (
                <button className={`${styles.characterTypeButton} ${idx==charB ? styles.selectedTypeButton : ''}`} 
                            onClick={() => setCharB(idx)} key={idx}>{type}</button>
            ))}
            </div>

            <div className={styles.label}>중립 필터</div>
            <ToggleSwitch />
        </div>
    )
}