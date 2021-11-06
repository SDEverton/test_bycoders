import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository';
import { PrismaClient } from '@prisma/client';

import { ITransactionsDTO } from '../../../dtos/ITransactionsDTO';

class TransactionRepository implements ITransactionsRepository {
  private prisma = new PrismaClient();

  async create(data: ITransactionsDTO): Promise<ITransactionsDTO> {
    const user = await this.prisma.transactions.create({
      data,
    });

    return user;
  }

  async findAll(): Promise<ITransactionsDTO[]> {
    return this.prisma.transactions.findMany();
  }

  async bulkCreate(data: ITransactionsDTO[]): Promise<void> {
    await this.prisma.transactions.createMany({ data });
  }
}

export { TransactionRepository };
