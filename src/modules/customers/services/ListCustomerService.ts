import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const CustomerRepository = getCustomRepository(CustomersRepository);

    const customers = await CustomerRepository.createQueryBuilder().paginate();

    return customers as IPaginateCustomer;
  }
}

export default ListCustomerService;
