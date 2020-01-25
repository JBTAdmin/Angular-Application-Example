import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { ProductResolved } from "../product";
import { ProductService } from "../product.service";
import { SpinnerService } from "../../services/spinner.service";

@Injectable({
  providedIn: "root"
})
export class ProductResolver implements Resolve<ProductResolved> {
  constructor(
    private productService: ProductService,
    private spinnerService: SpinnerService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductResolved> {
    const id = route.paramMap.get("id");
    if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of({ product: null, error: message });
    }
    this.spinnerService.setLoader(true);
    return this.productService.getProduct(+id).pipe(
      map(product => {
        this.spinnerService.setLoader(false);
        return { product: product };
      }),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({ product: null, error: message });
      })
    );
  }
}
