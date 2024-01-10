import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Usuário não encontrado');
    }

    await customerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
