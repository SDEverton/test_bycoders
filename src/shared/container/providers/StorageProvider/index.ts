import { container } from 'tsyringe';

import { LocalStorageProvider } from './implementations/LocalhistorageProvider';
import { IStorageProvider } from './IStoragePovider';

const diskStorage = {
  local: LocalStorageProvider,
  s3: '',
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.disk]
);
