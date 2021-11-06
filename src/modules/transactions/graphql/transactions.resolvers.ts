import { container } from 'tsyringe';

import { CreateTransactionUseCase } from '../useCases/createTransaction/CreateTransactionUseCase';
import { UploadCreateUseCase } from '../useCases/uploadCreate/UploadCreateUseCase';

const usersResolvers = {
  Query: {
    getAllTransactions() {
      // const listAllUsersUseCase = container.resolve(ListAllUsersUseCase);
      // const users = listAllUsersUseCase.execute();
      // return users;
    },
  },
  Mutation: {
    createTransaction(_, { input }) {
      const createTransactionService = container.resolve(
        CreateTransactionUseCase
      );
      const transaction = createTransactionService.execute(input);
      return transaction;
    },

    uploadCreate(_, { input }) {
      const uploadCreateUseCase = container.resolve(UploadCreateUseCase);
      const transactions = uploadCreateUseCase.execute(input);
      return transactions;
    },
  },
};

export default usersResolvers;
