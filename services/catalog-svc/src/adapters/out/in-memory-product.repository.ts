import { Product } from '../../core/aggregates/product.aggregate';
import { IProductRepository } from '../../core/ports/product.interface';

export class InMemoryProductRepository implements IProductRepository {
  constructor(public readonly database: Product[] = []) {}

  async findById(id: string): Promise<Product | null> {
    return this.database.find((product) => product.props.id === id) ?? null;
  }

  async create(entity: Product): Promise<void> {
    this.database.push(entity);
  }
}
