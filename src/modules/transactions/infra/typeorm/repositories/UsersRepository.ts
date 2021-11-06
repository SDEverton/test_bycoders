import { getRepository, Repository } from 'typeorm';

import { ITransactionsDTO } from '@modules/transactions/dtos/ITransactionsDTO';
import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository';

import { Transactions } from '../entities/Transactions';

class UsersRepository implements ITransactionsRepository {
  private repository: Repository<Transactions>;

  constructor() {
    this.repository = getRepository(Transactions);
  }

  async create(data: ITransactionsDTO): Promise<Transactions> {
    const user = this.repository.create(data);

    await this.repository.save(user);

    return user;
  }

  async findAll(): Promise<ITransactionsDTO[]> {
    return this.repository.find();
  }
}

export { UsersRepository };
