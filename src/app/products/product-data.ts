import { Product } from "./product";

export enum Categories {
  Garden = "Garden",
  Toobox = "Toobox",
  Gaming = "Gaming"
}

export class ProductData {
  static products: Product[] = [
    {
      id: 1,
      productName: "Leaf Rake",
      productCode: "GDN-0011",
      description: "Leaf rake with 48-inch wooden handle",
      price: 19.95,
      category: Categories.Gaming,
      quantityInStock: 15,
      tags: ["rake", "leaf", "yard", "home"],
      sendCatalog: false,
      supplier: 1
    },
    {
      id: 2,
      productName: "Garden Cart",
      productCode: "GDN-0023",
      description: "15 gallon capacity rolling garden cart",
      price: 32.99,
      category: Categories.Gaming,
      quantityInStock: 2,
      tags: ["tools", "hammer", "construction"],
      sendCatalog: false,
      supplier: 1
    },
    {
      id: 5,
      productName: "Hammer",
      productCode: "TBX-0048",
      description: "Curved claw steel hammer",
      price: 8.9,
      category: Categories.Gaming,
      quantityInStock: 8,
      sendCatalog: false,
      supplier: 1
    },
    {
      id: 8,
      productName: "Saw",
      productCode: "TBX-0022",
      description: "15-inch steel blade hand saw",
      price: 11.55,
      category: Categories.Gaming,
      sendCatalog: false,
      quantityInStock: 6,
      supplier: 1
    },
    {
      id: 10,
      productName: "Video Game Controller",
      productCode: "GMG-0042",
      description: "Standard two-button video game controller",
      price: 35.95,
      category: Categories.Gaming,
      sendCatalog: false,
      quantityInStock: 12,
      supplier: 1
    }
  ];

  static ProductCategories = [
    {
      name: Categories.Gaming
    },
    {
      name: Categories.Toobox
    },
    {
      name: Categories.Garden
    }
  ];

  static ProductSuppliers = [
    {
      id: 1,
      name: "Acme Gardening Supply",
      cost: 16.95,
      minQuantity: 12
    },
    {
      id: 2,
      name: "Standard Gardening",
      cost: 15.95,
      minQuantity: 24
    },

    {
      id: 3,
      name: "Tool Supply",
      cost: 12,
      minQuantity: 6
    },
    {
      id: 4,
      name: "Gaming Supply",
      cost: 25,
      minQuantity: 2
    }
  ];
}
