import React, {useState} from 'react'
import styles from 'src/style/generator/gen-steps/GenStep1.module.scss'
import CrabImg from "src/assets/img/crab.png";
import CrabGrayImg from 'src/assets/img/crab_gray.png';
import OctopusImg from "src/assets/img/octopus.png";
import OctopusGrayImg from 'src/assets/img/octopus_gray.png';
import FishImg from "src/assets/img/fish.png";
import FishGrayImg from 'src/assets/img/fish_gray.png';
import StarFishImg from "src/assets/img/starfish.png";
import StarFishGrayImg from 'src/assets/img/starfish_gray.png';

export default function GenStep1({ charA, setCharA, charB, setCharB }) {
    const Crab = {
        name: '큐랩이',
        description: '호기심 많고 똑똑한 꽃게',
        img: CrabImg,
        grayImg: CrabGrayImg,
    }

    const Octopus = {
        name: '무너',
        description: '츤데레 문어',
        img: OctopusImg,
        grayImg: OctopusGrayImg,
    }

    const StarFish = {
        name: '윙클',
        description: '장난기 많은 불가사리',
        img: StarFishImg,
        grayImg: StarFishGrayImg,
    }

    const Fish = {
        name: '벌룬',
        description: '소심하고 걱정이 많은 복어',
        img: FishImg,
        grayImg: FishGrayImg,
    }

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
                                                ${idx==charA ? styles.selectedTypeButton : ''}`} 
                                    onClick={() => {
                                            setCharA(idx)
                                            setSelectedChar(type)
                                        }} key={idx}>
                                <img src={idx==charA ? type.img : type.grayImg} />       
                            </button>
                        ))}
                        {/*index 비교해서 선택된 캐릭터 타입 판별*/}
                    </div>
                    
                    <div className={styles.label}>캐릭터B 선택<span> (리액션 담당)</span></div>
                    <div className={styles.characterTypeContainer}>
                        {characterB.map((type, idx) => (
                            <button className={`${styles.characterTypeButton} 
                                                ${idx==charB ? styles.selectedTypeButton : ''}`} 
                                    onClick={() => {
                                            setCharB(idx)
                                            setSelectedChar(type)
                                        }} key={idx}>
                                {type=="선택 안 함" ? "선택 안 함" :
                                                    <img src={idx==charB ? type.img : type.grayImg} />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}