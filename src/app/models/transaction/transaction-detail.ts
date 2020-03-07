export class TransactionDetail {
    public fx: Fx;
    public customerInfo: CustomerInfo;
    public merchant: MerchantMain;
    public transaction: MerchantTransactionClient;
    public ipn: any;
    public acquirer: any;
    public refundable: any;
    public status: string;
    public message: string;
}