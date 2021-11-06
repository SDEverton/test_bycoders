import { Router } from 'express';

import { transactionRoute } from './transactions.routes';

const router = Router();

router.use('/transaction', transactionRoute);

export { router };
