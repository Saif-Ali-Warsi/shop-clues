import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private http = inject(HttpClient)


  private readonly baseUrl = 'https://dummyjson.com';

  getProducts(): Observable<{ products: Product[] }> {
    return this.http.get<{ products: Product[] }>(`${this.baseUrl}/products`)
  }

}
