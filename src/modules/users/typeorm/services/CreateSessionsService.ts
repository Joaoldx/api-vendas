import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../repositories/UsersRepository';
import User from '../entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email ou senha inválidos', 401);
    }

    const passwordConfirmed = compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Senha inválida', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expires,
    });

    return { token, user };
  }
}

export default CreateSessionsService;
