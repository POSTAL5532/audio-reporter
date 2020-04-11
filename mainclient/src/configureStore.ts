import {AuthState} from "./store/auth/types";
import {applyMiddleware, combineReducers, createStore, Reducer} from "redux";
import {authReducer} from "./store/auth/reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

export interface ApplicationState {
    authState: AuthState;
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    authState: authReducer
});

const tootState = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default tootState;