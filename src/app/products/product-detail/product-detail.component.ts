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
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    private spinnerService: SpinnerService,
    private router: Router,
    private translate: TranslateService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
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

  // TODO : Reusing this code as its repeating in Detail too
  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: "250px",
        data: {
          message:
            this.translate.instant("PRODUCT.DELETE.CONFIRMATION") +
            `: ${this.product.productName}?`
        } as Confirmation
      });
      this.spinnerService.setLoader(true);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.productService.deleteProduct(this.product.id).subscribe({
            next: () => {
              const deleteConfirmation = this.translate.instant(
                "PRODUCT.DELETED"
              );
              this.snackBar.open(deleteConfirmation, null, { duration: 2000 });
              this.onSaveComplete();
            },
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
