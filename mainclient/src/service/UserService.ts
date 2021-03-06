import Client from "service/Client";
import {AvailabilityCheckType} from "secure/UserDataRule";
import {UserInfo} from "logic/profile/userTypes";

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

    public editPersonalData(login: string, email: string): Promise<UserInfo> {
        const editPersonalDataRequest = {
            login: login,
            email: email
        };

        return this.client.executePostRequest(`${UserService.USER_PATH}/editpersonaldata`, editPersonalDataRequest);
    };

    public editPassword(oldPassword: string, newPassword: string, confirmPassword: string): Promise<UserInfo> {
        const editPasswordRequest = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };

        return this.client.executePostRequest(`${UserService.USER_PATH}/editpassword`, editPasswordRequest);
    };
}