import { BaseUseCase, IIDGenerator } from '@org/shared-kernel';
import { Product } from '../aggregates/product.aggregate';
import { Variant } from '../entities/variant.entity';
import { IProductRepository } from '../ports/product.interface';

type Request = {
  name: string;
  description: string;
  variants: Variant[];
};

type Response = { productId: string };

export class CreateProductUseCase extends BaseUseCase<Request, Response> {
  constructor(
    private readonly repository: IProductRepository,
    private readonly idGenerator: IIDGenerator,
  ) {
    super();
  }

  async execute(request: Request): Promise<Response> {
    this.validateInput(request);

    const generatedId = this.idGenerator.generate();

    const product = Product.create(
      {
        name: request.name,
        description: request.description,
        variants: request.variants,
      },
      generatedId,
    );

    this.repository.create(product);

    return { productId: generatedId };
  }
}
