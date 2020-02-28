export class Response {
    public currency: string;
    public total: string;
    public count: string;
}

export class TransactionResponse {
    public status: string;
    public response: Response[];
}
