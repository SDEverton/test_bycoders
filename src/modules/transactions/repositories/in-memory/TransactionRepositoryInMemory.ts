import { ITransactionsDTO } from '@modules/transactions/dtos/ITransactionsDTO';
import { Transactions } from '@modules/transactions/infra/typeorm/entities/Transactions';

import { ITransactionsRepository } from '../ITransactionsRepository';

class TransactionRepositoryInMemory implements ITransactionsRepository {
  transactions: Transactions[] = [];

  async create(data: ITransactionsDTO): Promise<Transactions> {
    const transaction = new Transactions();

    Object.assign(transaction, data);

    this.transactions.push(transaction);

    return transaction;
  }

  async findAll(): Promise<ITransactionsDTO[]> {
    throw new Error('Method not implemented.');
  }

  async bulkCreate(data: ITransactionsDTO[]): Promise<void> {
    this.transactions.push(...data);
  }
}

export { TransactionRepositoryInMemory };
