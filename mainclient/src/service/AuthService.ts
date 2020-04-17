import Client from "./Client";

export default class AuthService {

    public static AUTH_PATH: string = "/auth";

    private client: Client = new Client();

    public signIn(loginOrEmail: string, password: string): Promise<any> {
        const loginRequest = {
            loginOrEmail: loginOrEmail,
            password: password
        };

        return this.client.executePostRequest(
            `${AuthService.AUTH_PATH}/signin`,
            JSON.stringify(loginRequest));
    }

    public signUp(email: string, login: string, password: string, confirmPassword: string): Promise<any> {
        const signUprequest = {
            email: email,
            login: login,
            password: password,
            confirmPassword: confirmPassword
        };

        return this.client.executePostRequest(
            `${AuthService.AUTH_PATH}/signup`,
            JSON.stringify(signUprequest));
    }
}