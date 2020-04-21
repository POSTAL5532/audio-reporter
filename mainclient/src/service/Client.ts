import axios, {AxiosError, AxiosResponse} from "axios";
import {ACCESS_TOKEN, API_URL} from "config";
import {SecurityErrorMessage} from "secure/SecurityErrorMessage";
import {HttpStatusCode} from "service/HttpStatusCode";
import {deAuthorize} from "store/auth/actions";

/**
 * Клиент для выполнения http-запросов к API
 *
 * @author Q-SIE
 * */
export default class Client {

    private setHeaders(): any {
        const token = localStorage.getItem(ACCESS_TOKEN);

        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` : undefined
        };
    }

    private errorHandler = (error: AxiosError): Promise<any> => {
        const errorResponse: AxiosResponse = error.response;

        if (!errorResponse || errorResponse.status >= HttpStatusCode.INTERNAL_SERVER_ERROR) {
            deAuthorize("/error");
        } else if (errorResponse.status === HttpStatusCode.FORBIDDEN && errorResponse.data.message === SecurityErrorMessage.INSUFFICIENT_AUTH) {
            deAuthorize();
        }

        return Promise.reject(errorResponse);
    };

    /**
     * Выполняет GET-запрос по URL
     *
     * @param url URL
     * @return объект ответа
     * */
    public executeGetRequest(url: string): Promise<any> {
        return axios.get(`${API_URL}${url}`, {headers: this.setHeaders()})
            .then((response: AxiosResponse) => {
                return response.data;
            })
            .catch(this.errorHandler);

    };

    /**
     * Выполняет POST-запрос по URL
     *
     * @param url URL
     * @param body тело запроса (JSON)
     * @return объект ответа
     * */
    public executePostRequest(url: string, body: any): Promise<any> {
        return axios.post(`${API_URL}${url}`, body, {headers: this.setHeaders()})
            .then((response: AxiosResponse) => {
                return response.data;
            })
            .catch(this.errorHandler);
    };

    /**
     * Выполняет PUT-запрос по URL
     *
     * @param url URL
     * @param body тело запроса (JSON)
     * @return объект ответа
     * */
    public executePutRequest(url: string, body: string): Promise<any> {
        return null;
    };

    /**
     * Выполняет DELETE-запрос по URL
     *
     * @param url URL
     * */
    public async executeDeleteRequest(url: string) {
    };
}
