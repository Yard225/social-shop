import { InMemoryOrderRepository } from '../../adapters/out/in-memory-order.repository';
import { ProductSKU } from '../../../../../packages/shared-kernel/src/value-objects/product-sku.vo';
import { AddItemToCartUseCase } from '../../core/usecase/add-item-to-cart.usecase';

describe('Feature: Add Item to cart', () => {
  let repository: InMemoryOrderRepository;
  let usecase: AddItemToCartUseCase;

  beforeEach(() => {
    repository = new InMemoryOrderRepository();
    usecase = new AddItemToCartUseCase(repository);
  });

  describe('Scenario: Happy Path', () => {
    const payload = {
      orderId: 'order-001',
      productId: ProductSKU.create('SKU-CAM123').getValue() as ProductSKU,
      qty: 1,
    };

    it('Should add a SKU with quantity 1 to a new order', async () => {
      await usecase.execute(payload);

      const order = await repository.findById('order-001');
      expect(order!.items[0].props.productId.toString()).toBe('SKU-CAM123');
      expect(order!.items[0].props.qty).toBe(1);
    });
  });

  afterEach(async () => {});
});
