import { Agent } from '../general/agent';

export class Merchant {
    public agent: Agent;
    public originalAmount: number;
    public originalCurrency: string;
    public message: string;
    public merchantId: string;
    public fxTransactionId: string;
    public acquirerTransactionId: string;
    public channel: string;
    public type: string;
    public operation: string;
}
