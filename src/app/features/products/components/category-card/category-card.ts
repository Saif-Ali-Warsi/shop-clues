import { Component, input } from '@angular/core';
import { Category } from '../../models/category.model';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-category-card',
  imports: [RouterLink],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
})
export class CategoryCard {

  category = input.required<Category>();

}
