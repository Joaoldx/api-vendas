import { inject, injectable } from 'tsyringe';
import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IUpdateProduct } from '@modules/products/domain/models/IUpdateProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Produto não encontrado');
    }

    const productExists = await this.productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('Já existe um produto com esse nome');
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
