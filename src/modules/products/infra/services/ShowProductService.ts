import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IShowProduct } from '@modules/products/domain/models/IShowProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IShowProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado');
    }

    return product;
  }
}

export default ShowProductService;
