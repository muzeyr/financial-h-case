
export class TransactionRequest {
    public fromDate: string;
    public toDate: string;
    public status: string;
    public operation: string;
    public merchantId: number;
    public acquirerId: number;
    public paymentMethod: string;
    public errorCode: string;
    public filterField: string;
    public filterValue: string;
    public page: number;

}
