import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from "./app-routing.module";
import { MatMaterialModule } from "./mat-material.module";
import { AppData } from "./app-data";
import { AppComponent } from "./app.component";
import { ProductListComponent } from "./products/product-list/product-list.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { ProductEditComponent } from "./products/product-edit/product-edit.component";
import { ConfirmationDialogComponent } from "./utitlity/confirmation/confirmation.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [ConfirmationDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule.withConfig({}),
    ReactiveFormsModule,
    AppRoutingModule,
    MatMaterialModule,
    InMemoryWebApiModule.forRoot(AppData, { delay: 2000 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
