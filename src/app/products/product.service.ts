import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";

import { Product } from "./product";
import { Categories } from "./product-data";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private productsUrl = "api/products";

  constructor(private http: HttpClient) {}

  // Real http call can use this active, direction and pageIndex sort option
  getProducts(
    active: string,
    direction: string,
    pageIndex: number
  ): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http.get(this.productsUrl, { headers }).pipe(
      map((data: Product[]) => {
        // Mocked pagination result object
        return {
          totalCount: data.length,
          items: data || []
        };
      }),
      tap(data => console.log(JSON.stringify(data))),
      catchError(error => throwError(error))
    );
  }

  getProduct(id: number): Observable<Product> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(data => console.log("getProduct: " + JSON.stringify(data))),
      catchError(error => throwError(error))
    );
  }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    product.id = null;    
    return this.http
      .post<Product>(this.productsUrl, product, { headers })
      .pipe(
        tap(data => console.log("createProduct: " + JSON.stringify(data))),
        catchError(error => throwError(error))
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.productsUrl}/${id}`;
    return this.http
      .delete<Product>(url, { headers })
      .pipe(
        tap(data => console.log("deleteProduct: " + id)),
        catchError(error => throwError(error))
      );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.productsUrl}/${product.id}`;
    return this.http
      .put<Product>(url, product, { headers })
      .pipe(
        tap(() => console.log("updateProduct: " + product.id)),
        // Return the product on an update
        map(() => product),
        catchError(error => throwError(error))
      );
  }

  private initializeProduct(): Product {
    // Return an initialized object
    return {
      id: 0,
      productName: null,
      productCode: null,
      price: null,
      description: null,
      quantityInStock: null,
      category: Categories.Gaming,
      supplier: 1
    };
  }
}
