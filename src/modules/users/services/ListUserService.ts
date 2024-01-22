import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { IUser } from '@modules/users/domain/models/IUser';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<IUser[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

export default ListUserService;
