import { configureStore } from '@reduxjs/toolkit';
import { crabReducer, octopusReducer, starFishReducer, fishReducer } from '../modules/character.jsx';
import { userReducer } from '../modules/user.jsx';
import { reelsReducer } from '../modules/reels.jsx';

const store = configureStore({
  reducer: {
    crab: crabReducer,
    octopus: octopusReducer,
    starFish: starFishReducer,
    fish: fishReducer,
    user: userReducer,
    reels: reelsReducer,
  },
});

export default store;