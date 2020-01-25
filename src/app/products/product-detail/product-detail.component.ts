import { Component } from "@angular/core";
import { Product } from "../product";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../product.service";
import { MatDialog } from "@angular/material/dialog";
import { SpinnerService } from "../../services/spinner.service";
import {
  Confirmation,
  ConfirmationDialogComponent
} from "../../utitlity/confirmation/confirmation.component";

@Component({
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent {
  pageTitle = "Product Detail";
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinnerService: SpinnerService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Use object destructuring to read the pieces of the resolved data.
    const { product } = this.route.snapshot.data["product"];
    this.product = product;

    // Display the appropriate page header
    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = "No product found";
    }
  }

  // TODO : Reusing this code as its repeating in Detail too
  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: "250px",
        data: {
          message: `Really delete the product: ${this.product.productName}?`
        } as Confirmation
      });
      this.spinnerService.setLoader(true);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.productService.deleteProduct(this.product.id).subscribe({
            next: () => this.onSaveComplete(),
            error: err => console.log(err)
          });
        } else {
          this.spinnerService.setLoader(false);
        }
      });
    }
  }

  onSaveComplete() {
    this.spinnerService.setLoader(false);
    this.router.navigate([""]);
  }
}
