import { Product } from '../aggregates/product.aggregate';

const I_PRODUCT_REPOSITORY = 'I_PRODUCT_REPOSITORY';

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  create(entity: Product): Promise<void>;
}
