import AppError from '@shared/errors/AppError';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('ICustomersRepository')
    private customerRepository: ICustomersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<ICustomer> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer não encontrado');
    }

    const userUpdateEmail = await this.customerRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new AppError('Email já cadastrado');
    }

    customer.name = name;
    customer.email = email;

    return customer;
  }
}

export default UpdateCustomerService;
