import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../product.service";
import { Product } from "../product";
import { ProductData } from "../product-data";
import { SpinnerService } from "../../services/spinner.service";
import {
  ConfirmationDialogComponent,
  Confirmation
} from "src/app/utitlity/confirmation/confirmation.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.scss"]
})
export class ProductEditComponent {
  pageTitle = "Product Edit";
  productForm: FormGroup;
  product: Product;
  productCategories = ProductData.ProductCategories;
  productSuppliers = ProductData.ProductSuppliers;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private spinnerService: SpinnerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.spinnerService.setLoader(true);
    this.productService.getProduct(id).subscribe((product: Product) => {
      this.spinnerService.setLoader(false);
      this.product = product;
      this.createForm();
      this.displayTitle();
    });
  }

  createForm(): void {
    this.productForm = this.formBuilder.group({
      productName: [
        this.product.productName,
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      productCode: [this.product.productCode, Validators.required],
      description: [
        this.product.description,
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      price: [this.product.price, Validators.required],
      quantityInStock: [this.product.quantityInStock, Validators.required],
      category: [this.product.category, Validators.required],
      supplier: [this.product.supplier, Validators.required]
    });
  }

  displayTitle(): void {
    if (this.product.id === 0) {
      this.pageTitle = "Add Product";
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
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

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const p = { ...this.product, ...this.productForm.value };
        this.spinnerService.setLoader(true);
        if (p.id === 0) {
          this.productService.createProduct(p).subscribe({
            next: () => this.onSaveComplete(),
            error: err => console.log(err)
          });
        } else {
          this.productService.updateProduct(p).subscribe({
            next: () => this.onSaveComplete(),
            error: err => console.log(err)
          });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      // this.errorMessage = "Please correct the validation errors.";
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.spinnerService.setLoader(false);
    this.router.navigate([""]);
  }
}
