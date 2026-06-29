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

  searchChanged = output<string>();

  productService = inject(ProductService);
  searchControl = new FormControl('', { nonNullable: true });


  ngOnInit() {
    this.listenSearch();
  }

  listenSearch() {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()

    ).subscribe(query => {
      this.searchChanged.emit(query.trim())

    }
    )
  }

}
