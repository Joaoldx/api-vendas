import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';
import Customers from '../typeorm/entities/Customer';

class ListCustomerService {
  public async execute(): Promise<Customers[]> {
    const CustomerRepository = getCustomRepository(CustomersRepository);

    const customers = await CustomerRepository.find();

    return customers;
  }
}

export default ListCustomerService;
