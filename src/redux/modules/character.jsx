import CrabImg from "../../assets/img/crab.png";
import CrabGrayImg from '../../assets/img/crab_gray.png';
import OctopusImg from "../../assets/img/octopus.png";
import OctopusGrayImg from '../../assets/img/octopus_gray.png';
import FishImg from "../../assets/img/fish.png";
import FishGrayImg from '../../assets/img/fish_gray.png';
import StarFishImg from "../../assets/img/starfish.png";
import StarFishGrayImg from '../../assets/img/starfish_gray.png';

const Crab = {
    name: '큐랩이',
    description: '호기심 많고 똑똑한 꽃게',
    img: CrabImg,
    grayImg: CrabGrayImg,
};

const Octopus = {
    name: '무너',
    description: '츤데레 문어',
    img: OctopusImg,
    grayImg: OctopusGrayImg,
};

const StarFish = {
    name: '윙클',
    description: '장난기 많은 불가사리',
    img: StarFishImg,
    grayImg: StarFishGrayImg,
};

const Fish = {
    name: '벌룬',
    description: '소심하고 걱정이 많은 복어',
    img: FishImg,
    grayImg: FishGrayImg,
};

export const crabReducer = (state=Crab, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const octopusReducer = (state=Octopus, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const starFishReducer = (state=StarFish, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export const fishReducer = (state=Fish, action) => {
    switch (action.type) {
        default:
            return state;
    }
};