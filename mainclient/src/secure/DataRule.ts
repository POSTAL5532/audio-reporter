import {Rule} from "antd/lib/form";

//Hack
type AntRuleType =
    'string'
    | 'number'
    | 'boolean'
    | 'method'
    | 'regexp'
    | 'integer'
    | 'float'
    | 'object'
    | 'enum'
    | 'date'
    | 'url'
    | 'hex'
    | 'email'

export default class DataRule {

    public static requiredFieldRule(required: boolean = true, message: string = 'Поле обязательно для заполнения'): Rule {
        return {
            required: required,
            message: message
        };
    }

    public static patternFieldRule(pattern: RegExp, message: string = 'Не корректный ввод'): Rule {
        return {
            pattern: pattern,
            message: message
        };
    }

    public static typeFieldRule(type: AntRuleType, message: string = "Значение должно быть email"): Rule {
        return {
            type: type,
            message: message
        }
    }
}