import {GeneralActionTypes, SetGeneralLoadingAction} from "store/general/types";

export default class GeneralActionCreator {

    public static setGeneralLoadingAction(loading: boolean): SetGeneralLoadingAction {
        return {
            type: GeneralActionTypes.SET_GENERAL_LOADING,
            loading: loading
        };
    }
}