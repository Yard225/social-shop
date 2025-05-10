import { ProductSKU, Money } from '@org/shared-kernel';
import { InMemoryProductRepository } from '../../src/adapters/out/in-memory-product.repository';
import { Product } from '../../src/core/aggregates/product.aggregate';
import { Variant } from '../../src/core/entities/variant.entity';
import { AdjustStockUseCase } from '../../src/core/usecases/adjust-stock.usecase';

describe('Feature: Adjust stock', () => {
  const variant = Variant.create({
    sku: ProductSKU.create('SKU-CAM123').toString(),
    price: Money.cfa(120_000),
    stock: 5,
  });

  const product = Product.create({
    id: 'prod-101',
    name: 'Camera X',
    variants: [variant],
  });

  let repository: InMemoryProductRepository;
  let usecase: AdjustStockUseCase;

  beforeEach(() => {
    repository = new InMemoryProductRepository([product]);
    usecase = new AdjustStockUseCase(repository);
  });

  describe('Scenario: Happy Path', () => {
    const payload = {
      productId: product.props.id,
      sku: product.props.variants[0].sku.toString(),
      delta: -3,
    };

    it('should change stock level of an existing variant', async () => {
      await usecase.execute(payload);

      const updated = await repository.findById(product.props.id);
      expect(updated!.props.variants[0].stock).toBe(2);
    });
  });

  afterEach(() => {});
});
