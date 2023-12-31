import { EntityRepository, Repository } from 'typeorm';
import Customers from '../entities/Customer';

@EntityRepository(Customers)
export class CustomersRepository extends Repository<Customers> {
  public async findByName(name: string): Promise<Customers | undefined> {
    const customer = this.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customers | undefined> {
    const customer = this.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customers | undefined> {
    const customer = this.findOne({
      where: {
        email,
      },
    });

    return customer;
  }
}
