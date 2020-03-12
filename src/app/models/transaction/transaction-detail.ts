import { CustomerInfo } from '../general/customer-info';
import { MerchantMain } from '../merchant/merchant-main';
import { MerchantTransactionClient } from '../merchant/merchan-transacton-client';
import { Fx } from '../general/tx';

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
