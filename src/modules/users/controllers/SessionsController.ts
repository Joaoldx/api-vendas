import { Request, Response } from 'express';
import CreateSessionsService from '../typeorm/services/CreateSessionsService';

export default class SessionsController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const createSession = new CreateSessionsService();

    const user = await createSession.execute({ email, password });

    return response.json(user);
  }
}
