import { parseISO } from 'date-fns';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { ITransactionsDTO } from '@modules/transactions/dtos/ITransactionsDTO';
import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStoragePovider';

@injectable()
class UploadCreateUseCase {
  constructor(
    @inject('TransactionRepository')
    private userRepository: ITransactionsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}
  async execute(file: string): Promise<ITransactionsDTO[]> {
    const arrayInformation = [];
    await this.storageProvider.save(file, 'files');

    const transactionReadStream = fs.readFileSync(
      await this.storageProvider.find(file, 'files')
    );

    const data = transactionReadStream
      .toString()
      .replace(/\r\n/g, '\n')
      .split('\n');

    const format = (date: string, time: string) => {
      const arrayDate = date.split('');
      const arrayTime = time.split('');

      const date_occurrence = `${arrayDate[0]}${arrayDate[1]}${arrayDate[2]}${arrayDate[3]}-${arrayDate[4]}${arrayDate[5]}-${arrayDate[6]}${arrayDate[7]}`;
      const time_occurrence = `${arrayTime[0]}${arrayTime[1]}:${arrayTime[2]}${arrayTime[3]}:${arrayTime[4]}${arrayTime[5]}`;

      return `${date_occurrence}T${time_occurrence}Z`;
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const i of data) {
      const transaction_type = Number(i.substring(0, 1));
      const date_occurrence = parseISO(i.substring(1, 9));
      const movement_value = Number(i.substring(9, 19)) / 100;
      const cpf = i.substring(19, 30);
      const card = i.substring(30, 42);
      const time_occurrence = format(i.substring(1, 9), i.substring(42, 48));
      const owner = i.substring(48, 62);
      const store_name = i.substring(62, 81);

      arrayInformation.push({
        transaction_type,
        date_occurrence,
        movement_value,
        cpf,
        card,
        time_occurrence,
        owner,
        store_name,
      });
    }

    await this.userRepository.bulkCreate(arrayInformation);
    await this.storageProvider.delete(file, 'files');

    return arrayInformation;
  }
}

export { UploadCreateUseCase };
