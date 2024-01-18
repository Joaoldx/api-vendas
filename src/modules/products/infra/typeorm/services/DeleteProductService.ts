import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<string> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const productExists = await productsRepository.findOne(id);

    if (!productExists) {
      throw new AppError('Produto não existe');
    }

    const redisCache = new RedisCache();

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.remove(productExists);

    return 'Produto removido com sucesso';
  }
}

export default DeleteProductService;
