import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCreateUseCase } from './UploadCreateUseCase';

class UploadCreateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const file = request.file.filename;

    const uploadCreateUseCase = container.resolve(UploadCreateUseCase);

    const data = await uploadCreateUseCase.execute(file);

    return response.status(200).json(data);
  }
}

export { UploadCreateController };
