import { Component, ViewChild } from "@angular/core";
import { merge } from "rxjs";
import { switchMap, startWith, map } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

import { Product, ProductResult } from "../product";
import { ProductService } from "../product.service";
import { SpinnerService } from "../../services/spinner.service";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent {
  public pageTitle = "Product List";

  displayedColumns: string[] = [
    "productCode",
    "productName",
    "price",
    "quantityInStock"
  ];
  products: Product[] = [];
  totalCount: number = 0;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private productService: ProductService,
    private spinnerService: SpinnerService
  ) {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.spinnerService.setLoader(true);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const { active, direction } = this.sort;
          const pageIndex = this.paginator.pageIndex;

          return this.productService.getProducts(active, direction, pageIndex);
        }),
        map((data: ProductResult) => {
          this.spinnerService.setLoader(false);
          this.totalCount = data.totalCount;
          return data.items;
        })
      )
      .subscribe((products: Product[]) => (this.products = products));
  }
}
