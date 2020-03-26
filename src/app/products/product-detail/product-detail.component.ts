import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Product } from "../product";
import { ProductService } from "../product.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent {
  pageTitle = "PRODUCT.DETAIL";
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Use object destructuring to read the pieces of the resolved data.
    const { product } = this.route.snapshot.data["product"];
    this.product = product;

    // Display the appropriate page header
    if (this.product) {
      this.pageTitle = `: ${this.product.productName}`;
    } else {
      this.pageTitle = this.translate.instant("PRODUCT.NOT_FOUND");
    }
  }

  deleteProduct(): void {
    this.productService.deleteProductOnConfirm(this.product).then(() => {
      this.router.navigate([""]);
    });
  }
}
