import { InMemoryDbService } from "angular-in-memory-web-api";
import { ProductData } from "./products/product-data";

export class AppData implements InMemoryDbService {
  createDb() {
    const products = ProductData.products;
    return { products };
  }
}
