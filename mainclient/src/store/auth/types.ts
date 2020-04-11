export interface AuthState {
    readonly auth: boolean;
}

export const SET_AUTH = "SET_AUTH";

export interface SetAuthAction {
    readonly type: typeof SET_AUTH;
    readonly auth: boolean;
}

export type AuthAction = SetAuthAction;