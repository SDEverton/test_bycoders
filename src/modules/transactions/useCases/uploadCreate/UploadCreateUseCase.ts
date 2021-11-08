import { parseISO } from 'date-fns';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { ITransactionsDTO } from '@modules/transactions/dtos/ITransactionsDTO';
import { ITransactionsRepository } from '@modules/transactions/repositories/ITransactionsRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStoragePovider';
import { AppError } from '@shared/errors/AppError';

interface IResponse {
  id?: string;
  transaction_type: string;
  date_occurrence: Date;
  movement_value: number;
  card: string;
  time_occurrence: Date;
  cpf: string;
  owner: string;
  store_name: string;
}

@injectable()
class UploadCreateUseCase {
  constructor(
    @inject('TransactionRepository')
    private userRepository: ITransactionsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}
  async execute(file: string): Promise<IResponse[]> {
    const arrayInformation = [];

    try {
      await this.storageProvider.save(file, 'files');
    } catch (error) {
      throw new AppError('Error read file!');
    }

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

    const options = (item: number) =>
      ({
        1: 'Débito +',
        2: 'Boleto -',
        3: 'Financiamento -',
        4: 'Crédito +',
        5: 'Recebimento Empréstimo +',
        6: 'Vendas +',
        7: 'Recebimento TED +',
        8: 'Recebimento DOC +',
        9: 'Aluguel -',
      }[item] || 'generic error');

    const response = arrayInformation.map((item: ITransactionsDTO) => {
      return {
        transaction_type: options(item.transaction_type),
        date_occurrence: item.date_occurrence,
        movement_value: item.movement_value,
        cpf: item.cpf,
        card: item.card,
        time_occurrence: item.time_occurrence,
        owner: item.owner,
        store_name: item.store_name,
      };
    });

    return response;
  }
}

export { UploadCreateUseCase };
