import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeleteUser } from '@modules/users/domain/models/IDeleteUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IDeleteUser): Promise<string> {
    const userExist = await this.usersRepository.findById(id);

    if (!userExist) {
      throw new AppError('Usuário não existe');
    }

    await this.usersRepository.delete(userExist);

    return 'Usuário removido com sucesso';
  }
}

export default DeleteUserService;
