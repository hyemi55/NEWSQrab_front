import React, {useState} from 'react'
import styles from 'src/style/generator/gen-steps/GenStep1.module.scss'
import ToggleSwitch from '../../ui/ToggleSwitch';
import Crab from "src/assets/img/crab.png";
import Octopus from "src/assets/img/octopus.png";
import Fish from "src/assets/img/fish.png";
import StarFish from "src/assets/img/starfish.png";

export default function GenStep1() {
    const [charA, setCharA] = useState(0);
    const [charB, setCharB] = useState(0); 
    const [selectedChar, setSelectedChar] = useState(Crab);

    const characterA = [Crab, Octopus];
    const characterB = [StarFish, Fish, "선택 안 함"];

    return (
        <div className={styles.container}>
            <h2>어떤 캐릭터로 만들어 볼까?</h2>

            <div className={styles.mainContentContainer}>
                <div className={styles.viewChar} >
                    {selectedChar=="선택 안 함" ? <div/>:
                                                <img src={selectedChar}/>}
                </div>

                <div className={styles.customContainer}>
                    <div className={styles.label}>캐릭터A 선택</div>
                    <div className={styles.characterTypeContainer}>
                        {characterA.map((type, idx) => (
                            <button className={`${styles.characterTypeButton} 
                                                ${idx==charA ? styles.selectedTypeButton : ''}`} 
                                    onClick={() => {
                                            setCharA(idx)
                                            setSelectedChar(type)
                                        }} key={idx}>
                                <img src={type} />       
                            </button>
                        ))}
                        {/*index 비교해서 선택된 캐릭터 타입 판별*/}
                    </div>
                    
                    <div className={styles.label}>캐릭터B 선택</div>
                        <div className={styles.characterTypeContainer}>
                        {characterB.map((type, idx) => (
                            <button className={`${styles.characterTypeButton} 
                                                ${idx==charB ? styles.selectedTypeButton : ''}`} 
                                    onClick={() => {
                                            setCharB(idx)
                                            setSelectedChar(type)
                                        }} key={idx}>
                                {type=="선택 안 함" ? "선택 안 함" :
                                                    <img src={type} />
}
                            </button>
                        ))}
                    </div>

                    <div className={styles.label}>중립 필터</div>
                    <ToggleSwitch />
                </div>
            </div>
        </div>
    )
}