import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { ProductService } from "../product.service";
import { Product } from "../product";
import { ProductData } from "../product-data";
import { MessageService } from "../../services/message.service";

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
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;
  removable = true;
  selectable = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const { product } = this.route.snapshot.data["product"];
    this.product = product || this.productService.initializeProduct();
    this.createForm();
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
      supplier: [this.product.supplier, Validators.required],
      tags: [this.product.tags || []],
      sendCatalog: [this.product.sendCatalog || false]
    });
  }

  get tags() {
    return this.productForm.get("tags");
  }

  addTag(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.tags.value.push(value);
      this.tags.markAsDirty();
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(tag: string): void {
    const index = this.tags.value.indexOf(tag);
    if (index >= 0) {
      this.tags.value.splice(index, 1);
      this.tags.markAsDirty();
    }
  }

  deleteProduct(): void {
    this.productService.deleteProductOnConfirm(this.product).then(response => {
      this.onSaveComplete();
    });
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const p = { ...this.product, ...this.productForm.value };

        if (p.id === 0) {
          this.productService.createProduct(p).subscribe(_ => {
            this.messageService.showMessage("PRODUCT.SAVED");
            this.onSaveComplete();
          });
        } else {
          this.productService.updateProduct(p).subscribe(_ => {
            this.messageService.showMessage("PRODUCT.UPDATED");
            this.onSaveComplete();
          });
        }
      } else {
        this.onSaveComplete();
      }
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate([""]);
  }
}
