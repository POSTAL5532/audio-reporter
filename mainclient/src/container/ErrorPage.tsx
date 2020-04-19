import React from "react";
import {Button, Result} from "antd";
import {browserHistory} from "../index";

const ErrorPage = () => {
    return (
        <Result
            status="500"
            title="Упс!"
            subTitle="Что-то пошло не так. Мы уже увольняем разработчика, а новый исправляет проблему."
            extra={
                <Button type="primary" onClick={() => browserHistory.push("/")}>На главную</Button>
            }
        />
    );
};

export default ErrorPage;