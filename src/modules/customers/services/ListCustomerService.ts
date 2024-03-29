import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomerPaginate } from '../domain/models/ICustomerPaginate';

interface SearchParams {
  page: number;
  limit: number;
}
@injectable()
class ListCustomerService {
  constructor(
    @inject('ICustomersRepository')
    private customerRepository: ICustomersRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<ICustomerPaginate> {
    const take = limit;
    const skip = (page - 1) * take;

    const customers = await this.customerRepository.findAll({
      page,
      skip,
      take,
    });

    return customers;
  }
}

export default ListCustomerService;
