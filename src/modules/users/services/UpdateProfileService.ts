import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { IUser } from '../domain/models/IUser';

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

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

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
