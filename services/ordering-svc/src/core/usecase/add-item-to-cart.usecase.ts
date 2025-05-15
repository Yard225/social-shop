import { BaseUseCase } from '@org/shared-kernel';
import { FakeStockService } from '../../adapters/out/fake-stock.service';
import { Order } from '../aggregates/order.aggregate';
import { IOrderRepository } from '../ports/order-repository.interface';

type Request = {
  orderId: string;
  productId: string;
  qty: number;
};

type Response = void;

export class AddItemToCartUseCase extends BaseUseCase<Request, Response> {
  constructor(private readonly repository: IOrderRepository) {
    super();
  }

  async execute(request: Request): Promise<Response> {
    this.validateInput(request);

    let order = await this.repository.findById(request.orderId);
    order ??= new Order(request.orderId);

    order.addItem(request.productId, request.qty);
    await this.repository.create(order);
  }
}
