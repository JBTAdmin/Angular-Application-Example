import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductListComponent } from "./products/product-list/product-list.component";
import { ProductEditComponent } from "./products/product-edit/product-edit.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { ProductResolver } from "./products/product-detail/product-resolver.service";

const routes: Routes = [
  {
    path: "",
    component: ProductListComponent,
    pathMatch: "full"
  },
  {
    path: ":id",
    component: ProductDetailComponent,
    resolve: { product: ProductResolver },
    pathMatch: "full"
  },
  {
    path: ":id/edit",
    component: ProductEditComponent,
    resolve: { product: ProductResolver },
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
