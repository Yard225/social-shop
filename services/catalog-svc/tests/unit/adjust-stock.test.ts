// import { ProductSKU, Money } from 'packages/shared-kernel/src';
// import { InMemoryProductRepository } from '../../src/adapters/out/in-memory-product.repository';
// import { Product } from '../../src/core/aggregates/product.aggregate';
// import { Variant } from '../../src/core/entities/variant.entity';

// describe('Feature: Adjust stock', () => {
//   let repository: InMemoryProductRepository;
//   let usecase: AdjustStock;

//   beforeEach(() => {
//     repository = new InMemoryProductRepository();
//     usecase = new AdjustStock(repository);
//   });

//   describe('Scenario: Happy Path', () => {
//     const payload = {
//       productId: product.id,
//       sku: product.variants[0].sku,
//       delta: -3,
//     };

//     describe('UseCase: AdjustStock', () => {
//       const paylaod = {
//         productId: product.id,
//         sku: product.variants[0].sku,
//         delta: -3,
//       };
//       it('should change stock level of an existing variant', async () => {
//         // GIVEN an existing product with variant stock = 5
//         const product = Product.create({
//           id: 'prod-101',
//           name: 'Camera X',
//           variants: [
//             Variant.create({
//               sku: ProductSKU.create('SKU-CAM123').value,
//               price: Money.cfa(120_000),
//               stock: 5,
//             }).value,
//           ],
//         }).value;

//         await repository.create(product);

//         await usecase.execute(payload);

//         const updated = await repository.findById(product.id);
//         expect(updated!.variants[0].stock).toBe(2);
//       });
//     });
//   });

//   afterEach(() => {});
// });
