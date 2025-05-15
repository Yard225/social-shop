import { Money, ProductSKU } from '@org/shared-kernel';
import { InMemoryProductRepository } from '../../adapters/out/in-memory-product.repository';
import { Product } from '../../core/aggregates/product.aggregate';
import { Variant } from '../../core/entities/variant.entity';
import { AdjustStockUseCase } from '../../core/usecases/adjust-stock.usecase';

describe('Feature: Adjust stock', () => {
  const variant = Variant.create({
    sku: ProductSKU.create('SKU-CAM123'),
    price: Money.cfa(120_000),
    stock: 5,
  });

  const product = Product.create(
    {
      name: 'Camera X',
      description: 'Camera Haute définition',
      variants: [variant],
    },
    'id-1',
  );

  let repository: InMemoryProductRepository;
  let usecase: AdjustStockUseCase;

  beforeEach(() => {
    repository = new InMemoryProductRepository([product]);
    usecase = new AdjustStockUseCase(repository);
  });

  describe('Scenario: Happy Path', () => {
    const payload = {
      productId: product.id,
      sku: product.props.variants[0].sku,
      delta: -3,
    };

    it('should change stock level of an existing variant', async () => {
      await usecase.execute(payload);

      const updated = await repository.findById(product.id);
      expect(updated!.props.variants[0].stock).toBe(2);
    });
  });

  afterEach(() => {});
});
