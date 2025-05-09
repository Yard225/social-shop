import { IProductRepository } from '../ports/product.interface';

type Request = { productId: string; sku: string; delta: number };

type Response = void;

export class AdjustStockUseCase {
  constructor(private readonly repository: IProductRepository) {}

  async execute(request: Request): Promise<Response> {
    const product = await this.repository.findById(request.productId);
    if (!product) throw new Error('Product not found');

    product.adjustStock(request.sku, request.delta);
    await this.repository.create(product);
  }
}
