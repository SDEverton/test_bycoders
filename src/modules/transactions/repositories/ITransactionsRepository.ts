import { ITransactionsDTO } from '../dtos/ITransactionsDTO';

interface ITransactionsRepository {
  create(data: ITransactionsDTO): Promise<ITransactionsDTO>;
  findAll(): Promise<ITransactionsDTO[]>;
  bulkCreate(data: ITransactionsDTO[]): Promise<void>;
}

export { ITransactionsRepository };
