import Client from "./Client";

export default class AuthService {

    public static AUTH_PATH: string = "/auth";

    private client: Client = new Client();

    public signIn (loginOrEmail: string, password: string): Promise<any> {
        const loginRequest = {
            loginOrEmail: loginOrEmail,
            password: password
        };

        return this.client.executePostRequest(
            `${AuthService.AUTH_PATH}/signin`,
            JSON.stringify(loginRequest));
    }
}