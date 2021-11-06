import { container } from 'tsyringe';

import '@shared/container/providers';
import { TransactionRepository } from '@modules/transactions/infra/prisma/repostitories/TransactionRepository';
// import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository';

container.registerSingleton<ITransactionsRepository>(
  'TransactionRepository',
  TransactionRepository
);
