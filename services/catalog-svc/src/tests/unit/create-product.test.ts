import { ProductSKU, Money, FixedIdGenerator } from '@org/shared-kernel';
import { InMemoryProductRepository } from '../../adapters/out/in-memory-product.repository';
import { CreateProductUseCase } from '../../core/usecases/create-product.usecase';
import { Variant } from '../../core/entities/variant.entity';

describe('Feature: Create product', () => {
  function createProductVariants(args: any[]): Variant[] {
    const variants: Variant[] = [];

    for (const obj of args) {
      variants.push(Variant.create(obj));
    }

    return variants;
  }

  let usecase: CreateProductUseCase;
  let repository: InMemoryProductRepository;
  let fixedIDGenerator: FixedIdGenerator;

  beforeEach(async () => {
    fixedIDGenerator = new FixedIdGenerator();
    repository = new InMemoryProductRepository();
    usecase = new CreateProductUseCase(repository, fixedIDGenerator);
  });
  afterEach(async () => {});

  describe('Scenario: Happy Path', () => {
    const payload = {
      name: 'Camera X',
      description: '4K action cam',
      variants: createProductVariants([
        {
          sku: ProductSKU.create('SKU-CAM123'),
          price: Money.cfa(120_000),
          stock: 10,
        },
        {
          sku: ProductSKU.create('SKU-CAM124'),
          price: Money.cfa(130_000),
          stock: 5,
        },
      ]),
    };
    it('Should create a new product with two variants and returns its id', async () => {
      const { productId } = await usecase.execute(payload);

      const productCreated = await repository.findById(productId);
      expect(productCreated!.props.variants.length).toBe(2);
      expect(productCreated!.props.name).toBe('Camera X'); //?
    });
  });
});
