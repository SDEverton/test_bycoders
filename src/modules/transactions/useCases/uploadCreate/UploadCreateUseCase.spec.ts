import fs from 'fs';
import path from 'path';

import { TransactionRepositoryInMemory } from '@modules/transactions/repositories/in-memory/TransactionRepositoryInMemory';
import { LocalStorageProvider } from '@shared/container/providers/StorageProvider/implementations/LocalhistorageProvider';
import { AppError } from '@shared/errors/AppError';

import { UploadCreateUseCase } from './UploadCreateUseCase';

let uploadCreateUseCase: UploadCreateUseCase;
let transactionRepositoryInMemory: TransactionRepositoryInMemory;
let localStorageProvider: LocalStorageProvider;

describe('Create Category', () => {
  beforeEach(() => {
    transactionRepositoryInMemory = new TransactionRepositoryInMemory();
    localStorageProvider = new LocalStorageProvider();
    uploadCreateUseCase = new UploadCreateUseCase(
      transactionRepositoryInMemory,
      localStorageProvider
    );
  });

  afterEach(() => {
    const pathToFile = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      'CNAB.txt'
    );
    const pathToNewDestination = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      'tmp',
      'bd329c300825f6e6427beb9c20d4d31d-CNAB.txt'
    );

    fs.copyFile(pathToFile, pathToNewDestination, (err) => {
      if (err) {
        throw err;
      } else {
        // console.log('Successfully copied and moved the file!');
      }
    });
  });

  it('should be able to create many transactions', async () => {
    const data = await uploadCreateUseCase.execute(
      'bd329c300825f6e6427beb9c20d4d31d-CNAB.txt'
    );

    expect(data[0]).toHaveProperty('cpf');
  });

  it('should be not able to create many transactions', async () => {
    await expect(
      uploadCreateUseCase.execute('bd329c300825f6e6427beb9c20d4d31d.txt')
    ).rejects.toEqual(new AppError('Error read file!'));
  });
});
