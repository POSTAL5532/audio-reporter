import Client from "./Client";
import {UserInfo} from "../store/user/types";
import {AvailabilityCheckType} from "../secure/UserDataRule";

export default class UserService {

    public static USER_PATH: string = "/user";

    private client: Client = new Client();

    public getUser(): Promise<UserInfo> {
        return this.client.executeGetRequest(UserService.USER_PATH);
    }

    public checkEmailAvailability(email: string, availabilityCheckType: AvailabilityCheckType): Promise<void> {
        return this.client.executeGetRequest(`${UserService.USER_PATH}/checkemailavailability?email=${email}&checkType=${availabilityCheckType}`)
            .then(data =>
                (data.success ? Promise.resolve() : Promise.reject())
            );
    }

    public checkLoginAvailability(login: string, availabilityCheckType: AvailabilityCheckType): Promise<void> {
        return this.client.executeGetRequest(`${UserService.USER_PATH}/checkloginavailability?login=${login}&checkType=${availabilityCheckType}`)
            .then(data =>
                (data.success ? Promise.resolve() : Promise.reject())
            );
    }
}