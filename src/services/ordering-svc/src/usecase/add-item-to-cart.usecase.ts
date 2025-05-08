import { ProductSKU } from '../core/value-objects/product-sku.vo';
import { IOrderRepository } from '../ports/repository.interface';

type Request = {
  orderId: string;
  productId: ProductSKU | undefined;
  qty: number;
};

type Response = void;

export class AddItemToCartUseCase {
  constructor(private readonly repository: IOrderRepository) {}
  async execute(request: Request): Promise<Response> {
    const order = await this.repository.findById(request.orderId);

    if (!order) {
    }
  }
}
