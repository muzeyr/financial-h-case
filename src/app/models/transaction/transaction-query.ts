import { TransactionDetail } from './transaction-detail';

export class TransactionQuery {
    public perpage: number;
    public currentpage: number;
    public nextpageurl: string;
    public prevpageurl: string;
    public from: number;
    public to: number;
    public data: TransactionDetail[];

}
