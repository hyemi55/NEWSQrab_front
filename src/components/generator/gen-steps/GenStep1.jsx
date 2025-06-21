import React, {useState} from 'react'
import styles from '../../../style/generator/gen-steps/GenStep1.module.scss'
import { Crab, Octopus, StarFish, Bok, setChar1, setChar2 } from "../../../redux/modules/character.jsx"
import { useDispatch, useSelector } from 'react-redux';

export default function GenStep1() {
    const [selectedChar, setSelectedChar] = useState(Crab);
    const char1 = useSelector((state) => state.characters.char1);
    const char2 = useSelector((state) => state.characters.char2);
    const dispatch = useDispatch();
    
    const character1 = [Crab, Octopus];
    const character2 = [StarFish, Bok, "선택 안 함"];

    return (
        <div className={styles.container}>
            <div className={styles.title}>어떤 캐릭터로 만들어 볼까?</div>

            <div className={styles.mainContentContainer}>
                {selectedChar=="선택 안 함" ? 
                    <div className={styles.viewChar} >
                        <div className={styles.altImg} />
                        <div className={styles.selectedCharName}></div>
                        <div className={styles.selectedCharDescription}></div>
                    </div> 
                    :
                    <div className={`${styles.viewChar} ${selectedChar == Crab ? styles.crab : 
                                                            selectedChar == Octopus ? styles.octopus :
                                                            selectedChar == StarFish ? styles.starfish :
                                                                                        styles.bok}`} >
                        <img src={selectedChar.img}/>
                        <div className={styles.selectedCharName}>{selectedChar.name}</div>
                        <div className={styles.selectedCharDescription}>{selectedChar.description}</div>
                    </div>
                }

                <div className={styles.customContainer}>
                    <div className={styles.label}>캐릭터A 선택<span> (설명 담당)</span></div>
                    <div className={styles.characterTypeContainer}>
                        {character1.map((type, idx) => (
                            <button className={`${styles.characterTypeButton} 
                                                ${type==char1 ? styles.selectedTypeButton : ''}`} 
                                    onClick={() => {
                                            dispatch(setChar1(type))
                                            setSelectedChar(type)
                                        }} key={idx}>
                                <img src={type==char1 ? type.img : type.grayImg} />       
                            </button>
                        ))}
                    </div>
                    
                    <div className={styles.label}>캐릭터B 선택<span> (리액션 담당)</span></div>
                    <div className={styles.characterTypeContainer}>
                        {character2.map((type, idx) => (
                            <button className={`${styles.characterTypeButton} 
                                                ${type==char2 ? styles.selectedTypeButton : ''}`} 
                                    onClick={() => {
                                            dispatch(setChar2(type))
                                            setSelectedChar(type)
                                        }} key={idx}>
                                {type=="선택 안 함" ? "선택 안 함" :
                                                    <img src={type==char2 ? type.img : type.grayImg} />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}