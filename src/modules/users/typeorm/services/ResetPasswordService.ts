import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';
import { UserTokenRepository } from '../repositories/UserTokenRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Email não cadastrado');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuário não existe');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
