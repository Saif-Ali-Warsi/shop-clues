import { Component, OnInit, inject, output, input, effect } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search implements OnInit {

  searchChanged = output<string>();
  searchValue = input('');

  searchControl = new FormControl('', { nonNullable: true });

  constructor() {
    effect(() => {
      this.searchControl.setValue(
        this.searchValue(),
        { emitEvent: false }
      )
    })
  }


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
