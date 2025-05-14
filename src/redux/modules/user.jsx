const user = {
    username: 'ㅇ',
}

const SET_USERNAME = "SET_USERNAME";

export const setUserName = (username) => {
    return {
        type: SET_USERNAME,
        username,
    }
};

const userReducer = (state=user, action) => {
    switch(action.type) {
        case SET_USERNAME:
            return {
                username: action.username,
            };
        default:
            return state;
    }
}

export default userReducer;