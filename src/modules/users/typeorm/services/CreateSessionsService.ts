import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';
import User from '../entities/User';
import { compare } from 'bcryptjs';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email ou senha inválidos', 401);
    }

    const passwordConfirmed = compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Senha inválida', 401);
    }

    return user;
  }
}

export default CreateSessionsService;
