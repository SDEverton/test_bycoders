import { inject, injectable } from 'tsyringe';

import { ITransactionsDTO } from '@modules/transactions/dtos/ITransactionsDTO';
import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository';

@injectable()
class CreateTransactionUseCase {
  constructor(
    @inject('TransactionRepository')
    private userRepository: ITransactionsRepository
  ) {}
  async execute(data: ITransactionsDTO): Promise<ITransactionsDTO> {
    const user = await this.userRepository.create(data);

    return user;
  }
}

export { CreateTransactionUseCase };
