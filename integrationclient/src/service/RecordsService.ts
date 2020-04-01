/**
 * Сервис
 *
 * @author SIE
 * */
export default class RecordService {

    private static API_URL: string = "http://localhost:8080/api/records";

    public addNewRecord = async (record: FormData): Promise<void> => {
        const requestOptions = {
            method: 'POST',
            body: record
        };

        const response = await fetch(RecordService.API_URL, requestOptions);

        if (!response.ok) {
            throw new Error(`Could not save-fetch ${RecordService.API_URL}, received ${response.status}`);
        }
    };
}
