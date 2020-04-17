import {Action} from "redux";

export interface GeneralState {
    readonly loading: boolean;
}

export enum GeneralActionTypes {
    SET_GENERAL_LOADING = "SET_GENERAL_LOADING"
}

export interface SetGeneralLoadingAction extends Action<GeneralActionTypes> {
    readonly type: GeneralActionTypes.SET_GENERAL_LOADING;
    readonly loading: boolean;
}

export type GeneralAction = SetGeneralLoadingAction;