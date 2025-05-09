import { Variant } from '../entities/variant.entity';

type ProductProps = {
  readonly id: string;
  name: string;
  readonly variants: Variant[];
};

export class Product {
  private constructor(public props: ProductProps) {}

  static create(props: ProductProps) {
    return new Product(props);
  }

  adjustStock(sku: string, delta: number) {
    const v = this.props.variants.find((v) => v.sku.toString() === sku);
    if (!v) throw new Error('Variant not found');
    v.adjustStock(delta);
  }
}
