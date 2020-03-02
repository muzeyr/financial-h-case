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
export class MerchantTransactionClient {
    public merchant: MerchantClient;
}

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
export class Agent {
    public id: number;
    public customerIp: string;
    public customerUserAgent: string;
    public merchantIp: string;
    public merchantUserAgent: string;
}

export class MerchantMain {
    public name: Merchant;

}
export class Fx {
    public merchant: Merchant;
}
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
export class CustomerInfo {
    public id: number;
    public number: string;
    public expiryMonth: string;
    public expiryYear: string;
    public startMonth: string;
    public startYear: string;
    public issueNumber: string;
    public email: string;
    public birthday: string;
    public gender: string;
    public billingTitle: string;
    public billingFirstName: string;
    public billingLastName: string;
    public billingCompany: string;
    public billingAddress1: string;
    public billingAddress2: string;
    public billingCity: string;
    public billingPostcode: string;
    public billingState: string;
    public billingCountry: string;
    public billingPhone: string;
    public billingFax: string;
    public shippingTitle: string;
    public shippingFirstName: string;
    public shippingLastName: string;
    public shippingCompany: string;
    public shippingAddress1: string;
    public shippingAddress2: string;
    public shippingCity: string;
    public shippingPostcode: string;
    public shippingState: string;
    public shippingCountry: string;
    public shippingPhone: string;
    public shippingFax: string;
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
