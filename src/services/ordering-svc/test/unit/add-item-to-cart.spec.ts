import { InMemoryOrderRepository } from '../../src/adapters/in-memory-order.repository';
import { ProductSKU } from '../../src/core/value-objects/product-sku.vo';
import { AddItemToCartUseCase } from '../../src/usecase/add-item-to-cart.usecase';

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
      productId: ProductSKU.create('SKU-CAM123').getValue(),
      qty: 1,
    };

    it('Should add a SKU with quantity 1 to a new order', async () => {
      await usecase.execute(payload);
      expect(repository.database.length).toBe(1);

      const order = await repository.findById('order-001');
      expect(order?.items[0].props.productId).toEqual('SKU-CAM123');
      expect(order?.items[0].props.qty).toBe(1);
    });
  });

  describe('Scenario: ProductSKU error', () => {
    const payload = {
      orderId: 'order-001',
      productId: ProductSKU.create('SKUCAM123').getValue(),
      qty: 1,
    };

    it('Should fail', async () => {
      await usecase.execute(payload);
      expect(repository.database.length).toBe(0);
    });
  });

  afterEach(async () => {});
});
