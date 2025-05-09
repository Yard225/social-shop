import { Order } from '../aggregates/order.aggregate';
import { ProductSKU } from '../../../../../packages/shared-kernel/src/value-objects/product-sku.vo';
import { IOrderRepository } from '../../ports/order-repository.interface';

type Request = {
  orderId: string;
  productId: ProductSKU;
  qty: number;
};

type Response = void;

export class AddItemToCartUseCase {
  constructor(private readonly repository: IOrderRepository) {}

  async execute(request: Request): Promise<Response> {
    let order = await this.repository.findById(request.orderId);
    if (!order) {
      order = new Order(request.orderId);
    }

    order.addItem(request.productId, request.qty);
    await this.repository.create(order);
  }
}
