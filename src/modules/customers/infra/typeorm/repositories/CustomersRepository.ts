import { Repository } from 'typeorm';
import Customer from '../entities/Customer';
import {
  ICustomersRepository,
  SearchParams,
} from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { dataSource } from '@shared/infra/typeorm';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';

export class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Customer);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate> {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async delete(customer: Customer): Promise<void> {
    await this.ormRepository.delete(customer);
  }

  public async findByName(name: string): Promise<Customer | null> {
    const customer = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }
}
