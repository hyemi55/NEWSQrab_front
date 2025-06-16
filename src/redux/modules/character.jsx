import { createSlice } from "@reduxjs/toolkit";
import CrabImg from "../../assets/img/crab.png";
import CrabGrayImg from '../../assets/img/crab_gray.png';
import OctopusImg from "../../assets/img/octopus.png";
import OctopusGrayImg from '../../assets/img/octopus_gray.png';
import FishImg from "../../assets/img/fish.png";
import FishGrayImg from '../../assets/img/fish_gray.png';
import StarFishImg from "../../assets/img/starfish.png";
import StarFishGrayImg from '../../assets/img/starfish_gray.png';

export const Crab = {
    name: '큐랩이',
    description: '정보 전달이 능숙하고 호기심 많은 꽃게',
    img: CrabImg,
    grayImg: CrabGrayImg,
    species: "crab",
};

export const Octopus = {
    name: '큐리어스',
    description: '팩트만을 전달해주는 사려깊은 문어',
    img: OctopusImg,
    grayImg: OctopusGrayImg,
    species: "octopus",
};

export const StarFish = {
    name: '큐스타',
    description: '어디서나 빛나고 싶은 불가사리',
    img: StarFishImg,
    grayImg: StarFishGrayImg,
    species: "starfish",
};

export const Bok = {
    name: '큐복이',
    description: '걱정 많은 복어',
    img: FishImg,
    grayImg: FishGrayImg,
    species: "bok",
};

const initialState = {
    char1: Crab,
    char2: StarFish,
}

const charSlicer = createSlice ({
    initialState,
    name: "characters",
    reducers: {
        setChar1: (state, action) => {
            const char1 = action.payload;
            state.char1 = char1;
        },
        setChar2: (state, action) => {
            const char2 = action.payload;
            state.char2 = char2;
        }
    }
})

export const charReducer = charSlicer.reducer;
export const { setChar1, setChar2 } = charSlicer.actions;


// export const crabReducer = (state=Crab, action) => {
//     switch (action.type) {
//         default:
//             return state;
//     }
// };

// export const octopusReducer = (state=Octopus, action) => {
//     switch (action.type) {
//         default:
//             return state;
//     }
// };

// export const starFishReducer = (state=StarFish, action) => {
//     switch (action.type) {
//         default:
//             return state;
//     }
// };

// export const fishReducer = (state=Fish, action) => {
//     switch (action.type) {
//         default:
//             return state;
//     }
// };