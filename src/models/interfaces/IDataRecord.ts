export interface IDataRecord {
    id: number;
    item: string;
    amount: number;
    purchase_price: number;
    approved_by_purchasing_department: boolean | undefined;
    approved_by_director: boolean | undefined;
}