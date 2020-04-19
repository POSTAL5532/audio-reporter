import DataRule from "./DataRule";
import {Rule} from "antd/lib/form";
import UserService from "../service/UserService";

export type AvailabilityCheckType = "consideringUser" | "notConsideringUser";

export default class UserDataRule extends DataRule {

    public static LOGIN_PATTERN: RegExp = /^[a-zA-Z0-9]{5,50}$/;
    public static PASSWORD_PATTERN: RegExp = /^[a-zA-Z0-9]{5,50}$/;
    public static LOGIN_OR_EMAIL_PATTERN: RegExp = /^[a-zA-Z0-9._@-]{2,100}$/;

    public static loginRules(availabilityCheckType?: AvailabilityCheckType): Rule[] {
        const rules: Rule[] = [
            this.requiredFieldRule(),
            this.patternFieldRule(
                this.LOGIN_PATTERN, "Логин может содержать от 5 до 50 латинских символов и цифр"
            )
        ];

        if (availabilityCheckType) {
            rules.push(this.checkLoginAvailability(availabilityCheckType));
        }

        return rules;
    }

    public static emailRules(availabilityCheckType?: AvailabilityCheckType): Rule[] {
        const rules: Rule[] = [
            this.requiredFieldRule(),
            this.typeFieldRule("email")
        ];

        if (availabilityCheckType) {
            rules.push(this.checkEmailAvailability(availabilityCheckType));
        }

        return rules;
    }

    public static passwordRules(required: boolean = true): Rule[] {
        return [
            this.requiredFieldRule(required),
            this.patternFieldRule(
                this.PASSWORD_PATTERN, "Пароль может содержать от 5 до 50 латинских символов и цифр"
            )
        ];
    }

    public static loginOrEmailRules(): Rule[] {
        return [
            this.requiredFieldRule(),
            this.patternFieldRule(this.LOGIN_OR_EMAIL_PATTERN, "Некорректное значение")
        ];
    }

    private static checkLoginAvailability(availabilityCheckType: AvailabilityCheckType): Rule {
        return {
            validator(rule, value) {
                return new UserService().checkLoginAvailability(value, availabilityCheckType)
                    .then(() => Promise.resolve())
                    .catch(error => {
                        return Promise.reject("Этот логин занят");
                    });
            }
        }
    };

    private static checkEmailAvailability(availabilityCheckType: AvailabilityCheckType): Rule {
        return {
            validator(rule, value) {
                return new UserService().checkEmailAvailability(value, availabilityCheckType)
                    .then(() => Promise.resolve())
                    .catch(() => Promise.reject("Этот Email занят"));
            }
        }
    };

}