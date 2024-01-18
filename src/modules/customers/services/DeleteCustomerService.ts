import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

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
