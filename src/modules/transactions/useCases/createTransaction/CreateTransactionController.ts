import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTransactionUseCase } from './CreateTransactionUseCase';

class CreateTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { body } = request;

    const createTransactionUseCase = container.resolve(
      CreateTransactionUseCase
    );

    await createTransactionUseCase.execute(body);

    return response.status(201).send();
  }
}

export { CreateTransactionController };
