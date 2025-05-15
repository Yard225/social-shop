import { Aggregate, AggregateProps, ProductSKU } from '@org/shared-kernel';
import { Variant } from '../entities/variant.entity';
import { ProductDetailsUpdated } from '../events/product-details-updated.event';

type ProductProps = AggregateProps & {
  name: string;
  description: string;
  readonly variants: Variant[];
};

export class Product extends Aggregate<ProductProps> {
  private domainEvents: ProductDetailsUpdated[] = [];

  constructor(props: ProductProps, private _active: boolean = true) {
    super(props);
  }

  static create(props: ProductProps) {
    return new Product(props);
  }

  // Ajout personnel
  get productStatus(): boolean {
    return this._active;
  }

  set deactivate(active: boolean) {
    this._active = !active;
  }

  adjustStock(sku: ProductSKU, delta: number) {
    const value = this.props.variants.find((v) => v.sku === sku);

    if (!value) {
      throw new Error('Variant not found');
    }

    value.adjustStock(delta);
  }

  updateDetails(name?: string, description?: string) {
    if (name) {
      this.props.name = name;
    }

    if (description) {
      this.props.description = description;
    }

    this.domainEvents.push(
      new ProductDetailsUpdated(this.props.id, this.props.name, this.props.description),
    );
  }

  pullEvents() {
    const ev = [...this.domainEvents];
    this.domainEvents = [];
    return ev;
  }
}
