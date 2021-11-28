import { DELETE_DATA, GET_DATA, GET_DATA_ERROR } from "../constant/data";

const initialState = {
    data: [],
    error: null
};

export default (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case GET_DATA:
            return { ...state, data: payload };
        case GET_DATA_ERROR:
            return { ...state, data: payload };
        case DELETE_DATA:
            let customData = state.data.filter(data => data.uid !== payload);
            return { ...state, data: customData };
        default:
            return state;
    }
}