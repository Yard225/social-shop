import { ProductSKU } from "@org/shared-kernel";

export interface IStockService {
  isAvailable(sku: ProductSKU, qty: number): Promise<boolean>;
}
