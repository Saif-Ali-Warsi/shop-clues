import { Component, OnInit, inject, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ProductService } from '../../services/product-service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search implements OnInit {

  searchResult = output<Product[]>();

  productService = inject(ProductService);
  searchControl = new FormControl('', { nonNullable: true });


  ngOnInit() {
    this.listenSearch();
  }

  listenSearch() {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => {
        if (!value.trim()) {
          return this.productService.getProducts()
        }
        return this.productService.searchProducts(value);
      }
      )
    ).subscribe({
      next: (response) => {
        this.searchResult.emit(response.products)
      },

      error: (err) => {

      }

    }
    )
  }

}
