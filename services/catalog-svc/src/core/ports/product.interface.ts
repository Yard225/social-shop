import { Product } from '../aggregates/product.aggregate';

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  create(entity: Product): Promise<void>;
}
