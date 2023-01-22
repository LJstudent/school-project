import { IDataRecord } from "../models/interfaces/IDataRecord";

export const dataRecords: IDataRecord[] = [
    {
        id: 1,
        item: "Coffee cups",
        amount: 10000,
        purchase_price: 10000,
        approved_by_purchasing_department: true,
        approved_by_director: true,
    },
    {
        id: 2,
        item: "Thee bags",
        amount: 20000,
        purchase_price: 5000,
        approved_by_purchasing_department: undefined,
        approved_by_director: undefined,
    },
    {
        id: 3,
        item: "Milk cups",
        amount: 1000,
        purchase_price: 500,
        approved_by_purchasing_department: false,
        approved_by_director: false,
    },
    {
        id: 4,
        item: "Coffee cookies",
        amount: 40000,
        purchase_price: 20000,
        approved_by_purchasing_department: undefined,
        approved_by_director: undefined,
    },
    {
        id: 5,
        item: "Sugar sticks",
        amount: 10000,
        purchase_price: 500,
        approved_by_purchasing_department: undefined,
        approved_by_director: undefined,
    }
]