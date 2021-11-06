import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateTransactionController } from '@modules/transactions/useCases/createTransaction/CreateTransactionController';
import { UploadCreateController } from '@modules/transactions/useCases/uploadCreate/UploadCreateController';

const transactionRoute = Router();

const createTransactionController = new CreateTransactionController();
const uploadCreateController = new UploadCreateController();

const upload = multer(uploadConfig);

transactionRoute.post('/', createTransactionController.handle);
transactionRoute.post(
  '/upload',
  upload.single('file'),
  uploadCreateController.handle
);

export { transactionRoute };
