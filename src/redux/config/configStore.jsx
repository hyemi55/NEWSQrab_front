import { configureStore } from '@reduxjs/toolkit';
import { crabReducer, octopusReducer, starFishReducer, fishReducer } from 'src/redux/modules/character.jsx';
import userReducer from 'src/redux/modules/user.jsx';

const store = configureStore({
  reducer: {
    crab: crabReducer,
    octopus: octopusReducer,
    starFish: starFishReducer,
    fish: fishReducer,
    user: userReducer,
  },
});

export default store;