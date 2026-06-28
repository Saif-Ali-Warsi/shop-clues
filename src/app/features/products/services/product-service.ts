import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Product } from '../models/product.model';
import { ProductResponse } from '../models/product-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http = inject(HttpClient)


  private readonly baseUrl = environment.apiUrl;

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/products`)
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`)
  }

  searchProducts(query: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/products/search?q=${query}`)
  }

}
