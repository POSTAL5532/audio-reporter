import Client from "./Client";
import {UserInfo} from "../store/user/types";

export default class UserService {

    public static USER_PATH: string = "/user";

    private client: Client = new Client();

    public getUser(): Promise<UserInfo> {
        return this.client.executeGetRequest(UserService.USER_PATH);
    }
}