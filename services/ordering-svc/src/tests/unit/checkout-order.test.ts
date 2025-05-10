import { ProductSKU } from '@org/shared-kernel';
import { InMemoryOrderRepository } from '../../adapters/out/in-memory-order.repository';
import { Order } from '../../core/aggregates/order.aggregate';
import { FakeStockService } from '../../adapters/out/fake-stock.service';
import { CheckoutOrderUseCase } from '../../core/usecase/checkout-order.usecase';

describe('Feature: CheckoutOrder', () => {
  const order = new Order('order-002');
  order.addItem(ProductSKU.create('SKU-CAM123').toString(), 1);

  let fakeStockService: FakeStockService;
  let repository: InMemoryOrderRepository;
  let usecase: CheckoutOrderUseCase;

  beforeEach(() => {
    fakeStockService = new FakeStockService(true);
    repository = new InMemoryOrderRepository([order]);
    usecase = new CheckoutOrderUseCase(repository, fakeStockService);
  });

  describe('Scenario: Happy Path', () => {
    const payload = { orderId: order.id };

    it('should checkout an order and emit OrderPlaced event', async () => {
      const result = await usecase.execute(payload);
      const saved = await repository.findById(order.id);
      expect(saved!.status).toBe('PLACED');
      expect(result.events.some((event) => event.name() === 'OrderPlaced')).toBe(true);
    });
  });

  afterEach(async () => {});
});
