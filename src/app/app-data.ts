import { InMemoryDbService } from "angular-in-memory-web-api";
import { ProductData } from "./products/product-data";
import { PersonData } from "./person/person-data";

export class AppData implements InMemoryDbService {
  createDb() {
    const products = ProductData.products;
    const persons = PersonData.persons;
    return { products, persons };
  }
}
