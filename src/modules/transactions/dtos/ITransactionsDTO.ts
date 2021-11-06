interface ITransactionsDTO {
  id?: string;
  transaction_type: number;
  date_occurrence: Date;
  movement_value: number;
  card: string;
  time_occurrence: Date;
  cpf: string;
  owner: string;
  store_name: string;
}

export { ITransactionsDTO };
