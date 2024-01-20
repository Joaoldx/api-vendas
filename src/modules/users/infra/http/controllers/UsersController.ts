import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import CreateUserService from '../../typeorm/services/CreateUserService';
import DeleteUserService from '../../typeorm/services/DeleteUserService';
import ListUserService from '../../typeorm/services/ListUserService';
import { container } from 'tsyringe';

export default class UserController {
  public async index(request: Request, response: Response) {
    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute();

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute({
      id,
    });

    return response.json(user);
  }
}
