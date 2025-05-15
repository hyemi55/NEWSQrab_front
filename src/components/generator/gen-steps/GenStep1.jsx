import React, {useState} from 'react'
import styles from '../../../style/generator/gen-steps/GenStep1.module.scss'
import { useSelector } from 'react-redux';

export default function GenStep1({ charA, setCharA, charB, setCharB }) {
    const Crab = useSelector((state) => state.crab);
    const Octopus = useSelector((state) => state.octopus);
    const StarFish = useSelector((state) => state.starFish);
    const Fish = useSelector((state) => state.fish);

    const [selectedChar, setSelectedChar] = useState(Crab);
    
    const characterA = [Crab, Octopus];
    const characterB = [StarFish, Fish, "선택 안 함"];

    return (
        <div className={styles.container}>
            <div className={styles.title}>어떤 캐릭터로 만들어 볼까?</div>

            <div className={styles.mainContentContainer}>
                <div>
                    {selectedChar=="선택 안 함" ? <div/>:
                        <div className={styles.viewChar} >
                            <img src={selectedChar.img}/>
                            <div className={styles.selectedCharName}>{selectedChar.name}</div>
                            <div className={styles.selectedCharDescription}>{selectedChar.description}</div>
                        </div>
                    }
                </div>

                <div className={styles.customContainer}>
                    <div className={styles.label}>캐릭터A 선택<span> (설명 담당)</span></div>
                    <div className={styles.characterTypeContainer}>
                        {characterA.map((type, idx) => (
                            <button className={`${styles.characterTypeButton} 
                                                ${type.name==charA ? styles.selectedTypeButton : ''}`} 
                                    onClick={() => {
                                            setCharA(type.name)
                                            setSelectedChar(type)
                                        }} key={idx}>
                                <img src={type.name==charA ? type.img : type.grayImg} />       
                            </button>
                        ))}
                        {/*index 비교해서 선택된 캐릭터 타입 판별*/}
                    </div>
                    
                    <div className={styles.label}>캐릭터B 선택<span> (리액션 담당)</span></div>
                    <div className={styles.characterTypeContainer}>
                        {characterB.map((type, idx) => (
                            <button className={`${styles.characterTypeButton} 
                                                ${type.name==charB ? styles.selectedTypeButton : ''}`} 
                                    onClick={() => {
                                            setCharB(type.name)
                                            setSelectedChar(type)
                                        }} key={idx}>
                                {type=="선택 안 함" ? "선택 안 함" :
                                                    <img src={type.name==charB ? type.img : type.grayImg} />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}