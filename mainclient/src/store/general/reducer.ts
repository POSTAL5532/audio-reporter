import {GeneralAction, GeneralActionTypes, GeneralState} from "./types";

const initialGeneralState: GeneralState = {
    loading: false
};

export const generalReducer = (state: GeneralState = initialGeneralState, action: GeneralAction): GeneralState => {
    switch (action.type) {
        case GeneralActionTypes.SET_GENERAL_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        default:
            return state;
    }
};