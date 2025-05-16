import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allReels: [],
}

const reelsSlicer = createSlice({
    initialState,
    name: 'reel',
    reducers: {
        setAllReels: (state, action) => {
            const reelsList = action.payload;
            state.allReels = reelsList;
        },
    }
})
export const reelsReducer = reelsSlicer.reducer;
export const { setAllReels } = reelsSlicer.actions;