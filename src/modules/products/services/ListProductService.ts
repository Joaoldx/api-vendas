import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: SearchParams): Promise<IProductPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const products = await this.productsRepository.findAll({
      page,
      skip,
      take,
    });

    return products;
  }
}

export default ListProductService;
