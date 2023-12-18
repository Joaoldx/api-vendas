import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<string> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userExist = await usersRepository.findById(id);

    if (!userExist) {
      throw new AppError('Usuário não existe');
    }

    await usersRepository.remove(userExist);

    return 'Usuário removido com sucesso';
  }
}

export default DeleteProductService;
