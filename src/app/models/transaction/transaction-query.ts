import { Merchant } from '../merchant/merchant';
import { Agent } from '../general/agent';
import { TransactionDetail } from './transaction-detail';

export class MerchantTransaction {

    public referenceNo: string;
    public merchantId: number;
    public status: string;
    public channel: string;
    public customData: string;
    public chainId: string;
    public agentInfoId: string;
    public operation: string;
    public fxTransactionId: number;
    public updatedat: string;
    public createdat: string;
    public id: number;
    public acquirerTransactionId: number;
    public code: string;
    public message: string;
    public transactionId: string;
    public agent: Agent;
    public merchant: Merchant;

}

export class TransactionQuery {
    public perpage: number;
    public currentpage: number;
    public nextpageurl: string;
    public prevpageurl: string;
    public from: number;
    public to: number;
    public data: TransactionDetail[];

}
