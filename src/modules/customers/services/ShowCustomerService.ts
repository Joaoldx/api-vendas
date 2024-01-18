import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Usuário não encontrado');
    }

    return customer;
  }
}

export default ShowCustomerService;
