import { ProductSKU } from '@org/shared-kernel';
import { IStockService } from '../../core/services/stock.service';

export class FakeStockService implements IStockService {
  constructor(private readonly alwaysAvailable = true) {}
  
  async isAvailable(_: ProductSKU, __: number) {
    return this.alwaysAvailable;
  }
}
