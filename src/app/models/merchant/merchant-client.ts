import { Agent } from '../general/agent';
import { Merchant } from './merchant';

export class MerchantClient {
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
    public type: string;
}