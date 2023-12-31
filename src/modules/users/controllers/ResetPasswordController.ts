import { Request, Response } from 'express';
import ResetPasswordService from '../typeorm/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response) {
    const { token, password } = request.body;

    const sendForgotPasswordEmail = new ResetPasswordService();

    await sendForgotPasswordEmail.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}
