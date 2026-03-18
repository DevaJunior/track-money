// frontend/global/types.ts

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  text: string;
  amount: number;
  category: string;
  date: string;
  type: TransactionType;
}

export type NewTransactionData = Omit<Transaction, 'id' | 'date'>;

export type Page = 'home' | 'relatorio' | 'fluxo' | 'config';

export interface ChartData {
    name: string;
    value: number;
    color: string;
}

export interface BarChartData {
    name: string;
    income: number;
    expense: number;
}