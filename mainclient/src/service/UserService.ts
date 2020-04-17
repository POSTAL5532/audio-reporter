import Client from "./Client";
import {UserInfo} from "../store/user/types";

export default class UserService {

    public static USER_PATH: string = "/user";

    private client: Client = new Client();

    public getUser(): Promise<UserInfo> {
        return this.client.executeGetRequest(UserService.USER_PATH);
    }

    public checkEmail(email: string): Promise<void> {
        return this.client.executeGetRequest(`${UserService.USER_PATH}/checkemailavailability?email=${email}`)
            .then(data =>
                (data.success ? Promise.resolve() : Promise.reject())
            );
    }

    public checkLogin(login: string): Promise<void> {
        return this.client.executeGetRequest(`${UserService.USER_PATH}/checkloginavailability?login=${login}`)
            .then(data =>
                (data.success ? Promise.resolve() : Promise.reject())
            );
    }
}