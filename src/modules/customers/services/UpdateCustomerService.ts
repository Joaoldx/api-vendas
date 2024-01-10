import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer não encontrado');
    }

    const userUpdateEmail = await customerRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new AppError('Email já cadastrado');
    }
    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
