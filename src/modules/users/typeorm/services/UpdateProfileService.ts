import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import User from '../entities/User';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('Email já cadastrado');
    }

    if (password && !old_password) {
      throw new AppError('A senha antiga é obrigatória');
    }

    if (password && old_password) {
      const checkOldPassword = compare(old_password, password);

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não é válida');
      }

      user.password = await hash(password, 8);
    }
    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
