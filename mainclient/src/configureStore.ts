import {AuthState} from "store/auth/types";
import {applyMiddleware, combineReducers, createStore, Reducer} from "redux";
import {authReducer} from "store/auth/reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {UserState} from "store/user/types";
import {userReducer} from "store/user/reducer";

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