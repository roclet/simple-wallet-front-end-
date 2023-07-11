export interface DebitAccountRequest {
    userId: string;
    accountNumber: string;
    amount: string;
    transactionDateTime: string;
}