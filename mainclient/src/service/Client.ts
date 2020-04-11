import {ACCESS_TOKEN, API_URL} from "../config";

/**
 * Клиент для выполнения http-запросов к API
 *
 * @author Q-SIE
 * */
export default class Client {

    private executeRequest(url: string, options: any): Promise<any> {
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        if (localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`);
        }

        const requestOptions = Object.assign({}, {headers: headers}, options);

        return fetch(url, requestOptions)
            .then(response => response.json().then(json => {
                    if (!response.ok) {
                        return Promise.reject(json)
                    }
                    return json;
                })
            );
    }

    /**
     * Выполняет GET-запрос по URL
     *
     * @param url URL
     * @return объект ответа
     * */
    public executeGetRequest(url: string): Promise<any> {
        return this.executeRequest(`${API_URL}${url}`, {method: "GET"});
    };

    /**
     * Выполняет POST-запрос по URL
     *
     * @param url URL
     * @param body тело запроса (JSON)
     * @return объект ответа
     * */
    public executePostRequest(url: string, body: string): Promise<any> {
        const requestOptions = {
            method: 'POST',
            body: body
        };

        return this.executeRequest(`${API_URL}${url}`, requestOptions);
    };

    /**
     * Выполняет PUT-запрос по URL
     *
     * @param url URL
     * @param body тело запроса (JSON)
     * @return объект ответа
     * */
    public executePutRequest(url: string, body: string): Promise<any> {
        const requestOptions = {
            method: 'PUT',
            body: body
        };

        return this.executeRequest(`${API_URL}${url}`, requestOptions);
    };

    /**
     * Выполняет DELETE-запрос по URL
     *
     * @param url URL
     * */
    public async executeDeleteRequest(url: string) {
        return this.executeRequest(`${API_URL}${url}`, {method: "DELETE"});
    };
}
