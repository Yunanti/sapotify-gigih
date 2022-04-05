const initialState = {
    token: "",
};

function tokenReducer(state = initialState, action) {
    switch (action.type) {
        case "tokenAuth":
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
}

export default tokenReducer;