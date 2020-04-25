import {applyMiddleware, combineReducers, createStore, Reducer} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {AuthState} from "logic/auth/authTypes";
import {UserState} from "logic/profile/userTypes";
import {authReducer} from "logic/auth/authReducer";
import {userReducer} from "logic/profile/userReducer";

export interface ApplicationState {
    authState: AuthState;
    userState: UserState;
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    authState: authReducer,
    userState: userReducer
});

const tootState = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default tootState;