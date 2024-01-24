import { Repository } from 'typeorm';
import User from '../entities/User';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUser } from '@modules/users/domain/models/IUser';
import { dataSource } from '@shared/infra/typeorm';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public async findAll(): Promise<IUser[]> {
    return await this.ormRepository.find();
  }
  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = await this.ormRepository.create({
      name,
      email,
      password,
    });

    await this.save(user);

    return user;
  }

  public async save({
    name,
    email,
    password,
    avatar,
    created_at,
    updated_at,
  }: IUser): Promise<IUser> {
    return await this.ormRepository.save({
      name,
      email,
      password,
      avatar,
      created_at,
      updated_at,
    });
  }

  public async delete(user: IUser): Promise<void> {
    await this.ormRepository.delete(user);
  }

  public async findByName(name: string): Promise<User | null> {
    const user = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
