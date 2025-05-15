import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: 'kitty1234',
}

// const SET_USERNAME = "SET_USERNAME";

// export const setUserName = (username) => {
//     return {
//         type: SET_USERNAME,
//         username,
//     }
// };

// const userReducer = (state=user, action) => {
//     switch(action.type) {
//         case SET_USERNAME:
//             return {
//                 username: action.username,
//             };
//         default:
//             return state;
//     }
// }

const userSlicer = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setUserName: (state, action) => {
            const username = action.payload;
            state.username = username;
        },
    }
})
export const userReducer = userSlicer.reducer;
export const { setUserName } = userSlicer.actions;

// export default userReducer;